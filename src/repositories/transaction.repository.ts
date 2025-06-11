import axiosInstance from '@/lib/axios.lib';
import { ApiResponse } from '@/types/api.type';
import {
  CreateTransactionPayload,
  TransactionApiResponse,
} from '@/types/transaction.type';

export async function createTransactionApi(
  payload: CreateTransactionPayload
): Promise<TransactionApiResponse> {
  const res = await axiosInstance.selfOrderService.post<ApiResponse<TransactionApiResponse>>(
    '/transactions/checkout',
    payload
  );
  return res.data.data;
}
