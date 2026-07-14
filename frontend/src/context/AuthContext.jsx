import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { authAPI } from '../utils/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true until Firebase resolves initial auth state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Mirrors the Firebase profile into MongoDB (name, email, photo, firebaseUid).
  // Non-fatal: if this fails, the user is still signed in via Firebase.
  const syncWithBackend = async () => {
    try {
      await authAPI.sync();
    } catch (err) {
      console.error('Failed to sync user profile with backend:', err);
    }
  };

  const login = async (email, password) => {
    const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
    await syncWithBackend();
    return firebaseUser;
  };

  const register = async (name, email, password) => {
    const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(firebaseUser, { displayName: name });
    await syncWithBackend();
    return firebaseUser;
  };

  const loginWithGoogle = async () => {
    const { user: firebaseUser } = await signInWithPopup(auth, googleProvider);
    await syncWithBackend();
    return firebaseUser;
  };

  const logout = () => signOut(auth);

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const value = { user, loading, login, register, loginWithGoogle, logout, resetPassword };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
