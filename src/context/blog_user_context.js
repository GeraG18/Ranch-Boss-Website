'use client' // Renders on client side
import React, { act, createContext, useContext, useEffect, useState } from "react";
import { deleteCookie, getCookie } from "../services/cookie-service";
import { loginToEditorBlog } from "../services/firebase-service";

const BlogUserContext = createContext({});

const BlogUContext = ({children}) => {

    //#region code
    const [user, setUser] = useState(null);//item=logged null=undetermined false=notlogged

    const setUserVar = (value) => {
        
        setUser(value);
    }
    
    const logOut = () => {
        setUser(false);
        deleteCookie('lgSn')
    }

    const logIn = async (username, password) => {
        let {logged, error} = await loginToEditorBlog(username, password);
        if(error) {
            setUser(false)
            return false;
        }
        await setUserVar(logged)
        return true;
    }

    useEffect(() => {
        let userSession = getCookie('lgSn');
        // // console.log('userSession', userSession);
        
        
        if(userSession) {
            setUser(userSession)
        } else {
            setUser(false)
        }
    }, [])

    //#region view
    return (
        <BlogUserContext.Provider value={{ user, setUserVar, logOut, logIn }}>
            {children}
        </BlogUserContext.Provider>
    );
};

export default BlogUContext;

export const useBlogUserContext = () => useContext(BlogUserContext);