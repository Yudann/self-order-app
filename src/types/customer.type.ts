// types/customer.type.ts
export interface CustomerApiResponse {
  idCustomer: number;  // matches Java entity
  customerName: string;
  phoneNumber: string;
}

export interface CreateCustomerPayload {
  customerName: string;
  phoneNumber: string;
}