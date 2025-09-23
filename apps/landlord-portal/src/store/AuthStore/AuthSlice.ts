import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/react';
import { AuthType } from './authType';
import { RootState } from '..';
import { UserProfile } from '../../shared/auth-types';

const initialState: AuthType = {
	user: {} as UserProfile,
	hasBeginSession: false,
	isSignedIn: false,
};

const options = {
	name: 'auth',
	initialState,
	reducers: {
		beginSession: (state: AuthType) => {
			state.hasBeginSession = true;
		},
		endSession: (state: AuthType) => {
			state.hasBeginSession = false;
		},
		saveUser: (state: AuthType, action: PayloadAction<AuthType>) => {
			state.user = action.payload.user;
			state.isSignedIn = action.payload.isSignedIn;
			state.hasBeginSession = action.payload.hasBeginSession;
		},
		removeUser: (state: AuthType) => {
			state.user = {} as UserProfile;
			state.isSignedIn = false;
			state.hasBeginSession = false;
		},
		resetAuth: () => initialState,
	},
};

const authSlice = createSlice(options);

export const { saveUser, removeUser, resetAuth, beginSession, endSession } = authSlice.actions;

export const getAuthState = (state: RootState) => state.auth;

const authReducer = authSlice.reducer;

export default authReducer;
