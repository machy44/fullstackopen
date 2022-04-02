import {
  setSuccessNotification,
  removeSuccessNotification,
  setErrorNotification,
  removeErrorNotification
} from '../notification/redux/notificationSlice';

export const blogCreatedNotification =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type === 'blogs/executeMutation/fulfilled') {
      dispatch(setSuccessNotification(`a new blog ${action.payload.title} by ${action.payload.author}`));
      setTimeout(() => {
        dispatch(removeSuccessNotification(null));
      }, 5000);
    }

    return next(action);
  };

export const blogUnsuccessCreation =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type === 'blogs/executeMutation/rejected') {
      dispatch(setErrorNotification('Creation unsuccessful. Try again!'));
      setTimeout(() => {
        dispatch(removeErrorNotification(null));
      }, 5000);
    }

    return next(action);
  };

export const blogMdl = [blogCreatedNotification, blogUnsuccessCreation];
