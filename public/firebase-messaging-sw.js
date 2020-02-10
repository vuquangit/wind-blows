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

      // console.log('[firebase-messaging-sw.js] Received background message ', payload);
      // // Customize notification here
      // const notificationTitle = 'Background Message Title';
      // const notificationOptions = {
      //   body: 'Background Message body.',
      //   icon: '/firebase-logo.png'
      // };
      // return self.registration.showNotification(notificationTitle,
      //   notificationOptions);
    });
  return promiseChain;
});

self.addEventListener("notificationclick", event => {
  if (event.action) {
    clients.openWindow(event.action);
  }
  event.notification.close();
});
