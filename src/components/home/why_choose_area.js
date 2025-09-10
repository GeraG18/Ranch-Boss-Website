// 'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RibbonText from "@/components/general/ribbon_text";

const WhyChooseArea = () => {

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

    const toBase64 = (str) => (
        typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str)
    );    

    return (
        <div className="w-full min-h-16 flex flex-col items-center">
            <div className="relative w-full h-[32rem]">
                <div className="absolute justify-self-center top-[20%] z-30 flex flex-col items-center justify-center">
                    <span className="w-full text-white text-shadow font-['oswald'] font-medium text-[1.75rem] leading-10 flex flex-wrap gap-1 lg:gap-2 items-center justify-center text-center col-start-1 col-end-4 row-start-1 lg:text-[2.5rem] lg:leading-12">
                        WHY CHOOSE
                    </span>
                    <span className="w-full text-white text-shadow font-['oswald'] font-medium text-[1.75rem] leading-10 flex flex-wrap gap-1 lg:gap-2 items-center justify-center text-center col-start-1 col-end-4 row-start-1 lg:text-[2.5rem] lg:leading-12">
                        RANCH BOSS?
                    </span>
                    <RibbonText text="Take a closer look" className="mt-4"/>
                </div>
                <div className="absolute top-0 left-0 w-full h-full mask-b-from-20% mask-b-to-80% opacity-80">
                    <div className="absolute top-0 left-0 w-full h-full bg-tertiary-color/60 z-20" />
                    <Image className="motion-safe:transition-all motion-safe:duration-300 z-10 blur-[1px]
                        motion-reduce:transition-none will-change-auto saturate-50 grayscale-60 brightness-90
                        mask-b-from-20% mask-b-to-80%"
                        alt='Get your next quality trailer by Horizon Trailers'
                        priority={true}
                        src="/Images/moomoo.webp"
                        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer("100%", "100%"))}`}
                        quality={80}
                        fill
                        sizes="80vw"
                        style={{
                            objectFit: "cover",
                        }}
                    />
                </div>
            </div>
            <div className="bg-white -mt-[10rem] flex gap-6 flex-col p-6 justify-center items-center lg:gap-0 mx-4 max-w-screen-lg h-fit z-80
                lg:w-full lg:mx-auto shadow-md">
                <div className="flex m-4 w-full lg:mx-auto max-w-screen-lg flex-col gap-1 items-center justify-center">
                    {/* DIVIDER HERE */}
                    <div className="w-full h-0.5 bg-secondary-color"></div>
                    <div className="w-3/4 h-0.5 bg-secondary-color"></div>
                </div>
                <p style={{wordWrap: "break-word",}} className="font-['lora'] font-semibold text-[1rem] text-center flex items-center self-center justify-self-center m-0">
                    At Ranch Boss, we build livestock trailers for those who demand the best for their animals and their business. Inspired by the spirit of the Old West, our trailers are engineered to be tough, reliable, and safe. When you choose us, you're not just buying a trailer—you're investing in a brand that stands for unwavering durability, peak performance, and a deep commitment to animal welfare.
                </p>
                <div className="flex m-4 w-full lg:mx-auto max-w-screen-lg flex-col gap-1 items-center justify-center">
                    <div className="w-3/4 h-0.5 bg-secondary-color"></div>
                    <div className="w-full h-0.5 bg-secondary-color"></div>
                    {/* DIVIDER HERE */}
                </div>
            </div>
            <div className="grid grid-cols-2 p-6 justify-center items-center lg:gap-0 mx-4 max-w-screen-lg h-fit z-80 lg:w-full lg:mx-auto mt-4 min-h-90">
                <div className="flex flex-col items-center justify-start">
                    <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                </div>
                <div className="flex flex-col items-center justify-start">
                    <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                </div>
            </div>
        </div>
    ) 
}  

export default WhyChooseArea;