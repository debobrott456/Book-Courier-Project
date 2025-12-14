import  { useEffect, useState } from 'react';
import { AuthContext } from './Context';
import { createUserWithEmailAndPassword, onAuthStateChanged,  signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import { GoogleAuthProvider } from 'firebase/auth';

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
const provider = new GoogleAuthProvider();


    const createUser=(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signInUser=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    const signOutUser=()=>{
        return signOut(auth);
    }
    const signInWithGoogle=()=>{
        setLoading(true);
        return signInWithPopup(auth,provider);
    }
   
 useEffect(()=>{
    const unSubscribe=onAuthStateChanged(auth,(currentUser)=>{
        console.log("Current user in auth state ",currentUser)
       setUser(currentUser)
        setLoading(false)

    })
    return ()=>{
        unSubscribe();
    }
   },[])
   



    const authInfo={
        user,
        loading,
        createUser,
        signInUser,
        signOutUser,
        signInWithGoogle,
        
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;