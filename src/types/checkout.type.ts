export interface CheckoutFormData {
  name: string;
  phone: string;
}

export interface CheckoutState {
  loading: boolean;
  message: string;
  error: string | null;
}