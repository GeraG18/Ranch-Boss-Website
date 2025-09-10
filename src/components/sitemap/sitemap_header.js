import { useTranslations } from "next-intl";
import React from "react";

function SitemapHeader(){
    //#region view
    const t = useTranslations('PagesTitles')
    return(
        <div className="relative">
            <div className="absolute w-full h-full bg-[url(/Images/headerImage.webp)] bg-center
            bg-cover bg-no-repeat motion-safe:transition-all motion-reduce:transition-none will-change-auto 
            motion-safe:duration-300 z-5 brightness-[0.35] contrast-[1.05]"></div>  
            
            <div className="relative z-20 filter-none flex flex-col gap-2 items-center justify-center overflow-hidden
            py-4 mx-4 max-w-screen-lg  h-40 sm:flex-row lg:gap-4 lg:h-56 xl:mx-auto">
                <h1 className="font-['lora'] uppercase font-medium leading-9
                text-[3rem] text-white lg:text-[5rem] lg:leading-[4.2rem]">{t('sitemap')}</h1>
            </div>
        </div>
    );
    //#endregion
}

export default SitemapHeader