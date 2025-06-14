import { getLastTransactionApi, getTransactionsApi} from "@/repositories/transaction.repository";
import { TransactionDetailsApiResponse } from "@/types/transaction.type";
import { createTransactionApi } from '@/repositories/transaction.repository';
import { CreateTransactionPayload, TransactionApiResponse } from '@/types/transaction.type';

export async function createTransaction(payload: CreateTransactionPayload): Promise<TransactionApiResponse> {
  return await createTransactionApi(payload);
}

export async function getAllTransactions(
): Promise<TransactionDetailsApiResponse> {
  const transaction = await getTransactionsApi();
  return transaction
}

export async function getLastTransaction(): Promise<TransactionDetailsApiResponse> {
  const lastTransaction = await getLastTransactionApi();
  return lastTransaction;
}
