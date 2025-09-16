import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";

const AuthContext = createContext({
  token: null,
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
  userInfo: {},
  loading: false,
});
console.log("AuthContext created");

export const AuthProvider = ({ children }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthContext;
