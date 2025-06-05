import ProductsList from "@/components/templates/ProductsList";
import { findProducts } from "@/services/products.service";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const data = await findProducts();
  return (
    <div className="mt-20">
      <ProductsList data={data} />
    </div>
  );
}
