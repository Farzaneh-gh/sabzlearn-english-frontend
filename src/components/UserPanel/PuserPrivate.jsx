import React, { useEffect, useContext } from "react";
import AuthContext from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
function PuserPrivate({ children }  ) {
  const { isLoggedIn,loading} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
   if(loading) return
    if (!isLoggedIn ) navigate("/login");
  }, [isLoggedIn,loading]);


  return <>{children}</>;
}

export default PuserPrivate;
