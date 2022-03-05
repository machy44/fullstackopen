import { configureStore } from '@reduxjs/toolkit';
import { logsMdl } from './middlewares/log';
import { blogsApiMdl } from './middlewares/blogsApi';
import { blogReducer } from './reducers';

export const store = configureStore({
  reducer: { blogs: blogReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([...logsMdl, ...blogsApiMdl])
});
