import { UserProfile } from '../../shared/auth-types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type AuthType = {
	user: UserProfile;
	token: string | null;
	isSignedIn: boolean;
};
