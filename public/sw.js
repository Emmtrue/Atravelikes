
// This is a basic service worker.
// It's intentionally left simple for this example.
// In a real production app, you would add caching strategies for assets.

self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
});

self.addEventListener('fetch', (event) => {
  // We are not adding any fetch handling here for simplicity.
  // The browser will handle network requests as usual.
});
