import React from 'react';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import { useAuth } from '../../context/AuthContext';

const OrderPage = () => {
    const { currentUser } = useAuth();

    // const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email, {
    //     skip: !currentUser
    // });

    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);

    // if (!currentUser) {
    //     return <div>Please log in to view your orders.</div>;
    // }

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error getting orders data.</div>;

    return (
        <div className="container mx-auto p-6 "> {/* max-h-screen bg-gray-100 */}
            <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>

            {orders.length === 0 ? (<div>No orders found!</div>) : (<div>
                    {orders.map((order) => (
                        <div key={order._id} className="border-b mb-4">
                            <div className='w-10 h-[4px] bg-primary mb-5'></div>
                            <h2 className="font-bold">Order ID: {order._id}</h2>
                            <h3 className="font-semibold">Order Status: {order.status}</h3>
                            <p className="text-gray-600">Name: {order.name}</p>
                            <p className="text-gray-600">Email: {order.email}</p>
                            <p className="text-gray-600">Phone: {order.phone}</p>
                            <p className="text-gray-600">Total Price: ${order.totalPrice}</p>
                            <h3 className="font-semibold mt-2">Address:</h3>
                            <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>

                            <h3 className="font-semibold mt-2">Courier: {order.courier ? order.courier: "No current courier"} </h3>
                            
                            <h3 className="font-semibold mt-2">Products Id:</h3>
                            <ul>
                                {order.productIds.map((productId) => (
                                    <li key={productId}>{productId}</li>
                                ))
                                }
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderPage;
