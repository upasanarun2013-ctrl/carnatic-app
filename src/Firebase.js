import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA-LtlEYjWEgOabE1U21Zf7ZPl51Jlsk0Q",
  authDomain: "carnatic-app.firebaseapp.com",
  projectId: "carnatic-app",
  storageBucket: "carnatic-app.firebasestorage.app",
  messagingSenderId: "727394157452",
  appId: "1:727394157452:web:de41f19bddac383d2a0ca9",
  measurementId: "G-72Y6HYE4CY"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)