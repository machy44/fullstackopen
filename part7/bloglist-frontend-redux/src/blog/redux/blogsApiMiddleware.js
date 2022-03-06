const api =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type !== 'blogs/api') {
      return next(action);
    }

    const { apiRequest, success } = action.payload;

    apiRequest().then((data) => dispatch(success(data)));
  };

export const blogsApiMdl = [api];
