import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
  useContext,
} from "react";
import AuthContext from "./authContext";
import {
  cartReducer,
  initialState,
  getCart,
  addToCart,
  removeFromCart,
} from "../hooks/useCart";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { token } = useContext(AuthContext);

  // Load cart on auth token change
  useEffect(() => {
    getCart(dispatch);
  }, [token]);

  // Stable callbacks
  const add = useCallback((product) => addToCart(dispatch, product), []);
  const remove = useCallback(
    (product) => removeFromCart(dispatch, product),
    []
  );

  return (
    <CartContext.Provider
      value={{ ...state, addToCart: add, removeFromCart: remove }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;