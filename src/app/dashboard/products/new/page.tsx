"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FiUpload, FiSave, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { ProductFormData } from "@/types/product.type";
import MessageBox from "@/components/fragments/MessageBox";
import { createProduct } from "@/repositories/products.repository";

export default function CreateProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductFormData>({
    productImage: null,
    productName: "",
    productCategory: "",
    price: 0,
    stock: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error" | "info" | "warning";
    text: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "stock" ? parseInt(value) || 0 : value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        productImage: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // Validasi form
      if (!formData.productName.trim()) {
        setMessage({ type: "error", text: "Nama produk wajib diisi" });
        return;
      }

      if (formData.price <= 0) {
        setMessage({ type: "error", text: "Harga harus lebih dari 0" });
        return;
      }

      if (formData.stock < 0) {
        setMessage({ type: "error", text: "Stok tidak boleh negatif" });
        return;
      }

      // Create FormData for file upload
      const payload = new FormData();
      payload.append("productName", formData.productName);
      payload.append("productCategory", formData.productCategory);
      payload.append("price", formData.price.toString());
      payload.append("stock", formData.stock.toString());
      if (formData.productImage) {
        payload.append("productImage", formData.productImage);
      }

      await createProduct(payload);

      setMessage({
        type: "success",
        text: "Produk berhasil ditambahkan!",
      });

      // Reset form after success
      setFormData({
        productImage: null,
        productName: "",
        productCategory: "",
        price: 0,
        stock: 0,
      });

      // Redirect to products page after 2 seconds
      setTimeout(() => {
        router.push("/dashboard/products");
      }, 2000);
    } catch (error) {
      console.error("Error creating product:", error);
      setMessage({
        type: "error",
        text: "Gagal menambahkan produk. Silakan coba lagi.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Tambah Produk Baru
          </h1>
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard/products")}
            className="flex items-center gap-2"
          >
            <FiX />
            <span>Batal</span>
          </Button>
        </div>

        {message && <MessageBox message={message.text} type={message.type} />}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gambar Produk
            </label>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="file"
                  id="productImage"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="productImage"
                  className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center gap-2"
                >
                  <FiUpload />
                  <span>Pilih Gambar</span>
                </label>
              </div>
              {formData.productImage && (
                <span className="text-sm text-gray-500">
                  {formData.productImage instanceof File
                    ? formData.productImage.name
                    : "Gambar dipilih"}
                </span>
              )}
            </div>
          </div>

          {/* Product Name */}
          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nama Produk
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Contoh: Cookies Coklat"
              required
            />
          </div>

          {/* Product Category */}
          <div>
            <label
              htmlFor="productCategory"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Kategori
            </label>
            <select
              id="productCategory"
              name="productCategory"
              value={formData.productCategory}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Pilih Kategori</option>
              <option value="food">Makanan</option>
              <option value="drink">Minuman</option>
              <option value="snack">Snack</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Harga (Rp)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Contoh: 30000"
              required
            />
          </div>

          {/* Stock */}
          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Stok
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Contoh: 100"
              required
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full flex justify-center items-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin">↻</span>
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <FiSave />
                  <span>Simpan Produk</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
