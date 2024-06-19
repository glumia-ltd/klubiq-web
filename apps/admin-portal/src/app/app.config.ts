import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import * as env from '../environments/environment';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp } from 'firebase/app';

const firebaseConfig = env.environment.firebase;

export const app = initializeApp(firebaseConfig);
export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideAnimationsAsync(),
		{
			provide: 'FIREBASE_APP',
			useFactory: () => app,
		},
	],
};
