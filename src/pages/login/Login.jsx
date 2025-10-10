import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, fetchUserInfo } from "../../redux/slices/authSlice";
import { fetchCart } from "../../redux/slices/cartSlice";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const navigate = useNavigate();

  const handleSignIn = async (data) => {
    const bodyData = {
      identifier: data.username,
      password: data.password,
    };

    if (!isValid || errors.username || errors.password) {
      swal({
        title: "Validation Error",
        text: "Please fill in all required fields correctly.",
        icon: "error",
        button: "OK",
      });
      return;
    }

    try {
      // Show loading state
      const loginResult = await dispatch(loginUser(bodyData));

      if (loginUser.fulfilled.match(loginResult)) {
        // Login successful, now fetch user info
        const userInfoResult = await dispatch(fetchUserInfo());

        if (fetchUserInfo.fulfilled.match(userInfoResult)) {
          // Fetch cart after successful login
          await dispatch(fetchCart());

          // Show success message
          swal({
            title: "Welcome back!",
            text: "You have been successfully logged in.",
            icon: "success",
            button: "Continue",
            timer: 2000,
          });

          navigate("/");
        } else {
          // User info fetch failed
          swal({
            title: "Login Warning",
            text: "Login successful but failed to load user information. Please refresh the page.",
            icon: "warning",
            button: "OK",
          });
          navigate("/");
        }
      } else {
        // Login failed, handle different error types
        const errorMessage =
          loginResult.payload?.message || "Login failed. Please try again.";

        swal({
          title: "Login Failed",
          text: errorMessage,
          icon: "error",
          button: "Try Again",
        });
      }
    } catch (err) {
      // Catch any unexpected errors
      swal({
        title: "Unexpected Error",
        text: "An unexpected error occurred. Please try again later.",
        icon: "error",
        button: "OK",
      });
      console.error("Login error:", err);
    }
  };

  return (
    <main className="flex-center flex-col relative px-4 py-6 min-h-screen bg-gray-100 font-Dana ">
      <Link to="/" className="flex items-center gap-x-3.5 mb-4">
        <svg className="h-30 w-30  text-orange-300">
          <use href="#icon-logo-sabzlearn" />
        </svg>
      </Link>

      <div className="max-w-[380px] w-full pt-5 pb-6 px-6 text-center bg-white dark:bg-zinc-800 rounded-2xl shadow-lg">
        <div className="user-data">
          <h4 className="font-MorabbaBold text-xl mb-4 sm:mb-4.5">
            Login with Email
          </h4>
          <p className="mb-5">
            Don't have an account?&nbsp;
            <Link to="/register" className="font-danaDemiBold text-green-500">
              Register
            </Link>
          </p>
          <form
            className="flex flex-col space-y-6 mb-4"
            autocomplete="on"
            onSubmit={handleSubmit(handleSignIn)}
          >
            <div className="relative">
              <input
                type="text"
                {...register("username", { required: "Username is required" })}
                className="input rounded-lg bg-gray-100 py-6"
                placeholder="Email Address"
                inputmode="email"
              />

              {errors.username && (
                <span className="text-red-500 text-xs mt-2 block text-left ml-3">
                  {errors.username.message}
                </span>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className="input rounded-lg bg-gray-100 py-6 "
                placeholder="Password"
              />
              <svg
                className="absolute right-3.5 top-3 w-5 h-5 text-gray-400 z-10"
                onClick={togglePasswordVisibility}
              >
                <use href={showPassword ? "#icon-eyeOff" : "#icon-eye"} />
              </svg>
              {errors.password && (
                <span className="text-red-500 text-xs mt-2 block text-left ml-3">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`btn-success btn rounded-lg h-12 text-lg text-white w-full ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-[330px] w-full mx-auto text-center text-base text-zinc-600 mt-7 sm:mt-8">
        By registering on the site, you accept all the terms and conditions of
        using the services of
        <Link to="/" className="text-green-500">
          &nbsp;SabzLearn&nbsp;
        </Link>
        .
      </div>

      <div className="hidden lg:block absolute top-0 left-0 w-[300px] h-[300px] bg-sky-500 opacity-20 blur-[120px] rounded-full"></div>
      <div className="hidden lg:block absolute bottom-0 right-0 w-[300px] h-[300px] bg-amber-400 opacity-20 blur-[120px] rounded-full"></div>
    </main>
  );
}

export default Login;
