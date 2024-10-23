import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config"
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const AuthContenxt = createContext();

export const useAuth = () => {
    return useContext(AuthContenxt)
}

const googleProvider = new GoogleAuthProvider();

// Auth Provider
export const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Register User
    const registerUser = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password)
    }

    // Login User
    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password)
    }

    // Sign Up with Google
    const signInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider)
    }

    // Logout User
    const logout = () => {
        return signOut(auth)
    }

    // Manage Users
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);

            if(user) {
                const {email, displayName, photoURL} = user;
                const userData = {
                    email, username: displayName, photo: photoURL
                }
            }
        })
        return () => unsubscribe();
    }, [])

    const value = {
        currentUser,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout
    }
    
    return (
        <AuthContenxt.Provider value={value}>
            {children}
        </AuthContenxt.Provider>
    )
}
 