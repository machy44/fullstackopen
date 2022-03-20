import { createSlice } from '@reduxjs/toolkit';

const notifications = {
  success: null,
  error: null
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: notifications,
  reducers: {
    removeErrorNotification: (state) => {
      state.error = null;
    },
    setErrorNotification: (state, { payload }) => {
      state.error = payload;
    },
    setSuccessNotification: (state, { payload }) => {
      state.success = payload;
    },
    removeSuccessNotification: (state) => {
      state.success = null;
    }
  }
});

export const { removeErrorNotification, setErrorNotification } = notificationSlice.actions;

export default notificationSlice.reducer;

export const selectSuccessNotification = (state) => state.notifications.success;
export const selectErrorNotification = (state) => state.notifications.error;
