// 'use client' // Renders on client side
import React from "react";
import Link from "next/link"
import Image from "next/image";
import { useTranslations } from "next-intl";

function RelantlessPursuit(){

    const t = useTranslations('RelantlessPursuit');

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
        <div className="flex flex-col text-center items-center justify-center relative overflow-hidden px-4 h-120
            lg:p-0 lg:h-80 lg:max-w-(--breakpoint-xl) lg:my-8 lg:mx-auto object-fill bg-black">
            {/* <img alt="relantless background" src="/Images/reantless-background.webp" className="w-full h-full brightness-[0.4] absolute
            motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto object-fill object-center"/> */}
            <Image className="brightness-[0.4] "
                alt='Get your next quality trailer by Horizon Trailers'
                priority={true}
                src="/Images/reantless-background.webp"
                placeholder={`data:image/svg+xml;base64,${toBase64(shimmer("100%", "100%"))}`}
                quality={80}
                fill
                sizes="100vw"
                style={{
                objectFit: "cover",
                }}
            />
            <span className="z-10 font-['Michroma'] text-white font-medium text-[2.25rem] leading-8 text-center
                lg:text-[4.8rem] lg:leading-16 uppercase">
                {
                    //font-['Michroma'] font-bold leading-10 uppercase text-[2rem] text-shadow lg:text-[2.5rem] lg:leading-[2.75rem] h-auto lg:h-[3.5rem]
                    t.rich('slogan', {
                    white: (chunks) => <span className="z-10 text-white font-['Michroma'] font-bold leading-10 uppercase text-[1.5rem] text-shadow lg:text-[2rem] lg:leading-[2.75rem] h-auto lg:h-[3.5rem]">{chunks}</span>,
                    orange: (chunks) => <span className="z-10 text-primary-light-color font-['Michroma'] font-bold leading-10 uppercase text-[1.5rem] text-shadow lg:text-[2rem] lg:leading-[2.75rem] h-auto lg:h-[3.5rem]">{chunks}</span>,
                    })
                }
            </span>
            <Link href="/blog" className="z-10 font-['Montserrat'] cursor-pointer relative mt-5 text-white!
                border-none bg-primary-color text-[1rem] select-none  motion-safe:transition-all 
                motion-safe:duration-300 motion-reduce:transition-none will-change-auto uppercase
                rounded-[10px] py-3 px-8 pointer-events-auto lg:px-9 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium">{t('button')}</Link>
        </div>
    );
    //#endregion
}

export default RelantlessPursuit