import { useDealersContext } from "@/context/dealers_map_context";
import { useTranslations } from "next-intl";
import IconViewer from '@/components/general/icon_viewer';
import Link from "next/link";
import { useCallback } from "react";
import { setLocalStorage } from "@/services/local_storage-service";

const DealerInfoWindow = () => {
    
    const fT = useTranslations('BasicForm')
    const {
        /* read-only variables */
        activeDealer
    } = useDealersContext();
    
    const setDealerInLS = useCallback(() => {
        if(activeDealer) {
            setLocalStorage("ht.dealer_contact_info", {
                id: activeDealer.id, 
                name: activeDealer.name, 
                email: activeDealer.email.split(",").map((item) => item.trim()),
                latitude: activeDealer.latitude, 
                longitud: activeDealer.longitud, 
                numberPhone: activeDealer.phoneNumber, 
                website: activeDealer.website, 
                address: activeDealer.address,
            });
        }
    }, [activeDealer])

    return(
        <div className="info-window-content">
            <div className="w-full flex gap-2 justify-center lg:items-center flex-col lg:flex-row font-['Montserrat']">
            <p className="text-[1.25rem] uppercase font-semibold py-[0.2rem] h-full w-full m-0 gap-1 justify-start items-center">
                {activeDealer.name}
            </p>
            {activeDealer.distance !== 0 && (
                <span className="text-[1rem] flex justify-end items-center flex-none w-fit px-1">
                {activeDealer.distance || "-"} mi&sup1;
                </span>
            )}
            </div>

            <div className="flex rounded-[10px] gap-2 items-center justify-center flex-col py-4 px-2 text-[1rem] select-none font-['Montserrat']">
                <div className="self-start! relative overflow-hidden flex h-13 min-w-40 w-full
                items-center justify-center rounded-[10px] bg-[#d4d4d4]">
                    <div className="w-full h-full absolute flex items-center justify-center">

                        <IconViewer src={activeDealer.logo || undefined} alt={`${activeDealer.name} dealer logo`}/>
                    </div>
                </div>
                <a href={activeDealer.directionURL} target="_blank" className="self-start justify-self-center text-[1rem] py-[0.2rem] m-0 text-black h-full flex items-center justify-center underline">
                    {activeDealer.address}
                </a>
                <a href={`tel:${activeDealer.numberPhone}`} target="_blank" className="self-start justify-self-center text-[1rem] py-[0.2rem] m-0 text-black h-full flex items-center justify-center underline">
                    {activeDealer.numberPhone}
                </a>
                
                <div className="w-full flex gap-2 justify-center items-center flex-col">
                    {
                        activeDealer.email &&
                        <Link onClick={() => setDealerInLS()}
                        href="/contact-to-dealer" 
                        className="cursor-pointer relative text-white bg-primary-color text-[1rem] select-none motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-300 w-full mx-1 py-2 flex justify-center items-center uppercase rounded-[10px] lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium"
                        >
                        {fT('contactThisDealer')}
                        </Link>
                    }
                    {
                        activeDealer.directionUrl &&
                        <a 
                        href={activeDealer.directionUrl} 
                        target="_blank"
                        className="cursor-pointer relative text-white bg-primary-color text-[1rem] select-none motion-safe:transition-all motion-reduce:transition-none will-change-auto uppercase motion-safe:duration-300 w-full mx-1 py-2 flex justify-center items-center rounded-[10px] lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium"
                        >
                        {fT('getDirections')}
                        </a>
                    }
                    {
                        activeDealer.website &&
                        <a 
                        href={activeDealer.website}
                        className="cursor-pointer relative text-white bg-primary-color text-[1rem] select-none motion-safe:transition-all motion-reduce:transition-none will-change-auto uppercase motion-safe:duration-300 w-full mx-1 py-2 flex justify-center items-center rounded-[10px] lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium"
                        >
                        {fT('webpage')}
                        </a>
                    }
                </div>
            </div>
        </div>
    )
}

export default DealerInfoWindow;