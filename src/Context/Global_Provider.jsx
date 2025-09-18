import { createContext, useState , useEffect } from "react";
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../../firebase.config";

export const GlobalContext = createContext(null);
const Global_Provider = ({ children }) => {
    const name = "Minhajul Islam";
    const [globalLoading , setGlobalLoading] = useState(false);
    const auth = getAuth(app);
    const [user , setUser] = useState(null);
    const google_provider = new GoogleAuthProvider();

    const connect_google = () => {
        setGlobalLoading(true);
        return signInWithPopup(auth, google_provider);
    }
    const log_out = () => {
        return signOut(auth);
    }

     useEffect(()=>{
        // holds the user
        const unsubscirbe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            setGlobalLoading(false);
            if(currentUser){
                // issue a token
                console.log(currentUser);
            }else{
                // remove the token
                console.log("User logged out!")
            }
        });

        return ()=>{
            unsubscirbe();
        }

    },[])


    const globalData = {
        name, connect_google, log_out , globalLoading
    }
    return (
        <GlobalContext.Provider value={globalData}>
            {children}
        </GlobalContext.Provider>
    );
};

export default Global_Provider;