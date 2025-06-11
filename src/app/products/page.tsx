import ProductsList from "@/components/templates/ProductsList";
import { findProducts } from "@/services/products.service";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  try {
    const data = await findProducts();

    if (!data.length) {
      return (
        <h1 className="mt-20 text-center text-xl">Produk belum tersedia</h1>
      );
    }

    return (
      <div className="mt-20 mb-28">
        <ProductsList data={data} />
      </div>
    );
  } catch (error: unknown) {
    // Explicitly type the error as unknown
    let errorMessage = "Produk tidak ditemukan karena server error, bung.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return (
      <h1 className="mt-20 text-center text-xl text-red-600 font-bold ">
        Gagal Fetch data dengan error: <br />
        {errorMessage}
      </h1>
    );
  }
}
