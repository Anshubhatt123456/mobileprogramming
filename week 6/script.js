// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDwU6TjpDTiGiLrnvfrsw5RNseZqwLq8Vo",
    authDomain: "mobileprogramming-dfda6.firebaseapp.com",
    projectId: "mobileprogramming-dfda6",
    storageBucket: "mobileprogramming-dfda6.firebasestorage.app",
    messagingSenderId: "536170475632",
    appId: "1:536170475632:web:fcf3987849bc01c94184b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

console.log(database);

