declare module '*.png';
declare module '*.svg';
declare module '*.jpeg';
declare module '*.jpg';
declare global {
	interface Window {
		FIREBASE_APPCHECK_DEBUG_TOKEN?: string;
	}
}
