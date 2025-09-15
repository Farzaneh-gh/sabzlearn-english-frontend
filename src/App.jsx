import React from "react";
import "virtual:svg-icons-register";
import routes from "./routes";
import { useRoutes } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import { CartProvider } from "./contexts/cartContext";
import ErrorBoundary from "./components/common/ErrorFallBack/ErrorBoundary";




function App() {
  const routeElements = useRoutes(routes);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>{routeElements}</CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
