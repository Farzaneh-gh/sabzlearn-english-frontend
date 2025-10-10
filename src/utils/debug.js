import Cookies from "js-cookie";
import { AUTH_COOKIE_KEY } from "./constants";

/**
 * Utility functions for debugging authentication and API calls
 */

export const debugAuth = () => {
  const token = Cookies.get(AUTH_COOKIE_KEY);

  console.log("🔐 Auth Debug Info:");
  console.log("Token exists:", !!token);
  console.log("Token length:", token ? token.length : 0);
  console.log(
    "Token preview:",
    token ? `${token.substring(0, 20)}...` : "No token"
  );

  return {
    hasToken: !!token,
    tokenLength: token ? token.length : 0,
    token: token,
  };
};

export const debugApiCall = (endpoint, config = {}) => {
  const token = Cookies.get(AUTH_COOKIE_KEY);

  console.log("🌐 API Call Debug:");
  console.log("Endpoint:", endpoint);
  console.log("Method:", config.method || "GET");
  console.log("Has Authorization Header:", !!token);
  console.log("Base URL:", import.meta.env.VITE_BACKEND_URL);
  console.log("Full URL:", `${import.meta.env.VITE_BACKEND_URL}/${endpoint}`);

  return {
    endpoint,
    method: config.method || "GET",
    hasAuth: !!token,
    fullUrl: `${import.meta.env.VITE_BACKEND_URL}/${endpoint}`,
  };
};
