import axiosInstance from '@/lib/axios.lib';
import { ApiResponse } from '@/types/api.type';
import {
  CreateTransactionPayload,
  TransactionApiResponse,
  TransactionDetailsApiResponse 
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

// transaction.repository.ts
export async function getTransactionsApi(
): Promise<TransactionDetailsApiResponse> {
  try {
    const res = await axiosInstance.selfOrderService.get<ApiResponse<TransactionDetailsApiResponse>>(
      `/transactions`
    );
    return res.data.data;
  } catch (error) {
    console.error('Error fetching transaction detail:', error);
    throw new Error('Failed to fetch transaction detail');
  }
}

export async function getLastTransactionApi(): Promise<TransactionDetailsApiResponse> {
  try {
    const res = await axiosInstance.selfOrderService.get<ApiResponse<TransactionDetailsApiResponse>>(
      `/transactions/last`
    );
    return res.data.data;
  } catch (error) {
    console.error('Error fetching last transaction:', error);
    throw new Error('Failed to fetch last transaction');
  }
}
