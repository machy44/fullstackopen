import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'auth',
  initialState: { username: null, token: null, name: null },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.username = payload.username;
      state.name = payload.name;
      state.token = payload.token;
    }
  }
});

export const { setCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
