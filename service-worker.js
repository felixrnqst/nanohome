const version = "0.0.1";
const cacheName = `home-${version}`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `/nanohome/`,
        `/nanohome/index.html`,
        `/nanohome/css/style.css`,
        `/nanohome/js/jquery.js`,
        `/nanohome/js/granim.min.js`,
        `/nanohome/js/TweenMax.min.js`,
        `/nanohome/favicon.ico`,
        `/nanohome/img/icon2-shaded.png`,
        `/nanohome/img/icon2-dark-192.png`,
        `/nanohome/img/icon2-dark-512.png`,
        `/nanohome/img/launch-iphone-8.png`
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});
