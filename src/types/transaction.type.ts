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

// types/transaction.type.ts

export interface TransactionDetailProduct {
  id: number;
  productImage: string;
  productName: string;
  productCategory: string;
  price: number;
  stock: number;
}

export interface TransactionDetailItem {
  id: number;
  product: TransactionDetailProduct;
  quantity: number;
  subtotal: number;
}

export interface TransactionCustomer {
  idCustomer: number;
  customerName: string;
  phoneNumber: string;
}

export interface TransactionDetailsApiResponse {
  id: number;
  customer: TransactionCustomer;
  totalAmount: number;
  createdAt: string;
  details: TransactionDetailItem[];
}

export type TransactionLastResponse = TransactionDetailsApiResponse;