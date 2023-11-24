/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
// import axios from "axios";

const provider = new GoogleAuthProvider();

export const context = createContext(null);

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      // const userEmail = currentUser?.email || user?.email;
      // const loggedEmail = { email: userEmail };
      setUser(currentUser);
      console.log(currentUser);
      setLoading(false);
      // // if user exist than issue a token
      // if (currentUser) {
      //   axios
      //     .post("https://rhr-hotel-server.vercel.app/jwt", loggedEmail, {
      //       withCredentials: true,
      //     })
      //     .then((res) => console.log(res.data));
      // } else {
      //   axios
      //     .post("https://rhr-hotel-server.vercel.app/logout", loggedEmail, {
      //       withCredentials: true,
      //     })
      //     .then((res) => console.log(res.data));
      // }
    });
    return () => unSubscribe;
  }, [user?.email]);

  const authInfo = {
    user,
    loading,
    createUser,
    logInUser,
    logOutUser,
    googleLogIn,
  };
  return <context.Provider value={authInfo}>{children}</context.Provider>;
};

export default Provider;
