import axiosInstance from '@/lib/axios.lib';
import { ApiResponse } from '@/types/api.type';
import { ProductsApiResponse } from '@/types/product.type';

export async function findProductsApi(): Promise<ProductsApiResponse[]> {
  try {
    const res = await axiosInstance.selfOrderService.get<ApiResponse<ProductsApiResponse[]>>('/products');
    return res.data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
}