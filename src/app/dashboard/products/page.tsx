import { findProducts } from "@/services/products.service";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import config from "@/config";

export default async function ProductsPage() {
  const products = await findProducts();

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <Link href="/dashboard/products/new">
          <Button>Add New Product</Button>
        </Link>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  {product.productImage && (
                    <Image
                      src={config.publicAssetUrl + product.productImage}
                      alt={product.productName}
                      width={50}
                      height={50}
                      className="rounded"
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  {product.productName}
                </TableCell>
                <TableCell>{product.productCategory}</TableCell>
                <TableCell>Rp{product.price.toLocaleString("id-ID")}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link href={`/dashboard/products/${product.id}`}>
                      <Button variant="greenOutline" size="sm">
                        Edit
                      </Button>
                    </Link>
                    <Button variant="green" size="sm">
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
