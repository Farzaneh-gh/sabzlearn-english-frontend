// src/components/private/AdminRoute.jsx
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../contexts/authContext";

const AdminRoute = ({ children }) => {
  const { userInfo, loading } = useContext(AuthContext);

  if (loading) {

    return <div>Loading...</div>;
  }

  if (!userInfo || userInfo.role !== "ADMIN") {
   
    return <Navigate to="/" />;
  }


  return children ? children : <Outlet />;
};

export default AdminRoute;
