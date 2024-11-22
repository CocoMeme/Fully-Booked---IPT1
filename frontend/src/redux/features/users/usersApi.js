import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseURL';

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/auth`, // Change this to match the backend route
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
});

const usersApi = createApi({
    reducerPath: 'userApi',
    baseQuery,
    endpoints: (builder) => ({
        fetchAllUsers: builder.query({
            query: () => "/",
            providesTags: ["Users"]
        }),        
        fetchUserById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (results, error, id) => [{ type: "Users", id }]
        }),
        addUser: builder.mutation({
            query: (newUser) => ({
                url: `/create-user`,
                method: "POST",
                body: newUser
            }),
            invalidatesTags: ["Users"]
        }),
        updateUser: builder.mutation({
            query: ( id, ...rest ) => ({
                url: `/update/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Users"]    
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
} = usersApi

export default usersApi;
