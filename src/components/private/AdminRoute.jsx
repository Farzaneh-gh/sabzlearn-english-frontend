
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  const { userInfo, loading, isLoggedIn } = useSelector((state) => state.auth);


  // Show loading spinner while auth state is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  // Only redirect after loading is complete and we've confirmed user is not admin
  if (!isLoggedIn || !userInfo || userInfo.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default AdminRoute;
