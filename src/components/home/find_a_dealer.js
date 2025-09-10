// 'use client' // Renders on client side
import React from "react";
import Link from "next/link"
import {useTranslations} from 'next-intl';

function FindADealer(){
    const t = useTranslations('FindADealer');
    return(
        <div className="bg-primary-color h-96 lg:h-64 z-60 static flex justify-center">
            <div className="bg-white absolute -mt-4 flex gap-4 flex-col py-8 px-4 justify-center items-center lg:px-0 lg:gap-0 xl:h-[250px] lg:grid lg:grid-cols-[auto_auto_auto] lg:grid-rows-3 mx-4 max-w-screen-lg  h-fit z-80
                *w-7/8 lg:w-full lg:mx-auto">
                <span className="w-full text-primary-color font-['oswald'] font-medium text-[1.75rem] leading-10 flex flex-wrap gap-1 lg:gap-2 items-center justify-center text-center col-start-1 col-end-4 row-start-1 lg:text-[2.5rem] lg:leading-12">
                    {
                        t('title').split(" ").map((word, index) => (
                            <span className={`[&.last]:text-secondary-color ${t('title').split(" ").length === index + 1 ? "last" : ""}`} key={index}>{word}</span>
                        ))
                    }
                </span>
                <p style={{wordWrap: "break-word",}} className="font-['lora'] font-semibold text-[1rem] text-center flex items-center self-center justify-self-center m-0 col-span-full row-start-2 lg:w-3/5 h-32 lg:h-18">
                    {t('description')}
                </p>
                <Link href="/find-a-dealer" className="col-span-full self-center justify-self-center inline-block font-['oswald'] font-medium no-underline text-white bg-secondary-color px-10 py-3 bg-[length:200%_100%] bg-gradient-to-r from-secondary-color from-50% to-tertiary-color to-50% motion-safe:transition-all duration-500 motion-safe:ease-[cubic-bezier(0.19,1,0.22,1)] delay-50 lg:hover:text-white lg:hover:bg-tertiary-color lg:hover:bg-[-100%_100%]">
                    {t('button')}
                </Link>
            </div>
        </div>
    );
}

export default FindADealer