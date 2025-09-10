'use client' // Renders on client side
import React from "react";
import ChatIcon from "../icons/chat_icon";
import PhoneIcon from "../icons/phone_icon";
import Image from "next/image";
import { useTranslations } from "next-intl";

function CallOrChat(){

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
        <div className="bg-[#2a2a2a] py-8">
            <div className="font-['lora'] flex flex-col items-center justify-center bg-cover relative overflow-hidden mx-4
                bg-white h-auto lg:items-center lg:justify-center lg:flex-row lg:h-80 lg:max-w-screen-lg  xl:mx-auto">
                <div className="w-full h-96 bg-center bg-cover bg-no-repeat 
                    motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto
                    z-5 lg:w-auto lg:aspect-square lg:h-full relative">    
                    <Image className="motion-safe:transition-all motion-safe:duration-300 
                        motion-reduce:transition-none will-change-transform"
                        alt="Horizon support guy"
                        priority={true}
                        src="/Images/horizon-support.webp"
                        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer("100%", "100%"))}`}
                        quality={80}
                        fill
                        sizes="50vw"
                        style={{
                        objectFit: "cover",
                        }}
                    />
                </div>
                <div className="w-[calc(100%-4rem)] flex flex-col items-start justify-start m-8">
                    <h2 className="z-10 font-['lora'] text-black text-[1.75rem] leading-10 
                        align-center col-start-1 col-end-4 row-start-1 lg:text-[2rem] lg:leading-12 uppercase font-bold">
                        {
                            t.rich('title', {
                            orange: (chunks) => <span className="z-10 font-['lora'] text-primary-color font-bold text-[1.75rem] leading-10
                            align-center col-start-1 col-end-4 row-start-1 lg:text-[2rem] lg:leading-12">{chunks}</span>,
                            })
                        }
                    </h2>
                    <span className="text-[1.25rem] font-medium">{t('slogan')}</span>
                    <p className="text-[1rem] font-normal">
                        {t('description')}
                    </p>
                    <div className="mt-8 w-[calc(100%-4rem)] h-[calc(100%-4rem)] flex flex-col items-start justify-center gap-4
                        lg:justify-around lg:gap-0 lg:flex-row">
                        <div className="group flex flex-row text-black cursor-pointer items-center gap-4 lg:hover:text-secondary-color
                            motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto" 
                            onClick={() => document.getElementById("floating-action-button").click()}>
                            <div style={{transform:'rotateY(180deg)'}}>
                                <ChatIcon width="28" height="28" color="#6897d8"/>
                            </div>
                            <div className="flex flex-col text-[0.875rem]">
                                <span className="font-bold group-hover:text-primary-color
                                motion-safe:transition-all motion-safe:duration-300 
                                motion-reduce:transition-none will-change-auto">{t('liveChat')}</span>
                                <span className="group-hover:text-primary-color
                                motion-safe:transition-all motion-safe:duration-300 
                                motion-reduce:transition-none will-change-auto">{t('liveChatSlogan')}</span>
                            </div>
                        </div>
                        <a className="group flex flex-row text-black cursor-pointer items-center gap-4 lg:hover:text-secondary-color
                            motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto" 
                            href="tel:+19154558537">
                            <PhoneIcon width="28" height="28" color="#6897d8"/>
                            <div className="flex flex-col text-[0.875rem]">
                                <span className="font-bold group-hover:text-primary-color
                                motion-safe:transition-all motion-safe:duration-300 
                                motion-reduce:transition-none will-change-auto">{t('phone')}</span>
                                <span className="group-hover:text-primary-color
                                motion-safe:transition-all motion-safe:duration-300 
                                motion-reduce:transition-none will-change-auto">{t('phoneSlogan')}</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
    //#endregion
}

export default CallOrChat