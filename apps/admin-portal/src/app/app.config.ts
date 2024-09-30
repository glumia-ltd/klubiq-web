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
const recaptchaValidationUrl = env.environment.recaptchaValidationUrl;
const recaptchaDebugToken = env.environment.recaptchaDebugToken;

(self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = recaptchaDebugToken;
export const app = initializeApp(firebaseConfig, env.environment.appName);
const auth = getAuth(app);
auth.setPersistence(browserSessionPersistence);
initializeAppCheck(app, {
	provider: new ReCaptchaV3Provider(recaptchaSiteKey!),
	isTokenAutoRefreshEnabled: true,
});

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
