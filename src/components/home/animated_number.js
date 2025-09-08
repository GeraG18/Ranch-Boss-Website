import React, { useEffect, useState } from "react";
import { css, StyleSheet } from "aphrodite";
import Odometer from "../general/odometer/odometer";

const AnimatedNumber = ({quantity, unit, children}) => {
    
    //#region code
    const [value, setValue] = useState('99');

    useEffect(() => {
        if(quantity) 
            setValue(quantity)
    }, [quantity])

    //#region view
    return(
        <div className="flex flex-col gap-1 items-center justify-center lg:flex-row">
            <div className="flex flex-row items-center justify-center">
                <div className="font-['Montserrat'] text-[2.2rem] leading-10 font-bold scale-[0.85] lg:scale-100">
                    <Odometer number={value}/>
                </div>
                <span className="font-['Montserrat'] text-[2.2rem] leading-10 font-bold scale-[0.85] lg:scale-100">{unit}</span>
            </div>
            {children}
        </div>
    );
}

export default AnimatedNumber;