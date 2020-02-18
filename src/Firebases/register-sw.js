import firebase from "firebase";
import { messaging } from "Firebases/init-fcm";

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";

const registerServiceWorker = () => {
  // if ("serviceWorker" in navigator) {
  //   navigator.serviceWorker
  //     .register("./firebase-messaging-sw.js")
  //     .then(function(registration) {
  //       messaging.useServiceWorker(registration);
  //       console.log("Registration successful, scope is:", registration.scope);
  //     })
  //     .catch(function(err) {
  //       console.log("Service worker registration failed, error:", err);
  //     });
  // }

  // register service worker & handle push events
  if ("serviceWorker" in navigator) {
    if (firebase.messaging.isSupported()) {
      window.addEventListener("load", async () => {
        const registration = await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js",
          {
            updateViaCache: "none"
          }
        );

        messaging.useServiceWorker(registration);
        messaging.onMessage(payload => {
          const title = payload.notification.title;
          const options = {
            body: payload.notification.body,
            // icon: payload.notification.icon,
            icon: "",
            actions: [
              {
                action: `${SERVER_BASE_URL}${payload.fcmOptions.link}`,
                title: "The Wind Blows"
              }
            ]
          };
          registration.showNotification(title, options);
        });
      });
    }
  }
};

export { registerServiceWorker };
