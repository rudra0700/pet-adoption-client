import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.init";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
    const axiosPublic = useAxiosPublic()
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
            if(currentUser){
                const userInfo = {email: currentUser?.email}
                axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem("access-token", res.data.token);
                        setLoading(false);
                    }
                })
            }else{
                localStorage.removeItem("access-token");
                setLoading(false);
            }
        })

        return () => {
            unsubscribe()
        }
    }, [axiosPublic])
    return (
        <div>
               <AuthContext.Provider value={authInfo}>
                    {children}
                </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;