import Image from "next/image";
import React from "react";

const MainCarouselItem = ({src}) => {
    
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
    
    return(
        <div className={`bg-carousel-item flex items-center justify-center relative z-40!  h-160 lg:h-176`}>
            <div className="absolute z-100 w-full h-full top-0 left-0 content-[''] text-transparent
                  bg-[radial-gradient(circle,rgba(0,0,0,0)_0%,rgba(0,0,0,0.20)_25%,rgba(0,0,0,0.35)_50%,rgba(0,0,0,0.40)_75%,rgba(0,0,0,0.45)_85%)]"> 
                  </div>
            {/* <div style={{backgroundImage: `url('${src}')`}} className="z-80 w-full h-full absolute top-0 left-0
            bg-no-repeat bg-center bg-cover brightness-40 motion-safe:transition-all motion-safe:duration-300 
            motion-reduce:transition-none will-change-auto"></div> */}
            <Image className="brightness-40 motion-safe:transition-all motion-safe:duration-300 
                motion-reduce:transition-none will-change-auto"
                alt='Get your next quality trailer by Horizon Trailers'
                priority={true}
                src={src}
                placeholder={`data:image/svg+xml;base64,${toBase64(shimmer("100%", "100%"))}`}
                quality={80}
                fill
                sizes="80vw"
                style={{
                objectFit: "cover",
                }}
            />
        </div>
    )
}

export default MainCarouselItem;