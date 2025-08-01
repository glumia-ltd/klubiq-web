import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store/index.ts';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Optimize service worker registration with cleanup
const updateSW = registerSW({
	onNeedRefresh() {
		// Use a more efficient update check
		const shouldUpdate = window.confirm('New content available. Reload?');
		if (shouldUpdate) {
			updateSW(true); // Force update
		}
	},
	onOfflineReady() {
		console.log('App ready to work offline');
	},
	immediate: false, // Don't register immediately to prevent double initialization
	onRegistered(registration) {
		// Only update if there's a significant change
		if (registration && registration.waiting) {
			registration.update();
		}
	},
});

// Optimize preloader handling
const handlePreloader = () => {
	const preloader = document.querySelector('#loader');
	if (!preloader) {
		return;
	}

	// Use requestAnimationFrame for smoother animation
	const fadeOut = (element: HTMLElement) => {
		let start: number | null = null;
		const duration = 500;

		const animate = (timestamp: number) => {
			if (!start) {
				start = timestamp;
			}
			const progress = timestamp - start;
			const opacity = Math.max(1 - progress / duration, 0);

			element.style.opacity = opacity.toString();

			if (progress < duration) {
				requestAnimationFrame(animate);
			} else {
				element.style.display = 'none';
				// Cleanup
				element.remove();
			}
		};

		requestAnimationFrame(animate);
	};

	fadeOut(preloader as HTMLElement);
};

// Mount React app
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	</React.StrictMode>,
);

// Handle preloader with passive event listener
window.addEventListener('load', handlePreloader, { passive: true });
