self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('mws-restaurant-stage-1').then(cache => {
      return cache.addAll([
        '/',
        '/css/styles.css',
        '/css/responsive.css',
        '/data/restaurants.json',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
      ]);
    })
  )
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).then(function(response) {
      if (response.status==404) {
        return new Response("Not Found!!");
      }
      return response;
    }).cache(function() {
    return new Response("That's Totally Failed!");
        })
  );
});
