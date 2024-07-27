import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase.config";

import { useRouter } from "next/router";

async function registerUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log("created user;", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error creating user;", errorCode, errorMessage);
    });
}

async function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("user logged in;", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error logging in user;", errorCode, errorMessage);
    });
}

async function logout() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log("user logged out");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error logging out user;", errorCode, errorMessage);
    });
}

export { registerUser, login, logout };
