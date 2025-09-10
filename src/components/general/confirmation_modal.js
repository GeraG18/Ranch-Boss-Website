import React, { useEffect, useState } from "react";

const ConfirmationModal = ({ show, message, onDialogChanges = (val) => {} }) => {

    //#region code

    useEffect(() => {
        document.body.style.overflowY = show ? 'hidden' : 'auto';
    }, [show])
    //#endregion

    //#region view
    return (
        <div className={`w-full h-full fixed left-0 top-0 bg-black/50 backdrop-saturate-50 backdrop-blur-md
            z-9999 flex items-center justify-center select-none motion-safe:transition-all motion-reduce:transition-none 
            will-change-auto motion-safe:duration-400 ${show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} 
            onClick={() => onDialogChanges(false)}>
            <div className={`overflow-hidden motion-safe:transition-all motion-reduce:transition-none 
            will-change-auto motion-safe:duration-500 relative w-[95%] h-fit
            grid grid-rows-[auto_1fr] bg-white text-[#181818] rounded-lg p-0 md:w-[40vw]
            ${show ? "translate-y-0" : "translate-y-[10%]"}`} 
            onClick={(e) => e.stopPropagation()}>
                <span className="min-h-full uppercase text-[2.25rem] flex flex-col items-start
                px-4 justify-center shadow-[0px_10px_25px_-12px_rgb(0 0 0 / 0.15)] font-['lora']
                z-5 font-medium">
                    Confirmation
                    <span className="absolute right-6 z-15 cursor-pointer 
                    lg:hover:text-secondary-color material-symbols-outlined notranslate " 
                    onClick={() => onDialogChanges(false)}>
                        close
                    </span>
                </span>
                <div className="p-4 flex flex-col gap-4 justify-center items-center flex-wrap overflow-x-hidden overflow-y-auto h-fit">
                    {message || 'Do you want to continue?'}
                    <div className="flex flex-row gap-2 items-center justify-center w-full">
                        <button className="col-span-full row-start-3 font-['lora'] cursor-pointer relative text-white border-none bg-[#7a7a7a] text-[1rem] select-none 
                    motion-safe:transition-all motion-reduce:transition-none will-change-auto py-3 px-10 w-full lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:text-white self-center justify-self-center" 
                            onClick={() => onDialogChanges(false)}>Cancel</button>
                        <button className="col-span-full row-start-3 font-['lora'] cursor-pointer relative text-white border-none bg-primary-color text-[1rem] select-none 
                    motion-safe:transition-all motion-reduce:transition-none will-change-auto py-3 px-10 w-full lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:text-white self-center justify-self-center" onClick={() => onDialogChanges(true)}>Accept</button>
                    </div>
                </div>
            </div>
        </div>
    );
    //#endregion 
}

export default ConfirmationModal;
