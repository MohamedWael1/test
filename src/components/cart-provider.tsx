import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { CartAction, CartItem } from "./cart-provider.helpers";
import { cartReducer } from "./cart-provider.helpers";

interface CartContextProps {
  items: Array<CartItem>;
  dispatch: React.Dispatch<CartAction>;
  totalPrice: number;
  totalCount: number;
}

const CartContext = createContext<CartContextProps | undefined>({
  dispatch: () => null,
  items: [],
  totalPrice: 0,
  totalCount: 0,
});

const CART_KEY = "cart";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [loaded, setLoaded] = useState(false);
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    if (loaded) {
      window.localStorage.setItem(CART_KEY, JSON.stringify(state.items));
    }
  }, [state.items, loaded]);

  useEffect(() => {
    const cart = window.localStorage.getItem(CART_KEY);
    if (cart) {
      dispatch({
        type: "set_cart_items",
        payload: { items: JSON.parse(cart) },
      });
    }
    setLoaded(true);
  }, []);

  const totalCount = state.items.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  const totalPrice = state.items.reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    0
  );

  const values = useMemo(
    () => ({
      items: state.items,
      dispatch,
      totalCount,
      totalPrice,
    }),
    [state.items, totalCount, totalPrice]
  );

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
