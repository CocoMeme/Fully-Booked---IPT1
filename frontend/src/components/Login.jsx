import React, { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGoogle } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";
import { Snackbar, SnackbarContent, CircularProgress } from "@mui/material";
import { CheckCircle, Error } from "@mui/icons-material";

const Login = () => {
  const [alert, setAlert] = useState({ show: false, severity: "", message: "", loading: false });
  const { loginUser, signInWithGoogle } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setAlert({
      show: true,
      severity: "info",
      message: "Logging in...",
      loading: true,
    });

    try {
      await loginUser(data.email, data.password);
      setAlert({
        show: true,
        severity: "success",
        message: "Login successful!",
        loading: false,
      });
      setTimeout(() => {
        setAlert({ show: false, severity: "", message: "", loading: false });
        navigate("/");  
      }, 2000); 
    } catch (error) {
      setAlert({
        show: true,
        severity: "error",
        message: "Invalid email or password.",
        loading: false,
      });
    }
  };

  const handleGoogleSignIn = async () => {
    setAlert({
      show: true,
      severity: "info",
      message: "Signing in with Google...",
      loading: true,
    });

    try {
      await signInWithGoogle();
      setAlert({
        show: true,
        severity: "success",
        message: "Google sign-in successful!",
        loading: false,
      });
      setTimeout(() => {
        setAlert({ show: false, severity: "", message: "", loading: false });
        navigate("/"); 
      }, 2000);
    } catch (error) {
      setAlert({
        show: true,
        severity: "error",
        message: "Google sign-in failed. Please try again.",
        loading: false,
      });
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex items-center justify-center mb-4">
          <img src="/android-chrome-512x512.png" alt="" className="size-6 mr-1" />
          <h2 className="text-xl font-semibold">FULLY BOOKED | Login</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs italic">Email is required</p>}
          {errors.password && <p className="text-red-500 text-xs italic">Password is required</p>}

          <p className="align-baseline font-medium mt-4 text-sm text-center">
            Haven't an account?{" "}
            <Link to="/register" className="font-extrabold hover:text-green-500">
              Register
            </Link>{" "}
            here!
          </p>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full flex flex-wrap gap-1 items-center justify-center bg-primary hover:bg-red-500 text-white font-bold py-2 px-8 rounded focus:outline-none transition-all duration-200 cursor-pointer"
            >
              <img src="/FullyBooked-white.png" alt="" className="size-6" />
              Login
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center space-x-4 pt-3">
          <div className="border-t border-gray-400 w-24"></div>
          <span className="text-gray-400">or</span>
          <div className="border-t border-gray-400 w-24"></div>
        </div>

        {/* Google Sign-in */}
        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex flex-wrap gap-1 items-center justify-center bg-green-700 text-white transition-all duration-200 cursor-pointer font-bold py-2 px-4 rounded focus:outline-none hover:bg-green-900"
          >
            <FaGoogle />
            Sign in with Google
          </button>
        </div>

        {/* Facebook Sign-in */}
        <div className="mt-4">
          <button
            className="w-full flex flex-wrap gap-1 items-center justify-center bg-blue-700 text-white transition-all duration-200 cursor-pointer font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-900"
          >
            <FaFacebook />
            Sign in with Facebook
          </button>
        </div>

        <p className="mt-5 text-center text-grey-500 text-xs">
          ©2024 Fully Booked. All rights reserved.
        </p>
      </div>

      {/* Snackbar (Pop-up at the top with icon) */}
      <Snackbar
        open={alert.show}
        autoHideDuration={2000}
        onClose={() => setAlert({ show: false, severity: "", message: "", loading: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <SnackbarContent
          style={{
            backgroundColor: alert.severity === "success" ? "#90EE90" : alert.severity === "error" ? "red" : "#90EE90",
            color: "white",
            fontWeight: "bold",
            fontSize: "18px", // Larger font size
            padding: "16px 32px", // Increase padding for bigger pop-up
            maxWidth: "500px", // Set maximum width
            width: "100%",
          }}
          message={
            <div className="flex items-center justify-center">
            {alert.loading && <CircularProgress size={24} className="mr-2" style={{ color: "white" }} />}
              {!alert.loading && (alert.severity === "success" ? (
                <CheckCircle className="mr-2" />
              ) : alert.severity === "error" ? (
                <Error className="mr-2" />
              ) : null)}
              {alert.message}
            </div>
          }
        />
      </Snackbar>
    </div>
  );
};

export default Login;
