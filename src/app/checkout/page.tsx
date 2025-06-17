"use client";

import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import MessageBox from "@/components/fragments/MessageBox";
import { createTransaction } from "@/services/transaction.service";
import { CreateTransactionPayload } from "@/types/transaction.type";
import { ensureCustomerExists } from "@/repositories/checkout.repository";
import { useRouter } from "next/navigation";
import { FiArrowRight, FiLoader, FiShoppingCart } from "react-icons/fi";

export default function CheckoutPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error" | "info" | "warning";
    text: string;
  } | null>(null);

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });

  const { cartItems, clearCart } = useCart();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", phone: "" };

    if (!name.trim()) {
      newErrors.name = "Nama wajib diisi";
      isValid = false;
    }

    if (!phone.trim()) {
      newErrors.phone = "Nomor HP wajib diisi";
      isValid = false;
    } else if (!/^[0-9]{10,13}$/.test(phone)) {
      newErrors.phone = "Nomor HP harus 10-13 digit angka";
      isValid = false;
    }

    if (cartItems.length === 0) {
      setMessage({ type: "warning", text: "Keranjang kosong!" });
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  async function handleCheckout() {
    if (!validateForm()) return;

    setLoading(true);
    setMessage({ type: "info", text: "Memproses pembayaran..." });

    try {
      const customer = await ensureCustomerExists({
        customerName: name.trim(),
        phoneNumber: phone.trim(),
      });
      if (!customer || !customer.idCustomer) {
        setMessage({ type: "error", text: "Gagal mengambil data customer" });
        return;
      }

      const payload: CreateTransactionPayload = {
        customerId: customer.idCustomer,
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };

      await createTransaction(payload);

      setMessage({ type: "success", text: "Checkout berhasil!" });
      clearCart();
      setName("");
      setPhone("");
      router.push("/struck");
    } catch (err: unknown) {
      console.error(err);

      let errorMessage = "Terjadi kesalahan saat checkout";

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen  p-4 md:p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full bg-white rounded-xl shadow-sm p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
          <p className="text-gray-500">
            Lengkapi data diri untuk menyelesaikan pesanan
          </p>
        </div>

        {message && (
          <div className="mb-4">
            <MessageBox message={message.text} type={message.type} />
          </div>
        )}

        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              id="name"
              placeholder="Masukkan nama lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nomor Handphone
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Contoh: 081234567890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          {/* Order Summary */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h3 className="font-bold text-lg mb-3 text-gray-800 flex items-center gap-2">
              <FiShoppingCart />
              <span>Ringkasan Pesanan</span>
            </h3>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <span className="text-gray-700">
                    {item.productName}{" "}
                    <span className="text-gray-500">× {item.quantity}</span>
                  </span>
                  <span className="font-medium">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between font-bold text-gray-800">
              <span>Total Pembayaran</span>
              <span>
                {formatCurrency(
                  cartItems.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                )}
              </span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            disabled={loading || cartItems.length === 0}
            className={`px-6 py-3 rounded-lg w-full font-medium flex items-center justify-center gap-2 transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary-green text-white hover:bg-primary-green/60"
            } ${cartItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin" />
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <span>Lanjutkan Pembayaran</span>
                <FiArrowRight />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
