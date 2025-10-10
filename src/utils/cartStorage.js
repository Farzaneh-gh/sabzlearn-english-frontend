import {CART_STORAGE_KEY} from './constants';
// Utility functions to manage cart for guest users using localStorage


export const getGuestCart = () => {
  const cart = localStorage.getItem(CART_STORAGE_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const addToGuestCart = (product) => {
  const cart = getGuestCart();
  const exists = cart.find((item) => item._id === product._id);
  if (exists) return cart; // Avoid duplicates  
  cart.push(product);
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  return cart;
};
export const removeFromGuestCart = (productId) => {
  let cart = getGuestCart();
  cart = cart.filter((item) => item._id !== productId);
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  return cart;
};
export const clearGuestCart = () => {
  localStorage.removeItem(CART_STORAGE_KEY);
};



