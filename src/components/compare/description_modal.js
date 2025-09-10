import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const DescriptionModal = ({ showModal, description, closeModal = (opened) => {} }) => {

    //#region code
    const t = useTranslations('PagesTitles')
    const [body, setBody] = useState("");

    //#endregion
    useEffect(() => {
        if(description) {
            setBody(description)
        }
    }, [description])

    useEffect(() => {
        if(!showModal) {
            setTimeout(() => {
                setBody('')
            }, 500)
        }
    }, [showModal])

    //#region view
    return (
        <div className={`w-full h-full fixed left-0 top-0 bg-black/50 backdrop-saturate-50 backdrop-blur-md
            z-900 flex items-center justify-center motion-safe:transition-all motion-reduce:transition-none 
            will-change-auto motion-safe:duration-400 font-['lora'] select-none ${showModal ? "opacity-100 pointer-events-auto" 
                : "opacity-0 pointer-events-none"}`} 
            onClick={() => {closeModal(false)}}>
            <div className={`z-100 overflow-hidden motion-safe:transition-all motion-reduce:transition-none 
            will-change-auto motion-safe:duration-500 relative w-[90%] h-fit grid grid-rows-[auto_1fr]
            bg-white text-black p-0 md:w-[40vw] ${showModal ? "translate-y-0" 
            : "translate-y-[10%]"}`} 
            onClick={(event) => event.stopPropagation()}>
                <span className="text-[1.4rem] flex flex-col items-start px-4 py-2 
                justify-center shadow-[0_10px_25px_-12px_rgba(0,0,0,0.15)] z-5 uppercase">
                    {t('description')}
                    <span className="absolute right-6 z-15 cursor-pointer motion-safe:transition-all 
                    motion-reduce:transition-none will-change-auto motion-safe:duration-400  
                    lg:hover:text-primary-color material-symbols-outlined notranslate " 
                    onClick={() => {closeModal(false)}}>
                        close
                    </span>
                </span>
                <div className="p-4 gap-4 justify-center items-center flex-wrap overflow-x-hidden
                overflow-y-auto">
                    {body}
                </div>
            </div>
        </div>
    );
    //#endregion 
}

export default DescriptionModal;
