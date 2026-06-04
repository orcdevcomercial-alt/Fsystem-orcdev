import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { getDatabase } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBhljeId94ulh4XitTC78fSw7QmZUocpSc",
  authDomain: "orcdev-53c24.firebaseapp.com",
  databaseURL: "https://orcdev-53c24-default-rtdb.firebaseio.com",
  projectId: "orcdev-53c24",
  storageBucket: "orcdev-53c24.firebasestorage.app",
  messagingSenderId: "39006762113",
  appId: "1:39006762113:web:534ca1614a744e32924980",
  measurementId: "G-TLP6V55X78"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getDatabase(app);