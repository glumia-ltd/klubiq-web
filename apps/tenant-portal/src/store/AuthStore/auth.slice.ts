import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/react';
import { AuthType } from '../store.types';
import { RootState } from '../index';
import { UserProfile } from '@/shared/types/data.types';

const initialState: AuthType = {
	user: {} as UserProfile,
	isAuthenticated: false,
};

const options = {
	name: 'auth',
	initialState,
	reducers: {
		saveUser: (state: AuthType, action: PayloadAction<AuthType>) => {
			state.user = action.payload.user;
			state.isAuthenticated = action.payload.isAuthenticated;
		},
		removeUser: (state: AuthType) => {
			state.user = {} as UserProfile;
			state.isAuthenticated = false;
		},
		resetAuth: () => initialState,
	},
};

const authSlice = createSlice(options);

export const { saveUser, removeUser, resetAuth } = authSlice.actions;

export const getAuthState = (state: RootState) => state.auth;

const authReducer = authSlice.reducer;

export default authReducer;
