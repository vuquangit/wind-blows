import firebase from "./firebase";
import { gcmConfig } from "./firebaseConfig";

const messaging = firebase.messaging();

messaging.usePublicVapidKey(gcmConfig);

export { messaging };
