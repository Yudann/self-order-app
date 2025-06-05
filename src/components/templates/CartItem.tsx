"use client";

import { useCart } from "@/app/hooks/useCart";
import config from "@/config";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

type Props = {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  image: string;
};

export function CartItem({ id, productName, price, image, quantity }: Props) {
  const { updateQuantity, removeFromCart } = useCart();

  const increaseQty = () => updateQuantity(id, quantity + 1);
  const decreaseQty = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    } else {
      removeFromCart(id);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="flex items-start gap-4 p-3 md:p-4 bg-white rounded-lg shadow-sm border border-gray-100"
    >
      <div className="w-24 h-24 md:w-40 md:h-40 bg-gray-50 rounded-md overflow-hidden flex-shrink-0">
        <Image
          src={config.publicAssetUrl + image}
          alt={productName}
          width={200}
          height={200}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-medium text-gray-800 truncate">{productName}</div>
        <div className="text-primary-purple font-semibold mt-1 md:mt-2">
          Rp {price.toLocaleString()}
        </div>

        <div className="flex items-center justify-between mt-3 md:mt-4">
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={decreaseQty}
              className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <FaMinus />
            </motion.button>
            <span className="font-medium w-6 text-center">{quantity}</span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={increaseQty}
              className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <FaPlus />
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => removeFromCart(id)}
            className="text-red-500 text-base px-3 py-3 rounded-md hover:bg-red-50 transition-colors"
          >
            <FaTrash />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
