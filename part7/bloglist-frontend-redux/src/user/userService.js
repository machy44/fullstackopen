import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = '/api/users';

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/'
    }),
    getUserById: builder.query({
      query: (id) => `/${id}`
    })
  })
});

export const { useGetUsersQuery, useGetUserByIdQuery } = usersApi;
