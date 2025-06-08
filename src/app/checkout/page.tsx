// checkout/page.tsx
"use client";
import { useCartItems, useCart } from "@/app/hooks/useCart";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cartItems, totalPrice } = useCartItems();
  const { clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleCheckout = async () => {
    if (!name || !phone) return alert("Nama dan No HP wajib diisi!");

    const payload = {
      customer: {
        customerName: name,
        phoneNumber: phone,
      },
      totalAmount: totalPrice,
      details: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        subtotal: item.quantity * item.price,
      })),
    };

    try {
      // Misal POST ke /api/transactions
      await fetch("/api/transactions", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      clearCart();
      router.push("/checkout/success");
    } catch (error) {
      console.error(error);
      alert("Checkout gagal, coba lagi.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Checkout</h1>

      <div className="space-y-4">
        <input
          placeholder="Nama"
          className="w-full border px-4 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="No HP"
          className="w-full border px-4 py-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div>
        <h2 className="font-semibold text-lg mb-2">Ringkasan Pesanan</h2>
        <ul className="space-y-2">
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>
                {item.productName} x {item.quantity}
              </span>
              <span>Rp {item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 font-bold text-right">
          Total: Rp {totalPrice.toLocaleString()}
        </div>
      </div>

      <button
        onClick={handleCheckout}
        className="bg-primary-green text-white px-6 py-3 rounded w-full"
      >
        Konfirmasi Pesanan
      </button>
    </div>
  );
}
