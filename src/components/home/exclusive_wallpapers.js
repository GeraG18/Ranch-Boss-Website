// 'use client' // Renders on client side
import React from "react";
import Link from "next/link"
import Image from "next/image";
import { useTranslations } from "next-intl";

function ExclusiveWallpapers(){

    const t = useTranslations('ExclusiveWallpapers');

    const shimmer = (w, h) => `
        <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
            <linearGradient id="g">
            <stop stop-color="#333" offset="20%" />
            <stop stop-color="#222" offset="50%" />
            <stop stop-color="#333" offset="70%" />
            </linearGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="#333" />
        <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
        <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
        </svg>`;
    
    const toBase64 = (str) =>
        typeof window === "undefined"
            ? Buffer.from(str).toString("base64")
            : window.btoa(str);  
    //#region view
    return(
        <Link href="/resources/wallpapers" className="flex flex-col gap-2 text-center items-center justify-end relative overflow-hidden px-4 h-fit
                lg:px-0 lg:max-w-screen-lg  *my-2 lg:my-8 py-4 lg:py-0 lg:mx-auto bg-black cursor-pointer" >
            <div className="flex flex-col text-center items-center justify-end w-full relative overflow-hidden px-4 h-120
                lg:px-0 lg:h-80 lg:max-w-screen-lg  lg:mx-auto object-fill bg-black">
                <Image className="brightness-[0.4] "
                    alt='Wallpapers'
                    priority={true}
                    src="/Images/wallpapers-banner.webp"
                    placeholder={`data:image/svg+xml;base64,${toBase64(shimmer("100%", "100%"))}`}
                    quality={80}
                    fill
                    sizes="100vw"
                    style={{
                    objectFit: "cover",
                    }}
                />
                {/* <Link href="/blog" className="z-10 font-['lora'] cursor-pointer relative mt-5 text-white
                    border-none bg-primary-color text-[1rem] select-none  motion-safe:transition-all 
                    motion-safe:duration-300 motion-reduce:transition-none will-change-auto uppercase
                    py-3 px-8 pointer-events-auto lg:px-9 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium">{t('button')}</Link> */}
            </div>
            <span className="z-10 font-['lora'] text-white font-medium text-[2.25rem] leading-tight text-center
                lg:leading-snug uppercase">
                {
                    t.rich('slogan', {
                    white: (chunks) => <span className="z-10 font-['lora'] text-white font-medium text-[2.25rem] leading-8 text-center ">{chunks}</span>,
                    orange: (chunks) => <span className="z-10 font-['lora'] text-primary-color font-medium text-[2.25rem] leading-8 text-center ">{chunks}</span>,
                    })
                }
            </span>
        </Link>
    );
    //#endregion
}

export default ExclusiveWallpapers