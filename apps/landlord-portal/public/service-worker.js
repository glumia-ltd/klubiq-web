self.addEventListener('sync', event => {
  if (event.tag === 'syncFormData') {
    event.waitUntil(syncFormData());
  }
});
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', function(event) {
  const data = event.data.json();

  const options = {
    body: data.body,
    icon: '/icon.png',
    badge: '/klubiq-logo.svg',
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
