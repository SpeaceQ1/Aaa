const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  '/index.html',
  '/maks.png',
  '/godlo.gif',
  '/flaga/', // Katalog z animacjami flagi
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/style.css', // Dodaj inne zasoby, jeśli są w projekcie
];

// Instalacja Service Workera
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Obsługa zapytań sieciowych
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Aktualizacja Service Workera
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});
