import Cookies from "js-cookie";
import { AUTH_COOKIE_KEY } from "../utils/constants";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const getAuthHeaders = () => {
  const token = Cookies.get(AUTH_COOKIE_KEY);
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const getCartApi = async () => {
  const response = await fetch(`${BASE_URL}/cart`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch cart");
  const data = await response.json();
  console.log("Cart data from API:", data);
  return data.items || [];
};

export const addToCartApi = async (product) => {
  const response = await fetch(`${BASE_URL}/cart/add`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      productId: product._id,
      quantity: 1,
      price: product.price,
    }),
  });
  if (!response.ok) throw new Error("Failed to add to cart");
  return response.json();
};

export const removeFromCartApi = async (productId) => {
  console.log("Removing from cart:", productId);
  const response = await fetch(`${BASE_URL}/cart/remove/${productId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to remove from cart");
  return response.json();
};

export const getGuestCartDetailsApi = async (courseNames) => {
  console.log("Fetching guest cart details for:", courseNames);
  const itemPromises = courseNames.map((name) =>
    fetch(`${BASE_URL}/courses/${name}`).then((res) => {
      if (res.ok) return res.json();
      console.error(`Failed to fetch course: ${name}`);
      return null; // Return null for failed fetches
    })
  );
  const items = await Promise.all(itemPromises);
  return items.filter(Boolean); // Filter out any nulls from failed fetches
};
