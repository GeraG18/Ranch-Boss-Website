import { createContext, useContext, useEffect, useState } from "react";
import { Alert, AlertsWrapper } from "../components/general/alert";

const FirebaseContext = createContext();

const FirebaseProvider = ({ children }) => {


    let functions = {

    }

    return (
        <FirebaseContext.Provider value={functions}>
            {children}
        </FirebaseContext.Provider>
    );
};

export default FirebaseProvider;

export const useFirebaseService = () => useContext(FirebaseContext);