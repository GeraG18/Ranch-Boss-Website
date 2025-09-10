import { useTranslations } from "next-intl";
import React from "react";

function Developex(){
    //#region view
    const t = useTranslations("Developex");

    return(
        <div className="relative font-['lora']">
            <div className="absolute w-full h-full bg-[url(/Images/headerImage.webp)]
            bg-center bg-cover bg-no-repeat z-5 brightness-[0.35] contrast-[1.05]">
            </div>  

            <div className="filter-none flex flex-col items-start justify-end relative
            overflow-hidden py-4 mx-4 h-40 lg:h-56 lg:max-w-screen-lg  
            xl:mx-auto">
                <h2 className="z-30 text-white font-['lora'] font-bold leading-4
                text-[0.875rem] text-shadow lg:text-[1.5rem] lg:leading-[1.75rem] h-auto lg:h-[2.5rem] uppercase"
                >{t('subtitle')}</h2>
                <h1 className="z-30 text-white uppercase text-start lg:text-start"
                >
                {
                    t.rich('title', {
                        white: (chunks) => <span className="z-30 text-white font-['lora'] font-bold leading-10 uppercase text-[2rem] text-shadow lg:text-[2.5rem] lg:leading-[2.75rem] h-auto lg:h-[3.5rem]">{chunks}</span>,
                        orange: (chunks) => <span className="z-30 text-primary-light-color font-['lora'] font-bold leading-10 uppercase text-[2rem] text-shadow lg:text-[2.5rem] lg:leading-[2.75rem] h-auto lg:h-[3.5rem]">{chunks}</span>,
                    })
                }
                </h1>
            </div>
        </div>
    );
    //#endregion
}

export default Developex