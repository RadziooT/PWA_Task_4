const CACHE_NAME = 'static'
const GITHUB_PAGES_PREFIX = '/PWA_Task_4'

self.addEventListener('install', function(event) {
    //Fires only once per service worker installation
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll([
                GITHUB_PAGES_PREFIX + '/', //root
                GITHUB_PAGES_PREFIX + '/index.html',
                GITHUB_PAGES_PREFIX + '/notes.html',
                GITHUB_PAGES_PREFIX + '/analytics.html',
                GITHUB_PAGES_PREFIX + '/index.js',
                GITHUB_PAGES_PREFIX + '/notes.js',
                GITHUB_PAGES_PREFIX + '/chart.js',
                GITHUB_PAGES_PREFIX + '/style.css'
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
