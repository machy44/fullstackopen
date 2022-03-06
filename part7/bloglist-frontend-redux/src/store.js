import { configureStore } from '@reduxjs/toolkit';
import { logsMdl } from './middlewares/log';
import { blogsApiMdl } from './blog/redux/blogsApiMiddleware';
import { notificationMdl } from './notification/redux/notificationMiddleware';
import blogReducer from './blog/redux/blogReducer';
import notificationReducer from './notification/redux/notificationReducer';

export const store = configureStore({
  reducer: { blogs: blogReducer, notifications: notificationReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([...logsMdl, ...notificationMdl, ...blogsApiMdl])
});
