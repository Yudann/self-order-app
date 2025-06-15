"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";

export default function Navbar() {
  const [tanggal, setTanggal] = useState("");

  useEffect(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formatter = new Intl.DateTimeFormat("id-ID", options);
    setTanggal(formatter.format(today));
  }, []);

  return (
    <header className="fixed top-0 w-7xl z-50   py-4 px-6 flex items-center justify-between">
      {/* Nama Cafe */}
      <div className="text-xl font-bold text-primary-green">Yudan Coffee</div>

      {/* Tanggal */}
      <div className="text-sm text-gray-600 hidden md:block">{tanggal}</div>

      {/* Icon Keranjang */}
      <Link href="/cart">
        <div className="relative text-primary-green hover:text-green-700 cursor-pointer">
          <FiShoppingCart size={24} />
          {/* Kalau mau kasih badge item nanti tinggal tambahin di sini */}
        </div>
      </Link>
    </header>
  );
}
