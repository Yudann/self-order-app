import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiEye, FiSearch, FiCalendar } from "react-icons/fi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllTransactions } from "@/services/transaction.service";

export default async function TransactionsPage() {
  const transactions = await getAllTransactions();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

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

  return (
    <div className="min-h-screen p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-gray-800">
            Riwayat Transaksi
          </h1>
          <p className="text-gray-500">
            Total {transactions.length} transaksi tercatat
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari transaksi..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <FiCalendar size={16} />
            <span>Filter Tanggal</span>
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[120px] text-gray-600 font-semibold">
                ID Transaksi
              </TableHead>
              <TableHead className="text-gray-600 font-semibold">
                Pelanggan
              </TableHead>
              <TableHead className="text-gray-600 font-semibold">
                Tanggal
              </TableHead>
              <TableHead className="text-right text-gray-600 font-semibold">
                Total
              </TableHead>
              <TableHead className="text-right text-gray-600 font-semibold">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                className="hover:bg-gray-50/50 border-t border-gray-100"
              >
                <TableCell className="font-medium text-blue-600">
                  #{transaction.id}
                </TableCell>
                <TableCell>
                  <div className="font-medium text-gray-800">
                    {transaction.customer.customerName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {transaction.customer.phoneNumber}
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">
                  {formatDate(transaction.createdAt)}
                </TableCell>
                <TableCell className="text-right font-medium text-gray-800">
                  {formatCurrency(transaction.totalAmount)}
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/dashboard/transactions/${transaction.id}`}>
                    <Button variant="outline" size="sm" className="gap-1">
                      <FiEye size={14} />
                      <span>Detail</span>
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          Menampilkan 1-{transactions.length} dari {transactions.length}{" "}
          transaksi
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Sebelumnya
          </Button>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm" disabled>
            Selanjutnya
          </Button>
        </div>
      </div>
    </div>
  );
}
