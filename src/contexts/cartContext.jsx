import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
  useContext,
} from "react";
import {
  cartReducer,
  getCart,
  addToCart as addToCartLogic,
  removeFromCart as removeFromCartLogic,
} from "../logic/cart";
import AuthContext from "./authContext";

const CartContext = createContext();

const initialState = {
  cartItems: [],
  isLoading: true,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    getCart(dispatch);
  }, [token]); // Reload cart when auth state changes

  const addToCart = useCallback((product) => {
    addToCartLogic(dispatch, product);
  }, []);

  const removeFromCart = useCallback((product) => {
    removeFromCartLogic(dispatch, product);
  }, []);

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
