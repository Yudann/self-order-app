"use client";

import { FiHome } from "react-icons/fi";
import { FaSackDollar } from "react-icons/fa6";
import { BsDatabaseFillLock } from "react-icons/bs";

import Link from "next/link";

export default function DashboardSidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-white border-r border-gray-300 px-6 py-8 pt-12 flex flex-col justify-between z-40 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:w-[250px]`}
    >
      <div>
        <h1 className="text-2xl font-bold mb-10 text-blue-600">
          Self Order App
        </h1>

        <nav className="space-y-4 text-gray-700">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 text-base font-medium text-gray-600 hover:text-black transition"
          >
            <FiHome size={18} />
            Dashboard
          </Link>
          <Link
            href="/dashboard/products"
            className="flex items-center gap-3 text-base font-medium text-gray-600 hover:text-black transition"
          >
            <BsDatabaseFillLock size={18} />
            Products
          </Link>
          <Link
            href="/dashboard/transactions"
            className="flex items-center gap-3 text-base font-medium text-gray-600 hover:text-black transition"
          >
            <FaSackDollar size={18} />
            Transactions
          </Link>
        </nav>
      </div>
    </aside>
  );
}
