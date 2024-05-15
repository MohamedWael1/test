import Image from "next/image";
import Link from "next/link";
import { Product, formatPrice } from "@/lib/products";
import { useCart } from "./cart-provider";
import { Button } from "./button";
import { toast } from "react-toastify";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const { dispatch } = useCart();

  const handleAddCart: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch({
      type: "add_product",
      payload: { product, productId: product.id, quantity: 1 },
    });
    toast.success("Product added to cart");
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="max-w-sm mx-auto group flex flex-col items-center justify-center space-y-2 outline-red-500 border border-gray-200 rounded-md overflow-hidden transition-all hover:shadow-lg"
    >
      <Image
        src={product.mainImage}
        alt={product.title}
        width={277}
        height={346}
        className="rounded-sm bg-cover w-full aspect-square"
      />

      <div className="py-3 px-6 w-full flex items-center justify-between">
        <div>
          <p className="text-sm text-secondary-500 group-hover:text-primary-600 transition-all capitalize">
            {product.title}
          </p>

          <span className="text-sm text-primary-600 font-bold">
            {formatPrice(product.price)}
          </span>
        </div>

        <Button
          className="opacity-0 h-8 text-sm duration-300 translate-x-[100px] group-hover:opacity-100 group-focus:translate-x-0 group-focus:opacity-100 group-hover:translate-x-0 transition-all"
          onClick={handleAddCart}
          tabIndex={-1}
        >
          Buy
        </Button>
      </div>
    </Link>
  );
};
