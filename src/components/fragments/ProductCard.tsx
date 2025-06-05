// components/fragments/ProductCard.tsx
import Image from "next/image";
import { Button } from "../ui/button";
import config from "@/config";

interface ProductCardProps {
  id: number;
  productImage: string;
  productName: string;
  price: number;
}

export default function ProductCard({
  //   id,
  productImage,
  productName,
  price,
}: ProductCardProps) {
  return (
    <div className="border-2 border-primary-green rounded-2xl flex flex-col items-center w-full p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <Image
        src={config.publicAssetUrl + productImage}
        alt={productName}
        width={200}
        height={200}
        className="rounded-xl object-cover"
      />
      <div className="flex items-center justify-between w-full mt-4">
        <div className="flex flex-col items-start">
          <h1 className="text-base font-semibold">{productName}</h1>
          <h2 className="text-sm text-gray-500">Rp {price.toLocaleString()}</h2>
        </div>
        <Button
          variant="greenOutline"
          className="rounded-full h-12 w-12 text-xl px-0 py-0"
        >
          +
        </Button>
      </div>
    </div>
  );
}
