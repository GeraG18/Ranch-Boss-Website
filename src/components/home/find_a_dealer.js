// 'use client' // Renders on client side
import React from "react";
import Link from "next/link"
import {useTranslations} from 'next-intl';

function FindADealer(){
    const t = useTranslations('FindADealer');
    return(
        <>
            <div className="flex gap-4 flex-col py-8 px-4 justify-center items-center lg:px-0 lg:gap-0 xl:h-[250px] lg:grid lg:grid-cols-[auto_auto_auto] lg:grid-rows-3 mx-4 max-w-(--breakpoint-xl) h-fit z-100
                lg:w-full lg:mx-auto">
                <span className="font-['Michroma'] font-bold text-[1.75rem] leading-10 flex items-center justify-center text-center col-start-1 col-end-4 row-start-1 lg:text-[2rem] lg:leading-12">
                    {t('title')}
                </span>
                <p style={{wordWrap: "break-word",}} className="font-['Montserrat'] font-semibold text-[1rem] text-center flex items-center self-center justify-self-center m-0 col-span-full row-start-2 lg:w-3/5 h-32 lg:h-18">
                    {t('description')}
                </p>
                <Link href="/find-a-dealer" className="col-span-full text-white! row-start-3 font-['Montserrat'] cursor-pointer relative border-none bg-primary-color text-[1rem] select-none 
                    motion-safe:transition-all motion-reduce:transition-none will-change-auto py-3 px-10 w-fit rounded-[10px] lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:text-white self-center justify-self-center
                    font-medium">
                    {t('button')}
                </Link>
            </div>
        </>
    );
}

export default FindADealer