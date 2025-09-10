import { useTranslations } from "next-intl";
import React from "react";

function Attachment ({attachmentFile}){

    const fT = useTranslations('BasicForm.fileAttachment')
    //#region view
    return(
        <div className="font-['lora'] mt-6 mx-4 max-w-screen-lg  xl:mx-auto">
            <div className="text-[1rem] flex flex-col gap-0 lg:flex-row lg:flex-wrap lg:mx-auto lg:mt-0 max-w-(--breakpoint-md)">
                <div className="flex flex-[0_1_auto] flex-col w-full">
                    <span className="text-black font-['lora'] uppercase text-[1.5rem] leading-[1.2rem] flex-none">{fT('title')}</span>
                    <div className="border border-[#d5d5d5] font-['lora'] text-[1rem] bg-transparent w-full h-8 outline-hidden
                    p-0 pl-[0.2rem] flex gap-2 items-center inputForm">
                        <span style={{fontSize:'1.5rem', color: attachmentFile ? "#7CB342" : "#E53935"} } className="material-icons notranslate ">picture_as_pdf</span>
                        <span>{attachmentFile ? fT('fileAttached') : fT('loadingFile')}</span>
                    </div>
                </div>
                <span>{fT('note')}</span>
            </div>
        </div>
    );
    //#endregion
}

export default Attachment