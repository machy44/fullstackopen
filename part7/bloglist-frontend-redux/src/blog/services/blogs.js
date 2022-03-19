import axios from 'axios';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrlRtk = '/api/blogs';

export const blogsApi = createApi({
  reducerPath: 'blogs',
  tagTypes: ['Blogs'],
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrlRtk,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = getState().auth?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => '/',
      providesTags: [{ type: 'Blogs', id: 'LIST' }]
    }),
    getBlogById: builder.query({
      query: (id) => `/${id}`
    }),
    createBlog: builder.mutation({
      query: (newBlog) => ({
        url: '/',
        method: 'POST',
        body: newBlog
      }),
      invalidatesTags: [{ type: 'Blogs', id: 'LIST' }]
    })
  })
});

export const { useGetBlogsQuery, useGetBlogByIdQuery, useCreateBlogMutation } = blogsApi;

const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const setupConfig = () => {
  const config = {
    headers: {
      Authorization: token
    }
  };

  return config;
};

const incrementLike = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, { ...blog, likes: blog.likes + 1 }, setupConfig());
  return response.data;
};

const removeBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, setupConfig());
  return response;
};

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, setupConfig());
  return response.data;
};

export default { getAll, create, setToken, incrementLike, removeBlog };
