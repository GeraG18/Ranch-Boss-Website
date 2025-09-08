'use client' // Renders on client side
import CryptoJS,{ AES } from "crypto-js";

const setLocalStorage = (key, rawValue) => {
    localStorage.setItem(key, (AES.encrypt(JSON.stringify(rawValue), process.env.NEXT_PUBLIC_CRYPTOJS_SECRET).toString()))
}

const getLocalStorage = (key, returnValue = []) => {
    let local = localStorage.getItem(key);
    if(local === null) {
        return returnValue;
    }
    return JSON.parse((AES.decrypt(local, process.env.NEXT_PUBLIC_CRYPTOJS_SECRET)).toString(CryptoJS.enc.Utf8));
}

const deleteLocalStorage = (key) => {
    localStorage.removeItem(key);
}

export { setLocalStorage, getLocalStorage, deleteLocalStorage };