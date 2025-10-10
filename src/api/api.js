import Cookies from "js-cookie";
import { AUTH_COOKIE_KEY } from "../utils/constants";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
// Default timeout for fetch requests (ms)
const DEFAULT_TIMEOUT = Number(import.meta.env.VITE_FETCH_TIMEOUT) || 8000;

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

  // Add timeout to fetch using Promise.race
  const controller = new AbortController();
  const id = setTimeout(
    () => controller.abort(),
    customConfig.timeout || DEFAULT_TIMEOUT
  );
  config.signal = controller.signal;

  let response;
  try {
    response = await fetch(`${BASE_URL}/${endpoint}`, config);
  } catch (err) {
    if (err.name === "AbortError") {
      const timeoutError = new Error("Request timed out");
      timeoutError.status = 408;
      throw timeoutError;
    }
    // Network error
    const netError = new Error(
      "Network error. Please check your connection or backend URL."
    );
    netError.status = 0;
    throw netError;
  } finally {
    clearTimeout(id);
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: "An API error occurred",
    }));

    // Create error object with status code and message
    const error = new Error(errorData.message || "An API error occurred");
    error.status = response.status;
    error.statusCode = response.status; // For backward compatibility

    // Add specific error details based on status code
    switch (response.status) {
      case 400:
        error.message =
          errorData.message || "Invalid request. Please check your input.";
        break;
      case 401:
        error.message =
          errorData.message ||
          "Invalid credentials. Please check your email/username and password.";
        break;
      case 403:
        error.message =
          errorData.message || "Access forbidden. Your account may be banned.";
        break;
      case 409:
        error.message =
          errorData.message || "This email or username is already registered.";
        break;
      case 500:
        error.message = "Server error. Please try again later.";
        break;
      default:
        error.message = errorData.message || "An unexpected error occurred.";
    }

    throw error;
  }

  return response.json();
};

export default apiClient;
