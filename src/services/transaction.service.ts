import { createTransactionApi } from '@/repositories/transaction.repository';
import { CreateTransactionPayload, TransactionApiResponse } from '@/types/transaction.type';

export async function createTransaction(payload: CreateTransactionPayload): Promise<TransactionApiResponse> {
  return await createTransactionApi(payload);
}
