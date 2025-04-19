self.addEventListener('install', function(event) {
    //Fires only once per service worker installation
    event.waitUntil(
        caches.open('static').then(function(cache) {
            return cache.addAll([
                '/', //root
                '/index.html',
                '/index.js',
                '/note-logic.js',
                '/style.css'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    console.log(`Intercepted fetch request with url: ${event.request.url}`)
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
