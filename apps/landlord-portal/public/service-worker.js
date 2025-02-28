/* eslint-disable no-undef */
const DATA_CACHE = process.env.REACT_APP_DATA_CACHE; //'klubiq-data-cache-v1';
const ALLOWED_ORIGINS = process.env.REACT_APP_ALLOWED_ORIGINS.split(',');
// [
// 	'https://klubiq.com',
// 	'http://localhost:5173',
// 	'https://dev.klubiq.com',
// ];
const PUBLIC_CACHED_PATHS =
	process.env.REACT_APP_PUBLIC_CACHED_PATHS.split(','); //['/api/public/property-metadata'];
const CACHE_EXPIRATION_TIME = parseInt(
	process.env.REACT_APP_CACHE_EXPIRATION_TIME,
	10,
); //24 * 60 * 60 * 1000; // 24 hours in milliseconds
// self.addEventListener('sync', (event) => {
// 	if (event.tag === 'syncFormData') {
// 		event.waitUntil(syncFormData());
// 	}
// });
self.addEventListener('fetch', (event) => {
	const requestURL = new URL(event.request.url);
	const eventOrigin = requestURL.origin;
	const path = requestURL.pathname;

	async function callServerAndCacheResponse() {
		const fetchResponse = await fetch(event.request.url);
		const responseCopy = fetchResponse.clone();
		cache.put(event.request.url, responseCopy);
		cache.put(
			event.request.url + ':timestamp',
			new Response(Date.now().toString()),
		);
		return fetchResponse;
	}
	async function returnPublicCachedResponse() {
		// open app's cache
		const cache = await caches.open(DATA_CACHE);
		// find response in cache
		const cachedResponse = await cache.match(event.request.url);
		if (cachedResponse) {
			const cachedTime = await cache.match(event.request.url + ':timestamp');
			const currentTime = Date.now();
			if (!cachedTime && cachedResponse) {
				await cache.delete(event.request.url);
				return await callServerAndCacheResponse();
			}
			if (cachedTime && currentTime - cachedTime > CACHE_EXPIRATION_TIME) {
				await cache.delete(event.request.url);
				await cache.delete(event.request.url + ':timestamp');
				return await callServerAndCacheResponse();
				// const fetchResponse = await fetch(event.request.url);
				// const responseCopy = fetchResponse.clone();
				// cache.put(event.request.url, responseCopy);
				// cache.put(
				// 	event.request.url + ':timestamp',
				// 	new Response(currentTime.toString()),
				// );
				// return fetchResponse;
			}
			return cachedResponse;
		} else {
			return await callServerAndCacheResponse();
			// const fetchResponse = await fetch(event.request.url);
			// const responseCopy = fetchResponse.clone();
			// cache.put(event.request.url, responseCopy);
			// cache.put(
			// 	event.request.url + ':timestamp',
			// 	new Response(Date.now().toString()),
			// );

			// return fetchResponse;
		}
	}
	if (event.request.method !== 'GET') {
		return;
	} else if (
		ALLOWED_ORIGINS.includes(eventOrigin) &&
		PUBLIC_CACHED_PATHS.includes(path)
	) {
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
	console.log('Push received', event);
	const data = event.data.json();
	const options = {
		body: data.body,
		icon: '/icon.png',
		badge: '/klubiq-logo.svg',
		title: data.title,
		data: {
			url: data.actionLink,
		},
	};

	event.waitUntil(self.registration.showNotification(data.title, options));
});
self.addEventListener('notificationclick', function (event) {
	event.notification.close();
	event.waitUntil(
		clients.matchAll({ type: 'window' }).then(function (clientList) {
			if (clientList.length > 0) {
				let client = clientList[0];
				for (let i = 0; i < clientList.length; i++) {
					if (clientList[i].focused) {
						client = clientList[i];
					}
				}
				return client.focus();
			}
			return clients.openWindow(event.notification.data.url);
		}),
	);
});
