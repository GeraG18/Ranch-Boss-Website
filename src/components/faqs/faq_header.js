import { useTranslations } from "next-intl";
import React from "react";

function FAQHeader(){
    const t = useTranslations('QualityPage')
    //#region view
    return(
        <div className="relative">
            <div className="absolute w-full h-full bg-[url(/Images/headerImage.webp)] bg-center
            bg-cover bg-no-repeat motion-safe:transition-all motion-reduce:transition-none will-change-auto 
            motion-safe:duration-300 z-5 brightness-[0.35] contrast-[1.05]"></div>  
            
            <div className="relative z-20 filter-none flex md:flex-col gap-2 items-center justify-center overflow-hidden
            py-4 mx-4 max-w-(--breakpoint-xl) h-40 flex-row lg:gap-4 lg:h-56 xl:mx-auto">
                <span className="material-symbols-outlined notranslate  text-primary-light-color text-[4rem]! lg:text-[6rem]">
                    verified
                </span>
                <span className="font-['Michroma'] uppercase font-medium
                text-white leading-10 text-[2rem] lg:text-[2.5rem] lg:leading-[2.75rem]">{t('topQuality')}</span>
            </div>
        </div>
    );
    //#endregion
}

export default FAQHeader