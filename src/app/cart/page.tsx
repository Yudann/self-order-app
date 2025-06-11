"use client";

import { useCart, useCartItems } from "@/hooks/useCart";
import { CartItem } from "@/components/templates/CartItem";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiShoppingBag } from "react-icons/fi";

export default function CartPage() {
  const router = useRouter();
  const { cartItems } = useCartItems();
  const { clearCart } = useCart();
  const { totalPrice } = useCartItems();

  const handleBayar = () => {
    alert("Bayar berhasil!");
    clearCart();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto min-h-screen"
    >
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <motion.button
          whileHover={{ x: -2 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-primary-purple hover:text-purple-700 transition-colors"
        >
          <FiArrowLeft className="text-lg" />
        </motion.button>
        <h1 className="text-xl md:text-2xl font-bold text-primary-purple flex items-center gap-2">
          <FiShoppingBag />
          Keranjang Belanja
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-4 mb-6">
            <AnimatePresence>
              {cartItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 bg-gray-50 rounded-lg"
                >
                  <div className="text-gray-400 mb-2">
                    <FiShoppingBag className="inline-block text-3xl" />
                  </div>
                  <p className="text-gray-500">Keranjang belanja kosong</p>
                </motion.div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CartItem {...item} />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {cartItems.length > 0 && (
          <div className="lg:col-span-1     ">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-6 bg-white p-4 md:p-6 border border-gray-200 rounded-lg shadow-sm "
            >
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Ringkasan Belanja
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    Rp {totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pajak</span>
                  <span className="font-medium">Gratis</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between">
                  <span className="text-gray-800 font-semibold">Total</span>
                  <span className="text-primary-purple font-bold text-lg">
                    Rp {totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBayar}
                className="w-full bg-primary-green hover:bg-primary-green/70 cursor-pointer text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Bayar Sekarang
              </motion.button>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
