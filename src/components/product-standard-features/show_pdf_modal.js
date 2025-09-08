import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useOSDetector } from "../../hooks/os_detector/os_detector";

const ShowPdfModal = ({ showModal, pdfRoute, onFilterChange = (openedModal) => {} }) => {

    const t = useTranslations('PagesTitles');
    const { os, } = useOSDetector();
    //#region view
    return (
        <div className={`w-full h-full fixed left-0 top-0 bg-black/50 backdrop-saturate-50 backdrop-blur-md
            z-9999 flex items-center justify-center select-none motion-safe:transition-all motion-reduce:transition-none 
            will-change-auto motion-safe:duration-400 ${showModal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} 
            onClick={() => onFilterChange(false)}>
            <div className={`overflow-hidden motion-safe:transition-all motion-reduce:transition-none 
            will-change-auto motion-safe:duration-500 relative w-[90%] h-[90vh]
            grid grid-rows-[auto_1fr] bg-white text-[#181818] rounded-lg p-0 
            ${showModal ? "translate-y-0" : "translate-y-[10%]"}`} 
            onClick={(e) => e.stopPropagation()}>
                <span className="min-h-full py-4 uppercase text-[2.25rem] flex flex-col items-start
                px-4 justify-center shadow-[0px_10px_25px_-12px_rgb(0 0 0 / 0.15)] font-['Michroma']
                z-5 font-medium">
                    {t('pdfViewer')}
                    <span className="absolute right-6 z-15 cursor-pointer 
                    lg:hover:text-secondary-color material-symbols-outlined notranslate " 
                    onClick={() => onFilterChange(false)}>
                        close
                    </span>
                </span>
                <div className="p-4 flex gap-4 justify-center items-center flex-wrap overflow-x-hidden overflow-y-auto">

                     {
                         os === 'iOS' ? 
                         <div className="w-full h-full bg-[#f3f3f3] rounded-[10px] flex items-center justify-center">
                            <a className="font-['Montserrat'] cursor-pointer relative text-white border-none bg-primary-color text-[1rem] select-none 
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto py-3 px-10 w-fit rounded-[10px] 
                            lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:text-white self-center justify-self-center uppercase"
                            href={pdfRoute || undefined} target="_blank" rel="noopener noreferrer">{t('openPdf')}</a>
                        </div>
                        :
                        <embed src={pdfRoute ? `${pdfRoute}#toolbar=0&view=FitV` : undefined} type="application/pdf" width="100%" height="100%"/>
                    }
                </div>
            </div>
        </div>
    );
    //#endregion 
}

export default ShowPdfModal;
