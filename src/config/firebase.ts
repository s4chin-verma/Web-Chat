// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDRa71BQU8NtjmEuW7eC1Qm0Pd1xkHuNmU',
  authDomain: 'chat-room-cfff2.firebaseapp.com',
  projectId: 'chat-room-cfff2',
  storageBucket: 'chat-room-cfff2.appspot.com',
  messagingSenderId: '332210139034',
  appId: '1:332210139034:web:d23057f82eb30bd6009423',
  measurementId: 'G-88NN9X42C2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
