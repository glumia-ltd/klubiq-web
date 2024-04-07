import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/react';
import { AuthType } from './authType';

const initialState: AuthType = {
  user: {},
  token: null,
};

const options = {
  name: 'auth',
  initialState,
  reducers: {
    saveUser: (state: AuthType, action: PayloadAction<AuthType>) => {
      return { ...state, userToken: action.payload.token };
    },
    removeUser: (state: AuthType) => {
      return { ...state, user: {}, token: null };
    },
  },
};

const authSlice = createSlice(options);

export const { saveUser, removeUser } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
