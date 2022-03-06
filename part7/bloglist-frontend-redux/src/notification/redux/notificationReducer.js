import { createSlice } from '@reduxjs/toolkit';

const notifications = {
  success: null,
  error: null
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: notifications,
  reducers: {
    setSuccessNotification(state, action) {
      state.success = action.payload;
    },
    removeSuccessNotification(state) {
      state.success = null;
    },
    setErrorNotification(state, action) {
      state.error = action.payload;
    },
    removeErrorNotification(state) {
      state.error = null;
    }
  }
});

export const { setSuccessNotification, removeSuccessNotification, setErrorNotification, removeErrorNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;

export const selectSuccessNotification = (state) => state.notifications.success;
export const selectErrorNotification = (state) => state.notifications.error;
