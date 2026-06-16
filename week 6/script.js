// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
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

//Function to write user data to Firebase Realtime Database
function writeUserData(
    userId,
    firstname,
    middlename,
    lastname,
    gender,
    contact,
    address,
    postcode,
    passportno,
    cgpa,
    remark,
) {
    // Get the database instance
    // const db = getDatabase();

    // Create a reference/points to 'users/{userId}' and set the data (name and email)
    set(ref(database, "users/" + userId), {
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
        gender: gender,
        contact: contact,
        address: address,
        postcode: postcode,
        passportno: passportno,
        cgpa: cgpa,
        remark: remark,
    });
}
writeUserData(
    1,
    "Anshu",
    "ooooooo",
    "Bhatt",
    "Male",
    "9862826628",
    "KTM",
    44500,
    863289369,
    3,
    "Extra Ordinary",
);