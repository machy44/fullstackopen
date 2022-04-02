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
      providesTags: ['Blogs']
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
      invalidatesTags: ['Blogs']
    }),
    incrementLike: builder.mutation({
      query: (blog) => ({
        url: `/${blog.id}`,
        method: 'PUT',
        body: {
          ...blog,
          likes: blog.likes + 1
        }
      }),
      invalidatesTags: ['Blogs']
    })
  })
});

export const { endpoints, useGetBlogsQuery, useGetBlogByIdQuery, useCreateBlogMutation, useIncrementLikeMutation } =
  blogsApi;

const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const setupConfig = () => {
  const config = {
    headers: {
      Authorization: token
    }
  };

  return config;
};

const removeBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, setupConfig());
  return response;
};

export default { setToken, removeBlog };
