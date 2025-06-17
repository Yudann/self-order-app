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

export interface Product {
  id: number;
  productImage: string;
  productName: string;
  productCategory: string;
  price: number;
  stock: number;
}

export interface ProductFormData {
  productImage: File | null;
  productName: string;
  productCategory: string;
  price: number;
  stock: number;
}