import { createSlice, createAction } from '@reduxjs/toolkit';

const blogs = [];

const blogSlice = createSlice({
  name: 'blogs',
  initialState: blogs,
  reducers: {
    createBlog(state) {
      console.log('action');
      return state;
    },
    setBlogs(state, action) {
      console.log('set blogs', action);
      return action.payload;
    }
  }
});

export const { createBlog, setBlogs } = blogSlice.actions;
export default blogSlice.reducer;

export const fetchBlogs = createAction('blogs/fetchBlogs', function prepare() {
  return {
    payload: {
      success: setBlogs
    }
  };
});

export const selectBlogs = (state) => state.blogs;
