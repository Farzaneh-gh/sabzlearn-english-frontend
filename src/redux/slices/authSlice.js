import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { getMe, loginUser as loginUserAPI } from "../../api/auth";
import { AUTH_COOKIE_KEY } from "../../utils/constants";

export const fetchUserInfo = createAsyncThunk(
  "auth/fetchUserInfo",
  async () => {
    const response = await getMe();
    return response;
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials) => {
    const response = await loginUserAPI(credentials);
    return response; //token
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: null,
    isLoggedIn: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.isLoggedIn = false;
      Cookies.remove(AUTH_COOKIE_KEY); // Use the constant
    },
    setUser: (state, action) => {
      state.userInfo = action.payload;
      state.isLoggedIn = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
      state.loading = false;
    });
    builder.addCase(fetchUserInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      Cookies.set(AUTH_COOKIE_KEY, action.payload.accessToken, {
        path: "/",
        secure: true,
      });
  
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.isLoggedIn = false;
    });
    
  },
});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;
