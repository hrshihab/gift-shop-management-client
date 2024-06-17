import { TCartItem } from "../redux/feature/cart/cartSlice";

export const calculateTotalAmount = (cartItems: TCartItem[]) => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
};
