import { getLastTransaction } from "@/services/transaction.service";
import Link from "next/link";
import { FiPrinter, FiHome, FiCoffee } from "react-icons/fi";

export default async function StruckPage() {
  const data = await getLastTransaction();

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
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div
          className="p-5 text-center text-white"
          style={{
            background: "oklch(0.374 0.155 149.7)",
            backgroundImage:
              "linear-gradient(to right, oklch(0.374 0.155 149.7), oklch(0.45 0.155 149.7)",
          }}
        >
          <div className="flex justify-center mb-2">
            <FiCoffee className="text-3xl text-white/90" />
          </div>
          <h1 className="text-2xl font-bold mb-1">Self Order App</h1>
          <p className="text-sm opacity-90">
            Jl. Java Springboot No. 88, Jakarta
          </p>
          <p className="text-xs mt-3 opacity-90">
            {formatDate(data.createdAt)}
          </p>
          <p className="text-xs mt-1 font-mono tracking-tight">
            ID: #{data.id}
          </p>
        </div>

        {/* Customer Info */}
        <div className="p-4 border-b border-gray-100 bg-green-50">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Pelanggan:</span>
            <span className="font-medium text-green-800">
              {data.customer.customerName}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-600">No. HP:</span>
            <span className="font-medium text-green-800">
              {data.customer.phoneNumber}
            </span>
          </div>
        </div>

        {/* Order Items */}
        <div className="divide-y divide-gray-100">
          {data.details.map((item) => (
            <div
              key={item.id}
              className="p-4 flex justify-between hover:bg-green-50/50 transition-colors"
            >
              <div className="flex-1">
                <p className="font-medium flex items-center gap-2">
                  {item.product.productName}
                  <span className="text-xs text-green-800 bg-green-100 px-2 py-0.5 rounded-full">
                    x{item.quantity}
                  </span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {item.product.productCategory}
                </p>
              </div>
              <p className="font-medium text-green-700 text-right">
                {formatCurrency(item.subtotal)}
              </p>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="p-4 bg-green-50 border-t-2 border-dashed border-green-200">
          <div className="flex justify-between font-bold text-lg text-green-900">
            <span>TOTAL</span>
            <span>{formatCurrency(data.totalAmount)}</span>
          </div>
        </div>

        {/* Footer Messages */}
        <div className="p-4 text-center space-y-3 bg-white">
          <div className="text-sm text-gray-600">
            <p>Terima kasih telah berkunjung!</p>
            <p className="mt-1 text-green-700">Semoga harimu menyenangkan ☕</p>
          </div>

          <div className="p-3 bg-green-100 rounded-lg border border-green-200">
            <p className="text-xs font-medium text-green-800">
              WiFi: <span className="font-bold">Selforderapp</span> | Password:
              tanyakekasir
            </p>
          </div>

          <p className="text-xs text-gray-400 mt-2">
            * Simpan struk ini sebagai bukti pembayaran
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 w-full max-w-md flex flex-col sm:flex-row gap-3">
        <button
          className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-white border border-green-300 text-green-800 font-medium rounded-lg shadow-sm hover:bg-green-50 transition-colors"
          style={{ borderColor: "oklch(0.374 0.155 149.7)" }}
        >
          <FiPrinter />
          <span>Cetak Struk</span>
        </button>
        <Link
          href="/"
          className="flex-1 flex items-center hover:bg-primary-green/80 justify-center gap-2 py-3 px-6 text-white font-medium rounded-lg shadow-sm transition-colors"
          style={{
            backgroundColor: "oklch(0.374 0.155 149.7)",
            backgroundImage:
              "linear-gradient(to right, oklch(0.374 0.155 149.7), oklch(0.45 0.155 149.7)",
          }}
        >
          <FiHome />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    </div>
  );
}
