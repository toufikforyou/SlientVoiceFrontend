import { createContext, useState, useEffect } from "react";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../../firebase.config";
import axiosPublic from "../api/axiosPublic";

export const GlobalContext = createContext(null);
const Global_Provider = ({ children }) => {
    const name = "Minhajul Islam";
    const [globalLoading, setGlobalLoading] = useState(false);
    const auth = getAuth(app);

    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const google_provider = new GoogleAuthProvider();

    const connect_google = () => {
        setGlobalLoading(true);
        return signInWithPopup(auth, google_provider);
    }
    const log_out = () => {
        return signOut(auth);
    }

    useEffect(() => {
        // holds the user
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setGlobalLoading(false);
            if (currentUser) {
                try {
                    // issue a token
                    console.log("firebase connected");
                    const res = await axiosPublic.post("/auth", {
                        uid: currentUser.uid,
                    });
                    const user = {
                        name: res.data.data.username,   
                        id: res.data.data._id
                    }
                    const token = res.data.data.token;
                    console.log(res)
                    sessionStorage.setItem("access-token", token);
                    sessionStorage.setItem("user", JSON.stringify(user));
                } catch (error) {
                    console.log("Error fetching token:", error);
                }
            } else {
                // remove the token
                sessionStorage.clear();
                console.log("User logged out!");
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);


    const globalData = {
        name, connect_google, log_out, globalLoading , user
    }
    return (
        <GlobalContext.Provider value={globalData}>
            {children}
        </GlobalContext.Provider>
    );
};

export default Global_Provider;