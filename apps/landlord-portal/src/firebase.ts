import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { browserSessionPersistence, getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_APIKEY,
	authDomain: import.meta.env.VITE_AUTHDOMAIN,
	projectId: import.meta.env.VITE_PROJECTID,
	storageBucket: import.meta.env.VITE_STORAGEBUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
	appId: import.meta.env.VITE_APPID,
	measurementId: import.meta.env.VITE_MEASUREMENTID,
};
const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

console.log(import.meta.env.VITE_APPLICATION_NAME);
const app = initializeApp(
	firebaseConfig,
	import.meta.env.VITE_APPLICATION_NAME,
);
self.FIREBASE_APPCHECK_DEBUG_TOKEN = import.meta.env.VITE_RECAPTCHA_DEBUG_TOKEN;
const appCheck = initializeAppCheck(app, {
	provider: new ReCaptchaV3Provider(recaptchaSiteKey),
	isTokenAutoRefreshEnabled: true,
});

// self.FIREBASE_APPCHECK_DEBUG_TOKEN = import.meta.env.VITE_RECAPTCHA_DEBUG_TOKEN;
const appCheck = initializeAppCheck(app, {
	provider: new ReCaptchaV3Provider(recaptchaSiteKey),
	isTokenAutoRefreshEnabled: true,
});

const auth = getAuth(app);

auth.setPersistence(browserSessionPersistence);

export { auth };
