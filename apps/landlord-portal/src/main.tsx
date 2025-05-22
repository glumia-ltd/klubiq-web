import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store/index.ts';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';


// Register service worker
const updateSW = registerSW({
	onNeedRefresh() {
	  // Show a prompt to the user
	  if (confirm('New content available. Reload?')) {
		updateSW();
	  }
	},
	onOfflineReady() {
	  console.log('App ready to work offline');
	},
  });

window.addEventListener('load', function () {
	const preloader = document.querySelector('#loader') as HTMLElement;
	if (preloader) {
		const fadeOut = (element: HTMLElement) => {
			let opacity = 1;
			const fadeOutInterval = setInterval(() => {
				if (opacity > 0) {
					opacity -= 0.5;
					element.style.opacity = opacity.toString();
				} else {
					clearInterval(fadeOutInterval);
					element.style.display = 'none';
				}
			}, 500);
		};
		fadeOut(preloader);
	}
	ReactDOM.createRoot(document.getElementById('root')!).render(
		<React.StrictMode>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<App />
				</PersistGate>
			</Provider>
		</React.StrictMode>,
	);
});
