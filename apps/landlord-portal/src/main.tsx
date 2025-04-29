import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/index.ts';
import App from './App.tsx';
import './index.css';

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
				<App />
			</Provider>
		</React.StrictMode>,
	);
});
