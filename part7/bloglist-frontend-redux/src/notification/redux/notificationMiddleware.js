import { isRejectedWithValue } from '@reduxjs/toolkit';
import { setErrorNotification, removeErrorNotification } from './notificationReducer';

export const errorNotification =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      dispatch(setErrorNotification(action.payload.data.error));
      setTimeout(() => {
        dispatch(removeErrorNotification(null));
      }, 5000);
    }

    return next(action);
  };

export const notificationMdl = [errorNotification];
