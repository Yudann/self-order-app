export interface ProductsApiResponse {
  id: number;
  productImage: string;
  productName: string;
  productCategory: string;
  price: number;
  stock: number;
}

export interface ProductDetail extends ProductsApiResponse {
  description?: string;
}
