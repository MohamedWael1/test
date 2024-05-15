import { Button } from "@/components/button";
import { useCart } from "@/components/cart-provider";
import { CartItemCard } from "@/components/cart-item";
import { formatPrice } from "@/lib/products";
import Head from "next/head";
import { DeleteIcon } from "lucide-react";

const Cart = () => {
  const { dispatch, items, totalPrice, totalCount } = useCart();

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>

      <div className="container py-14">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-medium">Cart</h1>
            <div className="text-lg">Total: {formatPrice(totalPrice)}</div>
            <div className="text-lg">Quantity: {totalCount}</div>
          </div>

          {totalCount > 0 && <Button>Checkout</Button>}
        </div>

        {items.length === 0 && (
          <div className="flex items-center justify-center h-96">
            <p className="text-lg">Your cart is empty</p>
          </div>
        )}

        {items.length > 0 && (
          <>
            <div className="mb-8">
              <Button
                variant="text"
                onClick={() => dispatch({ type: "clear" })}
              >
                <span>Clear All</span>
                <DeleteIcon />
              </Button>
            </div>
            <div className="space-y-8">
              {items.map((item) => (
                <CartItemCard key={item.productId} {...item} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
