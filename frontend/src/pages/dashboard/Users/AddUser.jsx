import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../../context/AuthContext';
import Swal from 'sweetalert2';
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { FaArrowCircleRight } from 'react-icons/fa';

const AddUser = () => {
  const [message, setMessage] = useState('');
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data.username, data.email, data.password, data.role);
      Swal.fire({
        title: 'Success',
        text: 'User registered successfully!',
        icon: 'success',
      });
      navigate('/dashboard/manage-users');
    } catch (error) {
      setMessage('Please provide valid email and password.');
      console.error('Registration error:', error);
    }
  };

  return (
    <section>
      <main className="mb-7 w-full xl:w-10/12 xl:mb-7 px-4 mx-auto">
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
          <div className="mr-6">
            <h1 className="text-4xl font-bold mb-1">User Management</h1>
            <h2 className="text-gray-600 ml-0.5">Admin Functionality</h2>
          </div>
          <div className="flex flex-col md:flex-row items-start justify-end -mb-3">
            <Link
              to="/dashboard/manage-users"
              className="inline-flex px-5 py-3 text-gray-600 hover:text-gray-700 focus:text-gray-700 hover:bg-gray-100 focus:bg-gray-100 border border-gray-600 rounded-md mb-3"
            >
              Manage Users
            </Link>
            <Link
              to="/dashboard/add-new-user"
              className="inline-flex px-5 py-3 text-white bg-gray-600 hover:bg-gray-700 focus:bg-gray-700 rounded-md ml-6 mb-3"
            >
              Add New User
            </Link>
          </div>
        </div>
        <Outlet />
      </main>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        maxWidth="sm"
        mx="auto"
        p={3}
        boxShadow={3}
        borderRadius={2}
        bgcolor="white"
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
          Create New User
        </Typography>

        {/* Username */}
        <Controller
          name="username"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Username"
              fullWidth
              margin="normal"
              error={!!error}
              helperText={error?.message || 'Username is required'}
            />
          )}
        />

        {/* Role Selector */}
        <Controller
          name="role"
          control={control}
          rules={{ required: "Role is required" }}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth margin="normal" error={!!error}>
              <InputLabel>Role</InputLabel>
              <Select {...field} label="Role">
                <MenuItem value="customer">Customer</MenuItem>
                <MenuItem value="courier">Courier</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
              {error && <Typography variant="body2" color="error">{error.message}</Typography>}
            </FormControl>
          )}
        />

        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Email"
              fullWidth
              margin="normal"
              error={!!error}
              helperText={error?.message || 'Email is required'}
            />
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              error={!!error}
              helperText={error?.message || 'Password is required'}
            />
          )}
        />

        {/* Error Message */}
        {message && (
          <Typography variant="body2" color="error" align="center" mt={2}>
            {message}
          </Typography>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          startIcon={<FaArrowCircleRight />}
        >
          Register
        </Button>
      </Box>
    </section>
  );
};

export default AddUser;
