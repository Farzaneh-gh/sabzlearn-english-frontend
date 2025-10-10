import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import coursesReducer from "./slices/coursesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    courses: coursesReducer,
  },
});
export default store;
