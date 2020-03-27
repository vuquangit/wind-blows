// importScripts("https://www.gstatic.com/firebasejs/7.8.2/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/7.8.2/firebase-messaging.js");
importScripts("https://www.gstatic.com/firebasejs/6.1.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/6.1.0/firebase-messaging.js");

firebase.initializeApp({
  messagingSenderId: "631590918663"
});

if (firebase.messaging.isSupported()) {
  firebase.messaging();
} else {
  console.log("Your broswer unsupport notification of cloud messaging !!");
}

self.addEventListener("notificationclick", event => {
  if (event.action) {
    clients.openWindow(event.action);
  }
  event.notification.close();
});
