import Cookies from "js-cookie";
import { AUTH_COOKIE_KEY } from "../utils/constants";

export const getMe = async () => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get(AUTH_COOKIE_KEY)}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  return response.json();
};
