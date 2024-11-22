import React from 'react';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import { useAuth } from '../../context/AuthContext';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, CircularProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const OrderPage = () => {
    const { currentUser } = useAuth();

    // Fetch orders data based on the current user's email
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);

    // Loading and Error handling
    if (isLoading) return <div><CircularProgress /> Loading...</div>;
    if (isError) return <div>Error getting orders data.</div>;

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>

            {orders.length === 0 ? (
                <div>No orders found!</div>
            ) : (
                <div>
                    {orders.map((order) => (
                        <Accordion key={order._id}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`order-${order._id}-content`}
                                id={`order-${order._id}-header`}
                            >
                                <Box sx={{ width: '100%' }}>
                                    <Typography variant="h6">Order ID: {order._id}</Typography>
                                    <Typography variant="body2" color="textSecondary">Status: {order.status}</Typography>
                                    <Typography variant="body2" color="textSecondary">Date: {new Date(order.createdAt).toLocaleDateString()}</Typography>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body1"><strong>Name:</strong> {order.name}</Typography>
                                <Typography variant="body1"><strong>Email:</strong> {order.email}</Typography>
                                <Typography variant="body1"><strong>Phone:</strong> {order.phone}</Typography>
                                <Typography variant="body1"><strong>Total Price:</strong> ₱{order.totalPrice}</Typography>
                                
                                <Typography variant="h6" sx={{ mt: 2 }}><strong>Address:</strong></Typography>
                                <Typography variant="body1">{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</Typography>
                                
                                <Typography variant="h6" sx={{ mt: 2 }}><strong>Courier:</strong> {order.courier ? order.courier : "No current courier"}</Typography>
                                
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`order-${order._id}-books-content`}
                                        id={`order-${order._id}-books-header`}
                                    >
                                        <Typography variant="body1"><strong>Books Ids:</strong></Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <ul>
                                            {order.productIds.map((productId) => (
                                                <li key={productId}>
                                                    <Typography variant="body2">{productId}</Typography>
                                                    {/* Assuming you have a way to fetch book details, such as an API call */}
                                                    {/* You can expand this section to fetch and display book details */}
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionDetails>
                                </Accordion>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderPage;
