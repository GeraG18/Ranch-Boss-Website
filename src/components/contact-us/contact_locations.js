import { useLocale, useTranslations } from "next-intl";
import React from "react";
import locations from "@/jsons/contact-locations.json"

const LocationItem = ({id, name, address, schedule, phoneNumber, directionUrl}) => {

    const fT = useTranslations('BasicForm');
    //#region view
    return( 
        // id, name, address, schedule, phoneNumber, directionUrl
        <div className="p-2 motion-safe:transition-all motion-reduce:transition-none will-change-auto 
        motion-safe:duration-400 font-['lora'] bg-[#f3f3f3] flex flex-col h-80 lg:bg-transparent">
            <div className="flex flex-none flex-row h-8 w-8 justify-center items-center text-[1rem] rounded-[10px]
            border border-[#d5d5d5] text-[#4d4d4d] bg-transparent ">
                {id} 
            </div>
            <p className="text-[1.25rem] uppercase font-semibold py-[0.2rem] h-full w-full m-0 flex gap-1 justify-start items-center">
                {name}
            </p>
            <div className=" text-[1rem] py-[0.2rem] m-0 text-black
            h-full flex justify-start items-center">
                {fT('addressLabel')}: {address}
            </div>
            <div className="text-[1rem] py-[0.2rem] m-0 text-black h-full flex justify-start items-center">
                {schedule}
            </div>
            <a href={`tel:${phoneNumber}`} className="w-full text-[1rem] py-[0.2rem] m-0 text-black h-full underline
            flex items-center justify-start lg:hover:text-secondary-color">
                {fT('phoneLabelAlt')}: {phoneNumber}
            </a>
            <a href={directionUrl} target="_blank" className="cursor-pointer relative text-white flex-none border-none
            uppercase bg-primary-color text-[1rem] select-none py-[0.45rem] px-4 flex justify-center items-center rounded-[10px]
            lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium">
                {fT('getDirections')}
            </a>
        </div>
    )
}

const ContactLocations = () => {
    const cT = useTranslations('ContactLocations')
    const locale = useLocale()
    return(
        <div className="mx-4 max-w-screen-lg  xl:mx-auto font-['lora'] py-4">
            <div className="py-8 flex flex-col">
                <h2 className="font-['lora'] m-0 p-0 font-bold text-[1.75rem] leading-10 flex items-center justify-start text-start w-full col-start-1 col-end-4 row-start-1 lg:text-[2rem] lg:leading-12 uppercase">{cT('title')}</h2>
                <h3 className="">
                    {cT('subtitle')}
                </h3>
            </div>
            <div className="grid grid-rows-2 gap-4 sm:grid-cols-2 sm:grid-rows-none
                lg:mx-auto lg:max-w-(--breakpoint-md)">
                {/* {id, name, address, schedule, phoneNumber, directionUrl} */}
                {
                    locations[locale].map(({id, name, address, schedule, phoneNumber, url}) => (
                        <LocationItem 
                            key={id}
                            id={id}
                            name={name}
                            address={address}
                            schedule={schedule}
                            phoneNumber={phoneNumber}
                            directionUrl={url}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default ContactLocations;