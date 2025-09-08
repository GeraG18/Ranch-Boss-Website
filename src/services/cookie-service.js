import CryptoJS,{ AES } from "crypto-js";

const setCookie = (cookieName, value, expirationDays = 0.25) => {
    const d = new Date();
    d.setTime(d.getTime() + (expirationDays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cookieName + "=" + (AES.encrypt(JSON.stringify(value), process.env.NEXT_PUBLIC_CRYPTOJS_SECRET).toString()) + ";" + expires + ";path=/";
}

const getCookie = (cookieName) => {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
        return JSON.parse((AES.decrypt(c.substring(name.length, c.length), process.env.NEXT_PUBLIC_CRYPTOJS_SECRET)).toString(CryptoJS.enc.Utf8));
        }
    }
    return "";
}

const setInsecureCookie = (cookieName, value, maxAgeDays = 0.25) => {
    let expires = (maxAgeDays*24*60*60);
    document.cookie = `${cookieName}=${(value)}; path=/; max-age=${expires}; SameSite=Lax`;
}

const getInsecureCookie = (cookieName) => {
    if (typeof window !== "undefined") {
        let name = cookieName + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return (c.substring(name.length, c.length));
            }
        }
    }
    return "";
}

const deleteCookie = async (cookieName) => {
    let cookie = `${cookieName}="";expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`
    document.cookie = cookie;
}

export { setCookie, getCookie, deleteCookie, setInsecureCookie, getInsecureCookie };