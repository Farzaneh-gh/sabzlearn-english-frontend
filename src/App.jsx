/* eslint-disable no-unused-vars */
import React, { useEffect, useCallback } from "react";
import "./App.css";
import "virtual:svg-icons-register";
import routes from "./routes";
import { useRoutes, useNavigate } from "react-router-dom";
import AuthContext from "./contexts/authContext";
import Cookies from "js-cookie";
import { CartProvider } from "./contexts/cartContext";

function App() {
  const [userInfo, setUserInfo] = React.useState({});
  const [token, setToken] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  const login = useCallback((userData, token) => {
    Cookies.set("user", token, { path: "/", secure: true });
    setToken(token);
    setIsLoggedIn(true);
    setUserInfo(userData);
  }, []);

  const logout = () => {
    Cookies.remove("user", { path: "/" });
    setUserInfo({});
    setToken(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    setLoading(true);
    const getMe = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/auth/me`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("user")}`,
            },
          }
        );
        const data = await response.json();
        if (response.status === 200) {
          setIsLoggedIn(true);
          setUserInfo(data);
          setToken(Cookies.get("user"));
         
        }
      } catch (err) {
        navigate("/");
      }finally{
        setLoading(false);
      }
    };
    getMe();
  }, [navigate, login]);

  const routeElements = useRoutes(routes);

  return (
    <AuthContext.Provider
      value={{ userInfo, token, isLoggedIn, login, logout,loading }}
    >
      <CartProvider>
        {routeElements}
      </CartProvider>
    </AuthContext.Provider>
  );
}

export default App;
