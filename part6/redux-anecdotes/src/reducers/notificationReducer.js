const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case SHOW_NOTIFICATION:
    return action.data;
  case HIDE_NOTIFICATION:
    return '';
  default:
    return state;
  }
};

export const showNotification = (content) => ({
  type: SHOW_NOTIFICATION,
  data: content,
});

export const hideNotification = () => ({
  type: HIDE_NOTIFICATION,
});

export default notificationReducer;
