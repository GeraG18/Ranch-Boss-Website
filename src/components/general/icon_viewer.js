'use client' // Renders on client side
import React, { useEffect, useState } from "react"
import HorizonIcon from "../icons/horizon_icon";

const IconViewer = (params) => {

    //#region code
    const [imgLoading, setImgLoading] = useState(true);
    const [imgError, setImgError] = useState(false);
    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        if(params.src !== undefined && params.src !== imgSrc){
            setImgLoading(false)
            setImgError(false)
            setImgSrc(params.src)
        }
    }, [params])
    //#endregion

    //#region view
    return(
        <div className={`*aspect-[16/10] ${!params.adjust ? 'h-8' : ''} object-fill flex items-center justify-center`}>
            {
                (imgLoading || imgError) &&
                <HorizonIcon width="80%" color={params.shadowColor || "rgba(0,0,0,0.3)"}/>
            }
            <img className={`${params.fullHeight ? "h-full" : "h-4/5"} ${(imgLoading || imgError ) ? "opacity-0 w-0 h-0" : ''}`}
                src={imgSrc || undefined} alt={params.alt} 
                loading='lazy' 
                onLoad={()=> {setImgLoading(false); setImgError(false);}}
                onError={(e) => {setImgError(true); setImgLoading(false)}}
            />
        </div>
    )
    //#endregion
    
}


export default IconViewer