import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import * as env from '../environments/environment';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import {
	provideHttpClient,
	withFetch,
	withInterceptors,
} from '@angular/common/http';
import { authInterceptor, loaderInterceptor } from './shared/interceptors';
import { getAuth, browserSessionPersistence } from 'firebase/auth';
import { MessageService } from 'primeng/api';

const firebaseConfig = env.environment.firebase;
const recaptchaSiteKey = env.environment.recaptchaSiteKey;
const recaptchaDebugToken = env.environment.recaptchaDebugToken;

// Set debug token before initializing Firebase
if (recaptchaDebugToken) {
	(self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = recaptchaDebugToken;
}

export const app = initializeApp(firebaseConfig, env.environment.appName);
const auth = getAuth(app);
auth.setPersistence(browserSessionPersistence);

// Initialize App Check with error handling
if (recaptchaSiteKey) {
	try {
		initializeAppCheck(app, {
			provider: new ReCaptchaV3Provider(recaptchaSiteKey),
			isTokenAutoRefreshEnabled: true,
		});
		console.log('App Check initialized successfully');
	} catch (error) {
		console.error('Failed to initialize App Check:', error);
	}
} else {
	console.warn('reCAPTCHA site key is missing. App Check will not be initialized.');
}

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideHttpClient(
			withFetch(),
			withInterceptors([authInterceptor, loaderInterceptor]),
		),
		provideAnimationsAsync(),
		{
			provide: 'FIREBASE_APP',
			useFactory: () => app,
		},
		MessageService,
	],
};
