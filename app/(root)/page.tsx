import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default async function HomePage() {
  const latestProducts = await getLatestProducts();
  // await new Promise((resolve) => setTimeout(resolve, 1200));

  return (
    <div>
      <ProductList data={latestProducts} title="Products" limit={4} />
    </div>
  );
}
