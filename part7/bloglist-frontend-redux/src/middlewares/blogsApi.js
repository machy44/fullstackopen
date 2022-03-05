/* eslint-disable indent */
import blogService from '../services/blogs';

const fetchBlogs =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type !== 'blogs/fetchBlogs') {
      return next(action);
    }
    blogService.getAll().then((blogs) => dispatch(action.payload.success(blogs)));
  };

export const blogsApiMdl = [fetchBlogs];
