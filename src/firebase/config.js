import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB-wh8MnA0X5P5V6MTxNaa6SKdt2pWJic8",
    authDomain: "fir-6f108.firebaseapp.com",
    projectId: "fir-6f108",
    storageBucket: "fir-6f108.appspot.com",
    messagingSenderId: "974521576690",
    appId: "1:974521576690:web:9264cdc8ac78dd4442f46b",
    measurementId: "G-WJK18CRQQS"
};

firebase.initializeApp(firebaseConfig);

export default firebase