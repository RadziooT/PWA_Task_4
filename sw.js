const CACHE_NAME = 'static'

self.addEventListener('install', function(event) {
    //Fires only once per service worker installation
    event.waitUntil(
        caches.open('static').then(function(cache) {
            return cache.addAll([
                '/', //root
                '/index.html',
                '/notes.html',
                '/analytics.html',
                '/index.js',
                '/notes.js',
                '/chart.js',
                '/style.css'
            ]);
        })
    );
});

function isCacheable(request) {
    const url = new URL(request.url);
    return !url.pathname.endsWith(".json");
}

async function cacheFirstWithRefresh(request) {
    const fetchResponsePromise = fetch(request).then(async (networkResponse) => {
        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    });

    return (await caches.match(request)) || (await fetchResponsePromise);
}

self.addEventListener("fetch", (event) => {
    console.log(`Intercepted fetch request with url: ${event.request.url}`)

    if (isCacheable(event.request)) {
        event.respondWith(cacheFirstWithRefresh(event.request));
    }
});
