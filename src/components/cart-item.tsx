import Image from "next/image";
import { Input } from "./input";
import Link from "next/link";
import { XIcon } from "lucide-react";
import { CartItem } from "./cart-provider.helpers";
import { formatPrice } from "@/lib/products";
import { useCart } from "./cart-provider";

interface Props extends CartItem {}

export const CartItemCard = ({ product, quantity }: Props) => {
  const { dispatch } = useCart();

  return (
    <div className="overflow-hidden flex flex-col md:flex-row items-center border border-gray-200 rounded-md w-full max-w-sm mx-auto md:mx-0 md:max-w-2xl relative gap-4">
      <button
        className="absolute top-2 right-3 text-sm bg-primary-500 text-white rounded-full h-4 w-4"
        onClick={() =>
          dispatch({ type: "remove_product", payload: { id: product.id } })
        }
      >
        <XIcon size={16} />
      </button>

      <Link href={`/products/${product.id}`} className="w-full md:w-auto">
        <Image
          src={product.mainImage}
          alt="product"
          width={300}
          height={300}
          className="w-full aspect-square md:max-w-[125px] object-cover"
        />
      </Link>

      <div className="p-4 flex flex-col md:flex-row grow justify-between">
        <div className="space-y-3 mb-4">
          <div>
            <Link
              href={`
            /products/${product.id}
          `}
              className="text-sm text-secondary-800 hover:text-primary-600 transition-all capitalize"
            >
              {product.title}
            </Link>
          </div>

          {product.description && (
            <p className="text-sm text-secondary-500 line-clamp-2 max-w-sm">
              {product.description}
            </p>
          )}
        </div>

        <div>
          <p className="text-sm text-primary-600 font-bold mb-2">
            {formatPrice(product.price)}
          </p>

          <div className="flex flex-row md:flex-col items-center md:items-start gap-2">
            <label htmlFor={`quantity-${product.id}`} className="text-sm">
              Qty:
            </label>
            <Input
              type="number"
              min={1}
              id={`quantity-${product.id}`}
              value={quantity}
              className="h-8 max-w-[100px]"
              onChange={(e) =>
                dispatch({
                  type: "update_product",
                  payload: {
                    productId: product.id,
                    quantity: e.target.value ? parseInt(e.target.value) : 1,
                  },
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
