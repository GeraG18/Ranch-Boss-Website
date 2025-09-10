import React, { useEffect } from "react";
import IconViewer from "../general/icon_viewer";
import { useTranslations } from "next-intl";

const DealerCard = ({id, name, logo, distance, address, phoneNumber, directionURL, callback=(id="")=>{}}) => {

    const fT = useTranslations('BasicForm')
    //#region view
    return( 
        <div className="p-2 font-['lora'] bg-[#f3f3f3] lg:bg-transparent">
            <div className="flex gap-[0.15rem] items-center justify-center flex-col">
                <div className="w-full flex gap-2 justify-center items-center flex-row">
                    <p className="text-[1.25rem] uppercase font-semibold h-full
                    w-full m-0 flex gap-1 justify-start items-center">
                        {name}
                    </p>
                    <div className="shrink-0 flex flex-col items-end justify-center">
                        {
                            distance !== 0 && 
                            <span className="text-[1rem] flex justify-end
                            items-center flex-none w-fit">{distance || "-"} mi&sup1;</span>
                        }
                        <a className="text-[1rem] py-0 m-0 text-black h-full underline" 
                            href={directionURL} target="_blank">{fT('directionsLabel')}</a>
                    </div>
                </div>
                <div className="self-start! relative overflow-hidden flex h-13 min-w-40
                items-center justify-center bg-[#d4d4d4]">
                    <div className="w-full h-full absolute flex items-center justify-center">

                        <IconViewer src={logo} alt={`${name} dealer logo`}/>
                    </div>
                </div>
                <div className="self-start justify-self-center flex-none text-[1rem]">{address}</div>
                <div className="flex flex-row items-center justify-center w-full">
                    <div className="w-full flex align-center">
                        <a href={`tel:${phoneNumber}`} 
                        className="text-[1rem] m-0 text-black h-full underline lg:hover:text-primary-color motion-safe:transition-all motion-reduce:transition-none 
                        will-change-auto motion-safe:duration-300">
                            {phoneNumber}
                        </a>
                    </div>
                    <button className="cursor-pointer relative text-white flex-none border-none uppercase
                    bg-primary-color text-[1rem] select-none motion-safe:transition-all motion-reduce:transition-none 
                    will-change-auto motion-safe:duration-300 py-[0.45rem] px-4 flex justify-center items-center
                    self-end lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium uppercase"
                    onClick={()=>{
                        callback(id)
                    }}>{fT('moreDetails')}</button>

                </div>
            </div>
        </div>
    )
}

export default DealerCard;