import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath:'apiSlice',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:3004'}),
    tagTypes: ['users'],
    endpoints: (build) => ({
       getUsers: build.query({
          query: () => '/users',
          transformResponse: res => res.sort((a,b) => a.id - b.id),
          providesTags:['users']
       }),
       getSingleUser: build.query({
         query: (id) => ({
            url: '/users/' + id,
         }),
         providesTags:['users']
       }),
       addUser: build.mutation({
          query: (user) => ({
             url: '/users',
             method:'POST',
             body: user
          }),
          invalidatesTags: ['users']
       }),
       deleteUser: build.mutation({
          query: (id) => ({
             url: '/users/' + id,
             method: 'DELETE',
             body: id
          }),
          invalidatesTags: ['users']
       }),
       editUser: build.mutation({
          query: ({id, ...rest}) => ({
            url: '/users/' + id,
            method: 'PUT',
            body: rest
          }),
          invalidatesTags: ['users']
       })
      
    })
})

export const {
    useGetUsersQuery,
    useGetSingleUserQuery,
    useAddUserMutation,
    useDeleteUserMutation,
    useEditUserMutation
} = apiSlice