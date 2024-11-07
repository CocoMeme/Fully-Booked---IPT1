import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { FaFacebook, FaGoogle } from "react-icons/fa6";
import { FaArrowCircleRight } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [message, setMessage] = useState("");
  const { registerUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
  } = useForm();

  // Register User
  const onSubmit = async (data) => {
    try {
      await registerUser(data.username, data.email, data.password);
      alert("User registered successfully!");
      navigate("/");
    } catch (error) {
      setMessage("Please provide valid email and password.");
      console.error("Registration error:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert("Google sign up failed");
      console.error("Google sign-in error:", error);
    }
  };

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

          {message && <p className='text-red-500 text-xs italic mb-3 text-center'>{message}</p>}

          <p className='align-baseline font-medium mt-4 text-sm text-center'>
            Already have an account? <Link to="/login" className='font-extrabold hover:text-green-500'>Login</Link> here!
          </p>

          <div className='mt-4'>
            <button className='w-full flex flex-wrap gap-1 items-center justify-center bg-primary hover:bg-red-500 text-white 
              font-bold py-2 px-8 rounded focus:outline-none transition-all duration-200 cursor-pointer'>
              <FaArrowCircleRight />
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
            className='w-full flex flex-wrap gap-1 items-center justify-center bg-green-700 text-white transition-all duration-200 cursor-pointer
            font-bold py-2 px-4 rounded focus:outline-none hover:bg-green-900'>
            <FaGoogle />
            Sign up with Google
          </button>
        </div>

        <div className='mt-4'>
          <button 
            className='w-full flex flex-wrap gap-1 items-center justify-center bg-blue-700 text-white transition-all duration-200 cursor-pointer
            font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-900'>
            <FaFacebook />
            Sign up with Facebook
          </button>
        </div>

        <p className='mt-5 text-center text-grey-500 text-xs'>©2024 Fully Booked. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Register;
