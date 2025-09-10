import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

function YourMessage ({value = "", clearedValue = false , returnValue = (value) => {}}){

    //#region code
    const [text, setText] = useState(value)
    const fT = useTranslations('BasicForm')

    useEffect(() => {
        setText(value);
    }, [clearedValue])

    useEffect(() => {
        returnValue(text)
    },[text])

    //#region view
    return(
        <div className="m-4 flex flex-col gap-2 h-fit lg:mx-auto lg:max-w-(--breakpoint-md)">
            <h2 className=" text-black w-full font-['lora'] uppercase 
                text-[1rem] font-bold leading-[1.2rem flex-none]">{fT('messageLabel')}</h2>
            <textarea className="h-64 outline-hidden border border-[#d5d5d5] 
                font-['lora'] text-[1rem] bg-transparent
                resize-none m-0 py-1 px-2 inputForm" 
                placeholder={fT('messagePlaceholderAlt')} aria-label={fT('messagePlaceholder')} role="form" 
                value={text} onChange={(e) => setText(e.target.value)}
            ></textarea>
        </div>
        // <div className={css(styles.container)}>
        // </div>
    )
    //#endregion
}

export default YourMessage