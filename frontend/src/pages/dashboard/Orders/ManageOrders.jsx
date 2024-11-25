import React, { useState } from 'react';
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
    Collapse,
    Box,
    Select,
    MenuItem,
} from '@mui/material';
import {
    useFetchAllOrdersQuery,
    useUpdateOrderStatusMutation,
    useDeleteOrderMutation,
} from '../../../redux/features/orders/ordersApi';

const ManageOrders = () => {
    const { data: orders, refetch } = useFetchAllOrdersQuery();
    const [deleteOrder] = useDeleteOrderMutation();
    const [updateOrderStatus] = useUpdateOrderStatusMutation();

    const [selected, setSelected] = useState([]);
    const [expanded, setExpanded] = useState({});

    const handleCheckboxToggle = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const allIds = orders.map((order) => order._id);
            setSelected(allIds);
        } else {
            setSelected([]);
        }
    };

    const handleDeleteOrder = async (id) => {
        try {
            await deleteOrder(id).unwrap();
            alert('Order deleted successfully!');
            refetch();
            setSelected((prev) => prev.filter((selectedId) => selectedId !== id));
        } catch (error) {
            alert('Failed to delete order. Please try again.');
        }
    };

    const handleExpandToggle = (id) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateOrderStatus({ id, status: newStatus }).unwrap();
            alert('Order status updated successfully!');
            refetch();
        } catch (error) {
            console.error("Failed to update status:", error);
            alert('Failed to update order status. Please try again.');
        }
    };

    return (
        <section className="py-1 bg-blueGray-50">
            <main className="mb-7 w-full xl:w-10/12 px-4 mx-auto">
                <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                    <div className="mr-6">
                        <h1 className="text-4xl font-bold mb-1">Manage Orders</h1>
                        <h2 className="text-gray-600 ml-0.5">Admin Functionality</h2>
                    </div>
                </div>
            </main>
            <div className="w-full xl:w-10/12 mb-12 xl:mb-0 px-4 mx-auto">
                <Paper elevation={3}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            indeterminate={selected.length > 0 && selected.length < orders?.length}
                                            checked={selected.length === orders?.length}
                                            onChange={handleSelectAll}
                                        />
                                    </TableCell>
                                    <TableCell>#</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Total Price</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders &&
                                    orders.map((order, index) => (
                                        <React.Fragment key={order._id}>
                                            <TableRow
                                                selected={selected.includes(order._id)}
                                                onClick={() => handleExpandToggle(order._id)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                                                    <Checkbox
                                                        checked={selected.includes(order._id)}
                                                        onChange={() => handleCheckboxToggle(order._id)}
                                                    />
                                                </TableCell>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{order.name}</TableCell>
                                                <TableCell>{order.email}</TableCell>
                                                <TableCell>₱{order.totalPrice}</TableCell>
                                                <TableCell>
                                                    <Select
                                                        value={order.status}
                                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                        displayEmpty
                                                    >
                                                        {['Pending', 'Processing', 'Shipping', 'Delivered'].map((status) => (
                                                            <MenuItem key={status} value={status}>
                                                                {status}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </TableCell>
                                                <TableCell onClick={(e) => e.stopPropagation()}>
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        onClick={() => handleDeleteOrder(order._id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell colSpan={7} style={{ paddingBottom: 0, paddingTop: 0 }}>
                                                    <Collapse in={expanded[order._id]} timeout="auto" unmountOnExit>
                                                        <Box margin={2}>
                                                            <div>
                                                                <strong>Address:</strong>
                                                                <p>
                                                                    {order.address.city}, {order.address.state},{' '}
                                                                    {order.address.zipcode}, {order.address.country}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <strong>Products:</strong>
                                                                <ul>
                                                                    {order.productIds.map((productId) => (
                                                                        <li key={productId}>{productId}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </Box>
                                                    </Collapse>
                                                </TableCell>
                                            </TableRow>
                                        </React.Fragment>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        </section>
    );
};

export default ManageOrders;
