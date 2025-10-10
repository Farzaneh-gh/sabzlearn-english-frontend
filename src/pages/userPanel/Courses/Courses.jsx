import React, { useEffect, useState } from "react";
import { getUserOrders } from "../../../api/courses";
import EmptyCourses from "../../../components/user/UserPanel/EmptyCourses/EmptyCourses";
import CourseList from "../../../components/user/UserPanel/CourseList/CourseList";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { debugAuth, debugApiCall } from "../../../utils/debug";

const Courses = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUserOrders = async () => {
      // Check if user is logged in
      if (!isLoggedIn) {
        setIsLoading(false);
        setError("Please log in to view your courses");
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Debug authentication status
        const authInfo = debugAuth();
        console.log("Auth info:", authInfo);

        // Debug the API call
        debugApiCall("orders");

        console.log("Fetching user orders from /orders endpoint...");

        // Fetch user orders from /orders endpoint with Bearer token
        const orders = await getUserOrders();

        console.log("Orders received:", orders);

        // Set the orders data
        setUserOrders(orders || []);
      } catch (error) {
        console.error("Failed to fetch user orders:", error);

        // Handle different error types
        let errorMessage = "Failed to load your courses. Please try again.";

        if (error.status === 401) {
          errorMessage = "Your session has expired. Please log in again.";
        } else if (error.status === 403) {
          errorMessage = "You don't have permission to view these courses.";
        } else if (error.status === 500) {
          errorMessage = "Server error. Please try again later.";
        } else if (error.message) {
          errorMessage = error.message;
        }

        setError(errorMessage);

        // Show error alert for critical errors
        if (error.status === 401) {
          swal({
            title: "Session Expired",
            text: "Please log in again to view your courses.",
            icon: "warning",
            button: "OK",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserOrders();
  }, [isLoggedIn]);

  // Retry function for failed requests
  const handleRetry = () => {
    setError(null);
    setIsLoading(true);

    // Re-trigger useEffect by updating a dependency
    setTimeout(() => {
      const fetchUserOrders = async () => {
        try {
          const orders = await getUserOrders();
          setUserOrders(orders || []);
          setError(null);
        } catch (error) {
          console.error("Retry failed:", error);
          setError("Failed to load your courses. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserOrders();
    }, 100);
  };

  return (
    <section className="mt-10 lg:container lg:p-0 lg:space-y-5 ">
      <div className="bg-white dark:bg-transparent lg:shadow-2xl dark:shadow-none lg:rounded-xl p-4">
        <h2 className="font-bold text-lg xs:text-2xl leading-8 md:leading-12 text-zinc-700 dark:text-zinc-300 md:pl-8">
          My Courses
        </h2>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <span className="ml-3 text-lg text-gray-600 dark:text-gray-300">
              Loading your courses...
            </span>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="text-center py-10">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mx-auto max-w-md">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 dark:bg-red-900/50 rounded-full mb-4">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">
                Unable to Load Courses
              </h3>
              <p className="text-red-600 dark:text-red-300 mb-4 text-sm">
                {error}
              </p>
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Content State */}
        {!isLoading && !error && (
          <>
            {userOrders.length === 0 ? (
              <EmptyCourses />
            ) : (
              <>
                <div className="flex items-center justify-between mb-4 px-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    You have {userOrders.length}{" "}
                    {userOrders.length === 1 ? "course" : "courses"}
                  </p>
                  <button
                    onClick={handleRetry}
                    className="text-sm text-orange-600 hover:text-orange-700 transition-colors"
                    title="Refresh courses"
                  >
                    🔄 Refresh
                  </button>
                </div>
                <CourseList courses={userOrders} />
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Courses;
