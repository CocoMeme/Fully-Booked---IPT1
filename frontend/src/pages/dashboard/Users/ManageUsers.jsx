import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDeleteUserMutation, useFetchAllUsersQuery } from '../../../redux/features/users/usersApi';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Checkbox,
} from '@mui/material';

const ManageUsers = () => {
    const navigate = useNavigate();

    const { data: users, refetch } = useFetchAllUsersQuery();
    const [deleteUser] = useDeleteUserMutation();

    // State to track selected rows
    const [selected, setSelected] = useState([]);

    // Handle checkbox toggle for a row
    const handleCheckboxToggle = (id) => {
        if (selected.includes(id)) {
            setSelected(selected.filter((selectedId) => selectedId !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    // Handle select all rows
    const handleSelectAll = (event) => {
        if (event.target.checked && users) {
            const allIds = users.map((user) => user._id);
            setSelected(allIds);
        } else {
            setSelected([]);
        }
    };

    // Handle deleting a user
    const handleDeleteUser = async (id) => {
        try {
            await deleteUser(id).unwrap();
            alert('User deleted successfully!');
            refetch();
            setSelected(selected.filter((selectedId) => selectedId !== id));
        } catch (error) {
            console.error('Failed to delete user:', error.message);
            alert('Failed to delete user. Please try again.');
        }
    };

    // Handle bulk delete
    const handleBulkDelete = async () => {
        try {
            for (const id of selected) {
                await deleteUser(id).unwrap();
            }
            alert('Selected users deleted successfully!');
            refetch();
            setSelected([]);
        } catch (error) {
            console.error('Failed to delete users:', error.message);
            alert('Failed to delete users. Please try again.');
        }
    };

    // Handle navigating to Edit User page
    const handleEditClick = (id) => {
        navigate(`/dashboard/update-user/${id}`);
    };

    return (
        <section className="py-1 bg-blueGray-50">
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
                            to="/dashboard/add-user"
                            className="inline-flex px-5 py-3 text-white bg-gray-600 hover:bg-gray-700 focus:bg-gray-700 rounded-md ml-6 mb-3"
                        >
                            Add New User
                        </Link>
                        {selected.length > 0 && (
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleBulkDelete}
                                sx={{ ml: 2, p: 1.5, pl: 2 }}
                            >
                                Delete Selected ({selected.length})
                            </Button>
                        )}
                    </div>
                </div>
                <Outlet />
            </main>
            <div className="w-full xl:w-10/12 mb-12 xl:mb-0 px-4 mx-auto">
                <Paper elevation={3}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            indeterminate={selected.length > 0 && selected.length < users?.length}
                                            checked={selected.length === users?.length}
                                            onChange={handleSelectAll}
                                        />
                                    </TableCell>
                                    <TableCell>#</TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users &&
                                    users.map((user, index) => (
                                        <TableRow key={user._id} selected={selected.includes(user._id)}>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={selected.includes(user._id)}
                                                    onChange={() => handleCheckboxToggle(user._id)}
                                                />
                                            </TableCell>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{user.username}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.role}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleEditClick(user._id)}
                                                    sx={{ mr: 1 }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => handleDeleteUser(user._id)}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        </section>
    );
};

export default ManageUsers;
