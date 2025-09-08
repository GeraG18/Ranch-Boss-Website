import { css, StyleSheet } from "aphrodite";
import React from "react";

const Stepper = ({num}) => {
    
    //#region code
    const arr = Array.from(new Array(10));

    //#region view
    return(
        <div data-num={num} className="stepper flex flex-col text-center relative motion-safe:transition-all motion-safe:duration-600 motion-reduce:transition-none will-change-auto">
            {
                arr.map((val, index) => (
                    <span key={index}>{index}</span>
                ))
            }
        </div>
    );

}

export default Stepper;