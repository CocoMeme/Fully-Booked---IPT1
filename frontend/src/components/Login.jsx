import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useForm } from "react-hook-form";

import { FaFacebook, FaGoogle } from "react-icons/fa6";
import { useAuth } from '../context/AuthContext';


const Login = () => {

    const [message, setMessage] = useState("")
    const { loginUser, signInWithGoogle} = useAuth()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const onSubmit = async(data) => {
        try {
            await loginUser(data.email, data.password)
            alert("Login successful!")
            navigate("/")
            // Ilagay dito yung bagong alert
        } catch (error) {
            setMessage("Please provide valid email and password")
            console.log(error)
        }
    };

    const handleGoogleSignIn = async() => {
        try {
            await signInWithGoogle()
            alert("Login successful!")
            navigate("/")
        } catch (error) {
            alert("Google sign in failed")
            console.log(error)
        }
    }


  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
        <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <div className='flex items-center justify-center mb-4'>
                <img src="/android-chrome-512x512.png" alt="" className='size-6 mr-1'/>
                <h2 className='text-xl font-semibold'>FULLY BOOKED | Login</h2>                
            </div>

        
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' 
                    htmlFor="email">Email</label>
                    <input 
                    {...register("email", { required: true })}
                    type="email" name='email' id='email' placeholder='Email Address'
                    className='shadow appearance-none border rounded w-full py-2 px-3
                    leading-tight focus:outline-none focus:shadow'/>
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' 
                    htmlFor="password">Password</label>
                    <input 
                    {...register("password", { required: true })}
                    type="password" name='password' id='password' placeholder='Password'
                    className='shadow appearance-none border rounded w-full py-2 px-3
                    leading-tight focus:outline-none focus:shadow'/>
                </div>
                {
                    message && <p className='text-red-500 text-xs italic mb-3 text-center'>{message}</p>
                }

                <p className='align-baseline font-medium mt-4 text-sm text-center'>Haven't an account? <Link to="/register" className='font-extrabold hover:text-green-500'>Register</Link> here!</p>

                <div className='mt-4'>
                    <button className=' w-full flex flex-wrap gap-1 items-center justify-center bg-primary hover:bg-red-500 text-white 
                    font-bold py-2 px-8 rounded focus:outline-none transition-all duration-200 cursor-pointer'>
                    <img src="/FullyBooked-white.png" alt="" className='size-6'/>
                    Login
                    </button>
                </div>

            </form>
            <div className="flex items-center justify-center space-x-4 pt-3">
                <div className="border-t border-gray-400 w-24"></div>
                <span className="text-gray-400">or</span>
                <div className="border-t border-gray-400 w-24"></div>
            </div>

            
            {/* Google Signin */}
            <div className='mt-4'>
                <button 
                onClick={handleGoogleSignIn}
                className='w-full flex flex-wrap gap-1 items-center justify-center bg-green-700 text-white transition-all duration-200 cursor-pointer
                font-bold py-2 px-4 rounded focus:outline-none hover:bg-green-900'>
                    <FaGoogle />
                    Sign in with Google
                </button>
            </div>

            {/* Facebook Signin */}
            <div className='mt-4'>
                <button 
                // onClick={handleFacebookSignIn}
                className='w-full flex flex-wrap gap-1 items-center justify-center bg-blue-700 text-white transition-all duration-200 cursor-pointer
                font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-900'>
                    <FaFacebook />
                    Sign in with Facebook
                </button>
            </div>

            <p className='mt-5 text-center text-grey-500 text-xs'>©2024 Fully Booked. All rights reserved.</p>

        </div>
    </div>
  )
}

export default Login