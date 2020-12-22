// const app = require('firebase/app');
import app from 'firebase/app';
// require('firebase/functions');
import"firebase/functions";

const firebaseConfig = {
   apiKey: '',
   authDomain: '',
   databaseURL: '',
   projectId: 'covid-tracker-5898',
   storageBucket: '',
   messagingSenderId: '',
   appId: '',
   measurementId: '',
};

app.initializeApp(firebaseConfig);

if (window.location.hostname === 'localhost') {
   console.log("testing locally -- hitting local functions and firestore emulators");
   app.functions().useFunctionsEmulator('http://localhost:5001');
}

export const functions = app.functions();
// export const fieldval = app.firestore.FieldValue;
export default app;

// class Firebase {
//    constructor() {
//       app.initializeApp(firebaseConfig);

//       if (window.location.hostname === 'localhost') {
//          console.log("testing locally -- hitting local functions and firestore emulators");
//          app.functions().useFunctionsEmulator('http://localhost:5001');
//       }
//    }
// }

// export default Firebase;