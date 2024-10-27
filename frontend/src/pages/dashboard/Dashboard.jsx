import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import getBaseUrl from '../../utils/baseURL'
import axios from 'axios'
import Loading from '../../components/Loading'
import { MdIncompleteCircle } from 'react-icons/md'
import OrdersChart from './OrdersChart';
import SalesChart from './SalesChart'

import { GoBook } from "react-icons/go";
import { IoMdTrendingUp } from "react-icons/io";
import { RiFireLine, RiShoppingCartLine  } from "react-icons/ri";


const Dashboard = () => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${getBaseUrl()}/api/admin`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                })

                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchData();
    }, []);



    if (loading) return <Loading />

    return (
        <>
            <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
                        <GoBook className='size-6'/>
                    </div>
                    <div>
                        <span className="block text-2xl font-bold">{data?.totalBooks ? data?.totalBooks : 0}</span>
                        <span className="block text-gray-500">Current Book Number</span>
                    </div>
                </div>
                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
                        <IoMdTrendingUp className='size-6'/>
                    </div>
                    <div>
                        <span className="block text-2xl font-bold">
                            ₱ {data?.totalSales ? data.totalSales.toFixed(2) : "0.00"}
                        </span>
                        <span className="block text-gray-500">Total Sales</span>
                    </div>
                </div>
                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
                        <RiFireLine className='size-6'/>
                    </div>
                    <div>
                        <span className="inline-block text-2xl font-bold">{data?.hotBooks}</span>
                        <span className="inline-block text-xl text-gray-500 font-semibold"></span>
                        <span className="block text-gray-500">Hot Books in This Month</span>
                    </div>
                </div>
                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
                        <RiShoppingCartLine className='size-6' />
                    </div>
                    <div>
                        <span className="block text-2xl font-bold">{data?.totalOrders}</span>
                        <span className="block text-gray-500">Total Orders</span>
                    </div>
                </div>
            </section>
            <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
                <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
                    <div className="px-6 py-5 font-semibold border-b border-gray-100">Monthly Order Chart</div>
                    <div className="p-4 flex-grow">
                        <div className="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
                            <OrdersChart monthlyOrders={data.monthlyOrders} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
         
                        <div className="px-6 py-5 font-semibold border-b border-gray-100">Montly Sales Chart</div>
                        <div className="p-4 flex-grow">
                            <div className="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
                                <SalesChart monthlySales={data?.monthlySales || []} />
                            </div>
                        </div>

                    
                </div>

                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
                        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path fill="#fff" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                    </div>
                    <div>
                        <span className="block text-2xl font-bold">{data.totalOrders}</span>
                        <span className="block text-gray-500">Orders left</span>
                    </div>
                </div>
                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-teal-600 bg-teal-100 rounded-full mr-6">
                        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <span className="block text-2xl font-bold">139</span>
                        <span className="block text-gray-500">Website visits (last day)</span>
                    </div>
                </div>
                <div className="row-span-3 bg-white shadow rounded-lg">
                    <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
                        <span>Users by average order</span>
                        <button type="button" className="inline-flex justify-center rounded-md px-1 -mr-1 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-600" id="options-menu" aria-haspopup="true" aria-expanded="true">
                            Descending
                            <svg className="-mr-1 ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>

                    </div>
                    <div className="overflow-y-auto" style={{ maxHeight: '24rem' }}>
                        <ul className="p-6 space-y-6">
                            <li className="flex items-center">
                                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                                    <img src="https://randomuser.me/api/portraits/women/82.jpg" alt="Annette Watson profile picture" />
                                </div>
                                <span className="text-gray-600">Annette Watson</span>
                                <span className="ml-auto font-semibold">9.3</span>
                            </li>
                            
                        </ul>
                    </div>
                </div>

            </section>

            {/* <section className="text-right font-semibold text-gray-500">
                <a href="#" className="text-purple-600 hover:underline">Recreated on Codepen</a> with <a href="https://tailwindcss.com/" className="text-teal-400 hover:underline">Tailwind CSS</a> by Azri Kahar, <a href="https://dribbble.com/shots/10711741-Free-UI-Kit-for-Figma-Online-Courses-Dashboard" className="text-purple-600 hover:underline">original design</a> made by Chili Labs
            </section> */}
        </>
    )
}

export default Dashboard