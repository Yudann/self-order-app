import Link from "next/link";
import { Button } from "@/components/ui/button";
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Transaction History</h1>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>#{transaction.id}</TableCell>
                <TableCell>{transaction.customer.customerName}</TableCell>
                <TableCell>
                  {new Date(transaction.createdAt).toLocaleDateString("id-ID")}
                </TableCell>
                <TableCell>
                  Rp{transaction.totalAmount.toLocaleString("id-ID")}
                </TableCell>
                <TableCell>
                  <Link href={`/dashboard/transactions/${transaction.id}`}>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
