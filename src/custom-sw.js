//my-service-worker.js
importScripts('./ngsw-worker.js');
self.addEventListener('notificationclick', (event) => {
    console.log(event.reply)
});