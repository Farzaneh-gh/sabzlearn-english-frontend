import { useReducer, useCallback, useEffect } from "react";
import Cookies from "js-cookie";
import { getMe } from "../api/auth";
import { AUTH_COOKIE_KEY } from "../utils/constants";

const initialState = {
  userInfo: null,
  token: null,
  isLoggedIn: false,
  loading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.payload.userInfo,
        token: action.payload.token,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
        token: null,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export const useAuth = () => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = useCallback((userInfo, token) => {
    Cookies.set(AUTH_COOKIE_KEY, token, { path: "/", secure: true });
    dispatch({ type: "LOGIN", payload: { userInfo, token } });
  }, []);

  const logout = useCallback(() => {
    Cookies.remove(AUTH_COOKIE_KEY, { path: "/" });
    dispatch({ type: "LOGOUT" });
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const token = Cookies.get(AUTH_COOKIE_KEY);
      if (token) {
        try {
          const userInfo = await getMe();
          login(userInfo, token);
        } catch (error) {
          console.error("Failed to fetch user", error);
          logout(); // Token is invalid or expired
        }
      }
      dispatch({ type: "SET_LOADING", payload: false });
    };

    checkUser();
  }, [login, logout]);

  return { ...state, login, logout };
};
