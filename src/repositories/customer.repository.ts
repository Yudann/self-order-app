import axiosInstance from '@/lib/axios.lib';
import { ApiResponse } from '@/types/api.type';
import { CreateCustomerPayload, CustomerApiResponse } from '@/types/customer.type';

export async function findCustomersApi(): Promise<CustomerApiResponse[]> {
  const res =
    await axiosInstance.selfOrderService.get<ApiResponse<CustomerApiResponse[]>>(
      '/customers'
    );
  return res.data.data;
}

export async function createCustomerApi(payload: CreateCustomerPayload): Promise<CustomerApiResponse> {
  const res = await axiosInstance.selfOrderService.post<ApiResponse<CustomerApiResponse>>(
    '/customers',
    payload
  );
  return res.data.data;
}