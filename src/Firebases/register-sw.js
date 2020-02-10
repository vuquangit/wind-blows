const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./firebase-messaging-sw.js")
      .then(function(registration) {
        console.log("Registration successful, scope is:", registration.scope);
      })
      .catch(function(err) {
        console.log("Service worker registration failed, error:", err);
      });
  }
};

export { registerServiceWorker };

// // register service worker & handle push events
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', async () => {
//       const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
//           updateViaCache: 'none'
//       });
//       messaging.useServiceWorker(registration);
//       messaging.onMessage((payload) => {
//           const title = payload.notification.title;
//           const options = {
//               body: payload.notification.body,
//               icon: payload.notification.icon,
//               actions: [
//                   {
//                       action: payload.fcmOptions.link,
//                       title: 'Book Appointment'
//                   }
//               ]
//           };
//           registration.showNotification(title, options);
//       });
//   });
// }
