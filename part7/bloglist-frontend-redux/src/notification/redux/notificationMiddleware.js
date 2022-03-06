import { setSuccessNotification, removeSuccessNotification } from './notificationReducer';

const notification =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.payload?.notification) {
      console.log('notif true');
      const setupNotification = (message) => {
        dispatch(setSuccessNotification(message));

        setTimeout(() => {
          dispatch(removeSuccessNotification(null));
        }, 5000);
      };

      setupNotification('bla bla bla');
    }

    console.log('notif false');
    next(action);
  };

export const notificationMdl = [notification];
