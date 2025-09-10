import React,{useState, useEffect, useCallback, useRef} from "react";
import Link from "next/link"
import { geocode,setDefaults,RequestType } from "react-geocode";
import { AdvancedMarker, InfoWindow, Pin, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { useTranslations } from "next-intl";

function UserMarker({position}){
    //#region code
    const [markerRef, marker] = useAdvancedMarkerRef();
    const [showInfoWindow, setShowInfoWindow] = useState(false)
    const fT = useTranslations('BasicForm')

    const hoverHandler = useCallback(() =>{
        setShowInfoWindow(true)
    },[])
    const handleInfoClose = useCallback(()=>{setShowInfoWindow(false)},[])

    return(
        <AdvancedMarker
            animation={"bounce"}
            ref={markerRef}
            clickable={true}
            position={position}
            onClick={hoverHandler}
            >
            <Pin background={'#000000'} borderColor={'#181818'}
            glyphColor={'#ffffff'}/>
            {(showInfoWindow) &&
                (<InfoWindow 
                    onCloseClick={handleInfoClose}
                    anchor={marker}>
                    <div className="flex gap-[0.15rem] items-center justify-center flex-col font-['lora']">
                        <div className="w-full flex gap-2 flex-row justify-center items-center">
                            <p className="text-[1.25rem] uppercase font-semibold py-[0.2rem] h-full
                            w-full m-0 flex gap-1 justify-center items-center">
                                {fT('youReHere')}
                            </p>
                        </div>
                    </div>
                </InfoWindow>)
            }
        </AdvancedMarker>
    )
}
export default UserMarker