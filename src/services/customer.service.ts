'use server';

import { createCustomerApi, findCustomersApi } from '@/repositories/customer.repository';
import { CreateCustomerPayload, CustomerApiResponse } from '@/types/customer.type';

export async function findCustomers(): Promise<CustomerApiResponse[]> {
  const customers = await findCustomersApi();
  return customers.map((customer: CustomerApiResponse) => ({
    ...customer,
  }));
}

export async function createCustomer(payload: CreateCustomerPayload): Promise<CustomerApiResponse> {
  return await createCustomerApi(payload);
}