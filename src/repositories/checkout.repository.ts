import { createCustomer, findCustomers } from "@/services/customer.service";
import { CustomerApiResponse } from "@/types/customer.type";
export async function ensureCustomerExists(
  payload: { customerName: string; phoneNumber: string }
): Promise<CustomerApiResponse> {
  if (!payload.customerName?.trim() || !payload.phoneNumber?.trim()) {
    throw new Error('Nama dan nomor telepon pelanggan harus diisi');
  }

  try {
    const customers = await findCustomers();
    
    const existing = customers.find((c) => 
      c.customerName?.toLowerCase() === payload.customerName.toLowerCase() &&
      c.phoneNumber === payload.phoneNumber
    );

    if (existing) return existing;

    // Buat baru dulu
    await createCustomer({
      customerName: payload.customerName,
      phoneNumber: payload.phoneNumber
    });

    // Fetch ulang untuk ambil id-nya
    const updatedCustomers = await findCustomers();
    const created = updatedCustomers.find((c) => 
      c.customerName?.toLowerCase() === payload.customerName.toLowerCase() &&
      c.phoneNumber === payload.phoneNumber
    );

    if (!created) throw new Error('Gagal mengambil data customer setelah membuat');

    return created;

  } catch (error: unknown) {

    let errorMessage = "Terjadi kesalahan di checkout repo";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
    console.error('Error in ensureCustomerExists:', error);
    throw new Error(errorMessage || 'Gagal memproses data pelanggan');

  }
}
