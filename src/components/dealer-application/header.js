import { useTranslations } from "next-intl";
import React from "react";

function DealerAppHeader(){
    //#region view
    const t = useTranslations('AboutUs')
    return(
        <div className="relative">
            <div className="absolute w-full h-full bg-[url(/Images/headerImage.webp)] bg-center
            bg-cover bg-no-repeat motion-safe:transition-all motion-reduce:transition-none will-change-auto 
            motion-safe:duration-300 z-5 brightness-[0.35] contrast-[1.05]"></div>  
            
            <div className="relative z-20 filter-none flex flex-col gap-2 items-center justify-center overflow-hidden
            py-4 mx-4 max-w-screen-lg  h-40 sm:flex-row lg:gap-4 lg:h-56 xl:mx-auto">
                {//z-30 text-white font-['lora'] font-bold leading-10 text-[2rem] lg:text-[2.5rem] lg:leading-[2.75rem] h-auto lg:h-[3.5rem]
                    t.rich('headerTitle', {
                        gray: (chunks) => <h1 className="font-['lora'] uppercase font-medium
                        text-[#bdbdbd] leading-10 text-[2rem] lg:text-[2.5rem] lg:leading-[2.75rem]">{chunks}</h1>,
                        white: (chunks) => <h1 className="font-['lora'] uppercase font-medium
                        text-white leading-10 text-[2rem] lg:text-[2.5rem] lg:leading-[2.75rem]">{chunks}</h1>,
                        orange: (chunks) => <h1 className="font-['lora'] uppercase font-medium
                        text-primary-light-color leading-10 text-[2rem] lg:text-[2.5rem] lg:leading-[2.75rem]">{chunks}</h1>,
                    })
                }
            </div>
        </div>
    );
    //#endregion
}

export default DealerAppHeader;