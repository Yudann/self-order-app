import { findProducts } from "@/services/products.service";
import { getLastTransaction } from "@/services/transaction.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function DashboardPage() {
  const [transactions, products] = await Promise.all([
    getLastTransaction(),
    findProducts(),
  ]);

  // Calculate sales metrics
  const totalSales = transactions.totalAmount;
  const totalProducts = products.length;
  const recentTransactions = 1; // Since we're only fetching last transaction

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Sales Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <span className="text-green-500">↑</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rp{totalSales.toLocaleString("id-ID")}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <span className="text-blue-500">📦</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Transactions
            </CardTitle>
            <span className="text-yellow-500">🔄</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentTransactions}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Transaction</h2>
        <div className="border rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Transaction #{transactions.id}</p>
                <p className="text-sm text-gray-500">
                  {new Date(transactions.createdAt).toLocaleString("id-ID")}
                </p>
              </div>
              <p className="font-bold">
                Rp{transactions.totalAmount.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
          <div className="p-4">
            {transactions.details.map((item) => (
              <div
                key={item.id}
                className="flex justify-between py-2 border-b last:border-b-0"
              >
                <div>
                  <p>{item.product.productName}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} x Rp
                    {item.product.price.toLocaleString("id-ID")}
                  </p>
                </div>
                <p className="font-medium">
                  Rp{item.subtotal.toLocaleString("id-ID")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex space-x-4">
        <Link
          href="/dashboard/products"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Manage Products
        </Link>
        <Link
          href="/dashboard/transactions"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          View All Transactions
        </Link>
      </div>
    </div>
  );
}
