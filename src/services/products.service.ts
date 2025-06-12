import { findProductsApi} from "@/repositories/products.repository";
import { ProductsApiResponse } from "@/types/product.type";

export async function findProducts(): Promise<ProductsApiResponse[]> {
  const products = await findProductsApi();
  return products.map((product: ProductsApiResponse) => ({
    ...product,
  }));
}