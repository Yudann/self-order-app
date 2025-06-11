// components/templates/ProductsList.tsx
import ProductCard from "../fragments/ProductCard";
import { ProductsApiResponse } from "@/types/product.type";

interface ProductsListProps {
  data: ProductsApiResponse[];
}

export default function ProductsList({ data }: ProductsListProps) {
  return (
    <div className="grid grid-cols-2  lg:grid-cols-3 gap-6 p-4">
      {data.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          productImage={product.productImage}
          productName={product.productName}
          price={product.price}
        />
      ))}
    </div>
  );
}
