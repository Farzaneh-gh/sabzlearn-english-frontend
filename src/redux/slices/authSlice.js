import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
  getMe,
  loginUser as loginUserAPI,
  registerUser as registerUserAPI,
} from "../../api/auth";
import { AUTH_COOKIE_KEY } from "../../utils/constants";

export const fetchUserInfo = createAsyncThunk(
  "auth/fetchUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMe();
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.status || error.statusCode,
      });
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUserAPI(userData);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.status || error.statusCode,
      });
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUserAPI(credentials);
      return response; //token
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.status || error.statusCode,
      });
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: null,
    isLoggedIn: false,
    loading: true, // Start with true to indicate we're checking auth status
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.isLoggedIn = false;
      state.loading = false;
      Cookies.remove(AUTH_COOKIE_KEY); // Use the constant
    },
    setUser: (state, action) => {
      state.userInfo = action.payload;
      state.isLoggedIn = !!action.payload;
      state.loading = false;
    },
    initializationComplete: (state) => {
      state.loading = false;
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
      state.error = action.payload?.message || action.error.message;
      state.isLoggedIn = false;
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
      // Keep loading as true - fetchUserInfo will be dispatched next
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || action.error.message;
      state.isLoggedIn = false;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      // If registration returns a token, set it
      if (action.payload.accessToken) {
        Cookies.set(AUTH_COOKIE_KEY, action.payload.accessToken, {
          path: "/",
          secure: true,
        });
        if (action.payload.user) {
          state.userInfo = action.payload.user;
          state.isLoggedIn = true;
        }
      }
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || action.error.message;
      state.isLoggedIn = false;
    });
  },
});

export const { logout, setUser, initializationComplete } = authSlice.actions;

export default authSlice.reducer;
