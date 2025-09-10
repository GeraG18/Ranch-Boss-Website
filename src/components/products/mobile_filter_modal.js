import React, { useEffect } from "react";
import ModelFilters from "./model_filters";

const MobileFilterModal = ({showModal, onFilterChange = (v) => {}}) => {

    //#region code
    useEffect(() => {
        document.body.style.overflowY = showModal ? 'hidden' : 'auto';
    }, [showModal])
    //#endregion

    //#region view
    return (
        <div className={`w-full h-full fixed left-0 top-0 bg-black/50 backdrop-saturate-50 backdrop-blur-md
            z-9999 flex items-center justify-center select-none motion-safe:transition-all motion-reduce:transition-none 
            will-change-auto motion-safe:duration-400 ${showModal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} 
            onClick={() => onFilterChange(false)}>
            <div className={`overflow-hidden motion-safe:transition-all motion-reduce:transition-none 
            will-change-auto motion-safe:duration-500 relative w-[95%] h-[62vh]
            grid grid-rows-[15%_85%] bg-white text-[#181818] rounded-lg p-0 md:w-[40vw]
            ${showModal ? "translate-y-0" : "translate-y-[10%]"}`} 
            onClick={(e) => e.stopPropagation()}>
                <span className="min-h-full uppercase text-[2.25rem] flex flex-col items-start
                px-4 justify-center shadow-[0px_10px_25px_-12px_rgb(0 0 0 / 0.15)] font-['lora']
                z-5 font-medium">
                    Select filters
                    <span className="absolute right-6 z-15 cursor-pointer 
                    lg:hover:text-secondary-color material-symbols-outlined notranslate " 
                    onClick={() => onFilterChange(false)}>
                        close
                    </span>
                </span>
                <div className="p-4 flex gap-4 justify-center items-center flex-wrap overflow-x-hidden overflow-y-auto">
                    <ModelFilters isShowing={true} key="modalFilters"/>
                </div>
            </div>
        </div>
    );
    //#endregion 
}

export default MobileFilterModal;
