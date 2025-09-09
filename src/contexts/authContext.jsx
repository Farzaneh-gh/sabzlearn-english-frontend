import { createContext } from "react";

const AuthContext = createContext({
    token:null,
    login: () => {},
    logout: () => {},
    isLoggedIn: false,
    userInfo: {},
});

export default AuthContext;
