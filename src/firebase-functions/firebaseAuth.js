import * as firebase from 'firebase';
import { auth } from './firebaseConfig';
import { revealErrorMessage, sendEmailMessage } from './firebaseErrors';

import { userSave } from './firebaseStore';

/* ------ LOGOUT -------*/
export const exit = () => {
  auth
    .signOut()
    .then(() => {
      console.log('logOut');
      localStorage.clear()
    })
    .catch((error) => {
      // An error happened.
    });
};

/* ------ SEND EMAIL -------*/
const sendEmail = () => {
  const config = {
    url: 'https://anarativa09.github.io/MujerSegura/#/login',
  };
  const user = firebase.auth().currentUser;
  user
    .sendEmailVerification(config)
    .then(() => {
      sendEmailMessage();
      // Email sent.
    })
    .catch((error) => {
      // An error happened.
    });
};

/* ------ CREAR CUENTA -------*/
export const createNewUser = (email, password, username) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      result.user.updateProfile({
        displayName: username,   
    })
    .then(()=>{
      const user = {
        id: result.user.uid,
        usuario: result.user.displayName,
        correo: result.user.email,
      };
      userSave(user);
      sendEmail();
      exit();
    })
    .catch((error) => {
      revealErrorMessage(error.code);
      throw error;
    });
  })
    .catch((error) => {
      revealErrorMessage(error.code);
      throw error;
    });
};

/* ------ LOGIN USER -------*/
export const loginUser = (email, password) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      if (result.user.emailVerified) {
        // console.log(result.user)
        localStorage.setItem('userSession', JSON.stringify(result.user));
        window.location.hash = '#/home';
      } else {
        exit();
      }
    })
    .catch((error) => {
      revealErrorMessage(error.code);
      throw error;
    });
};

/* ------ AUTH GOOGLE -------*/
/* export const authGoogleAccount = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth
    .signInWithPopup(provider)
    .then((result) => {
      const user = {
        id: result.user.uid,
        usuario: result.user.displayName,
        correo: result.user.email,
        photo: result.user.photoURL,
      };
      userSave(user);
      localStorage.setItem('userSession', JSON.stringify(result.user));
      window.location.hash = '#/home';
    })
    .catch((error) => {
      console.error(error);
    });
}; */

/* ------ AUTH FACEBOOK-------*/




// /* ------ AUTH STATE CHANGED -------*/
// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     const displayName = user.displayName;
//     const email = user.email;
//     const emailVerified = user.emailVerified;
//     const photoURL = user.photoURL;
//     const isAnonymous = user.isAnonymous;
//     const uid = user.uid;

//     // console.log(displayName, email);
//   }
// });


// auth.onAuthStateChanged((user) => {
//   console.log(user);
//   if (user) {
//     setupUI(user);
//   } else {
//     setupUI();
//   }
// });

// const updateUserInfo = ( ) => {
//   const currentUser = auth.currentUser;
//   const name = currentUser.displayName;
//   const photo = currentUser.photoURL
//   const email = currentUser.email;
//   const uid = currentUser.uid;

//   const userData = {
//     // lastloginTime: new Date(), 
//     name:name,
//     email: email,
//     photo:photo  
//   }
//   return db.doc(`/users/${uid}`).set(userData,  {merge: true});
// }


