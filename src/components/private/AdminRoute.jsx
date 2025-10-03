// src/components/private/AdminRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  const { userInfo, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userInfo || userInfo.role !== "ADMIN") {
    return <Navigate to="/" />;
  }

  return children ? children : <Outlet />;
};

export default AdminRoute;
