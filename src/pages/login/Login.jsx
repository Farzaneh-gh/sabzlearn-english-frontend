import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {  useForm } from "react-hook-form";
import swal from "sweetalert";
import AuthContext from "../../contexts/authContext";
import { loginUser } from "../../api/auth";
import { useContext } from "react";


function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
  });

  const { login } = useContext(AuthContext);
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
        title: "Error",
        text: "Please confirm the form",
        icon: "error",
        button: "OK",
      });
      return;
    }

    try {
      const result = await loginUser(bodyData);
      login( {},result.accessToken);
      navigate("/");
    } catch (err) {
      swal({
        title: "Error",
        text: err.message || "An error occurred during login",
        icon: "error",
        button: "OK",
      });
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
              className="btn-success btn rounded-lg h-12 text-lg text-white w-full"
            >
              Login
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
