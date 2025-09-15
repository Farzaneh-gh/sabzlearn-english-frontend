import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../api/auth";
import AuthContext from "../../contexts/authContext";

const Register = () => {
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onSubmit" });

  const onSubmit = async (data) => {
    const body = {
      name: data.name,
      username: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      confirmPassword: data.password,
    };

    if (!isValid) {
      swal({
        title: "Error",
        text: "Please enter the information correctly",
        icon: "error",
        button: "OK",
      });
      return;
    }
    try {
      const userData = await registerUser(body);
      login(userData.user, userData.accessToken);
      swal({
        title: "Success",
        text: "Registration completed successfully",
        icon: "success",
        button: "OK",
      }).then(() => {
        navigate("/");
      });
    } catch (err) {
      console.error(err);
      swal({
        title: "Error",
        text: err.message || "Registration failed",
        icon: "error",
        button: "OK",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <main className="flex-center flex-col relative px-4 py-6 min-h-screen bg-gray-100 font-Dana">
      <Link to="/" className="flex items-center gap-x-3.5 mb-4">
        <svg className="h-30 w-30  text-orange-300">
          <use href="#icon-logo-sabzlearn" />
        </svg>
      </Link>

      <div className="max-w-95 w-full pt-5 pb-6 px-6 text-center bg-white dark:bg-zinc-800 rounded-2xl shadow-lg">
        <div className="flex flex-col">
          <h4 className="font-bold text-xl mb-4 sm:mb-4.5 text-zinc-700 dark:text-white">
            Register
          </h4>
          <p className="mb-5 text-lg text-gray-500 dark:text-gray-300">
            Already registered?
            <Link to="/login" className="font-medium text-green-500">
              Login
            </Link>
          </p>
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
              <input
                type="text"
                className="input bg-gray-100 w-full py-6 rounded-lg"
                placeholder="Username"
                {...register("name", {
                  required: "Username is required",
                  maxLength: {
                    value: 20,
                    message: "Username must not exceed 30 characters",
                  },
                })}
              />
              {errors.username && (
                <span className="text-red-500 text-sm mt-2 block text-left ml-3">
                  {errors.username.message}
                </span>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                className="input bg-gray-100 w-full py-6 rounded-lg"
                placeholder="Phone Number"
                inputMode="tel"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^(\+|00)[1-9]\d{6,14}$/,
                    message: "Invalid phone number format",
                  },
                })}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm mt-2 block text-left ml-3">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div className="relative">
              <input
                type="email"
                className="input bg-gray-100 w-full py-6 rounded-lg"
                placeholder="Email Address"
                inputMode="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-2 block text-left ml-3">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input bg-gray-100 has-icon w-full py-6 rounded-lg"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <svg
                onClick={togglePasswordVisibility}
                className="absolute right-3.5 top-3 w-5 h-5 text-gray-500 cursor-pointer z-10"
              >
                <use href={showPassword ? "#icon-eyeOff" : "#icon-eye"} />
              </svg>
              {errors.password && (
                <span className="text-red-500 text-sm mt-2 block text-left ml-3">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="btn-success btn rounded-lg h-12 text-lg text-white w-full"
            >
              Continue
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-[330px] w-full mx-auto text-center mt-7 sm:mt-8">
        By registering on the site, you agree to all the terms and conditions of{" "}
        <Link to="/" className="text-green-500">
          Sabzlearn
        </Link>
      </div>

      <div className="hidden lg:block absolute top-0 left-0 w-[300px] h-[300px] bg-sky-500 opacity-20 blur-[120px] rounded-full"></div>
      <div className="hidden lg:block absolute bottom-0 right-0 w-[300px] h-[300px] bg-amber-400 opacity-20 blur-[120px] rounded-full"></div>
    </main>
  );
};

export default Register;
