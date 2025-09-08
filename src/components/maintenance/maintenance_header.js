// 'use client' // Renders on client side
import React from "react";

function MaintenanceHeader ({children}){
    
    //Display
    return (
        <section className="w-full flex gap-2 flex-col justify-center items-center h-screen relative bg-[#181818] 
        bg-no-repeat bg-center bg-cover overflow-hidden font-['Urbanist'] after:w-full after:h-full after:absolute 
        after:bg-black/40 after:top-0 after:left-0 after:z-70">
            
            <div className="absolute z-70 w-full h-full top-0 left-0 content-[''] text-transparent 
            bg-[radial-gradient(circle,rgba(240,90,34,0)_0%,rgba(240,90,34,0.10)_25%,rgba(240,90,34,0.15)_50%,rgba(240,90,34,0.20)_75%,rgba(240,90,34,0.25)_85%)]"> 
            </div>
            
            {/* <ComingVideo/> */}
            {/* <VideoPlayer 
                size="full" 
                url={isDesktop ? "https://www.youtube.com/watch?v=Q3xtXEh8OBw" : "https://www.youtube.com/shorts/YfPnwBSdGEE"} 
                useMarginTop={false}
                loop={true}
                muted={true}
                autoplay={true}
                controls={false}
            /> */}
            {children}
        </section>
    )
}

export default MaintenanceHeader