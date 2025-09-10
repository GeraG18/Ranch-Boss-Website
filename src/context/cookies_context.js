'use client' // Renders on client side
import { css, StyleSheet } from "aphrodite";
import { createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const CookiesWrapper = ({ children, cookiesValue }) => {

    //#region view
    return (
        <div className="z-800 pointer-events-none fixed bottom-0 left-0 m-4 max-w-[480px] motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto">
            <div style={{pointerEvents: cookiesValue === null ? 'auto' : 'none', opacity:cookiesValue === null ? '1' : '0'}} 
                className="motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto z-800 py-4 px-8 font-['lora'] bg-white rounded-[10px]
                shadow-xl shadow-[rgba(0,0,0,0.3)] text-black!">
                {children}
            </div>
        </div>
    )
}

const CookieContext = createContext();

const CookiesProvider = ({ children }) => {
  
    const t = useTranslations('CookiesDialog')
    const [canUseCookies, setCanUseCookies] = useState(true);

    const getCanUseCookiesFn = () => {
        let value = localStorage.getItem('ht.can_use_cookies');
        
        setCanUseCookies(value)
    }

    const setCanUseCookiesFn = (value) => {
        localStorage.setItem('ht.can_use_cookies', value)
        setCanUseCookies(value)
    }

    useEffect(() => {
        getCanUseCookiesFn();
    }, [])
    
    return (
        <CookieContext.Provider value={{ canUseCookies }}>
            <CookiesWrapper cookiesValue={canUseCookies}>
                <span style={{fontFamily:'Teko', fontSize:'1.5rem', textTransform:"uppercase", color:"black"}}>
                    {t('title')}
                </span>
                {
                    t.rich('description', {
                        p: (chunks) => <p className="my-2 whitespace-pre-line">{chunks}</p>,
                        link: (chunks) => <Link href="/privacy-policy" 
                        className="text-[#77787b] font-medium text-wrap motion-safe:transition-all motion-safe:duration-300 
                        motion-reduce:transition-none will-change-auto underline decoration-2 underline-offset-4 ml-1 lg:hover:text-[#FF5A16]">{chunks}</Link>
                    })
                }
                <div className="flex flex-row gap-4">
                <div onClick={() => setCanUseCookiesFn(true)} 
                        className="flex flex-row items-center justify-center font-['lora'] text-[1rem] cursor-pointer w-full relative mt-4
                        bg-primary-color border border-primary-color text-white select-none motion-safe:transition-all motion-safe:duration-300 
                        motion-reduce:transition-none will-change-auto py-2 lg:hover:border-secondary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium uppercase">
                        {t('button')}
                    </div>
                </div>

                {/* <div className="flex flex-row gap-4">
                    <div onClick={() => setCanUseCookiesFn(false)} 
                        className="flex flex-row items-center justify-center font-['lora'] text-[1rem] cursor-pointer w-full relative mt-4
                        bg-transparent border border-[#d5d5d5] text-[#4d4d4d] select-none motion-safe:transition-all motion-safe:duration-300 
                        motion-reduce:transition-none will-change-auto py-2 lg:hover:border-primary-color lg:hover:bg-primary-color lg:hover:text-white">
                        CANCEL
                    </div>
                    <div onClick={() => setCanUseCookiesFn(true)} 
                        className="flex flex-row items-center justify-center font-['lora'] text-[1rem] cursor-pointer w-full relative mt-4
                        bg-primary-color border border-primary-color text-white select-none motion-safe:transition-all motion-safe:duration-300 
                        motion-reduce:transition-none will-change-auto py-2 lg:hover:border-secondary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium ">
                        ACCEPT
                    </div>
                </div> */}
            </CookiesWrapper>
            {children}
        </CookieContext.Provider>
    );
};

export default CookiesProvider;

export const useCookiesProvider = () => useContext(CookieContext);