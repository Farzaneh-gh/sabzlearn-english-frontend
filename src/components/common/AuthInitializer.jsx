import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { fetchUserInfo } from "../../redux/slices/authSlice";
import { fetchCart, loadGuestCart } from "../../redux/slices/cartSlice";
import { AUTH_COOKIE_KEY } from "../../utils/constants";

/**
 * AuthInitializer - Handles authentication initialization on app load
 * Checks for token in cookies and fetches user info if present
 */
const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if token exists in cookies on app load
    const token = Cookies.get(AUTH_COOKIE_KEY);

    if (token) {
      dispatch(fetchUserInfo()).then(() => {
        dispatch(fetchCart());
      });
    } else {
      dispatch(loadGuestCart());
    }
  }, [dispatch]);

  // Show loading screen while checking authentication
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

  return children;
};

export default AuthInitializer;
