import { Product } from "@/lib/products";

export interface CartItem {
  productId: number;
  product: Product;
  quantity: number;
}

type CartState = {
  items: Array<CartItem>;
};

export type CartAction =
  | {
      type: "add_product";
      payload: CartItem;
    }
  | {
      type: "remove_product";
      payload: {
        id: number;
      };
    }
  | {
      type: "update_product";
      payload: Omit<CartItem, "product">;
    }
  | {
      type: "clear";
    }
  | {
      type: "set_cart_items";
      payload: { items: Array<CartItem> };
    };

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case "add_product": {
      const { productId, quantity, product } = action.payload;
      const exists = state.items.find((item) => item.productId === productId);
      if (exists) {
        return {
          items: state.items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return {
        items: [...state.items, { productId, quantity, product }],
      };
    }
    case "remove_product": {
      const { id } = action.payload;
      return {
        items: state.items.filter((item) => item.productId !== id),
      };
    }
    case "update_product": {
      const { productId, quantity } = action.payload;
      return {
        items: state.items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        ),
      };
    }
    case "set_cart_items": {
      return {
        items: action.payload.items,
      };
    }
    case "clear": {
      return {
        items: [],
      };
    }
    default:
      return state;
  }
};
