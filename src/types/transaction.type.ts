export interface CreateTransactionItem {
  product_id: number;
  quantity: number;
  price: number;
}

export interface CreateTransactionPayload {
  customerId: number;
  items: { productId: number; quantity: number }[];
}


export interface TransactionApiResponse {
  id: number;
  customer_id: number;
  total_amount: number;
  created_at: string;
}

// types/transaction.ts
export interface CheckoutItem {
  product_id: number;
  quantity: number;
  price: number;
}

export interface CheckoutPayload {
  customer_id: number;
  items: CheckoutItem[];
}
