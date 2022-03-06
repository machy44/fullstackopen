import { createSlice, createAction } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogs = [];

const blogSlice = createSlice({
  name: 'blogs',
  initialState: blogs,
  reducers: {
    setBlogs(state, action) {
      console.log('set blogs', action);
      return action.payload;
    }
  }
});

export const { setBlogs } = blogSlice.actions;
export default blogSlice.reducer;

export const fetchBlogs = createAction('api', function prepare() {
  return {
    payload: {
      success: setBlogs,
      apiRequest: blogService.getAll
    }
  };
});

export const createBlog = createAction('api', function prepare(data) {
  return {
    payload: {
      success: setBlogs,
      apiRequest: () =>
        blogService.create(data).then(() => {
          return blogService.getAll();
        })
    }
  };
});

export const selectBlogs = (state) => state.blogs;
