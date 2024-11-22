import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import axios from "axios";
import getBaseUrl from "../utils/baseURL";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null); // Token for backend authentication

  // Fetch user data from backend and update `currentUser`
  const fetchUser = async (firebaseUser) => {
    if (!firebaseUser) {
      setCurrentUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const idToken = await firebaseUser.getIdToken();
      setToken(idToken);

      const response = await axios.get(`${getBaseUrl()}/api/current-user`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });

      setCurrentUser({
        ...firebaseUser,
        ...response.data, // Merge Firebase user with backend user details
      });
    } catch (error) {
      console.error("Error fetching user:", error?.response?.data || error.message);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Register User
  const registerUser = async (username, email, password, role) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      await axios.post(`${getBaseUrl()}/api/auth/register`, {
        username,
        email,
        password,
        role,
        firebaseUid: firebaseUser.uid,
      });

      console.log("User registered successfully in MongoDB and Firebase");
      await fetchUser(firebaseUser); // Fetch user after registration
    } catch (error) {
      console.error("Error registering user:", error?.response?.data || error.message);
    }
  };

  // Login User
  const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await fetchUser(userCredential.user); // Fetch user details after login
    } catch (error) {
      console.error("Login error:", error?.response?.data || error.message);
      throw error; // Re-throw to handle at the call site
    }
  };

  // Sign In with Google
  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      await fetchUser(userCredential.user); // Fetch user after Google sign-in
    } catch (error) {
      console.error("Google sign-in error:", error?.response?.data || error.message);
    }
  };

  // Logout User
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setToken(null);
    } catch (error) {
      console.error("Logout error:", error?.message);
    }
  };

  // Monitor Firebase authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await fetchUser(firebaseUser); // Fetch additional details if user is authenticated
      } else {
        setCurrentUser(null);
        setToken(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    loading,
    token,
    registerUser,
    loginUser,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Ensure that children are rendered only when loading is false */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
