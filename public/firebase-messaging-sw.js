// importScripts("https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/7.8.0/firebase-messaging.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");

firebase.initializeApp({
  messagingSenderId: "631590918663"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification("The Wind Blows");
    });
  return promiseChain;
});

self.addEventListener("notificationclick", event => {
  if (event.action) {
    clients.openWindow(event.action);
  }
  event.notification.close();
});
