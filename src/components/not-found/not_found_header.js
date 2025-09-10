// 'use client' // Renders on client side
import React from "react";
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl";

const NotFoundHeader = () => {

    const t = useTranslations('NotFound')
    
    //#region view
    return(
        <div className="flex flex-col-reverse w-[calc(100%-2rem)] items-center font-['lora'] lg:h-[60vh] lg:flex-row
            mx-4 py-1 max-w-screen-lg  z-100 xl:mx-auto select-none">
            {/* <div className={css(styles.title)}>OOPS!</div> */}
            <div className="relative w-full flex flex-col gap-4 items-center justify-center h-[30vh]">
                <div className="self-start text-[2rem] inline-block uppercase
                z-10 font-['lora'] lg:text-[3rem]">{t('title')}</div>
                <p className="self-start inline-block z-10 text-[1.25rem]">
                    {t('description')}    
                </p>
                <Link href="/" className="w-fit cursor-pointer relative text-white border-none
                bg-primary-color text-[1rem] motion-safe:transition-all motion-reduce:transition-none 
                    will-change-auto motion-safe:duration-400 py-2 px-[2.6rem] 
                    lg:self-start lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium uppercase">{t('button')}</Link>
            </div>
            <div className="relative w-full flex flex-col items-center justify-center h-[30vh]">
                <div className="relative flex flex-col w-full h-full items-center justify-center">
                    {/* <span>
                        ERROR 404
                    </span> */}
                    <div className="bg-[url(/Images/dumpster.webp)] bg-no-repeat bg-center 
                        bg-cover w-full h-48 z-10"></div>
                </div>
            </div>
        </div>
    );
    //#endregion
}

export default NotFoundHeader;  