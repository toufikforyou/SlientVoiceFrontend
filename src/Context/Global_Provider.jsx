import { createContext } from "react";
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const GlobalContext = createContext(null);
const Global_Provider = ({children}) => {
    const name = "Minhajul Islam";
    
    

    const globalData = {
        name
    }
    return (
        <GlobalContext.Provider value={globalData}>
            {children}
        </GlobalContext.Provider>
    );
};

export default Global_Provider;