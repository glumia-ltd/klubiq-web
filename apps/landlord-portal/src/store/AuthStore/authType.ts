import { UserProfile } from '../../shared/auth-types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type AuthType = {
	user: UserProfile;
	isSignedIn: boolean;
};
export type PermissionType = `${string}:${'Read'|'Create'|'Update'|'Delete'}`;
export type PermissionVersionType = {
	permissions: PermissionType[];
	version: string;
	set: Set<PermissionType>;
};
