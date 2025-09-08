'use client' // Renders on client side
import React, { useEffect, useState } from "react"
import DumpTrailerShadowIcon from "../icons/dump_trailer_shadow_icon";
import EquipmentTrailerShadowIcon from "../icons/equipment_trailer_shadow_icon";
import FlatdeckTrailerShadowIcon from "../icons/flatdeck_trailer_shadow_icon";
import RolloffTrailerShadowIcon from "../icons/rolloff_trailer_shadow_icon";
import UtilityTrailerShadowIcon from "../icons/utility_trailer_shadow_icon";
import CarHaulerTrailerShadowIcon from "../icons/carhauler_trailer_shadow_icon";

import DovetailBedIcon from "@/components/icons/dovetail_bed_icon";
import FlatdeckBedIcon from "@/components/icons/flatdeck_bed_icon";
import ServiceBedIcon from "@/components/icons/service_bed_icon";
import Image from "next/image";
import { useTranslations } from "next-intl";

const ImageViewer = (params) => {

    //#region code
    const [imgLoading, setImgLoading] = useState(true);
    const [imgError, setImgError] = useState(false);
    const [imgSrc, setImgSrc] = useState('');
    const t = useTranslations('PagesTitles');

    const shimmer = (w, h) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <linearGradient id="g">
        <stop stop-color="#ffffff00" offset="20%" />
        <stop stop-color="#edededaa" offset="50%" />
        <stop stop-color="#ffffff00" offset="70%" />
        </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#ffffff00" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;

    // 

    const toBase64 = (str) =>
        typeof window === "undefined"
            ? Buffer.from(str).toString("base64")
            : window.btoa(str);    


    useEffect(() => {
        // 
        
        if(params.src !== undefined && params.src !== imgSrc){
            setImgLoading(false)
            setImgError(false)
            setImgSrc(params.src)
        }
        // if(params.src !== '' || params.src !== undefined) {

        // }
    }, [params])
    //#endregion

    //#region view
    return(
        <div className={`${params.orientation === 'portrait' ? 'aspect-3/4' : 'aspect-21/9'} w-full object-fill !flex items-center! relative 
            justify-center! image ${params.className || ''} overflow-hidden`}>
            <div className={`w-full h-full flex items-center justify-center ${params.orientation === 'portrait' ? 'rotate-90' : 'rotate-0'}`}>
                {
                    (imgLoading || imgError) &&
                    <>
                        {
                            (params.category || (t('dovetail').replace(' ','').toLowerCase())) === (t('dovetail').replace(' ','').toLowerCase()) &&
                            <DovetailBedIcon width="90%" color={params.shadowColor || "rgba(0,0,0,0.3)"}/>
                        }
                        {
                            (params.category || (t('dovetail').replace(' ','').toLowerCase())) === (t('flatbed').replace(' ','').toLowerCase()) &&
                            <FlatdeckBedIcon width="90%" color={params.shadowColor || "rgba(0,0,0,0.3)"}/>
                        }
                        {
                            (params.category || (t('dovetail').replace(' ','').toLowerCase())) === (t('service').replace(' ','').toLowerCase()) &&
                            <ServiceBedIcon width="90%" color={params.shadowColor || "rgba(0,0,0,0.3)"}/>
                        }
                    </>
                }
            </div>
            {
                imgSrc &&
                <Image className={`${params.imgClassName || ''} ${(imgLoading || imgError ) ? "opacity-0 w-0 h-0 hidden" : ""}`}
                    priority={true}
                    src={imgSrc || null} alt={params.alt} 
                    placeholder={`data:image/svg+xml;base64,${toBase64(shimmer("100%", "100%"))}`}
                    quality={80}
                    fill
                    sizes={params.sizes || "80vw"}
                    onLoad={()=> {setImgLoading(false); setImgError(false);}}
                    onError={() => {setImgError(true); setImgLoading(false)}}
                    style={{
                    objectFit: params.objectFit || "cover",
                    }}
                />
            }
        </div>
    )
    //#endregion
    
}


export default ImageViewer