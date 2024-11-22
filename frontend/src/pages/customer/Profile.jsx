import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useAuth } from '../../context/AuthContext';
import { Button, TextField, Typography, Paper } from '@mui/material';
import Apply from './Apply'; // Keep Apply banner component

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
        <section className="absolute top-20 left-0 w-full h-full flex items-center justify-center bg-gray-100">
            <div className="container max-w-screen-lg mx-auto">
                <Apply />
                <Paper className="bg-white rounded shadow-lg p-4 md:p-8 mb-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
                        <div className="text-gray-600">
                            <div className='flex items-center mb-4'>
                                <img src="/avatar-placeholder.png" alt="" className='size-10 mr-1' />
                                <Typography variant="h5" fontWeight="bold">Profile Details</Typography>
                            </div>
                            <Typography variant="body1" color="textSecondary">Update your information</Typography>
                            <Typography variant="body2" color="textSecondary">Please fill out all required fields.</Typography>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                <div className="md:col-span-2">
                                    <TextField
                                        {...register("username")}
                                        label="Username"
                                        defaultValue={currentUser?.username || ''}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        error={Boolean(errors.username)}
                                        helperText={errors.username ? "This field is required" : ""}
                                    />
                                </div>
                                <div className="md:col-span-3">
                                    <TextField
                                        {...register("email", { required: true })}
                                        label="Email Address"
                                        defaultValue={currentUser?.email || ''}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        error={Boolean(errors.email)}
                                        helperText={errors.email ? "This field is required" : ""}
                                    />
                                </div>

                                <div className="md:col-span-5">
                                    <TextField
                                        {...register("password", { required: true })}
                                        label="Password"
                                        type="password"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        error={Boolean(errors.password)}
                                        helperText={errors.password ? "This field is required" : ""}
                                    />
                                </div>

                                <div className="md:col-span-5">
                                    <TextField
                                        {...register("avatar")}
                                        label="Avatar URL"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        placeholder="https://example.com/avatar.jpg"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <TextField
                                        {...register("phone", { required: true })}
                                        label="Phone Number"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        error={Boolean(errors.phone)}
                                        helperText={errors.phone ? "This field is required" : ""}
                                    />
                                </div>

                                <div className="md:col-span-3">
                                    <TextField
                                        {...register("city", { required: true })}
                                        label="City"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        error={Boolean(errors.city)}
                                        helperText={errors.city ? "This field is required" : ""}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <TextField
                                        {...register("country", { required: true })}
                                        label="Country"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        error={Boolean(errors.country)}
                                        helperText={errors.country ? "This field is required" : ""}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <TextField
                                        {...register("state", { required: true })}
                                        label="State / Province"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        error={Boolean(errors.state)}
                                        helperText={errors.state ? "This field is required" : ""}
                                    />
                                </div>

                                <div className="md:col-span-1">
                                    <TextField
                                        {...register("zipcode", { required: true })}
                                        label="Zipcode"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        error={Boolean(errors.zipcode)}
                                        helperText={errors.zipcode ? "This field is required" : ""}
                                    />
                                </div>

                                <div className="md:col-span-5 text-end">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        sx={{
                                            fontWeight: 'bold',
                                            padding: '8px 16px',
                                            backgroundColor: 'blue',
                                            '&:hover': {
                                                backgroundColor: 'darkblue'
                                            }
                                        }}
                                    >
                                        Update Profile
                                    </Button>
                                </div>

                            </div>
                        </div>
                    </form>
                </Paper>
            </div>
        </section>
    );
};

export default Profile;
