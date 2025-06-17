import { findProducts } from "@/services/products.service";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import config from "@/config";

export default async function ProductsPage() {
  const products = await findProducts();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen  p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-gray-800">Kelola Produk</h1>
          <p className="text-gray-500">Manajemen menu dan stok produk cafe</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari produk..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
          <Link href="/dashboard/products/new">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
              <FiPlus size={18} />
              <span>Tambah Produk</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[100px] text-gray-600 font-semibold">
                Gambar
              </TableHead>
              <TableHead className="text-gray-600 font-semibold">
                Nama Produk
              </TableHead>
              <TableHead className="text-gray-600 font-semibold">
                Kategori
              </TableHead>
              <TableHead className="text-right text-gray-600 font-semibold">
                Harga
              </TableHead>
              <TableHead className="text-right text-gray-600 font-semibold">
                Stok
              </TableHead>
              <TableHead className="text-right text-gray-600 font-semibold">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                className="hover:bg-gray-50/50 border-t border-gray-100"
              >
                <TableCell>
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                    {product.productImage && (
                      <Image
                        src={config.publicAssetUrl + product.productImage}
                        alt={product.productName}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium text-gray-800">
                  {product.productName}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {product.productCategory}
                  </span>
                </TableCell>
                <TableCell className="text-right font-medium text-gray-800">
                  {formatCurrency(product.price)}
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      product.stock > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.stock} pcs
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/dashboard/products/${product.id}`}>
                      <Button variant="outline" size="sm" className="gap-1">
                        <FiEdit2 size={14} />
                        <span>Edit</span>
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 text-red-600 hover:text-red-700 border-red-100 hover:bg-red-50"
                    >
                      <FiTrash2 size={14} />
                      <span>Hapus</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          Menampilkan 1-{products.length} dari {products.length} produk
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
