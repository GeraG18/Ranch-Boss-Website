import React, { Suspense } from "react";
import MaintenanceHeader from "@/components/maintenance/maintenance_header";

const ComingSoonPage = () => {

    return(
        <div className="w-screen h-screen overflow-hidden! flex flex-col items-center justify-center select-none">
            <MaintenanceHeader>
                <img className="w-[200px] lg:w-[460px] lg:mr-4" src="/logos/HorizonTrailers-logo,whiteorangegrey.png" alt="horizon trailers logo"/>
                <div className="flex flex-col items-center justify-center absolute bottom-8 z-140 mx-4 w-[calc(100%-2rem)]">
                    <span className="font-['lora'] flex items-center justify-center text-center col-start-1 col-end-4 row-start-1 
                        text-[3rem] leading-[2.8rem] lg:text-[4rem] lg:leading-[3.8rem] text-transparent bg-clip-text font-medium
                        bg-[linear-gradient(180deg,rgba(255,255,255,0.9)_0%,rgba(251,251,251,0.9)_25%,rgba(249,249,249,0.8)_50%,rgba(247,247,247,0.5)_75%,rgba(241,241,241,0.4)_100%)]">
                        WEBSITE UNDER MAINTENANCE
                    </span>
                    <span className="font-['lora'] flex items-center justify-center text-center col-start-1 col-end-4 row-start-1 
                        text-[3rem] leading-[2.8rem] lg:text-[4rem] lg:leading-[3.8rem] text-transparent bg-clip-text font-medium
                        bg-[linear-gradient(180deg,rgba(255,255,255,0.9)_0%,rgba(251,251,251,0.9)_25%,rgba(249,249,249,0.8)_50%,rgba(247,247,247,0.5)_75%,rgba(241,241,241,0.4)_100%)]">
                        WE'LL BE BACK!
                    </span>
                </div>
            </MaintenanceHeader>
        </div>
    )
}

export default ComingSoonPage