import React, { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/authContext";

function PuserPrivate({ children }) {
  const { isLoggedIn, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
      console.log("Auth status changed:", { isLoggedIn, loading });
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, loading, navigate]);

  if (loading) {
    // You can replace this with a proper loading spinner or skeleton screen
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    // Return null to prevent rendering children before the redirect completes
    return null;
  }

  return <>{children}</>;
}

export default PuserPrivate;
