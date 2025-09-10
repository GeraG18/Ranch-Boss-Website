'use client' // Renders on client side
import React from "react";
import ChatIcon from "../icons/chat_icon";
import PhoneIcon from "../icons/phone_icon";
import Image from "next/image";
import { useTranslations } from "next-intl";
import ImageViewerAlt from "../general/image_viewer_alt";
import RibbonText from "../general/ribbon_text";
import Link from "next/link";

function CallOrChatArea(){

    const t = useTranslations('CallOrChat');
    
    const shimmer = (w, h) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
        </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;

    const toBase64 = (str) =>
        typeof window === "undefined"
            ? Buffer.from(str).toString("base64")
            : window.btoa(str);   
    //#region view
    return(
        <div className="py-8">
            <div className="bg-white flex flex-col-reverse lg:flex-row gap-6 lg:gap-0 p-6 justify-center items-center mx-4 max-w-screen-lg z-80
                lg:w-full lg:mx-auto w-full">
                <div className="w-full flex flex-col items-center lg:items-start justify-center gap-4 lg:gap-x-10 lg:gap-y-0 h-100">
                   {
                        t.rich('titleAlt', {
                            blue: (chunks) => <h1 className="font-['oswald'] font-medium uppercase text-[1.75rem] leading-8 lg:text-[2.5rem] lg:leading-[2.75rem] h-auto text-primary-color">{chunks}</h1>,
                            orange: (chunks) => <h1 className="font-['oswald'] font-medium uppercase text-[1.75rem] leading-8 lg:text-[2.5rem] lg:leading-[2.75rem] h-auto text-secondary-color">{chunks}</h1>,
                        })
                    }
                    <p className="font-['lora'] font-semibold h-full">
                        {t('description')}
                    </p>
                    <div className="flex flex-row gap-4">
                        <Link href="tel:+19154558537" className="col-span-full self-center justify-self-center 
                            font-['oswald'] font-medium no-underline text-white bg-secondary-color 
                            px-4 py-3 bg-[length:200%_100%] bg-gradient-to-r from-secondary-color from-50% 
                            to-tertiary-color to-50% motion-safe:transition-all duration-500 !grid !grid-cols-[1fr_auto] items-center
                            motion-safe:ease-[cubic-bezier(0.19,1,0.22,1)] delay-50 lg:hover:text-white gap-2 w-[13.5rem]
                            lg:hover:bg-tertiary-color lg:hover:bg-[-100%_100%]">
                            <div className="flex flex-col text-[0.875rem]">
                                <span className="font-bold group-hover:text-primary-color 
                                motion-safe:transition-all motion-safe:duration-300 uppercase 
                                motion-reduce:transition-none will-change-auto">{t('phone')}</span>
                                <span className="group-hover:text-primary-color text-xs uppercase
                                motion-safe:transition-all motion-safe:duration-300 opacity-60
                                motion-reduce:transition-none will-change-auto">{t('phoneSlogan')}</span>
                            </div>
                            <PhoneIcon width="28" height="28" />
                        </Link>
                        <div onClick={() => document.getElementById("floating-action-button").click()} 
                            className="col-span-full self-center justify-self-center select-none cursor-pointer
                            font-['oswald'] font-medium no-underline text-white bg-secondary-color 
                            px-4 py-3 bg-[length:200%_100%] bg-gradient-to-r from-secondary-color from-50% 
                            to-tertiary-color to-50% motion-safe:transition-all duration-500 grid grid-cols-[1fr_auto] items-center
                            motion-safe:ease-[cubic-bezier(0.19,1,0.22,1)] delay-50 lg:hover:text-white gap-2 w-[13rem]
                            lg:hover:bg-tertiary-color lg:hover:bg-[-100%_100%]">
                            <div className="flex flex-col text-[0.875rem]">
                                <span className="font-bold group-hover:text-primary-color
                                motion-safe:transition-all motion-safe:duration-300 uppercase
                                motion-reduce:transition-none will-change-auto">{t('liveChat')}</span>
                                <span className="group-hover:text-primary-color text-xs
                                motion-safe:transition-all motion-safe:duration-300 opacity-60 uppercase
                                motion-reduce:transition-none will-change-auto">{t('liveChatSlogan')}</span>
                            </div>
                            <div style={{transform:'rotateY(180deg)'}}>
                                <ChatIcon width="28" height="28" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center relative w-full h-100">
                    <RibbonText text={t('ribbon')}/>
                    <div className="flex m-4 w-full lg:mx-auto max-w-screen-lg flex-col gap-1 items-center justify-center">
                        <div className="w-full h-0.5 bg-secondary-color"></div>
                        <div className="w-3/4 h-0.5 bg-secondary-color"></div>
                        {/* DIVIDER */}
                    </div>
                    <ImageViewerAlt className="!h-[18rem] !w-7/8 shadow-md relative
                        motion-reduce:transition-none will-change-auto0 grayscale-60 brightness-140
                        after:content-[''] after:w-full after:h-full after:bg-tertiary-dark-color/50 after:absolute
                        after:left-0 after:top-0 after:2-50" 
                        orientation="portrait" src="/Images/moomoo.webp" 
                        alt="Landscape with a cows into it"
                    />
                    <p className="font-['lora'] font-semibold !w-7/8 mt-2">
                        {t('imageSlogan')}
                    </p>
                    <div className="flex mt-4 w-full lg:mx-auto max-w-screen-lg flex-col gap-1 items-center justify-center">
                        <div className="w-3/4 h-0.5 bg-secondary-color"></div>
                        <div className="w-full h-0.5 bg-secondary-color"></div>
                        {/* DIVIDER */}
                    </div>
                </div>
            </div>
        </div>
    );
    //#endregion
}

export default CallOrChatArea