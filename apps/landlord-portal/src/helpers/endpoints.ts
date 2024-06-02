export const authEndpoints = {
	login: () => 'auth/login',
	signup: () => 'auth/landlord-signup',
	emailVerification: () => 'auth/email-verification-link',
	refreshToken: () => 'auth/exchange-refresh-token',
	getUserByFbid: () => `auth/user`,
	resetPassword: () => `auth/reset-password-link`,
};
