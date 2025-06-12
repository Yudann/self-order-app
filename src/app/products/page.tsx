"use client";

import FilterCategory from "@/components/fragments/FilterCategory";
import SearchInput from "@/components/fragments/SearchInput";
import ProductsList from "@/components/templates/ProductsList";
import { useDebounce } from "@/hooks/useDebounce";
import { useProducts } from "@/hooks/useProducts";
import { useState } from "react";

export default function ProductsPage() {
  const {
    filteredProducts: categoryFilteredProducts,
    loading,
    error,
    filterByCategory,
    resetFilter,
    activeCategory,
    products,
  } = useProducts();

  const [searchKeyword, setSearchKeyword] = useState("");

  const debouncedSearch = useDebounce(searchKeyword, 300); // <- pake debounce 300ms

  // FINAL FILTERING: berdasarkan kategori + pencarian (debounced)
  const finalFilteredProducts = categoryFilteredProducts.filter((product) =>
    product.productName.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-10">Memuat produk...</div>;
  }

  if (error) {
    return (
      <div className="mt-20 text-center">
        <h1 className="text-xl text-red-600 font-bold">Gagal memuat produk</h1>
        <p className="text-gray-600 mt-2">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-primary-green underline"
        >
          Coba lagi
        </button>
      </div>
    );
  }

  return (
    <div className="mt-20 mb-28">
      <SearchInput onSearchChange={setSearchKeyword} />

      <FilterCategory
        onSelectCategory={filterByCategory}
        activeCategory={activeCategory}
        products={products}
      />

      {/* Tampilkan info filter */}
      {activeCategory && (
        <div className="px-4 mt-2 mb-4 flex justify-between items-center bg-primary-green/10 p-3 rounded-lg">
          <span className="text-primary-green font-medium">
            Menampilkan kategori: {activeCategory} (
            {finalFilteredProducts.length} produk)
          </span>
          <button
            onClick={resetFilter}
            className="text-primary-green underline font-semibold"
          >
            × Hapus filter
          </button>
        </div>
      )}

      {/* Tampilkan produk */}
      {finalFilteredProducts.length > 0 ? (
        <ProductsList data={finalFilteredProducts} />
      ) : (
        <div className="text-center py-10">
          <h1 className="text-xl">
            {activeCategory
              ? `Tidak ada produk dalam kategori "${activeCategory}"`
              : "Tidak ada produk tersedia"}
          </h1>
          {activeCategory && (
            <button
              onClick={resetFilter}
              className="mt-4 text-primary-green underline"
            >
              Tampilkan semua produk
            </button>
          )}
        </div>
      )}
    </div>
  );
}
