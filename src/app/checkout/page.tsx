"use client";

import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import MessageBox from "@/components/fragments/MessageBox";
import { createTransaction } from "@/services/transaction.service";
import { CreateTransactionPayload } from "@/types/transaction.type";
import { ensureCustomerExists } from "@/repositories/checkout.repository";
import { useRouter } from "next/navigation";

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
    setMessage({ type: "info", text: "" });

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
    <div className="max-w-lg mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Checkout</h1>

      <div className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Nama Lengkap
          </label>
          <input
            type="text"
            id="name"
            placeholder="Masukkan nama lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`border p-3 w-full rounded-md ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Nomor Handphone
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="Contoh: 081234567890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`border p-3 w-full rounded-md ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Order Summary */}
        <div className="border rounded-lg p-4">
          <h3 className="font-bold text-lg mb-3">Ringkasan Pesanan</h3>
          <div className="space-y-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.productName} × {item.quantity}
                </span>
                <span>Rp{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t mt-3 pt-3 flex justify-between font-bold">
            <span>Total</span>
            <span>
              Rp
              {cartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toLocaleString()}
            </span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          disabled={loading}
          className={`px-4 py-3 rounded w-full font-medium ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {loading ? "Memproses..." : "Lanjutkan Pembayaran"}
        </button>

        {message && <MessageBox message={message.text} type={message.type} />}
      </div>
    </div>
  );
}
