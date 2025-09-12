'use client' // Renders on client side
import React, { useEffect, useState } from "react";
import Link from "next/link"
import VideoPlayer from "../general/video_player";
import { useTranslations } from "next-intl";
import ImageViewerAlt from "../general/image_viewer_alt";

function NextStep({actionVideo, reviewVideo}){

    //#region code
    const t = useTranslations('PagesTitles')
    const [showModal, setShowModal] = useState(false);
    const [video, setVideo] = useState('')

    useEffect(() => {
        if(actionVideo.trim().length > 0) {
            setVideo(actionVideo)
            return
        } else if(reviewVideo.trim().length > 0) {
            setVideo(reviewVideo)
            return
        }
    }, [])

    useEffect(() => {
        document.body.style.overflowY = showModal ? 'hidden' : 'auto';
    }, [showModal])
    //#endregion

    //#region view
    return(
        <>
            <div className="relative h-[16rem] overflow-hidden flex items-center justify-center flex-col">
                <div className="absolute z-30 flex flex-col gap-8 items-center justify-center -mb-8">
                    <div className="font-['oswald'] text-white font-medium text-[1.75rem] leading-10 flex items-center justify-center text-center col-start-1 col-end-4 row-start-1 lg:text-[2rem] lg:leading-12 uppercase">
                        {t('nextStep')}</div>
                    <div className="w-full flex flex-col gap-4 items-center justify-center lg:flex-row">
                        <Link href="/find-a-dealer" className="w-56 cursor-pointer uppercase flex items-center justify-center font-['oswald'] 
                            font-medium no-underline text-white bg-secondary-color bg-[length:200%_100%] bg-gradient-to-r
                            from-secondary-color from-50% to-tertiary-color to-50% motion-safe:transition-all duration-500 py-3 px-[2.6rem] 
                            motion-safe:ease-[cubic-bezier(0.19,1,0.22,1)] delay-50 lg:hover:text-white lg:hover:bg-tertiary-color 
                            lg:hover:bg-[-100%_100%]">
                            {t('findADealer')}
                        </Link>
                        <div className="w-56 cursor-pointer uppercase flex items-center justify-center font-['oswald'] 
                            font-medium no-underline text-white bg-secondary-color bg-[length:200%_100%] bg-gradient-to-r
                            from-secondary-color from-50% to-tertiary-color to-50% motion-safe:transition-all duration-500 py-3 px-[2.6rem] 
                            motion-safe:ease-[cubic-bezier(0.19,1,0.22,1)] delay-50 lg:hover:text-white lg:hover:bg-tertiary-color 
                            lg:hover:bg-[-100%_100%]" onClick={() => setShowModal(true)}>
                            {t('viewVideo')}
                        </div>

                    </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-primary-color/80 z-20" />
                <ImageViewerAlt className="!h-[full w-full shadow-md
                    motion-reduce:transition-none will-change-auto0 grayscale-100 brightness-140" 
                    orientation="portrait" src="/Images/background_slogan.webp" 
                    alt="Landscape of the slogan"
                />
            </div>

            {/* MODAL */}

            <div onClick={() => setShowModal(false)} 
            className={`w-full h-full fixed left-0 top-0 bg-black/50 backdrop-saturate-50 backdrop-blur-md
            z-9999 flex items-center justify-center  motion-safe:transition-all motion-reduce:transition-none 
            will-change-auto motion-safe:duration-400 select-none font-['lora']
            ${showModal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <div onClick={(e) => e.stopPropagation()} 
                className={`overflow-hidden motion-safe:transition-all motion-reduce:transition-none 
                will-change-auto motion-safe:duration-500 relative w-[90%] h-[90vh] grid grid-rows-[auto_1fr_auto]
                bg-white text-black p-0 md:w-[80vw] 
                ${showModal ? "translate-y-0" : "translate-y-[10%]"}`}>
                    <div className="min-h-full capitalize text-[1.4rem] flex flex-row gap-4 items-start
                    px-4 justify-center shadow-[0_10px_25px_-12px_rgba(0,0,0,0.15)] z-5 py-4">
                        
                        <div className="w-full flex flex-col lg:flex-row">
                            <span className="uppercase lg:flex-none">
                                {t('videoPlayer')}
                            </span>
                            <div className="w-full flex gap-4 items-center justify-end flex-row">
                                {/* 
                                    w-full cursor-pointer uppercase flex items-center justify-center font-['oswald'] 
                                    font-medium no-underline text-white bg-secondary-color bg-[length:200%_100%] bg-gradient-to-r
                                    from-secondary-color from-50% to-tertiary-color to-50% motion-safe:transition-all duration-500 py-3 px-[2.6rem] 
                                    motion-safe:ease-[cubic-bezier(0.19,1,0.22,1)] delay-50 lg:hover:text-white lg:hover:bg-tertiary-color 
                                    lg:hover:bg-[-100%_100%]
                                    !AQUI ME QUEDE
                                */}
                                <button className={`cursor-pointer relative text-white border-none w-full
                                h-10 uppercase flex items-center justify-center text-[0.85rem]
                                select-none motion-safe:transition-all motion-reduce:transition-none will-change-auto
                                motion-safe:duration-300 lg:text-[1rem] lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:w-48
                                ${video === actionVideo && actionVideo !== '' ? "bg-primary-color" : "bg-[#7a7a7a]"}`} 
                                    onClick={() => setVideo(actionVideo)}>
                                    {t('action')}
                                </button>
                                <button className={`cursor-pointer relative text-white border-none w-full
                                h-10 uppercase flex items-center justify-center text-[0.85rem]
                                select-none motion-safe:transition-all motion-reduce:transition-none will-change-auto
                                motion-safe:duration-300 lg:text-[1rem] lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:w-48
                                ${video === reviewVideo && reviewVideo !== '' ? "bg-primary-color" : "bg-[#7a7a7a]"}`}
                                    onClick={() => setVideo(reviewVideo)}>
                                    {t('review')}
                                </button>
                            </div>
                        </div>
                        <span className="material-symbols-outlined notranslate  *absolute right-6 z-15 cursor-pointer
                        motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                        motion-safe:duration-300 lg:hover:text-secondary-color" 
                            onClick={() => setShowModal(false)}>
                            close
                        </span>
                    </div>
                    <div className="p-4 flex gap-4 justify-center items-center flex-wrap overflow-x-hidden overflow-y-auto">
                        <VideoPlayer autoplay={showModal} url={video} size="medium" useMarginTop={false}/>

                        <a className="cursor-pointer relative text-white border-none flex items-center justify-center
                        bg-primary-color text-[1rem] select-none motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                        motion-safe:duration-300 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium h-10 w-[70%] py-2 px-6 lg:hidden uppercase"
                        href={video} target="_blank" rel="noopener noreferrer">{t('viewYt')}</a>
                    </div>
                    <Link href="/find-a-dealer" className="w-full cursor-pointer uppercase flex items-center justify-center font-['oswald'] 
                            font-medium no-underline text-white bg-secondary-color bg-[length:200%_100%] bg-gradient-to-r
                            from-secondary-color from-50% to-tertiary-color to-50% motion-safe:transition-all duration-500 py-3 px-[2.6rem] 
                            motion-safe:ease-[cubic-bezier(0.19,1,0.22,1)] delay-50 lg:hover:text-white lg:hover:bg-tertiary-color 
                            lg:hover:bg-[-100%_100%]">
                        {t('interestedInThisTrailer')}
                    </Link>
                </div>
            </div>
        </>
    );
    //#endregion
}

export default NextStep