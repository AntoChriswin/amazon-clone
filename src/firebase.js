import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkQ750a79wrVv1hb29xwx5gDYddnPz6wM",
  authDomain: "clone-7946c.firebaseapp.com",
  projectId: "clone-7946c",
  storageBucket: "clone-7946c.firebasestorage.app",
  messagingSenderId: "143285261558",
  appId: "1:143285261558:web:ef652ba1b1c12516d488d7",
  measurementId: "G-15D9RWPM43"
};

// 3. Initialize Firebase app
const app = initializeApp(firebaseConfig);

// 4. Initialize services
const db = getFirestore(app);
const auth = getAuth(app);

// 5. Export services
export { db, auth };