import React from "react";
import {
  FiCoffee,
  FiDollarSign,
  FiPackage,
  FiShoppingCart,
  FiArrowRight,
} from "react-icons/fi";
import Link from "next/link";
import { getAllTransactions } from "@/services/transaction.service";
import { TransactionDetailsApiResponse } from "@/types/transaction.type";
import { findProducts } from "@/services/products.service";

// Komponen Card Statistik
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow p-6 flex items-center justify-between ${color}`}
    >
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <div className="p-3 rounded-full bg-opacity-20 bg-white">{icon}</div>
    </div>
  );
};

// Komponen Button Navigasi
interface NavButtonProps {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const NavButton: React.FC<NavButtonProps> = ({ title, href, icon }) => {
  return (
    <Link href={href}>
      <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between group">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-500 text-sm mt-1">Lihat detail</p>
        </div>
        <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
          {icon}
        </div>
      </div>
    </Link>
  );
};

// Komponen Recent Transactions
interface RecentTransactionsProps {
  transactions: TransactionDetailsApiResponse[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Transaksi Terakhir</h2>
        <Link
          href="/transactions"
          className="text-blue-500 text-sm flex items-center"
        >
          Lihat Semua <FiArrowRight className="ml-1" />
        </Link>
      </div>
      <div className="space-y-4">
        {transactions.slice(0, 5).map((transaction) => (
          <div
            key={transaction.id}
            className="border-b pb-3 last:border-b-0 last:pb-0"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">#{transaction.id}</p>
                <p className="text-gray-500 text-sm">
                  {transaction.customer.customerName}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  {formatCurrency(transaction.totalAmount)}
                </p>
                <p className="text-gray-500 text-sm">
                  {formatDate(transaction.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Halaman Dashboard
const DashboardPage = async () => {
  const allTransactions = await getAllTransactions();
  const products = await findProducts();

  // Hitung total penjualan
  const totalSales = allTransactions.reduce(
    (sum, transaction) => sum + transaction.totalAmount,
    0
  );

  // Format currency untuk display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Cafe</h1>

      {/* Grid Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Penjualan"
          value={formatCurrency(totalSales)}
          icon={<FiDollarSign size={24} />}
          color="bg-gradient-to-r from-blue-50 to-blue-100"
        />
        <StatCard
          title="Total Pesanan"
          value={allTransactions.length}
          icon={<FiShoppingCart size={24} />}
          color="bg-gradient-to-r from-green-50 to-green-100"
        />
        <StatCard
          title="Jumlah Produk"
          value={products.length}
          icon={<FiCoffee size={24} />}
          color="bg-gradient-to-r from-yellow-50 to-yellow-100"
        />
        <StatCard
          title="Rata-rata Pesanan"
          value={formatCurrency(
            allTransactions.length > 0 ? totalSales / allTransactions.length : 0
          )}
          icon={<FiPackage size={24} />}
          color="bg-gradient-to-r from-purple-50 to-purple-100"
        />
      </div>

      {/* Grid Konten Utama */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <RecentTransactions transactions={allTransactions} />
        </div>
        <div className="space-y-6">
          <NavButton
            title="Kelola Produk"
            href="/products"
            icon={<FiCoffee size={24} />}
          />
          <NavButton
            title="Kelola Transaksi"
            href="/transactions"
            icon={<FiShoppingCart size={24} />}
          />
        </div>
      </div>

      {/* Info Tambahan */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Ringkasan Hari Ini</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-500 text-sm font-medium">
              Pesanan Hari Ini
            </p>
            <p className="text-2xl font-bold mt-1">0</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-green-500 text-sm font-medium">
              Pendapatan Hari Ini
            </p>
            <p className="text-2xl font-bold mt-1">Rp0</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-purple-500 text-sm font-medium">
              Produk Terlaris
            </p>
            <p className="text-2xl font-bold mt-1">-</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
