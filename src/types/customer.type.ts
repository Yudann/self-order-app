export interface CustomerApiResponse {
  id_customer: number;
  phone_number: string;
  customer_name: string;
}

export interface CreateCustomerPayload extends CustomerApiResponse {
    createdAt?: string
}