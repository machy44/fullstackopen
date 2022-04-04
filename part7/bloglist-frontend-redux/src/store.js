import { configureStore } from '@reduxjs/toolkit';
import { logsMdl } from './middlewares/log';
import { blogsApi } from './blog/services/blogs';
import { blogMdl } from './blog/blogMiddleware';
import { notificationMdl } from './notification/redux/notificationMiddleware';
import { loginReducer } from './login/redux';
import notificationReducer from './notification/redux/notificationSlice';
import { usersApi } from './user/userService';

export const store = configureStore({
  reducer: {
    [blogsApi.reducerPath]: blogsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    notifications: notificationReducer,
    auth: loginReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([...logsMdl, ...notificationMdl, ...blogMdl])
      .concat(blogsApi.middleware)
});
