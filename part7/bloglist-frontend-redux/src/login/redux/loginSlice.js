import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.username = payload.username;
      state.name = payload.name;
      state.token = payload.token;
    },
    logout: () => {
      return initialState;
    }
  }
});

export const { setCredentials, logout } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state) => {
  return state.auth;
};
