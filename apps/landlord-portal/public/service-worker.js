const ASSETS_CACHE = 'klubiq-assets-cache-v1';
const DATA_CACHE = 'klubiq-data-cache-v1';

self.addEventListener('sync', (event) => {
	if (event.tag === 'syncFormData') {
		event.waitUntil(syncFormData());
	}
});
self.addEventListener('fetch', (event) => {
	async function returnCachedResponse() {
		// open app's cache
		const cache = await caches.open(DATA_CACHE);
		// find response in cache
		const cachedResponse = await cache.match(event.request.url);
		if (cachedResponse) {
			return cachedResponse;
		} else {
			const fetchResponse = await fetch(event.request.url);
			cache.put(event.request.url, fetchResponse.clone());
			return fetchResponse;
		}
	}
	if (event.request.method !== 'GET') {
		return;
	}
	event.respondWith(returnCachedResponse());
});

self.addEventListener('install', (event) => {
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	event.waitUntil(self.clients.claim());
	event.waitUntil(self.cleanCache());
});

self.addEventListener('push', function (event) {
	const data = event.data.json();
	const options = {
		body: data.body,
		icon: '/icon.png',
		badge: '/klubiq-logo.svg',
	};

	event.waitUntil(self.registration.showNotification(data.title, options));
});
