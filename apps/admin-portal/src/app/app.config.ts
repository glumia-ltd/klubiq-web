import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import * as env from '../environments/environment';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp } from 'firebase/app';
import {
	provideHttpClient,
	withFetch,
	withInterceptors,
} from '@angular/common/http';
import { authInterceptor, loaderInterceptor } from './shared/interceptors';
import { getAuth, browserSessionPersistence } from 'firebase/auth';

const firebaseConfig = env.environment.firebase;
export const app = initializeApp(firebaseConfig, env.environment.appName);
const auth = getAuth(app);
auth.setPersistence(browserSessionPersistence);
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
	],
};
