// Nombre del caché
const CACHE_NAME = 'my-pwa-cache';

// Archivos a cachear
const filesToCache = [
     'offline.html',
];

// Evento 'install' para el registro del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(filesToCache);
      })
  );
});

// Evento 'activate' para limpiar cachés antiguos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
});

// Evento 'fetch' para interceptar solicitudes y servir contenido desde el caché
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
