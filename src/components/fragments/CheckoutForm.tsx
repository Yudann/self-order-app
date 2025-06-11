import { CheckoutFormData } from "@/types/checkout.type";

interface CheckoutFormProps {
  formData: CheckoutFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: {
    name?: string;
    phone?: string;
  };
}

export default function CheckoutForm({
  formData,
  onChange,
  errors = {},
}: CheckoutFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="customer_name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nama Lengkap
        </label>
        <input
          id="customer_name"
          name="customer_name"
          type="text"
          placeholder="Masukkan nama lengkap"
          value={formData.name}
          onChange={(e) =>
            onChange({
              ...e,
              target: {
                ...e.target,
                name: "name", // Map the field name back to your form state
              },
            })
          }
          className={`border p-3 w-full rounded-md focus:ring-2 focus:ring-black focus:border-transparent ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          required
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone_number"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nomor Handphone
        </label>
        <input
          id="phone_number"
          name="phone_number"
          type="tel"
          placeholder="Contoh: 081234567890"
          value={formData.phone}
          onChange={(e) =>
            onChange({
              ...e,
              target: {
                ...e.target,
                name: "phone", // Map the field name back to your form state
              },
            })
          }
          className={`border p-3 w-full rounded-md focus:ring-2 focus:ring-black focus:border-transparent ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
          required
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
        )}
      </div>
    </div>
  );
}
