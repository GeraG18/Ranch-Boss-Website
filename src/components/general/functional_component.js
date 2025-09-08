'use client' // Renders on client side
import { useEffect } from "react";

const FunctionalComponent = (params) => {
    
    useEffect(() => {
        let outputColor = "color:#6897d8; "
        console.log(`%cWelcome to Ranch Boss`, outputColor);
        let item =`%c             MNN    MNN\n            MNN    MNN \n           MNNNNNNNNM  \n   ---    MNNNNNNNNM   \n  ---    MNN    MNN    \n ---    MNN    MNN      `
        console.log(item, outputColor);
    }, [])
    
    return(
        <div className="absolute top-0 left-0 z-0 pointer-events-none opacity-0 hidden"></div>
    )
}

export default FunctionalComponent;