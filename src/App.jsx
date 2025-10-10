import React from "react";
import "virtual:svg-icons-register";
import routes from "./routes";
import { useRoutes } from "react-router-dom";
import ErrorBoundary from "./components/common/ErrorFallBack/ErrorBoundary";
import AuthInitializer from "./components/common/AuthInitializer";

function App() {
  const routeElements = useRoutes(routes);

  return (
    <ErrorBoundary>
      <AuthInitializer>{routeElements}</AuthInitializer>
    </ErrorBoundary>
  );
}

export default App;
