// 'use client' // Renders on client side
import React from "react";
import Link from "next/link"
import LocationRadiusIcon from "../icons/location_radius_icon";
import HorizonIcon from "../icons/horizon_icon";
import { useTranslations } from "next-intl";

function WhyHorizonButtons(){
    const t = useTranslations('WhyHorizon');
    //#region view
    return(
        <div className="flex gap-4 z-200 relative flex-col py-8 px-4 justify-center items-center lg:px-0 lg:gap-0 mx-4 max-w-screen-lg  h-fit lg:w-full lg:mx-auto">
            <span className="font-['lora'] font-bold text-[1.75rem] leading-10 flex items-center justify-center text-center col-start-1 col-end-4 row-start-1 lg:text-[2rem] lg:leading-12 uppercase">
                {t('title')}
            </span>
            <div className="my-4 flex items-start lg:items-center justify-center flex-row flex-wrap sm:justify-between">
                
                <Link href="/quality" className="text-black lg:hover:text-secondary-color font-['lora'] text-[1rem] flex w-2/5 lg:w-1/5 lg:h-auto h-64 
                    motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto
                    px-4 flex-col lg:justify-center items-center capitalize">
                    <div className="material-symbols-outlined notranslate text-[4rem]! text-center w-16 h-16">
                        verified
                    </div>
                    <span className="font-['lora'] text-[1rem] lg:text-[1.5rem] font-bold leading-7 lg:leading-8 text-center">
                        {t('b1Title')}
                    </span>
                    <p className="m-0 text-center">
                        {t('b1Description')}
                    </p>
                </Link>
                <Link href="https://horizontrailers.com" className="text-black lg:hover:text-secondary-color font-['lora'] text-[1rem] flex w-2/5 lg:w-1/5 lg:h-auto h-64 
                    motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto
                    px-4 flex-col lg:justify-center items-center capitalize">
                    <HorizonIcon height="4rem" className="my-1" />
                    <span className="font-['lora'] text-[1rem] lg:text-[1.5rem] font-bold leading-7 lg:leading-8 text-center">
                        {t('b2Title')}
                    </span>
                    <p className="m-0 text-center">
                        {t('b2Description')}
                    </p>
                </Link>
                {/* <Link href="/find-a-dealer" className="text-black lg:hover:text-secondary-color font-['lora'] text-[1rem] flex w-2/5 lg:w-1/5 lg:h-auto h-64 
                    motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto
                    px-4 flex-col lg:justify-center items-center capitalize">
                    <LocationRadiusIcon width="4rem" height="4rem"/>
                    <span className="font-['lora'] text-[1rem] lg:text-[1.5rem] font-bold leading-7 lg:leading-8 text-center">
                        {t('b3Title')}
                    </span>
                    <p className="m-0 text-center">
                        {t('b3Description')}
                    </p>
                </Link> */}
                <Link href="/warranty-docs" className="text-black lg:hover:text-secondary-color font-['lora'] text-[1rem] flex w-2/5 lg:w-1/5 lg:h-auto h-64 
                    motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto
                    px-4 flex-col lg:justify-center items-center capitalize">
                    <HorizonIcon height="4rem" className="my-1" />
                    <span className="font-['lora'] text-[1rem] lg:text-[1.5rem] font-bold leading-7 lg:leading-8 text-center">
                        {t('b4Title')}
                    </span>
                    <p className="m-0 text-center">
                        {t('b4Description')}
                    </p>
                </Link>
            </div>
        </div>
    );
    //#endregion
}

export default WhyHorizonButtons