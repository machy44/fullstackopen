import { createSlice, createAction } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogs = [];

const blogSlice = createSlice({
  name: 'blogs',
  initialState: blogs,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    }
  }
});

export const { setBlogs } = blogSlice.actions;
export default blogSlice.reducer;

export const fetchBlogs = createAction('blogs/api', function prepare() {
  return {
    payload: {
      success: setBlogs,
      apiRequest: blogService.getAll
    }
  };
});

export const createBlog = createAction('blogs/api', function prepare(data) {
  return {
    payload: {
      success: setBlogs,
      apiRequest: () =>
        blogService.create(data).then(() => {
          return blogService.getAll();
        }),
      notification: 'SUCCESS'
    }
  };
});

export const selectBlogs = (state) => state.blogs;
