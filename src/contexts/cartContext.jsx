import React, { useState, createContext, useEffect } from "react";
import Cookies from "js-cookie";
import swal from "sweetalert";


const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const loadCart = async () => {
    const token = Cookies.get("user");

    if (token) {
      // Logged in → fetch from backend
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCartItems(data.items || []);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    } else {
      // Guest → load from localStorage
      const shoppingCart =
        JSON.parse(localStorage.getItem("shoppingCart")) || [];

      if (shoppingCart.length === 0) return;

      const fetchedItems = [];

      for (const courseName of shoppingCart) {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/courses/${courseName}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );

          if (!res.ok) {
            console.error(`Failed to fetch course: ${courseName}`);
            continue;
          }

          const data = await res.json();
          fetchedItems.push(data);
        } catch (error) {
          console.error(`Error fetching course ${courseName}:`, error);
        }
      }

      setCartItems(fetchedItems);
    }
  };
  useEffect(() => {
    loadCart();
  }, [cartItems.length]);

  // Add item to cart
  const addToCart = async (product) => {
    const token = Cookies.get("user");
    if (token) {
      // Logged in → fetch from backend
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/cart/add`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              productId: product._id,
              quantity: 1,
              price: product.price,
            }),
          }
        );
        if (res.ok) {
          setCartItems([...cartItems, product]);
          swal({
            title: "Added to cart!",
            icon: "success",
          });
        }
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    } else {
      // Guest → save to localStorage
      const storageCart =
        JSON.parse(localStorage.getItem("shoppingCart")) || [];
      if (storageCart.includes(product)) return;

      localStorage.setItem(
        "shoppingCart",
        JSON.stringify([...storageCart, product])
      );
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/courses/${product}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res.ok) {
          swal({
            title: "Failed to add course to cart!",
            icon: "error",
          });
          console.error(`Failed to fetch course: ${product}`);
          return;
        }
        const data = await res.json();
        setCartItems([...cartItems, data]);
      } catch (error) {
        console.error(`Error fetching course ${product}:`, error);
      }
    }
  };

  const removeFromCart = async (product) => {
    console.log("Removing product:", product);
    const token = Cookies.get("user");
    if (!token) {
      const storageCart =
        JSON.parse(localStorage.getItem("shoppingCart")) || [];
      const updatedCart = storageCart.filter(
        (item) => item !== product.shortName
      );
      localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
      setCartItems(cartItems.filter((item) => item._id !== product._id));
    } else {
      // Logged in → fetch from backend
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/cart/remove/${product._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("user")}`, // Make sure this is your JWT token
            },
          }
        );

        const data = await res.json();
        if (res.ok) {
          // Refresh cart
       
          setCartItems(cartItems.filter((item) => item.productId._id !== product._id));
         
          swal({
            title: "Item removed from cart!",
            icon: "success",
          });
              console.log("Item removed:", cartItems);
        } else {
          console.error("Failed to remove item:", data.message);
        }
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, loadCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
