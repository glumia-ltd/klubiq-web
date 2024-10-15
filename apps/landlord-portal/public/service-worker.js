const DATA_CACHE = 'klubiq-data-cache-v1';
const ALLOWED_ORIGINS = ['https://klubiq.com', 'http://localhost:5173'];
const PUBLIC_CACHED_PATHS = ['/api/public/property-metadata'];

self.addEventListener('sync', (event) => {
	if (event.tag === 'syncFormData') {
		event.waitUntil(syncFormData());
	}
});
self.addEventListener('fetch', (event) => {
	const requestURL = new URL(event.request.url);
	const eventOrigin = requestURL.origin;
	const path = requestURL.pathname;
	console.log('Headers', event.request.headers.keys);
	async function returnPublicCachedResponse() {
		// open app's cache
		const cache = await caches.open(DATA_CACHE);
		// find response in cache
		const cachedResponse = await cache.match(event.request.url);
		if (cachedResponse) {
			return cachedResponse;
		} else {
			const fetchResponse = await fetch(event.request.url);
			const responseCopy = fetchResponse.clone();
			cache.put(event.request.url, responseCopy);
			return fetchResponse;
		}
	}
	if (event.request.method !== 'GET') {
		return;
	} else if (
		ALLOWED_ORIGINS.includes(eventOrigin) &&
		PUBLIC_CACHED_PATHS.includes(path)
	) {
		console.log('PATH', path);
		event.respondWith(returnPublicCachedResponse());
	}
});

self.addEventListener('install', (event) => {
	async function initCache() {
		const hasCaches = await caches.has(DATA_CACHE);
		if (!hasCaches) {
			caches.open(DATA_CACHE);
		}
	}
	self.skipWaiting();
	event.waitUntil(initCache());
});

self.addEventListener('activate', (event) => {
	var validCaches = [DATA_CACHE];
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (!validCaches.includes(cacheName)) {
						return caches.delete(cacheName);
					}
				}),
			).then(() => self.clients.claim());
		}),
	);
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
