'use client' // Renders on client side
import { css, StyleSheet } from "aphrodite";
import React, { useEffect, useRef, useState } from "react"
import { useAlertsProvider } from "../../context/alert_context";

const ScrollAnimation = ({gallery = [], code}) => {

    //#region code
    let containerRef = useRef(null);
    let canvasRef = useRef(null);
    const dpi = window.devicePixelRatio;
    const frameCount = 8;
    let scaleFactor = 0.9;
    const { scrollPos } = useAlertsProvider();
    const [counter, setCounter] = useState(0);
    const [preloadedImgs, setPreloadedImgs] = useState([])
    
    let image = new Image();

    const updateImage = async (index) => {
        if(canvasRef && gallery.length > 0) {
            const context = canvasRef.getContext('2d')
            context.width = containerRef.offsetWidth * dpi;
            context.height = canvasRef.offsetHeight * dpi;

            canvasRef.width = context.width ;
            canvasRef.height = context.height;
            
            context.clearRect(0, 0, canvasRef.width, canvasRef.height);

            image.src = gallery[index];
            // image = preloadImages[index]
            // 
            
            // 
            let imgHeight = image.height * scaleFactor;
            let imgWidth = image.width * scaleFactor;
            context.drawImage(image, context.width/2 - imgWidth/2 , context.height/2 - imgHeight/2, imgWidth, imgHeight );
            // image.onload = () => {

            // }
            // context.drawImage(image, context.width/2 - imgWidth/2 , context.height/2 - imgHeight/2, imgWidth, imgHeight ); 
        }
    }

    useEffect(() => {
        // if(gallery)
            // preloadImages()
    }, [gallery])

    useEffect(() => {
        requestAnimationFrame(() => updateImage(counter))
    }, [counter, gallery])


    useEffect(() => {
        let calc = Math.ceil(scrollPos) - containerRef.offsetTop
        let breakpoint = Math.round(containerRef.offsetHeight / frameCount);
        if(calc >= 0) {
            // 
            setCounter(Math.round(calc / breakpoint))
        } else {
            setCounter(0)
        }
        
    }, [scrollPos])

    //#region view
    return( 
        <div className="relative h-[500vh] flex flex-col mb-8 mx-4 max-w-(--breakpoint-xl) xl:w-full xl:mx-auto" 
        ref={(div)=> containerRef = div} >

            <canvas className="sticky top-28 w-full h-[calc(100%-8rem)] flex items-center justify-center" 
            id="hero-lightpass" ref={(canvas) => canvasRef = canvas}/>
        </div>
    );
}

export default ScrollAnimation;