import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
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
