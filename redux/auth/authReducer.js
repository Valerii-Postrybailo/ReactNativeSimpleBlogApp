import { createSlice } from '@reduxjs/toolkit';

const state = {
  userId: null,
  name: null,
  email: null,
  avatar: null,
  stateChange: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      name: payload.name,
      email: payload.email,
      avatar: payload.avatar,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    updateUserAvatar: (state, { payload }) => ({
      ...state,
      avatar: payload.avatar,
    }),
    logoutUser: () => state,
  },
});

export default authSlice;