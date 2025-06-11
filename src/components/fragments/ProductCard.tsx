"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import config from "@/config";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart } from "react-icons/fi";
import { useCart, useCartItems } from "@/hooks/useCart";
import MessageBox from "./MessageBox"; // Import komponen MessageBox

interface ProductCardProps {
  id: number;
  productImage: string;
  productName: string;
  price: number;
}

export default function ProductCard({
  id,
  productImage,
  productName,
  price,
}: ProductCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showMessage, setShowMessage] = useState(false); // State untuk mengontrol MessageBox

  const { cartItems } = useCartItems();
  const addToCart = useCart((state) => state.addToCart);
  const updateQuantity = useCart((state) => state.updateQuantity);

  const handleIncrement = () => setQuantity((prev) => prev + 1);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else {
      setIsExpanded(false);
    }
  };

  const handleAddToCart = () => {
    const existingItem = cartItems.find((item) => item.id === id);

    if (existingItem) {
      updateQuantity(id, existingItem.quantity + quantity);
    } else {
      addToCart({
        id,
        productName,
        price,
        image: productImage,
      });

      if (quantity > 1) {
        updateQuantity(id, quantity);
      }
    }

    setIsExpanded(false);
    setQuantity(1);

    // Tampilkan MessageBox
    setShowMessage(true);
    // Sembunyikan setelah 3 detik
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <div className="border border-primary-green rounded-2xl flex flex-col items-center w-full p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="w-full flex justify-center">
        <Image
          src={config.publicAssetUrl + productImage}
          alt={productName}
          width={200}
          height={200}
          className="rounded-xl object-cover max-h-[180px]"
        />
      </div>

      <div className="flex items-center justify-between w-full mt-4">
        <div className="flex flex-col">
          <h1 className="text-base font-semibold leading-tight">
            {productName}
          </h1>
          <h2 className="text-sm text-muted-foreground">
            Rp {price.toLocaleString()}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative min-w-[120px] h-12">
            <AnimatePresence mode="wait" initial={false}>
              {!isExpanded ? (
                <motion.div
                  key="plus-button"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-0"
                >
                  <Button
                    variant="greenOutline"
                    className="rounded-full w-8 h-8 md:h-12 md:w-12 text-xl px-0 py-0"
                    onClick={() => setIsExpanded(true)}
                  >
                    +
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="counter"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between border border-primary-green rounded-full h-12 px-4 w-full bg-white"
                >
                  <Button
                    variant="ghost"
                    className="text-xl text-primary-green px-2"
                    onClick={handleDecrement}
                  >
                    -
                  </Button>
                  <span className="text-primary-green font-semibold">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    className="text-xl text-primary-green px-2"
                    onClick={handleIncrement}
                  >
                    +
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
            >
              <Button
                variant="green"
                className="h-12 w-12 p-0 rounded-full"
                onClick={handleAddToCart}
              >
                <FiShoppingCart className="text-xl" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* MessageBox untuk notifikasi */}
      {showMessage && (
        <MessageBox
          type="success"
          message={`${quantity} ${productName} telah ditambahkan ke keranjang`}
          duration={3000}
          position="top-right"
          onClose={() => setShowMessage(false)}
        />
      )}
    </div>
  );
}
