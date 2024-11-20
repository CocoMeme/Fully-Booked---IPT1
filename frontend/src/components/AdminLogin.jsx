import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from "axios"
import getBaseUrl from '../utils/baseURL';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {

    const [message, setMessage] = useState("")
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            console.log(`Attempting to log in admin with URL: ${getBaseUrl()}/api/auth/admin`);
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const auth = response.data;
            console.log("Authentication response:", auth);
    
            if (auth.token) {
                localStorage.setItem('token', auth.token);
                setTimeout(() => {
                    localStorage.removeItem('token');
                    alert('Token has expired! Login again.');
                    navigate('/');
                }, 3600 * 1000);
            }
    
            alert("Admin Login successful!");
            navigate('/dashboard');
        } catch (error) {
            setMessage("Please provide valid username and password");
            console.error("Login error:", error.response?.data || error.message);
        }
    };
    

    return (
    <div className='h-screen flex justify-center items-center bg-slate-50'>
        <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <div className='flex items-center justify-center mb-4'>
                <img src="/android-chrome-512x512.png" alt="" className='size-6 mr-1'/>
                <h2 className='admin-heading text-lg'>ADMINISTRATION</h2>
            </div>


        
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' 
                    htmlFor="username">Username</label>
                    <input 
                    {...register("username", { required: true })}
                    type="text" name='username' id='username' placeholder='Username'
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

                <div className='mt-4'>
                    <button className=' w-full flex flex-wrap gap-1 items-center justify-center btn-special text-white 
                    font-extrabold py-2 px-8 rounded focus:outline-none transition-all duration-200 cursor-pointer'>
                    <img src="/FullyBooked-white.png" alt="" className='size-6'/>
                    Login
                    </button>
                </div>

            </form>

            <p className='mt-5 text-center text-grey-500 text-xs'>This page are for administrator only.</p>

        </div>
    </div>
  )
}

export default AdminLogin