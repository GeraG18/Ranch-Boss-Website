import Image from "next/image";
import React from "react";

function UltimateEfficiencyItem({image, firstText, secondText, alt}){

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
    return (
        <div className="grid grid-cols-4 grid-rows-['55%,15%,15%,15%'] bg-[#181818] p-0 text-center items-center w-full h-full self-center justify-self-center overflow-hidden 
            motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative group">
            {/* <img loading="lazy" alt={alt} src={image} className="h-full w-full object-fill object-center col-start-1 col-end-5 row-start-1 row-end-5 brightness-[0.4] bg-cover bg-center bg-no-repeat
                motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto lg:hover:scale-110"/> */}

            <Image className="brightness-40 motion-safe:transition-all motion-safe:duration-300 
                motion-reduce:transition-none will-change-transform lg:group-hover:scale-110"
                alt={alt}
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
            
            <div className="row-start-4 col-span-full z-10 flex flex-row gap-1 py-4 px-2 text-shadow self-end justify-self-start pointer-events-none lg:px-4 lg:gap-3">
                {
                    firstText.split(' ').map((item, index) => (
                        <span key={item+index} className={`font-['Michroma'] text-[1rem] leading-6 flex items-center justify-center text-center col-start-1 col-end-4 row-start-1 lg:text-[2rem] lg:leading-12 uppercase ${index === firstText.split(' ').length -1 ? "text-primary-light-color" : "text-white"}`}>
                            {item}
                        </span>
                    ))
                }
            </div>
        </div>
    );
    //#endregion
}

export default UltimateEfficiencyItem