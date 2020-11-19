import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCTcjQ9CSiGDj8g8gpP7J9XWZnDMr9ZrVU",
  authDomain: "mujersegura-58f6e.firebaseapp.com",
  databaseURL: "https://mujersegura-58f6e.firebaseio.com",
  projectId: "mujersegura-58f6e",
  storageBucket: "mujersegura-58f6e.appspot.com",
  messagingSenderId: "578063333154",
  appId: "1:578063333154:web:79a874d807cbbc1095177b",
  measurementId: "G-WXT0PPE9LJ"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export const auth = firebase.auth();
