import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCsyBAa4Sfp0YBTmktXo43S-R6Dd7a0lOg",
    authDomain: "task-manager-93fe5.firebaseapp.com",
    databaseURL: "https://task-manager-93fe5.firebaseio.com",
    projectId: "task-manager-93fe5",
    storageBucket: "task-manager-93fe5.appspot.com",
    messagingSenderId: "78654203493",
    appId: "1:78654203493:web:3f871ab8965a0854"
  };
  // Initialize Firebase
export default firebase.initializeApp(firebaseConfig);