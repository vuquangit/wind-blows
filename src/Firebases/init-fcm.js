// // import firebase from "firebase/app";
// // import "firebase/messaging";
// // import firebaseConfig from "./firebaseConfig";
import Firebase from "./firebase";

// // const initializedFirebaseApp =  firebase.initializeApp(firebaseConfig)

const messaging = Firebase.messaging();

messaging.usePublicVapidKey(
  "BBFbokjOHibO5X1rxmzA5lr-lymikGzVZLLv5MteZmcH5nwThTq_DOKzTDGyQy8y3GUqEPraLK20sI4f9i1ffsY"
);

export { messaging };
