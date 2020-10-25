import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBcOz3VpV3bLZmQcTe3i1Cj6ZVRnFjM6ss",
    authDomain: "birthday-react-app.firebaseapp.com",
    databaseURL: "https://birthday-react-app.firebaseio.com",
    projectId: "birthday-react-app",
    storageBucket: "birthday-react-app.appspot.com",
    messagingSenderId: "1054967205381",
    appId: "1:1054967205381:web:d040c69075a4f5949c166c"
  };

  export default firebase.initializeApp(firebaseConfig);