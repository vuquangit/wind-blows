import firebase from 'firebase/app'
import { messaging } from 'Firebases/init-fcm'
import { get, isEmpty } from 'lodash'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || ''

const registerServiceWorker = () => {
  // register service worker & handle push events
  if ('serviceWorker' in navigator) {
    if (firebase.messaging.isSupported()) {
      window.addEventListener('load', async () => {
        await navigator.serviceWorker
          .register('/firebase-messaging-sw.js', {
            updateViaCache: 'none'
          })
          .then(registration => {
            messaging.useServiceWorker(registration)
            messaging.onMessage(payload => {
              const title = payload.notification.title
              const options = {
                body: get(payload, 'notification.body', ''),
                icon: get(payload, 'notification.icon', ''),
                actions: [
                  !isEmpty(payload.fcmOptions.link)
                    ? {
                      action: `${SERVER_BASE_URL}${payload.fcmOptions.link}`,
                      title: 'The Wind Blows'
                    }
                    : {}
                ]
              }
              registration.showNotification(title, options)
            })
          })
          .catch(function(err) {
            console.log('Service worker registration failed, error:', err)
          })
      })
    }
  }
}

export { registerServiceWorker }
