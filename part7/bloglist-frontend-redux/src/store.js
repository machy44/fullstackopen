import { configureStore } from '@reduxjs/toolkit';
import { logsMdl } from './middlewares/log';
import { blogsApi } from './blog/services/blogs';
import { blogMdl } from './blog/blogMiddleware';
import { notificationMdl } from './notification/redux/notificationMiddleware';
import { loginReducer } from './login/redux';
import notificationReducer from './notification/redux/notificationSlice';

export const store = configureStore({
  reducer: {
    [blogsApi.reducerPath]: blogsApi.reducer,
    notifications: notificationReducer,
    auth: loginReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([...logsMdl, ...notificationMdl, ...blogMdl])
      .concat(blogsApi.middleware)
});
