const version = "0.0.1";
const cacheName = `home-${version}`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `/nanolights/`,
        `/nanolights/index.html`,
        `/nanolights/css/style.css`,
        `/nanolights/js/jquery.js`,
        `/nanolights/js/granim.min.js`,
        `/nanolights/js/TweenMax.min.js`,
        `/nanolights/favicon.ico`,
        `/nanolights/img/icon2-shaded.png`,
        `/nanolights/img/icon2-dark-192.png`,
        `/nanolights/img/icon2-dark-512.png`,
        `/nanolights/img/launch-iphone-8.png`
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
