import React from 'react'
import { Link, Outlet } from 'react-router-dom'

import { IoIosStats } from "react-icons/io";
import { GoGear } from "react-icons/go";
import { RiFunctionAddLine } from "react-icons/ri";
import { BiSolidBookOpen } from "react-icons/bi";

import { PiFootballHelmetFill  } from "react-icons/pi";
import { HiUsers } from "react-icons/hi";
import { FaMoneyBillWave } from "react-icons/fa";

import { } from '@mui/icons-material';


const Layout = () => {



  const handleLogout = () => {

  }


  return (
    <section className="flex md:bg-gray-100 min-h-screen overflow-hidden">
      <aside className="hidden sm:flex sm:flex-col">
        <a href="/" className="inline-flex items-center justify-center h-20 w-20  bg-gray-800 hover:bg-gray-500 focus:bg-gray-500">
          <img src="/android-chrome-512x512.png" alt="" className='h-7' />
        </a>
        <div className="flex-grow flex flex-col justify-between text-gray-500 bg-gray-800">
          <nav className="flex flex-col mx-4 my-6 space-y-4">

            <Link to="/dashboard" className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
              <span className="sr-only">Dashboard</span>
              <IoIosStats className='size-6' />
            </Link>

            <Link to="/dashboard/manage-books" className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
              <span className="sr-only">All Books</span>
              <BiSolidBookOpen className="size-6" />
            </Link>

            <Link to="/dashboard" className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">              <span className="sr-only">Folders</span>
              <span className="sr-only">Customer</span>
              <HiUsers  className='size-6' />
            </Link> 

            <Link to="/dashboard" className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">              <span className="sr-only">Folders</span>
              <span className="sr-only">Courier</span>
              <PiFootballHelmetFill  className='size-6' />
            </Link>

            <Link to="/dashboard" className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">              <span className="sr-only">Folders</span>
              <span className="sr-only">Transaction</span>
              <FaMoneyBillWave  className='size-6' />
            </Link>

          </nav>

          <div className="inline-flex items-center justify-center h-20 w-20 border-t border-gray-700">
            <button className="p-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
              <span className="sr-only">Settings</span>
              <GoGear className="size-6" />
            </button>
          </div>
        </div>
      </aside>
      <div className="flex-grow text-gray-800">
        <header className="flex items-center h-20 px-6 sm:px-10 bg-white">
          <button className="block sm:hidden relative flex-shrink-0 p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 rounded-full">
            <span className="sr-only">Menu</span>
            <RiFunctionAddLine />
          </button>
          <div className="sm:w-72 w-40 space-x-2 m-0">
            <h1 className='ml-2 font-bold'>DASHBOARD</h1>
            <p>Fully Booked</p>
          </div>
          <div className="flex flex-shrink-0 items-center ml-auto">
            <button className="inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg">
              <span className="sr-only">User Menu</span>
              <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
                <span className="font-semibold ml-5">Administrator</span>
                <span className="text-sm text-gray-600">Admin</span>
              </div>
              <span className="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
                <img src="/android-chrome-512x512.png" alt="user profile photo" className="h-full w-full object-cover" />
              </span>
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="hidden sm:block h-6 w-6 text-gray-300">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="border-l pl-3 ml-3 space-x-1">
              <button className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
                <span className="sr-only">Notifications</span>
                <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full"></span>
                <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full animate-ping"></span>
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <button
                onClick={handleLogout}
                className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
                <span className="sr-only">Log out</span>
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>

        </header>
        <main className="p-6 sm:p-10 space-y-6 ">
          <Outlet />
        </main>
      </div>
    </section>
  )
}

export default Layout