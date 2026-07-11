const CACHE_NAME = 'awesome-cache-v1';
const ASSETS_TO_CACHE = [
  '/awesome/',
  '/awesome/index.html',
  '/awesome/manifest.json',
  '/awesome/favicon.svg',
  '/awesome/logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).catch((err) => {
      console.warn('Pre-caching failed during install', err);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Bypass development files / Vite modules / HMR
  if (
    event.request.url.includes('/src/') ||
    event.request.url.includes('/@vite/') ||
    event.request.url.includes('/@id/') ||
    event.request.url.includes('?astro=') ||
    event.request.url.includes('?t=') ||
    event.request.url.includes('hot-update')
  ) {
    return;
  }

  // Only handle local GET requests
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Bypass chrome-extension or external schemes
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // If we have a cached version, serve it and fetch fresh in background (stale-while-revalidate)
      if (cachedResponse) {
        event.waitUntil(
          fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                return caches.open(CACHE_NAME).then((cache) => {
                  cache.put(event.request, networkResponse);
                });
              }
            })
            .catch(() => {
              // Ignore background fetch errors
            })
        );
        return cachedResponse;
      }

      // If not cached, fetch from network
      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }

          // Cache fresh response
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        })
        .catch(() => {
          // If offline and request is an HTML page, serve the home page fallback
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/awesome/');
          }
        });
    })
  );
});
