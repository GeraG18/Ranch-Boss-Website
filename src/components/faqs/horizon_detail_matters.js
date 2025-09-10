'use client' // Renders on client side
import React from "react";
import Link from "next/link"
import { useTranslations } from "next-intl";
// import "../../css/style.css" 

function HorizonDetailMatters(){
    const t = useTranslations('QualityPage')
    //#region view
    return(
        <div className="flex gap-4 flex-col py-12 px-4 justify-center items-center
            mx-4 max-w-screen-lg  h-fit z-100 xl:mx-auto">
            <span className="font-['lora'] uppercase font-bold text-[1.75rem] leading-10 flex items-center justify-center text-center col-start-1 col-end-4 row-start-1 lg:text-[2rem] lg:leading-12">{t('hdmTitle')}</span>
            <p className="font-['lora'] text-[1rem] inline-block text-center m-0 word-wrap p-0">
                {t('hdmDescription')}
            </p>
        </div>
    );
    //#endregion
}

export default HorizonDetailMatters