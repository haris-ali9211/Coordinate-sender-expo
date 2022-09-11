// // // Import the functions you need from the SDKs you need
// // import { initializeApp } from "firebase/app";
// // // TODO: Add SDKs for Firebase products that you want to use
// // // https://firebase.google.com/docs/web/setup#available-libraries

// // // Your web app's Firebase configuration
// // const firebaseConfig = {
// //   apiKey: "AIzaSyAigBDFpi4QfSPwv-5ey5vnZHSoXdryLPk",
// //   authDomain: "vancoordinate.firebaseapp.com",
// //   databaseURL: "https://vancoordinate-default-rtdb.firebaseio.com",
// //   projectId: "vancoordinate",
// //   storageBucket: "vancoordinate.appspot.com",
// //   messagingSenderId: "918746179952",
// //   appId: "1:918746179952:web:fba74ec0bf24cd88fdc7b5"
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig)

import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";


const  firebaseStack = () =>{
    const firebaseConfig = {
        apiKey: "AIzaSyAigBDFpi4QfSPwv-5ey5vnZHSoXdryLPk",
        authDomain: "vancoordinate.firebaseapp.com",
        databaseURL: "https://vancoordinate-default-rtdb.firebaseio.com",
        projectId: "vancoordinate",
        storageBucket: "vancoordinate.appspot.com",
        messagingSenderId: "918746179952",
        appId: "1:918746179952:web:fba74ec0bf24cd88fdc7b5"
      };
    const app = initializeApp(firebaseConfig);
    return getDatabase(app)    
}
export default firebaseStack;