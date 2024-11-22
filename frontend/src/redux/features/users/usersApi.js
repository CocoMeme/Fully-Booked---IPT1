import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseURL';

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/users`,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery,
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        fetchAllUsers: builder.query({
            query: () => "/",
            providesTags: ["Users"]
        }),        
        fetchUserById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Users", id }]
        }),
        addUser: builder.mutation({
            query: (newUser) => ({
                url: "/create",
                method: "POST",
                body: newUser
            }),
            invalidatesTags: ["Users"]
        }),
        updateUser: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/update/${id}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Users", id }]
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Users"]
        })
    })
});

export const {
    useFetchAllUsersQuery,
    useFetchUserByIdQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = usersApi;

export default usersApi;
