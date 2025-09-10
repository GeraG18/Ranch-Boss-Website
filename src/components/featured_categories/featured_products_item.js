import React from "react";
import Image from "next/image";
function FeaturedProductItem({img, firstText, secondText, linkMoreProducts, alt}) {
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
        <div className="flex flex-col items-center relative w-full justify-start lg:w-auto lg:h-full lg:flex-row">
            <div className="inline-block relative h-80 w-full z-100 bg-[#181818] lg:h-full">
                <Image className="brightness-40 motion-safe:transition-all motion-safe:duration-300 
                    motion-reduce:transition-none will-change-auto lg:group-hover:scale-110"
                    alt={alt}
                    priority={true}
                    src={img}
                    placeholder={`data:image/svg+xml;base64,${toBase64(shimmer("100%", "100%"))}`}
                    quality={80}
                    fill
                    sizes="80vw"
                    style={{
                    objectFit: "cover",
                    }}
                />
            </div>

            <div className="shadow-lg bg-white flex-none h-auto lg:h-104 flex flex-col z-100 items-start justify-start p-8 gap-4 lg:w-[20rem] lg:right-0 lg:rounded-lg lg:mb-0 lg:absolute">
                <span className="font-['lora'] font-bold text-[1.25rem] leading-10 flex items-center justify-center text-center col-start-1 col-end-4 row-start-1 lg:text-[1.5rem] lg:leading-10 uppercase">{firstText}</span>
                <p className="font-['lora'] text-[1rem] font-medium h-auto text-left text-black m-0">{secondText}</p>
            </div>
        </div>
    );
    //#endregion
}

export default FeaturedProductItem