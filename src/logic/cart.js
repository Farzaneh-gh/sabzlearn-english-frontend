import {
  getCartApi,
  addToCartApi,
  removeFromCartApi,
  getGuestCartDetailsApi,
} from "../api/cart";
import { AUTH_COOKIE_KEY } from "../utils/constants";
import Cookies from "js-cookie";
import swal from "sweetalert";

export const cartActions = {
  SET_CART: "SET_CART",
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  SET_LOADING: "SET_LOADING",
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case cartActions.SET_CART:
      return { ...state, cartItems: action.payload };
    case cartActions.ADD_TO_CART:
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    case cartActions.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload
        ),
      };
    case cartActions.SET_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export const getCart = async (dispatch) => {
  dispatch({ type: cartActions.SET_LOADING, payload: true });
  const token = Cookies.get(AUTH_COOKIE_KEY);

  try {
    let items = [];
    if (token) {
      items = await getCartApi();
    } else {
      const guestCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
      if (guestCart.length > 0) {
        items = await getGuestCartDetailsApi(guestCart);
      }
    }
    dispatch({ type: cartActions.SET_CART, payload: items });
  } catch (error) {
    console.error("Failed to load cart:", error);
    dispatch({ type: cartActions.SET_CART, payload: [] }); // Clear cart on error
  } finally {
    dispatch({ type: cartActions.SET_LOADING, payload: false });
  }
};

export const addToCart = async (dispatch, product) => {
  const token = Cookies.get(AUTH_COOKIE_KEY);

  try {
    if (token) {
      const newCart = await addToCartApi(product);
      dispatch({ type: cartActions.SET_CART, payload: newCart.items });
    } else {
      const guestCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
      if (!guestCart.some((item) => item === product.shortName)) {
        const newGuestCart = [...guestCart, product.shortName];
        localStorage.setItem("shoppingCart", JSON.stringify(newGuestCart));
        // We add the full product object to the state for immediate UI update
        dispatch({ type: cartActions.ADD_TO_CART, payload: product });
      }
    }
    swal({
      title: "Added to cart!",
      icon: "success",
    });
  } catch (error) {
    console.error("Failed to add to cart:", error);
    swal({
      title: "Failed to add item to cart!",
      icon: "error",
    });
  }
};

export const removeFromCart = async (dispatch, product) => {
  const token = Cookies.get(AUTH_COOKIE_KEY);

  try {
    if (token) {
      await removeFromCartApi(product._id);
    } else {
      const guestCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
      const newGuestCart = guestCart.filter(
        (item) => item !== product.shortName
      );
      localStorage.setItem("shoppingCart", JSON.stringify(newGuestCart));
    }
    // Optimistically remove from UI
    dispatch({ type: cartActions.REMOVE_FROM_CART, payload: product._id });
    swal({
      title: "Item removed from cart!",
      icon: "success",
    });
  } catch (error) {
    console.error("Error removing course:", error);
    swal({
      title: "Failed to remove item from cart!",
      icon: "error",
    });
  }
};
