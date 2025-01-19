import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.init";

export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    } 
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const updateProfileUser = (name, photo) => {
       return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
          })
    }
     
    const logoutUser = () => {
        setLoading(true);
        return signOut(auth)
    }

    const authInfo = {
        user, setUser, loading, createUser, loginUser, logoutUser, updateProfileUser, googleSignIn
    }
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser);
            setUser(currentUser)
        })

        return () => {
            unsubscribe()
        }
    }, [])
    return (
        <div>
               <AuthContext.Provider value={authInfo}>
                    {children}
                </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;