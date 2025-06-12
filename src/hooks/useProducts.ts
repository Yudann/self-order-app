import { useState, useEffect } from 'react';
import { findProducts } from '@/services/products.service';
import { ProductsApiResponse } from '@/types/product.type';

export function useProducts() {
  const [products, setProducts] = useState<ProductsApiResponse[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductsApiResponse[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await findProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

// Di useProducts.ts
    const filterByCategory = (category: string | null) => {
    if (!category) {
        setFilteredProducts(products);
        setActiveCategory(null);
        return;
    }

    const filtered = products.filter((product) => {
        // Cek semua kemungkinan bentuk penulisan kategori
        const productCat = product.productCategory.toLowerCase();
        return (
        productCat === category.toLowerCase() ||
        productCat === category.toLowerCase() + 's' || // untuk plural
        productCat === category.toLowerCase().slice(0, -1) // untuk singular
        );
    });
    // Di dalam filterByCategory di useProducts.ts
console.log('Filtering by:', category);
console.log('Products:', products);
console.log('Filtered result:', filtered);
    
    setFilteredProducts(filtered);
    setActiveCategory(category);
    };
    

  const resetFilter = () => {
    setFilteredProducts(products);
    setActiveCategory(null);
  };
  

  return {
    products,
    filteredProducts,
    loading,
    error,
    filterByCategory,
    resetFilter,
    activeCategory,
  };
}