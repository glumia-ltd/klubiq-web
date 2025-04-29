export const firebaseResponseObject: Record<string, string> = {
	[`Firebase: Error (auth/invalid-action-code).`]:
		'Your email verification link is invalid',
	[`Firebase: Error (auth/invalid-credential).`]: 'Invalid Email or Password',
	sessionStorage: `firebase:authUser:${import.meta.env.VITE_APIKEY}:${import.meta.env.VITE_APPLICATION_NAME}`,
};
