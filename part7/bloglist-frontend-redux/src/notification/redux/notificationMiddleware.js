import { isRejectedWithValue } from '@reduxjs/toolkit';

import { setErrorNotification, removeErrorNotification } from './notificationSlice';

export const errorNotification =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    try {
      if (isRejectedWithValue(action)) {
        dispatch(setErrorNotification(action.payload.error));
        setTimeout(() => {
          dispatch(removeErrorNotification(null));
        }, 5000);
      }

      return next(action);
    } catch (e) {
      console.log('errorNotification ', e);
    }
  };

export const notificationMdl = [errorNotification];
