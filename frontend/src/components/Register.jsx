import React, { useState, useEffect } from 'react';  
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { FaFacebook, FaGoogle } from "react-icons/fa6";
import { FaArrowCircleRight } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';
import { Snackbar, SnackbarContent, CircularProgress } from "@mui/material";
import { CheckCircle, Error } from "@mui/icons-material";

const Register = () => {
  const [message, setMessage] = useState(""); // For snackbar message
  const [loading, setLoading] = useState(false);
  const { registerUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ show: false, severity: "", message: "", loading: false });

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true); // Start loading indicator
    setAlert({ show: true, severity: "info", message: "Processing your registration...", loading: true });
  
    try {
      // Register the user
      await registerUser(data.username, data.email, data.password);
      
      // Update alert after successful registration
      setAlert({ show: true, severity: "success", message: "Registration successful!", loading: false });
  
      // Delay navigation for 2 seconds to show the success message
      setTimeout(() => {
        navigate("/login"); // Redirect to home page after registration success
      }, 2000); // Adjust the delay time (2000 ms = 2 seconds)
  
    } catch (error) {
      // Handle errors by showing an error message
      setAlert({ show: true, severity: "error", message: "Please provide valid email and password.", loading: false });
      console.error("Registration error:", error);
    } finally {
      setLoading(false); // Stop loading indicator after process ends
    }
  };
  
  
  const handleGoogleSignIn = async () => {
    setLoading(true); // Start loading indicator
    try {
      // Sign in with Google
      await signInWithGoogle();
      
      // Update the alert to show success message for Google registration
      setAlert({ show: true, severity: "success", message: "Google sign-up successful!", loading: false });
      
      // Delay navigation to home page to show the success message
      setTimeout(() => {
        navigate("/"); // Redirect to home page after Google sign-up success
      }, 2000); // Adjust the delay time (2000 ms = 2 seconds)
  
    } catch (error) {
      // Handle errors by showing an error message
      setAlert({ show: true, severity: "error", message: "Google sign-up failed", loading: false });
      console.error("Google sign-in error:", error);
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };
  

 
  useEffect(() => {
    if (alert.show && !alert.loading) {

      setTimeout(() => {
        setAlert({ show: false, severity: "", message: "", loading: false }); // Close snackbar after 3 seconds
      }, 3000);
    }
  }, [alert]);

  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
      <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <div className='flex items-center justify-center mb-4'>
          <img src="/android-chrome-512x512.png" alt="" className='size-6 mr-1' />
          <h2 className='text-xl font-semibold'>FULLY BOOKED | Register</h2>                
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="username">Username</label>
            <input 
              {...register("username", { required: true })}
              type="text" id='username' 
              placeholder='Username'
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
            />
            {errors.username && <p className='text-red-500 text-xs italic'>Username is required</p>}
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
            <input 
              {...register("email", { required: true })}
              type="email" id='email' 
              placeholder='Email Address'
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
            />
            {errors.email && <p className='text-red-500 text-xs italic'>Email is required</p>}
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
            <input 
              {...register("password", { required: true })}
              type="password" id='password' 
              placeholder='Password'
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
            />
            {errors.password && <p className='text-red-500 text-xs italic'>Password is required</p>}
          </div>

          <p className='align-baseline font-medium mt-4 text-sm text-center'>
            Already have an account? <Link to="/login" className='font-extrabold hover:text-green-500'>Login</Link> here!
          </p>

          <div className='mt-4'>
            <button 
              type="submit"
              disabled={loading}
              className={`w-full flex flex-wrap gap-1 items-center justify-center bg-primary hover:bg-red-500 text-white font-bold py-2 px-8 rounded focus:outline-none transition-all duration-200 cursor-pointer ${loading ? 'bg-gray-400 cursor-not-allowed' : ''}`}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : <FaArrowCircleRight />}
              Register
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center space-x-4 pt-3">
          <div className="border-t border-gray-400 w-24"></div>
          <span className="text-gray-400">or</span>
          <div className="border-t border-gray-400 w-24"></div>
        </div>

        <div className='mt-4'>
          <button 
            onClick={handleGoogleSignIn}
            disabled={loading}
            className={`w-full flex flex-wrap gap-1 items-center justify-center bg-green-700 text-white transition-all duration-200 cursor-pointer font-bold py-2 px-4 rounded focus:outline-none hover:bg-green-900 ${loading ? 'bg-gray-400 cursor-not-allowed' : ''}`}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : <FaGoogle />}
            Sign up with Google
          </button>
        </div>

        <div className='mt-4'>
          <button 
            className='w-full flex flex-wrap gap-1 items-center justify-center bg-blue-700 text-white transition-all duration-200 cursor-pointer font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-900'
          >
            <FaFacebook />
            Sign up with Facebook
          </button>
        </div>

        <p className='mt-5 text-center text-grey-500 text-xs'>©2024 Fully Booked. All rights reserved.</p>
      </div>

      {/* Snackbar for displaying success or error messages */}
      <Snackbar
        open={alert.show}
        autoHideDuration={3000}
        onClose={() => setAlert({ show: false, severity: "", message: "", loading: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <SnackbarContent
          style={{
            backgroundColor: alert.severity === "success" ? "#90EE90" : alert.severity === "error" ? "red" : "#90EE90",
            color: "white",
            fontWeight: "bold",
            fontSize: "18px", 
            padding: "16px 32px", 
            maxWidth: "500px",
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

export default Register;
