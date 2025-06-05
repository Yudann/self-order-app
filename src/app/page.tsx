import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-w-screen min-h-screen w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold">Welcome To Self Order App entahlah</h1>
      <div className="flex flex-col items-center justify-center gap-4 mt-5">
        <Link href="/food">
          <Button variant="purple">Food</Button>
        </Link>
        <Link href="/drink">
          <Button variant="purple">Drink</Button>
        </Link>
      </div>
    </div>
  );
}
