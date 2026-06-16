  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
  import { getDatabase, set, ref, update, get } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBGMzxzwFyjQ35VgNFUyivpmFQPVb1FJ5A",
    authDomain: "contact-us-82cca.firebaseapp.com",
    projectId: "contact-us-82cca",
    storageBucket: "contact-us-82cca.firebasestorage.app",
    messagingSenderId: "1022340585451",
    appId: "1:1022340585451:web:d6061a3bb29d9cb21febae"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  console.log(db);

  let currentId = null;

// Submit
window.submitData = function () {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    currentId = Date.now().toString();

    set(ref(db, "contacts/" + currentId), {
        id: currentId,
        name,
        email,
        message
    })
        .then(() => {

            // Show values in details form
            document.getElementById("details-name").value = name;
            document.getElementById("details-email").value = email;
            document.getElementById("details-message").value = message;

            alert("Data Submitted");
        })
        .catch((error) => {
            console.log(error);
        });
};

// Edit
window.editData = function () {

    document.getElementById("name").value =
        document.getElementById("details-name").value;

    document.getElementById("email").value =
        document.getElementById("details-email").value;

    document.getElementById("message").value =
        document.getElementById("details-message").value;
};

// Update
window.updateData = function () {

    if (!currentId) {
        alert("Please submit data first.");
        return;
    }

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    update(ref(db, "contacts/" + currentId), {
        name,
        email,
        message
    })
        .then(() => {

            // Update details form
            document.getElementById("details-name").value = name;
            document.getElementById("details-email").value = email;
            document.getElementById("details-message").value = message;

            alert("Data Updated");
        })
        .catch((error) => {
            console.log(error);
        });
};
