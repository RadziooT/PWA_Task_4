if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(function() {
            console.log('Service worker registered correctly');
        })
        .catch(function(error) {
            console.error('Error during service worker registration:', error);
        });
}
