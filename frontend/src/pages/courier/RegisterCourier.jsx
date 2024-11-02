import React from 'react';
import { useForm } from "react-hook-form";
import { useAuth } from '../../context/AuthContext';

const RegisterCourier = () => {
    const { currentUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const courierApplication = {
            vehicleInfo: data.vehicleInfo,
            serviceArea: {
                country: data.serviceCountry,
                city: data.serviceCity
            },
            validId: data.validId,
            courierApplicationStatus: 'pending',
            applicationDate: new Date(),
        };

        console.log("Courier Application Data:", courierApplication);
        // Here you can make a request to your backend to update the user's profile with the courier application data
        // Example: axios.post('/api/user/apply-courier', courierApplication)
    };

    return (
        <section>
            {/* <div className="min-h-screen p-6 flex items-center justify-center  bg-repeat"> */}
            <div className="min-h-screen p-6 flex items-center justify-center bg-pattern bg-repeat bg-[size:100px_100px] animate-move-diagonal">
                <div className="container max-w-screen-lg mx-auto">
                    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
                            <div className="text-gray-600">
                                <div className='flex items-center mb-4'>
                                    <img src="/avatar-placeholder.png" alt="Profile" className='size-10 mr-1'/>
                                    <h2 className='text-xl font-semibold'>Courier Application</h2>                
                                </div>
                                <p className="font-medium text-lg">Apply to be a Courier</p>
                                <p>Please fill out all required fields.</p>
                            </div>

                            <div className="lg:col-span-2">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                    <div className="md:col-span-5">
                                        <label htmlFor="vehicleInfo">Vehicle Information</label>
                                        <input
                                            {...register("vehicleInfo", { required: true })}
                                            type="text"
                                            name="vehicleInfo"
                                            id="vehicleInfo"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder="Enter your vehicle plate number"
                                        />
                                        {errors.vehicleInfo && <span>This field is required</span>}
                                    </div>

                                    <div className="md:col-span-3">
                                        <label htmlFor="serviceCountry">Service Country</label>
                                        <input
                                            {...register("serviceCountry", { required: true })}
                                            type="text"
                                            name="serviceCountry"
                                            id="serviceCountry"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder="Country"
                                        />
                                        {errors.serviceCountry && <span>This field is required</span>}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="serviceCity">Service City</label>
                                        <input
                                            {...register("serviceCity", { required: true })}
                                            type="text"
                                            name="serviceCity"
                                            id="serviceCity"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder="City"
                                        />
                                        {errors.serviceCity && <span>This field is required</span>}
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="validId">Valid ID URL</label>
                                        <input
                                            {...register("validId", { required: true })}
                                            type="url"
                                            name="validId"
                                            id="validId"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder="Link to your valid ID image"
                                        />
                                        {errors.validId && <span>This field is required</span>}
                                    </div>

                                    <div className="md:col-span-5 text-end">
                                        <button
                                            type="submit"
                                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                                            Submit Application
                                        </button>
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

export default RegisterCourier;
