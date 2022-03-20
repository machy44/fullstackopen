import { configureStore } from '@reduxjs/toolkit';
import { logsMdl } from './middlewares/log';
import { blogsApi } from './blog/services/blogs';
import { notificationMdl } from './notification/redux/notificationMiddleware';
import { loginReducer } from './login/redux';
import notificationReducer from './notification/redux/notificationReducer';

export const store = configureStore({
  reducer: {
    [blogsApi.reducerPath]: blogsApi.reducer,
    notifications: notificationReducer,
    auth: loginReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([...logsMdl, ...notificationMdl])
      .concat(blogsApi.middleware)
});
