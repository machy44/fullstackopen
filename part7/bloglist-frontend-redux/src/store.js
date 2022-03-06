import { configureStore } from '@reduxjs/toolkit';
import { logsMdl } from './middlewares/log';
import { blogsApiMdl } from './blog/redux/blogsApiMiddleware';
import blogReducer from './blog/redux/blogReducer';

export const store = configureStore({
  reducer: { blogs: blogReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([...logsMdl, ...blogsApiMdl])
});
