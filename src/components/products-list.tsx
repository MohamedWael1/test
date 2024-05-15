import { Product } from "@/lib/products";
import { ProductCard } from "./product-card";

interface Props {
  products: Array<Product>;
}

export const ProductsList = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8">
      {products?.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};
