'use client' // Renders on client side
import React, {useEffect, useState} from "react";
import ReactPlayer from 'react-player';
import { useTranslations } from "next-intl";
/*
    url: string,
    size: "small", "medium", "full"
*/
const VideoPlayer = ({autoplay = true, url, size, useMarginTop = true}) => {

    //#region code
    const t = useTranslations('PagesTitles')
    const [playVideo, setPlayVideo] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isPlayButtonHover, setPlayButtonHover] = useState(false)
    const [isDesktop, setIsDesktop] = useState(false)
    const [sizes, setSizes] = useState({width:'40%', height:'100%'})

    useEffect(() => {
        setPlayVideo(autoplay)
    }, [autoplay])
    
    const handleMouseEnter = (event) => {
        setPlayButtonHover(true);
    }

    const handleMouseLeave = (event) => {
        setPlayButtonHover(false);
    }

    const playOrPauseVideo = () => {
        setPlayVideo((actualValue) => !actualValue);
    }

    const loadVideoPlayerSize = () => {
        if(size === 'small')
            setSizes({width:'40%', height:'100%'})
        if(size === 'medium')
            setSizes({width:'80%', height:'100%'})
        if(size === 'full')
            setSizes({width:'100%', height:'100%'})
        if(size === 'static')
            setSizes({width:'640px', height:'360px'})
    }

    useEffect(() => {
        loadVideoPlayerSize();
    },[size])

    useEffect(() => {
        let mediaBigSC = window.matchMedia("(min-width: 1024px)")
        setIsDesktop(mediaBigSC.matches)
    }, [url])
    //#endregion

    //#region view
    return(
        <div className={`w-full h-auto flex items-center justify-center font-['Montserrat'] 
        relative select-none overflow-hidden ${useMarginTop ? "my-8" : "m-0"}`}>
                {
                    url ? 
                    (
                        hasError ? 
                        <div className="relative min-h-[576px] flex gap-4 flex-col items-center justify-center
                        overflow-hidden text-white" style={sizes}>
                            <img src="/Images/secondBackgroundImage.webp" className="top-0 h-[210%] w-full contrast-[1.4] brightness-[0.5] z-5 absolute" 
                            alt="horizon trailers img"/>
                            <div className="absolute w-full h-full bg-[rgba(18,18,18,0.6)] backdrop-saturate-50 backdrop-blur-md flex gap-4 flex-col items-center justify-center z-10">
                                <div className={`material-symbols-outlined notranslate  motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-300 
                                rounded-[10px] bg-primary-color text-[3rem] text-white py-[0.8rem] px-[1.2rem]`}>play_arrow</div>
                                <span className="text-[1.25rem] w-4/5 text-center lg:w-auto lg:text-start">
                                    {t('videoNotAvailable')}
                                </span>
                            </div>
                        </div>
                        :
                        <>
                            <div className="cursor-pointer absolute w-[640px] h-[240px] flex items-center justify-center select-none"
                            onClick={() => playOrPauseVideo()} 
                                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <div className={`material-symbols-outlined notranslate  motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-300 
                                rounded-[10px] bg-primary-color text-[3rem] text-white py-[0.8rem] px-[1.2rem] ${(playVideo && !isPlayButtonHover) ? "opacity-0" : "opacity-100"} `}>{playVideo ? 'pause' : 'play_arrow'}</div>
                            </div>
                            <ReactPlayer 
                                url={url} 
                                loop={true}
                                style={{aspectRatio:'16/9'}}
                                onReady={() => setHasError(false)}
                                onPause={() => setPlayVideo(false)} 
                                width={!isDesktop ? '100%' : sizes.width} 
                                height={!isDesktop ? '100%' : sizes.height} 
                                controls={true} onPlay={() => setPlayVideo(true)}
                                playing={playVideo} onError={() => setHasError(true)}
                            />
                        </>

                    )
                    : 
                    <div className="relative min-h-[576px] flex gap-4 flex-col items-center justify-center
                        overflow-hidden text-white" style={sizes}>
                        <img src="/Images/secondBackgroundImage.webp" className="top-0 h-[210%] w-full contrast-[1.4] brightness-[0.5] z-5 absolute" alt="horizon trailers img" />
                        <div className="absolute w-full h-full bg-[rgba(18,18,18,0.6)] backdrop-saturate-50 backdrop-blur-md flex gap-4 flex-col items-center justify-center z-10">
                            <div className={`material-symbols-outlined notranslate  motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-300 
                            rounded-[10px] bg-primary-color text-[3rem] text-white py-[0.8rem] px-[1.2rem]`}>play_arrow</div>
                            <span className="text-[1.25rem] w-4/5 text-center lg:w-auto lg:text-start">
                                {t('videoComingSoon')}
                            </span>
                        </div>
                    </div>
                }
        </div>
    );
    //#endregion
}

export default VideoPlayer;