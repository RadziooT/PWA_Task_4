if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(function() {
            console.log('Service Worker zarejestrowany poprawnie.');
        })
        .catch(function(error) {
            console.error('Błąd podczas rejestracji Service Workera:', error);
        });
}
