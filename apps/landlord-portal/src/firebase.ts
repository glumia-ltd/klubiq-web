import { initializeApp } from 'firebase/app';
import { browserSessionPersistence, getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
	authDomain: import.meta.env.VITE_AUTHDOMAIN,
	projectId: import.meta.env.VITE_PROJECTID,
	storageBucket: import.meta.env.VITE_STORAGEBUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
	appId: import.meta.env.VITE_APPID,
	measurementId: import.meta.env.VITE_MEASUREMENTID,
};

const app = initializeApp(
	firebaseConfig,
	import.meta.env.VITE_APPLICATION_NAME,
);
const auth = getAuth(app);
auth.setPersistence(browserSessionPersistence);
export { auth };
