import Link from "next/link";

export default function Home() {
  return (
    <div className="min-w-screen min-h-screen w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold">Welcome To Self Order App entahlah</h1>
      <div className="flex flex-col items-center justify-center gap-4 mt-5">
        <Link
          href="/food"
          className="px-8 py-2 border border-gray-200 rounded-xl bg-orange-300 hover:bg-orange-400 transition cursor-pointer text-lg "
        >
          Food
        </Link>
        <Link
          href="/drink"
          className="px-8 py-2 border border-gray-200 rounded-xl bg-orange-300 hover:bg-orange-400 transition cursor-pointer text-lg "
        >
          Drink
        </Link>
      </div>
    </div>
  );
}
