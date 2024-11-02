import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const CourierRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');  // Assuming 'role' is stored in localStorage after login

    if (!token) {
        return <Navigate to="/login" />;  // Redirect to login if not authenticated
    }

    if (role !== 'courier') {
        return <Navigate to="/" />;  // Redirect to home if the user is not a courier
    }

    return children ? children : <Outlet />;
};

export default CourierRoute;
