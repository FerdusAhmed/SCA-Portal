import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

// Correct import - named import from authInit.js
import { auth } from '../auth/authInit';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Google Login
  const socialGoogleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Register with Email & Password
  const userRegister = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login with Email & Password
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Update User Profile (name, photoURL, etc.)
  const updateUserProfile = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  };

  // Send Email Verification
  const userEmailVerify = () => {
    return sendEmailVerification(auth.currentUser);
  };

  // Send Password Reset Email
  const userPassRest = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Logout
  const logOut = () => {
    return signOut(auth);
  };

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Value object to be provided through context
  const authInfo = {
    user,
    isLoading,
    setUser,
    socialGoogleLogin,
    userRegister,
    loginUser,
    logOut,
    updateUserProfile,
    userEmailVerify,
    userPassRest,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;