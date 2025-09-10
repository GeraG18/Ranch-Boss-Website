import React, { useEffect } from "react";

const DialogContainer = ({ showModal, children, crossColor, title, pdfRoute, closeModal = (openedModal) => {} }) => {

    useEffect(() => {
        if(showModal) {
            // console.log('escondidon');
            document.body.style.overflowY = 'hidden'
        } else {
            // console.log('auton');
            document.body.style.overflowY = 'auto'
        }
    }, [showModal])

    return (
        <div className={`w-full h-full fixed left-0 top-0 bg-black/50 backdrop-saturate-50 backdrop-blur-md
            z-9999 flex items-center justify-center select-none motion-safe:transition-all motion-reduce:transition-none 
            will-change-auto motion-safe:duration-400 ${showModal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} 
            onClick={() => closeModal(false)}>
            <div className={`overflow-hidden motion-safe:transition-all motion-reduce:transition-none 
            will-change-auto motion-safe:duration-500 relative max-w-[90%] max-h-[90vh]
            grid grid-rows-[auto_1fr] bg-white border border-white text-[#181818] rounded-lg p-0 
            ${showModal ? "translate-y-0" : "translate-y-[10%]"}`} 
            onClick={(e) => e.stopPropagation()}>
                {/* <span className="min-h-full py-4 uppercase text-[2.25rem] flex flex-col items-start
                px-4 justify-center shadow-[0px_10px_25px_-12px_rgb(0 0 0 / 0.15)] font-['lora']
                z-5 font-medium">
                    {title}
                    <span className="absolute right-6 z-15 cursor-pointer 
                    lg:hover:text-secondary-color material-symbols-outlined notranslate " 
                    onClick={() => closeModal(false)}>
                        close
                    </span>
                </span> */}
                <span className={`absolute right-2 top-2 z-20 cursor-pointer 
                lg:hover:text-secondary-color material-symbols-outlined notranslate ${crossColor || 'text-[#181818]'}`} 
                onClick={() => closeModal(false)}>
                    close
                </span>

                <div className="z-5 *p-4 flex gap-4 justify-center items-center flex-wrap overflow-x-hidden overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
    //#endregion 
}

export default DialogContainer;
