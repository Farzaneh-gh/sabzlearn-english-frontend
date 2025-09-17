import Cookies from "js-cookie";
import { AUTH_COOKIE_KEY } from "../utils/constants";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const getAuthToken = () => Cookies.get(AUTH_COOKIE_KEY);

const apiClient = async (endpoint, { body, ...customConfig } = {}) => {
 
  const token = getAuthToken();
  const headers = { "Content-Type": "application/json" };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method: customConfig.method || (body ? "POST" : "GET"),
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}/${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: "An API error occurred",
    }));
    throw new Error(errorData.message || "An API error occurred");
  }

  return response.json();
};

export default apiClient;
