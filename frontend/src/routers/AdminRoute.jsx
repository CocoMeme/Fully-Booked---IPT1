import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoute = ({children}) => {
    const token = localStorage.getItem('token')
    if(!token) {
        return <Navigate to="/admin"/>
    }
    return children ? children : <Outlet/>
}

// const AdminRoute = ({ children }) => {
//     const token = localStorage.getItem('token');

//     // Decode or validate token
//     if (!token || !isValidAdminToken(token)) {
//         return <Navigate to="/admin" />;
//     }

//     return children || <Outlet />;
// };

export default AdminRoute