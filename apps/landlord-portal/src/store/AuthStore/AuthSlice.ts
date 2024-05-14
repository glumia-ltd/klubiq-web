import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/react';
import { AuthType } from './authType';
import { RootState } from '..';

const initialState: AuthType = {
	user: {},
	token: null,
};

const options = {
	name: 'auth',
	initialState,
	reducers: {
		saveUser: (state: AuthType, action: PayloadAction<AuthType>) => {
			return {
				...state,
				token: action.payload.token,
				user: action.payload.user,
			};
		},
		removeUser: (state: AuthType) => {
			return { ...state, user: {}, token: null };
		},
	},
};

const authSlice = createSlice(options);

export const { saveUser, removeUser } = authSlice.actions;

export const getAuthState = (state: RootState) => state.auth;

const authReducer = authSlice.reducer;

export default authReducer;
