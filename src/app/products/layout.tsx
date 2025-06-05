// app/products/layout.tsx

import CartFooter from "@/components/templates/CartFooter";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <CartFooter />
    </>
  );
}
