
import { useTranslations } from "next-intl";
import React from "react";

function ContactHeader(){
    const t = useTranslations("PagesTitles");
    //#region view
    return(
        <div className="relative">
            <div className="absolute w-full h-full bg-[url(/Images/headerImage.webp)] bg-center
            bg-cover bg-no-repeat motion-safe:transition-all motion-reduce:transition-none 
            will-change-auto motion-safe:duration-300 z-5 brightness-40 contrast-[1.05]"></div>  

            <div className="relative z-20 filter-none flex flex-col gap-2 items-center justify-center
            py-4 mx-1 h-40 overflow-hidden max-w-(--breakpoint-xl) sm:flex-row lg:gap-4 lg:h-56 xl:mx-auto">
                <h1 className="font-['Michroma'] uppercase font-bold text-[1.75rem] leading-10 flex items-center justify-center text-center col-start-1 col-end-4 row-start-1 lg:text-[2rem] lg:leading-12 text-white">{t('getInTouch')}</h1>
            </div>
        </div>
    );
    //#endregion
}

export default ContactHeader