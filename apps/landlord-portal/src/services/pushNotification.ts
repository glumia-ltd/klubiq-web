import { consoleLog } from "../helpers/debug-logger";

const urlBase64ToUint8Array = (base64String: string) => {
	const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
	const rawData = window.atob(base64);
	return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
};
const publicKey = import.meta.env.VITE_WEB_PUSH_NOTIFICATION_PUBLIC_KEY;
const subscribeUserToPush = async () => {
	if ('serviceWorker' in navigator && 'PushManager' in window) {
		try {
			consoleLog('Requesting service worker registration');
			consoleLog(await navigator.serviceWorker.getRegistration());
			const registrations = await navigator.serviceWorker.getRegistrations();
			if(registrations.length > 0) {
				consoleLog('Registrations: ', registrations);
			} else {
				consoleLog('Noregistration found');
			}
			const registration = await navigator.serviceWorker.ready;
			if(registration) {
				const subscribeOptions = {
					userVisibleOnly: true,
					applicationServerKey: urlBase64ToUint8Array(publicKey),
				};
				return await registration.pushManager.subscribe(subscribeOptions);
			} else {
				consoleLog('No registration found');
			}
			// Send pushSubscription to your server
		} catch (error) {
			console.error('Failed to subscribe the user:', error);
		}
	} else {
		console.warn('Push notifications are not supported by the browser.');
	}
};

export { subscribeUserToPush, urlBase64ToUint8Array };
