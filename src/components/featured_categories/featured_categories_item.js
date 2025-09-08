'use client' // Renders on client side
import React from "react";
import Image from "next/image";
import CustomLink from "../general/custom_link";

function FeaturedCategoriesItem ({image, firstText, description, size="w-[50%]", mobileSize="h-[50vh]", responsive="w-full h-[50vh] lg:w-[50%] lg:h-full", url}){

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
        <CustomLink className={`catBlock cursor-pointer grid grid-cols-4 grid-rows-[55%_15%_15%_15%] bg-[#1c1c1e] 
            p-0 text-center items-center self-center justify-self-center overflow-hidden motion-safe:transition-all 
            motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative lg:min-h-88
            group ${responsive} `} 
            href={url}>
            {/* <img  alt="categories item img" src={image} className="lg:group-hover:scale-110 h-full w-full col-start-1 col-end-5 row-start-1 row-end-5 brightness-[0.4] 
                motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto lg:hover:scale-110"/> */}
            <div className="w-full row-start-4 col-start-1 col-end-5 z-10 flex flex-col p-4 self-end justify-self-start pointer-events-none text-shadow">
                <span className="z-10 flex flex-row flex-wrap gap-x-[0.325rem] lg:gap-x-3 pointer-events-none break-normal max-w-full">
                    {
                        firstText.split(' ').map((item, index) => (
                            <span key={item+index} className={`font-['Michroma'] h-fit leading-[1.5rem] uppercase text-[1rem] text-center items-center lg:text-[2rem] lg:leading-[2.5rem] ${index === firstText.split(' ').length -1 ? "text-primary-light-color" : "text-white"}`}>
                                {item}
                            </span>
                        ))
                    }
                </span>
                <span className="font-['Montserrat'] text-[1rem] text-start text-white text-shadow">{description}</span>
            </div>
            {/* <div style={{background:`url(${image})`}} className="content-[''] w-full h-full absolute left-0 top-0 bg-no-repeat! bg-cover!
            bg-center! brightness-[0.4] lg:group-hover:scale-110 motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none
            will-change-auto lg:hover:scale-110">
            </div> */}
            <Image className="brightness-[0.4] motion-safe:transition-all motion-safe:duration-300 
                motion-reduce:transition-none will-change-transform lg:group-hover:scale-110"
                alt={firstText}
                priority={true}
                src={image}
                placeholder={`data:image/svg+xml;base64,${toBase64(shimmer("100%", "100%"))}`}
                quality={80}
                fill
                sizes="50vw"
                style={{
                objectFit: "cover",
                }}
            />
        </CustomLink>
    );
    //#endregion
}

export default FeaturedCategoriesItem
