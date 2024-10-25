import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
    const { currentUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isChecked, setIsChecked] = useState(false);

    const onSubmit = data => {
        const updatedProfile = {
            email: data.email,
            password: data.password,
            avatar: data.avatar,
            address: {
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode
            },
            phone: data.phone,
        };
        console.log(updatedProfile);
    };

    return (
        <section>
            <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
                            <div className="text-gray-600">
                                <div className='flex items-center mb-4'>
                                    <img src="/avatar-placeholder.png" alt="" className='size-10 mr-1'/>
                                    <h2 className='text-xl font-semibold'>Profile Details</h2>                
                                </div>
                                <p className="font-medium text-lg">Update your information</p>
                                <p>Please fill out all required fields.</p>
                            </div>

                            <div className="lg:col-span-2">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                    <div className="md:col-span-2">
                                        <label htmlFor="username">Username</label>
                                        <input
                                            {...register("username")}
                                            type="username"
                                            name="username"
                                            id="username"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            defaultValue={currentUser?.username || ''}
                                            placeholder="You full name"
                                        />
                                        {errors.email && <span>This field is required</span>}
                                    </div>
                                    <div className="md:col-span-3">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            {...register("email", { required: true })}
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            defaultValue={currentUser?.email || ''}
                                            placeholder="email@domain.com"
                                        />
                                        {errors.email && <span>This field is required</span>}
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            {...register("password", { required: true })}
                                            type="password"
                                            name="password"
                                            id="password"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder="Enter your password"
                                        />
                                        {errors.password && <span>This field is required</span>}
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="avatar">Avatar URL</label>
                                        <input
                                            {...register("avatar")}
                                            type="url"
                                            name="avatar"
                                            id="avatar"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder="https://example.com/avatar.jpg"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="phone">Phone Number</label>
                                        <input
                                            {...register("phone", { required: true })}
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder="+123 456 7890"
                                        />
                                        {errors.phone && <span>This field is required</span>}
                                    </div>

                                    <div className="md:col-span-3">
                                        <label htmlFor="city">City</label>
                                        <input
                                            {...register("city", { required: true })}
                                            type="text"
                                            name="city"
                                            id="city"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        />
                                        {errors.city && <span>This field is required</span>}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="country">Country</label>
                                        <input
                                            {...register("country", { required: true })}
                                            type="text"
                                            name="country"
                                            id="country"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        />
                                        {errors.country && <span>This field is required</span>}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="state">State / Province</label>
                                        <input
                                            {...register("state", { required: true })}
                                            type="text"
                                            name="state"
                                            id="state"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        />
                                        {errors.state && <span>This field is required</span>}
                                    </div>

                                    <div className="md:col-span-1">
                                        <label htmlFor="zipcode">Zipcode</label>
                                        <input
                                            {...register("zipcode", { required: true })}
                                            type="text"
                                            name="zipcode"
                                            id="zipcode"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        />
                                        {errors.zipcode && <span>This field is required</span>}
                                    </div>

                                    <div className="md:col-span-5 text-end">
                                        <div className="inline-flex items-end mr-5">
                                            <button
                                                type="submit"
                                                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                                                Apply as Courier
                                            </button>
                                        </div>                                        
                                        <div className="inline-flex items-end">
                                            <button
                                                type="submit"
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                Update Profile
                                            </button>
                                        </div>

                                    </div>
                                    
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
