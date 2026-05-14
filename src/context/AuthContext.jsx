import { createContext, useContext, useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/firebase";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // firebase need time to check - existing session, saved logintoken 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {   //this is a callback function
            setUser(currentUser);

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value = {user, loading};


    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    );
}


export const useAuth = () => {
    return useContext(AuthContext);
}
