import { useTranslations } from "next-intl";
import React from "react";

function Developex(){
    //#region view
    const t = useTranslations("Developex");

    return(
        <div className="relative w-full h-[24rem] lg:h-[32rem]">
            <div className="p-4 absolute justify-self-center bottom-[30%] lg:bottom-[40%] z-30 flex flex-col items-start justify-center w-full max-w-screen-lg">
                <h2 className="z-30 text-white font-['oswald'] leading-4 flex items-center justify-start text-[0.875rem] text-shadow lg:text-[1.5rem] lg:leading-[1.75rem] h-auto lg:h-[2.5rem] uppercase">
                    {t('subtitle')}
                </h2>
                <h1 className="flex flex-wrap flex-row gap-x-2">
                    {
                        t.rich('title', {
                            white: (chunks) => <span className="uppercase wrap-break-word break-normal text-white text-shadow font-['oswald'] font-medium text-[1.75rem] leading-10 flex-wrap lg:text-[2.5rem] lg:leading-12">{chunks}</span>,
                            orange: (chunks) => <span className="uppercase wrap-break-word break-normal text-secondary-color text-shadow font-['oswald'] font-medium text-[1.75rem] leading-10 flex-wrap lg:text-[2.5rem] lg:leading-12">{chunks}</span>,
                        })
                    }
                </h1>
            </div>
            <div className="absolute top-0 left-0 w-full h-full mask-b-from-50% mask-b-to-100% opacity-100">
                <div className="absolute top-0 left-0 w-full h-full bg-tertiary-dark-color/60 z-20" />
                {/* <ImageViewerAlt className="motion-safe:transition-all motion-safe:duration-300 z-10 blur-[1px]
                    motion-reduce:transition-none will-change-auto contrast-150 grayscale-80
                    mask-b-from-50% mask-b-to-100%"
                    alt="Background of why choose us header's component"
                    src="/Images/homeCarousel/one.webp"
                /> */}
                <div className="absolute w-full h-full bg-[url(/Images/homeCarousel/one.webp)]
                    bg-center bg-cover bg-no-repeat z-5 saturate-50 grayscale-60 brightness-90">
                </div> 
            </div>
        </div>
    );
    //#endregion
}

export default Developex;