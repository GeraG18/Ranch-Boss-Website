'use client' // Renders on client side
import React, {useState, useEffect,} from "react";
import { useTranslations } from "next-intl";
import { useAlertsProvider } from "@/context/alert_context";
import { pushWallpaperApplication } from "@/services/firebase-service";
import MailCheckIcon from "@/components/icons/mail_check_icon";
import PageSpacer from "@/components/general/page_spacer";

const WallpapersBody = ({lang}) => {
    
    const t = useTranslations('Resources.Wallpapers');
    const { addAlert } = useAlertsProvider();
    
    const [email, setEmail] = useState('');
    const [sended, setSended] = useState(false);

    const isEmailValid = (value) => ( String(value).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) );

    const doWallpaperLogic = () => {
        if(!isEmailValid(email)) {
            addAlert(t('invalid_email'), "warning")
            return;
        }
        pushWallpaperApplication({email, lang});
        setSended(true);
    }

    return(
        <div className={`w-full left-0 top-0 before:bg-black before:w-full before:h-full before:absolute backdrop-saturate-50 backdrop-blur-sm
                z-900 flex flex-col items-center justify-center font-['Montserrat'] h-[90dvh]`}>
            <div className="z-50 w-full h-full absolute top-0 left-0 overflow-hidden opacity-20">
                <div className="z-3 w-[7680px] h-[30vh] bg-[url(/Images/wallpapers-banner.webp)] bg-center
                bg-contain bg-repeat-x animate-left-slide"></div>
                <div className="z-3 w-[7680px] h-[30vh] bg-[url(/Images/wallpapers-banner.webp)] bg-center
                bg-contain bg-repeat-x animate-right-slide"></div>
                <div className="z-3 w-[7680px] h-[30vh] bg-[url(/Images/wallpapers-banner.webp)] bg-center
                bg-contain bg-repeat-x animate-left-slide"></div>
            </div>
            <PageSpacer/>
            <div className="z-100 overflow-hidden relative mx-4 w-full flex flex-col bg-white text-black
                shadow-[rgba(0, 0, 0, 0.15)_0px_2px_10px] rounded-[10px] p-0 md:w-[24rem]">
                    {
                        sended && 
                        <div className={`absolute z-40 h-full font-['Montserrat'] w-full flex flex-col items-center justify-center motion-safe:transition-all 
                            motion-reduce:transition-none will-change-auto motion-safe:duration-300
                            text-[#1C1C1E] bg-white ${sended ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                            <div className="max-w-(--breakpoint-md) xl:mx-auto flex flex-col items-center justify-center overflow-hidden p-2">
                                <MailCheckIcon width="48" height="48" className="text-primary-color w-20 aspect-square"/>
                                <h1 className="font-['Michroma'] font-medium text-[1.5rem] leading-8 text-center w-full
                                flex items-center justify-center uppercase ">{t('thanks')}</h1>
                            </div>
                        </div>
                    }
                    <form onSubmit={(e) => {e.preventDefault(); doWallpaperLogic()}}  
                        name="loginForm" className="p-4 py-8 flex gap-4 justify-center items-center flex-wrap overflow-x-hidden
                        overflow-y-auto">
                        <div className="flex flex-col items-start w-full gap-2">
                            <span className="font-['Michroma'] text-[2rem] w-fit uppercase text-center leading-tight">{t('slogan_title')}</span>
                            <p>{t('slogan_description')}</p>
                            <input type="email" id="usrInput" placeholder="john.doe@horizontrailers.com" 
                            className="border border-[#d5d5d5] rounded-[10px] bg-transparent w-[calc(100%-0.2rem)] h-8 text-[1rem] outline-hidden p-0 pl-[0.2rem] "
                                value={email} onChange={(e) => {setEmail(e.target.value)}} aria-label="Username Input"/>
                        </div>
                        <button type="submit"
                            className="w-full text-[1rem] cursor-pointer text-white bg-primary-color select-none border-none rounded-[10px]
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-300 
                            py-3 px-4 pointer-events-auto lg:w-auto lg:px-10 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium uppercase"
                        >{t('button')}</button>
                    </form>
            </div>
        </div>
    )
}

export default WallpapersBody;