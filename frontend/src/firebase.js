import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABKi4wzXXwyaxYiebFiu5FrcWd64TNUpI",

  authDomain: "digital-udhaar-khata-a0d82.firebaseapp.com",

  projectId: "digital-udhaar-khata-a0d82",

  storageBucket: "digital-udhaar-khata-a0d82.firebasestorage.app",

  messagingSenderId:
    "157863241921",

  appId: "1:157863241921:web:efc68f617ed5dd5728cc40",
};

const app =
  initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider =
  new GoogleAuthProvider();




  