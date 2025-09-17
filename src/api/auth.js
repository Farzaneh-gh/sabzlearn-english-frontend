import Cookies from "js-cookie";
import { AUTH_COOKIE_KEY } from "../utils/constants";
import apiClient from "./api";

export const getMe = () => {
  return apiClient("auth/me");
};

export const registerUser = (userData) => {
  return apiClient("auth/register", { body: userData });
};

export const loginUser = (credentials) => {
  return apiClient("auth/login", { body: credentials });
};

