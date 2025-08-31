import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/react';
import { AuthType } from './authType';
import { RootState } from '..';
import { UserProfile } from '../../shared/auth-types';

const initialState: AuthType = {
	user: {} as UserProfile,
	isSignedIn: false,
};

const options = {
	name: 'auth',
	initialState,
	reducers: {
		saveUser: (state: AuthType, action: PayloadAction<AuthType>) => {
			state.user = action.payload.user;
			state.isSignedIn = action.payload.isSignedIn;
		},
		removeUser: (state: AuthType) => {
			state.user = {} as UserProfile;
			state.isSignedIn = false;
		},
		resetAuth: () => initialState,
	},
};

const authSlice = createSlice(options);

export const { saveUser, removeUser, resetAuth } = authSlice.actions;

export const getAuthState = (state: RootState) => state.auth;

const authReducer = authSlice.reducer;

export default authReducer;
