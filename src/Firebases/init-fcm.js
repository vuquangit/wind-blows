import firebaseApp from 'firebase/app'
import firebase from './firebase'
import 'firebase/messaging'
import { gcmConfig } from './firebaseConfig'

let messaging = null

if (firebaseApp.messaging.isSupported()) {
  messaging = firebase.messaging()
  messaging.usePublicVapidKey(gcmConfig)
} else {
  console.log('Your broswer unsupport notification of cloud messaging !!')
}

export { messaging }
