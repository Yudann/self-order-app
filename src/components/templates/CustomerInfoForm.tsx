"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FiUser, FiPhone } from "react-icons/fi";

export default function CustomerInfoForm({
  onNext,
  initialData = { name: "", phone: "" },
}: {
  onNext: (data: { name: string; phone: string }) => void;
  initialData?: { name: string; phone: string };
}) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({ name: "", phone: "" });
  const router = useRouter();

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", phone: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Nama harus diisi";
      valid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor telepon harus diisi";
      valid = false;
    } else if (!/^[0-9]+$/.test(formData.phone)) {
      newErrors.phone = "Nomor telepon harus angka";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext(formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-primary-purple mb-6">
        Informasi Pelanggan
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Lengkap
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="text-gray-400" />
            </div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`pl-10 w-full rounded-md border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } p-2 focus:ring-primary-purple focus:border-primary-purple`}
              placeholder="Masukkan nama lengkap"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nomor Telepon
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiPhone className="text-gray-400" />
            </div>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className={`pl-10 w-full rounded-md border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } p-2 focus:ring-primary-purple focus:border-primary-purple`}
              placeholder="Masukkan nomor telepon"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Kembali
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary-purple text-white rounded-md hover:bg-purple-600 transition-colors"
          >
            Lanjut ke Pembayaran
          </button>
        </div>
      </form>
    </motion.div>
  );
}
