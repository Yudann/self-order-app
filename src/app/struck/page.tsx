import { getLastTransaction } from "@/services/transaction.service";
import Link from "next/link";

export default async function StruckPage() {
  const data = await getLastTransaction();

  return (
    <div className="min-h-screen bg-primary-cream flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-xs bg-white rounded-lg shadow-md overflow-hidden">
        {/* Receipt Header */}
        <div className="bg-primary-green p-4 text-center text-white">
          <h1 className="text-2xl font-bold mb-1">COFFEE SHOP</h1>
          <p className="text-xs opacity-90">Jl. Rahasia No. 88, Indonesia</p>
          <p className="text-xs mt-2 opacity-80">
            {new Date(data.createdAt).toLocaleString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        {/* Receipt Body */}
        <div className="p-4 font-mono">
          {/* Order Items */}
          <div className="border-t border-b border-gray-200 py-3 space-y-3">
            {data.details.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <div className="flex-1">
                  <p className="font-medium">
                    {item.product.productName}
                    <span className="text-gray-500 ml-1">x{item.quantity}</span>
                  </p>
                  <p className="text-xs text-gray-500 italic">
                    {item.product.productCategory}
                  </p>
                </div>
                <p className="font-medium">
                  Rp{item.subtotal.toLocaleString("id-ID")}
                </p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between font-bold text-base mt-4 pt-2 border-t-2 border-dashed border-gray-300">
            <p>TOTAL</p>
            <p>Rp{data.totalAmount.toLocaleString("id-ID")}</p>
          </div>

          {/* Footer Messages */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              Terima kasih atas kunjungannya!
            </p>
            <p className="text-xs text-gray-500">Semoga harimu menyenangkan</p>
          </div>

          <div className="mt-4 p-2 bg-gray-100 rounded text-center">
            <p className="text-xs font-medium text-gray-700">
              WiFi Password: tanyakekasir
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Link
        href="/"
        className="mt-8 w-full max-w-xs py-3 px-6 bg-primary-green hover:bg-primary-green text-white font-medium rounded-lg shadow text-center transition-colors duration-200"
      >
        Pesanan Selesai
      </Link>
    </div>
  );
}
