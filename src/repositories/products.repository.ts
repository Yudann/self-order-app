import axiosInstance from '@/lib/axios.lib';
import { ApiResponse } from '@/types/api.type';
import { Product, ProductsApiResponse } from '@/types/product.type';

export async function findProductsApi(): Promise<ProductsApiResponse[]> {
  try {
    const res = await axiosInstance.selfOrderService.get<ApiResponse<ProductsApiResponse[]>>('/products');
    return res.data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
}


export async function createProduct(formData: FormData): Promise<Product> {
  try {
    const res = await axiosInstance.selfOrderService.post<ApiResponse<Product>>(
      '/products',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return res.data.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product');
  }
}