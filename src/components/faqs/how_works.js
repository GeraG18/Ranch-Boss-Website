'use client' // Renders on client side
import { useTranslations } from "next-intl";
import React from "react";

function HowWorks(){
    const t = useTranslations('QualityPage')
    //#region view
    return(
        <div className="bg-[#181818] p-0 relative">
            <div className="font-['lora'] grid grid-rows-[auto_auto] items-center justify-center
            bg-cover relative overflow-hidden w-full h-auto px-4 xl:p-0 lg:grid-cols-2 
            lg:grid-rows-none lg:h-120 lg:mx-auto max-w-screen-lg  xl:h-160">
                <div className="h-[calc(100%-2rem)] text-white py-4 z-50 flex flex-col items-center justify-center">
                    <span className="font-['lora'] uppercase font-bold text-[1.75rem] leading-10 flex items-center justify-center text-center col-start-1 col-end-4 row-start-1 lg:text-[2rem] lg:leading-12">{t('hiwTitle')}</span>
                    <p>
                        {t('hiwDescription')}
                    </p>
                </div>
            </div>
            <div className="w-full h-64 bg-[url(/Images/QualityImage.webp)]
                bg-center bg-cover bg-no-repeat relative mask-image motion-safe:transition-all 
                motion-reduce:transition-none will-change-auto motion-safe:duration-300 z-5
                before:content-[''] before:text-red-500 before:absolute before:top-0 before:left-0
                before:-z-1 before:w-full before:h-80 before:pointer-events-none
                before:bg-[linear-gradient(0deg,rgba(24,24,24,0)_0%,rgba(24,24,24,1)_100%)]
                lg:absolute lg:top-0 lg:right-0 lg:bg-center lg:w-1/2 lg:h-full
                lg:before:content-[''] lg:before:text-red-500 lg:before:absolute lg:before:bottom-0
                lg:before:left-0 lg:before:top-auto lg:before:-z-1 lg:before:w-[20rem] lg:before:h-full
                lg:before:pointer-events-none lg:before:bg-[linear-gradient(270deg,rgba(24,24,24,0)_0%,rgba(24,24,24,1)_100%)]" 
                alt="horizon trailers img"></div>
        </div>
    );
    //#endregion
}

export default HowWorks