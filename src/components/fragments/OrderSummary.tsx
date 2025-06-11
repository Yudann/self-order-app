import { CartItem } from "@/hooks/useCart";

interface OrderSummaryProps {
  items: CartItem[];
}

export default function OrderSummary({ items }: OrderSummaryProps) {
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-bold text-lg mb-3">Ringkasan Pesanan</h3>

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>
              {item.productName} × {item.quantity}
            </span>
            <span>Rp{(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div className="border-t mt-3 pt-3 flex justify-between font-bold">
        <span>Total</span>
        <span>Rp{totalPrice.toLocaleString()}</span>
      </div>
    </div>
  );
}
