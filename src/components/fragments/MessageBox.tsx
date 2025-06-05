"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import Portal from "./Portal";

type MessageBoxType = "success" | "error" | "info" | "warning";

type MessageBoxProps = {
  type?: MessageBoxType;
  message: string;
  duration?: number;
  onClose?: () => void;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
};

const iconMap = {
  success: FaCheckCircle,
  error: FaTimesCircle,
  info: FaInfoCircle,
  warning: FaExclamationTriangle,
};

const colorMap = {
  success: {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-300",
    icon: "text-green-500",
  },
  error: {
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-300",
    icon: "text-red-500",
  },
  info: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-300",
    icon: "text-blue-500",
  },
  warning: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-300",
    icon: "text-yellow-500",
  },
};

const positionMap = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
};

export default function MessageBox({
  type = "info",
  message,
  duration = 3000,
  onClose,
  position = "top-right",
}: MessageBoxProps) {
  const [isVisible, setIsVisible] = useState(true);
  const Icon = iconMap[type];
  const colors = colorMap[type];
  const positionClass = positionMap[position];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <Portal wrapperId="message-box-portal">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              x: position.includes("right") ? 50 : -50,
              transition: { duration: 0.2 },
            }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed z-[10000] p-4 rounded-lg border ${colors.bg} ${colors.text} ${colors.border} shadow-lg flex items-center gap-3 ${positionClass}`}
          >
            <Icon className={`text-xl ${colors.icon}`} />
            <span className="max-w-xs text-[14px] md:text-base">{message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
