import { css, StyleSheet } from "aphrodite";
import React, { useEffect } from "react";
import Stepper from "./stepper";

const Odometer = ({number}) => {

    //#region code
    const nums = `${number}`.split("");

    useEffect(() => {
        const animate = () => {
            const elements = document.getElementsByClassName('stepper');
            
            [...elements].forEach((htmlEl) => {
                requestAnimationFrame(() => {
                    const numToStop = htmlEl.dataset.num;
                    htmlEl.style.cssText = 
                    `will-change: transform !important; transform: translateY(-${40 * parseInt(numToStop)}px) !important; transitionDelay:${100 * (10 - parseInt(numToStop))} !important;`
                });
            });
        }
        
        requestAnimationFrame(animate)
    },[number])

    //#region view
    return(
        <div className="h-10 flex overflow-hidden">
            {
                nums.map((val, index) => (
                    <Stepper key={index} num={val}/>
                ))
            }
        </div>
    );
}

export default Odometer;