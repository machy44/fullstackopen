import {
  setSuccessNotification,
  removeSuccessNotification,
  setErrorNotification,
  removeErrorNotification
} from '../notification/redux/notificationSlice';
import { endpoints } from '../blog/services/blogs';

const extractActionsMetaData = (actionMeta, endpointName, status) => {
  return (
    actionMeta.arg.type === 'mutation' &&
    actionMeta.arg.endpointName === endpointName &&
    actionMeta.requestStatus === status
  );
};

export const blogCreatedNotification =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    console.log({ endpoints });
    if (action.meta && extractActionsMetaData(action.meta, 'createBlog', 'fulfilled')) {
      console.log(action.meta);
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
    if (action.meta && extractActionsMetaData(action.meta, 'createBlog', 'rejected')) {
      dispatch(setErrorNotification('Creation unsuccessful. Try again!'));
      setTimeout(() => {
        dispatch(removeErrorNotification(null));
      }, 5000);
    }

    return next(action);
  };

export const incrementLikeError =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    console.log(action);
    console.log(action.meta && extractActionsMetaData(action.meta, 'incrementLike', 'rejected'));
    if (action.meta && extractActionsMetaData(action.meta, 'incrementLike', 'rejected')) {
      dispatch(setErrorNotification('Update unsuccessful. Try again!'));
      setTimeout(() => {
        dispatch(removeErrorNotification(null));
      }, 5000);
    }

    return next(action);
  };

export const incrementLikeSuccess =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.meta && extractActionsMetaData(action.meta, 'incrementLike', 'fulfilled')) {
      dispatch(setSuccessNotification('Successfully liked the blog!'));
      setTimeout(() => {
        dispatch(removeSuccessNotification(null));
      }, 5000);
    }

    return next(action);
  };

export const blogMdl = [blogCreatedNotification, blogUnsuccessCreation, incrementLikeError, incrementLikeSuccess];
