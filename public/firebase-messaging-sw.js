// importScripts("https://www.gstatic.com/firebasejs/7.8.1/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/7.8.1/firebase-messaging.js");
// importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");
importScripts("https://www.gstatic.com/firebasejs/6.1.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/6.1.0/firebase-messaging.js");

firebase.initializeApp({
  messagingSenderId: "631590918663"
});

// try {
if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging();
} else {
  console.log("Your broswer unsupport notification of cloud messaging !!");
}
// } catch (e) {
//   console.log("Error", e);
// }

// messaging.setBackgroundMessageHandler(function(payload) {
// console.log("payload FCM:", payload);

// const promiseChain = clients
//   .matchAll({
//     type: "window",
//     includeUncontrolled: true
//   })
//   .then(windowClients => {
//     for (let i = 0; i < windowClients.length; i++) {
//       const windowClient = windowClients[i];
//       windowClient.postMessage({
//         msg: "Hey I just got a fetch from you!",
//         url: event.request.url
//       });
//     }
//     console.log(windowClients, "windowclients");
//   })
//   .then(() => {
//     return registration.showNotification("The Wind Blows");
//   });
// return promiseChain;

// console.log(
//   "[firebase-messaging-sw.js] Received background message ",
//   payload
// );
// // Customize notification here
// const notificationTitle = "The Wind Blows";
// const notificationOptions = {
//   body: "Background Message body.",
//   icon: "/favicon.ico"
// };

// return self.registration.showNotification(
//   notificationTitle,
//   notificationOptions
// );
// });

self.addEventListener("notificationclick", event => {
  if (event.action) {
    clients.openWindow(event.action);
  }
  event.notification.close();
});
