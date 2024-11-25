import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/orders`,
        credentials: 'include',
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: "/",
                method: "POST",
                body: newOrder,
            }),
            invalidatesTags: ['Orders'],
        }),
        getOrderByEmail: builder.query({
            query: (email) => ({
                url: `/email/${email}`,
            }),
            providesTags: ['Orders'],
        }),
        fetchAllOrders: builder.query({
            query: () => ({
                url: "/",
            }),
            providesTags: ['Orders'],
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Orders'],
        }),
        updateOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/${id}`,
                method: "PUT",
                body: { status },
            }),
            invalidatesTags: ['Orders'],
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetOrderByEmailQuery,
    useFetchAllOrdersQuery,
    useDeleteOrderMutation,
    useUpdateOrderStatusMutation,
} = ordersApi;

export default ordersApi;
