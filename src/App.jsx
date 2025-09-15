import React from "react";
import "./App.css";
import "virtual:svg-icons-register";
import routes from "./routes";
import { useRoutes } from "react-router-dom";
import AuthContext from "./contexts/authContext";
import { CartProvider } from "./contexts/cartContext";
import { useAuth } from "./hooks/useAuth";

function App() {
  const auth = useAuth();
  const routeElements = useRoutes(routes);

  return (
    <AuthContext.Provider value={auth}>
      <CartProvider>{routeElements}</CartProvider>
    </AuthContext.Provider>
  );
}

export default App;
