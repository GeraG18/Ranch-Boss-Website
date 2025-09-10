import  { useState, useEffect, useCallback, } from "react";
import { AdvancedMarker, InfoWindow, Pin, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import IconViewer from "../general/icon_viewer";
import { setLocalStorage } from "../../services/local_storage-service";
import Link from "next/link";
import { useTranslations } from "next-intl";

function DealerCustomMarker({id, name, latitude, longitud, logo, email, numberPhone, website, currentLocation, directionURL, address, distance, refReturn}){
    
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const [markerRef, marker] = useAdvancedMarkerRef();
    const fT = useTranslations('BasicForm');

    useEffect(() => {
        refReturn((array) => {
            if(array.length > 0 && array.find((obj)=> obj.id === id) !== undefined) {
                let newArray = array.map(item=>{
                    if(item.id === id){
                        return {id:id,ref:marker}
                    }
                    else return item
                });
                return newArray
            } else {
                return [...array,{id:id,ref:marker}]
            }
        });
    }, [marker])

    // useEffect(()=>{ getMapsUrl(); },[placeId]);

    const hoverHandler = useCallback(() => {
        setShowInfoWindow(true)
    },[currentLocation])
    const handleInfoClose = useCallback(()=>{setShowInfoWindow(false)},[]);

    const setDealerInLS = () => {
        setLocalStorage("ht.dealer_contact_info", {
            id, name, email: email.split(",").map((item) => item.trim()),
            latitude, longitud, numberPhone, website, address,
        });
    }
    //#endregion

    return(
        <AdvancedMarker
            // address={address}
            // animation={"bounce"}
            ref={markerRef}
            clickable={true}
            key={name}
            position={{lat:latitude,lng:longitud}}
            onClick={hoverHandler}>
                <Pin background={'#6897d8'} borderColor={'#8c3414'}
                    glyphColor={'#ffffff'}/>
            {(showInfoWindow) &&
                (<InfoWindow 
                    anchor={marker}
                    onCloseClick={handleInfoClose}
                    headerContent={
                        <div className="w-full flex gap-2 justify-center lg:items-center flex-col lg:flex-row font-['lora']">
                            <p className="text-[1.25rem] uppercase font-semibold py-[0.2rem] h-full w-full m-0 gap-1
                            justify-start items-center">
                                {name}
                            </p>
                            {distance !== 0 && 
                                <span className="text-[1rem] flex justify-end items-center flex-none w-fit px-1">{distance || "-"} mi&sup1;</span>
                            }

                        </div>
                    }>
                    <div className="flex gap-2 items-center justify-center flex-col py-4 px-2 
                    text-[1rem] select-none font-['lora']">
                        {/* <img className={css(styles.dealerLogo)} src={logo} alt={name+' logo'} /> */}
                        <div className="self-start w-fit max-w-full relative
                        overflow-hidden flex h-13 bg-[#d4d4d4] 
                        items-center justify-start object-contain!">
                            <IconViewer fullHeight src={logo} alt={`${name} dealer logo`}/>
                        </div>
                        <a href={directionURL} target="_blank" className="self-start justify-self-center text-[1rem] 
                        py-[0.2rem] m-0 text-black h-full flex items-center justify-center underline">{address}</a>
                        <a href={`tel:${numberPhone}`} target="_blank" className="self-start justify-self-center text-[1rem] 
                        py-[0.2rem] m-0 text-black h-full flex items-center justify-center underline">{numberPhone}</a>
                        <div className="w-full flex gap-2 justify-center items-center flex-col">
                            <Link className="cursor-pointer relative text-white bg-primary-color text-[1rem] select-none
                                motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                                motion-safe:duration-300  w-full mx-1 py-2 flex justify-center items-center uppercase
                                lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium"  href="/contact-to-dealer" onClick={() => setDealerInLS()}>{fT('contactThisDealer')}</Link>
                            <a className="cursor-pointer relative text-white bg-primary-color text-[1rem] select-none
                                motion-safe:transition-all motion-reduce:transition-none will-change-auto uppercase
                                motion-safe:duration-300  w-full mx-1 py-2 flex justify-center items-center
                                lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium"  href={directionURL} target="_blank">{fT('getDirections')}</a>
                            <a className="cursor-pointer relative text-white bg-primary-color text-[1rem] select-none
                                motion-safe:transition-all motion-reduce:transition-none will-change-auto uppercase
                                motion-safe:duration-300  w-full mx-1 py-2 flex justify-center items-center
                                lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium"  href={website}>{fT('webpage')}</a>
                        </div>
                    </div>
                </InfoWindow>)
            }
        </AdvancedMarker>
    )
}
export default DealerCustomMarker