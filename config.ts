// const firebase = require("firebase");

import firebase from 'firebase/compat/app'


// import firebase from 'firebase/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth'
const admin = require('firebase-admin')
import { initializeApp, applicationDefault } from 'firebase-admin/app';
// const serviceAccount  = require('')
const path = require('path')
const fs = require('fs')
// console.log(path.resolve(__dirname, "testdemo-firebase-adminsdk.json")    );
const serviceAccount = require('./testdemo-firebase-adminsdk.json')
// const serviceAccount = fs.readFileSync(path.resolve(__dirname, "testdemo-firebase-adminsdk.json"),  {encoding:'utf8', flag:'r'})
// console.log(serviceAccount,'serviceAccount');

// import "firebase/auth";
// import "firebase/compat"

// import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyB_zzZE8I82frfB8v3MKPnXrqNFPOXF5gQ",
    authDomain: "testdemo-fd8bd.firebaseapp.com",
    projectId: "testdemo-fd8bd",
    storageBucket: "testdemo-fd8bd.appspot.com",
    messagingSenderId: "369084338796",
    appId: "1:369084338796:web:7a07f58e845f9a1d45be49",
    measurementId: "G-DBRY2M9K97"
  };
 
  firebase.initializeApp(firebaseConfig)
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://testdemo.firebaseio.com"
});

  const db = firebase.firestore()
  
  const auth = firebase.auth()
  // create user
  // firebase.auth().createUserWithEmailAndPassword("hd@gmail.com", "Hd@123")
  //   .then((userCredential:any) => {
  //   // Signed in
  //   var user = userCredential.user;
  //   console.log(user);
   
  //   })
  //   .catch((error:any) => {
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   console.log(error);
  //   });



  const Users = db.collection("Users")
  // console.log(auth,"auth");
  

  
  module.exports = {auth,Users,admin,firebase};
  // module.exports = Users
  


