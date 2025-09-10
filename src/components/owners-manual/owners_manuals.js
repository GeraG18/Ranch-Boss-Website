'use client' // Renders on client side
import React, {useState} from "react";
import ArticleShortcutIcon from "../icons/article_shortcut_icon";
import { useTranslations } from "next-intl";
import { useOSDetector } from "@/hooks/os_detector/os_detector";

function OwnersManuals (){
    //#region code
    const t = useTranslations('PagesTitles')
    const [pdfSource, changePdfSource] = useState("/pdfs/DumpManual.pdf");//string of pdf source
    const [activeButton, setActiveButton] = useState("dumps");//string of active button (for pdf source)
    const { os, } = useOSDetector();
    //#endregion

    //#region view
    return(
        <>
            <div className="h-fit flex flex-col my-4 lg:h-200 lg:flex-row lg:gap-8 mx-4 max-w-screen-lg 
                z-100 xl:mx-auto">
                <div className="flex flex-col mb-4 gap-4 lg:mb-0">
                    <button onClick={() => {changePdfSource("/pdfs/DumpManual.pdf"); setActiveButton("dumps")}}
                        className={`font-['lora'] uppercase font-semibold text-[#77787b] flex flex-row items-center
                            w-full h-12 text-[1rem] bg-[#f3f3f3] border-none cursor-pointer
                            px-3 lg:w-56 ${activeButton === 'dumps' ? "text-primary-color" : ""}`}>
                        <h3 style={{width:'100%', textAlign:'start'}}>
                            {t('dump')}
                        </h3>
                        <ArticleShortcutIcon width="24" height="24"/>
                    </button>
                    <button onClick={() => {changePdfSource("/pdfs/RolloffManual.pdf"); setActiveButton("rollOff")}} 
                        className={`font-['lora'] uppercase font-semibold text-[#77787b] flex flex-row items-center
                            w-full h-12 text-[1rem] bg-[#f3f3f3] border-none cursor-pointer
                            px-3 lg:w-56 ${activeButton === 'rollOff' ? "text-primary-color" : ""}`}>
                        <h3 style={{width:'100%', textAlign:'start'}}>
                            {t('rolloff')}
                        </h3>
                        <ArticleShortcutIcon width="24" height="24"/>
                    </button>
                    <button onClick={() => {changePdfSource("/pdfs/EquipmentManual.pdf"); setActiveButton("equipment")}} 
                        className={`font-['lora'] uppercase font-semibold text-[#77787b] flex flex-row items-center
                            w-full h-12 text-[1rem] bg-[#f3f3f3] border-none cursor-pointer
                            px-3 lg:w-56 ${activeButton === 'equipment' ? "text-primary-color" : ""}`}>
                        <h3 style={{width:'100%', textAlign:'start'}}>
                            {t('equipment')}
                        </h3>
                        <ArticleShortcutIcon width="24" height="24"/>
                    </button>
                    <button onClick={() => {changePdfSource("/pdfs/GooseneckManual.pdf"); setActiveButton("gooseneck")}} 
                        className={`font-['lora'] uppercase font-semibold text-[#77787b] flex flex-row items-center
                            w-full h-12 text-[1rem] bg-[#f3f3f3] border-none cursor-pointer
                            px-3 lg:w-56 ${activeButton === 'gooseneck' ? "text-primary-color" : ""}`}>
                        <h3 style={{width:'100%', textAlign:'start'}}>
                            {t('flatdeck')}
                        </h3>
                        <ArticleShortcutIcon width="24" height="24"/>
                    </button>
                </div>
                <div className="flex h-[80vh] flex-col w-full lg:h-auto">
                    {
                        os === 'iOS' ? 
                        <div className="w-full h-full bg-[#f3f3f3] flex items-center justify-center">

                            <a className="font-['lora'] cursor-pointer relative text-white border-none bg-primary-color text-[1rem] select-none 
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto py-3 px-10 w-fit 
                            lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:text-white self-center justify-self-center uppercase"
                            href={pdfSource} target="_blank" rel="noopener noreferrer">{t('openPdf')}</a>
                        </div>
                        :
                        <embed src={pdfSource} type="application/pdf" width="100%" height="100%"/>
                    }
                </div>
                
            </div>
        
        </>
    )
    //#endregion

}
export default OwnersManuals