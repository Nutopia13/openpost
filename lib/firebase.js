import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
  authDomain: "dev-posts-ffe2b.firebaseapp.com",
  projectId: "dev-posts-ffe2b",
  storageBucket: "dev-posts-ffe2b.appspot.com",
  messagingSenderId: "415111985645",
  appId: "1:415111985645:web:bc4ceac934595ba35d0fe4",
  measurementId: "G-ZNSHG3P461"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Auth
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

//Storage
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;
export const storage = firebase.storage();

// Firestore
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const firestore = firebase.firestore();
export const fromMillis = firebase.firestore.Timestamp.fromMillis
export const increment = firebase.firestore.FieldValue.increment;

export async function getUserWithUsername(username) {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("username", "==", username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}


