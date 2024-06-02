export const authEndpoints = {
	login: () => 'auth/login',
	signup: () => 'auth/landlord-signup',
	emailVerification: () => 'auth/email-verification-link',
	refreshToken: () => 'auth/exchange-refresh-token',
	getUserByFbid: (uid: string) => `auth/user/${uid}`,
	resetPassword: () => `auth/reset-password-link`,
};
