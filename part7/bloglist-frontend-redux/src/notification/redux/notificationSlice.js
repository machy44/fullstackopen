import { createSlice } from '@reduxjs/toolkit';

const notifications = {
  success: null,
  error: null
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: notifications,
  reducers: {
    setErrorNotification: (state, { payload }) => {
      state.error = payload;
    },
    removeErrorNotification: (state) => {
      state.error = null;
    },
    setSuccessNotification: (state, { payload }) => {
      state.success = payload;
    },
    removeSuccessNotification: (state) => {
      state.success = null;
    }
  }
});

export const { removeErrorNotification, setErrorNotification, setSuccessNotification, removeSuccessNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;

export const selectSuccessNotification = (state) => state.notifications.success;
export const selectErrorNotification = (state) => state.notifications.error;
