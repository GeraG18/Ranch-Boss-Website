import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

const DealerListItem = ({id, name, address, phoneNumber, website, clickedElement= (id) => {}}) => {
    
    //#region code
    const fT = useTranslations('BasicForm');

    const showItemOnMap = () => {
        // 
        clickedElement(id);
    }

    //#region view
    return( 
        <div className="p-2 motion-safe:transition-all motion-reduce:transition-none font-['lora']
        will-change-auto motion-safe:duration-400 bg-[#f3f3f3] flex flex-col h-full min-h-80 lg:bg-transparent">
            <div className="flex flex-none flex-row h-8 w-8 items-center justify-center text-[1rem]
            border border-[#d5d5d5] text-[#4d4d4d] bg-transparent ">
                {id} 
            </div>
            <p className="text-[1.25rem] uppercase font-semibold py-[0.2rem] h-full w-full m-0 flex gap-1 justify-start items-center">
                {name}
            </p>
            <div className="self-start justify-self-center text-[1rem] py-[0.2rem] m-0 text-black h-full flex justify-center items-center">
                {fT('addressLabel')}: {address}
            </div>
            {
                phoneNumber && (
                    <a href={`tel:${phoneNumber}`} className="w-full text-[1rem] py-[0.2rem] m-0 text-black h-full underline
                    flex items-center justify-start lg:hover:text-secondary-color">
                        {fT('phoneLabelAlt')}: {phoneNumber}
                    </a>
                )
            }
            {
                website && (
                    <a href={website} className="w-full text-[1rem] py-[0.2rem] m-0 text-black h-full underline
                    flex items-center justify-start lg:hover:text-secondary-color">
                        {/* Visit "{name}" website */}
                        {fT('visitWebsiteLabel',{website:name})}
                    </a>
                )
            }
            <div className="cursor-pointer relative text-white flex-none
            border-none uppercase bg-primary-color text-[1rem] select-none 
            motion-safe:transition-all motion-reduce:transition-none will-change-auto 
            motion-safe:duration-300 py-[0.45rem] px-4 flex items-center justify-center
            lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium" 
            onClick={() => showItemOnMap()}>
                {fT('showOnMap')}
            </div>
        </div>
    )
}

export default DealerListItem;