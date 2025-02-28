import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/react';
import { AuthType } from './authType';
import { RootState } from '..';
import { UserProfile } from '../../shared/auth-types';

const initialState: AuthType = {
	user: {} as UserProfile,
	token: null,
	isSignedIn: false,
	orgSettings: {},
	orgSubscription: {},
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
				isSignedIn: action.payload.isSignedIn,
				orgSettings: action.payload.orgSettings,
				orgSubscription: action.payload.orgSubscription,
			};
		},
		removeUser: (state: AuthType) => {
			return { ...state, user: {}, token: null, isSignedIn: false };
		},
	},
};

const authSlice = createSlice(options);

export const { saveUser, removeUser } = authSlice.actions;

export const getAuthState = (state: RootState) => state.auth;

const authReducer = authSlice.reducer;

export default authReducer;
