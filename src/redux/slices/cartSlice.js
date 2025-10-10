import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from "./authSlice"; // Import logout action
import {
  getCartApi,
  addToCartApi,
  removeFromCartApi,
  getGuestCartDetailsApi,
} from "../../api/cart";

import { addToGuestCart as addToGuestCartStorage, removeFromGuestCart as removeFromGuestCartStorage, getGuestCart, clearGuestCart as clearGuestCartStorage  } from "../../utils/cartStorage";

const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await getCartApi();
  return response;
});

const fetchAddToCart = createAsyncThunk(
  "cart/fetchAddToCart",
  async (product) => {
    const response = await addToCartApi(product);
    return response.items;
  }
);

const fetchRemoveFromCart = createAsyncThunk(
  "cart/fetchRemoveFromCart",
  async (productId, { dispatch }) => {
    await removeFromCartApi(productId);
    // After removing, fetch the updated cart
    dispatch(fetchCart());
    return productId; // Return the removed product ID
  }
);

const fetchGuestCartDetails = createAsyncThunk(
  "cart/fetchGuestCartDetails",
  async (courseNames) => {
    const response = await getGuestCartDetailsApi(courseNames);
    return response.data;
  }
);
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCart(state, action) {
      state.cartItems = action.payload;
    },
    addToCart(state, action) {
      state.cartItems.push(action.payload);
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
    },
    clearCart(state) {
      state.cartItems = [];
      state.error = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    loadGuestCart(state) {
      const guestCart = getGuestCart();
      state.cartItems = guestCart;
    },
    clearGuestCart(state) {
      clearGuestCartStorage();
      state.cartItems = [];
    },
    addToGuestCart(state, action) {
      addToGuestCartStorage(action.payload);
      state.cartItems.push(action.payload);
    },
    removeFromGuestCart(state, action) {
      removeFromGuestCartStorage(action.payload);
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure we always have an array
        state.cartItems = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(fetchAddToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAddToCart.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure cartItems is an array before pushing
        if (!Array.isArray(state.cartItems)) {
          state.cartItems = [];
        }
        state.cartItems = action.payload;
      })
      .addCase(fetchAddToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(fetchRemoveFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRemoveFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(fetchRemoveFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(fetchGuestCartDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGuestCartDetails.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure we always have an array
        state.cartItems = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchGuestCartDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Clear cart when user logs out
      .addCase(logout, (state) => {
        state.cartItems = [];
        state.error = null;
        state.loading = false;
      });
  },
});
export default cartSlice.reducer;
export const { setCart, addToCart, removeFromCart, clearCart, setLoading, loadGuestCart, clearGuestCart, addToGuestCart, removeFromGuestCart } =
  cartSlice.actions;
export {
  fetchCart,
  fetchAddToCart,
  fetchRemoveFromCart,
  fetchGuestCartDetails,
};
