import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full min-h-screen mx-auto h-full flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">Welcome To Self Order App entahlah</h1>
      <div className="flex items-center justify-center gap-4 mt-5">
        <Link href="/products">
          <Button
            variant="greenOutline"
            className="flex flex-col h-[200px] w-[150px] items-center gap-2 justify-center text-xl font-bold"
          >
            <Image
              src="/icons/dine-in.png"
              alt="Dine In"
              width={80}
              height={80}
            />
            Dine In
          </Button>
        </Link>
        <Link href="/products">
          <Button
            variant="greenOutline"
            className="flex flex-col h-[200px] w-[150px] items-center gap-2 justify-center text-xl font-bold"
          >
            <Image
              src="/icons/take-away.png"
              alt="Take Away"
              width={80}
              height={80}
            />
            Take Away
          </Button>
        </Link>
      </div>
    </div>
  );
}
