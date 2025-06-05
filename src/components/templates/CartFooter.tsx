"use client";

import { Button } from "@/components/ui/button";
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import { useCartItems } from "@/app/hooks/useCart"; // ⬅️ pakai yang baru

export default function CartFooter() {
  const { cartItems, totalPrice } = useCartItems(); // ⬅️ panggil hook custom yang udah fix

  if (cartItems.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 px-4 z-50 max-w-5xl mx-auto">
      <div className="container mx-auto px-4 py-3 mb-4 bg-white rounded-2xl border-gray-200 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/cart" className="cursor-pointer h-full relative">
              <FiShoppingCart className="text-2xl text-primary-green " />
              <span className="absolute -top-2 -right-2 bg-primary-green text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </Link>
            <div>
              <p className="font-sm">Cart</p>
              <p className="text-medium text-black font-bold">
                Rp {totalPrice.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="green" asChild>
              <Link href="/checkout">Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
