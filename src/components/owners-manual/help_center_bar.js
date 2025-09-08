'use client' // Renders on client side
import React, { useEffect, useState } from "react"
// import { useLocation } from "react-router-dom";
import { usePathname } from 'next/navigation'
import Link from "next/link";
import { useTranslations } from "next-intl";

const HelpCenterBar = () => {

    // const location = useLocation();
    const t = useTranslations('PagesTitles')
    //TODO: AQUI ME QUEDÉEEE
    const location = usePathname();
    console.log('location', location);
    
    const [activeSections, setActiveSections] = useState([]);

    const showOrHideCheckBox = (filterselected) => {
        const checkBoxes = document.getElementsByClassName(filterselected)
        
        for( var index = 0; index < checkBoxes.length; index++){
          checkBoxes[index].style.cssText = 
            checkBoxes[index].style.display === "block" ? "display: none !important; padding: 0rem !important;": "display: block !important; padding: 0.5rem !important;"  
        }
    
        if(activeSections.includes(filterselected)) {
          let newArr = activeSections.filter((item) => item !== filterselected);
          setActiveSections(newArr)
        } else {
          let newArr = [...activeSections, filterselected]
          setActiveSections(newArr)
        }
      }

    return(
        <div className="bg-[#f3f3f3]">
            <div className="h-20 hidden gap-8 items-center lg:flex mx-4 max-w-(--breakpoint-xl) z-100 xl:mx-auto">
                <h2 className="w-full font-['Michroma'] text-[1rem] uppercase font-bold">
                    {t('helpCenter')}
                </h2>
                <Link className={`flex-none uppercase font-['Michroma'] text-[1rem] leading-[1.8rem] border-none z-50
                    w-full h-9 cursor-pointer flex flex-col gap-0 items-start justify-center
                    bg-transparent text-[rgb(119,120,123)] lg:w-fit lg:items-center lg:hover:text-secondary-color
                    ${location === "/warranty-claim" ? "underline decoration-[3px] underline-offset-4 decoration-primary-color" : ""}`} 
                    href="/warranty-claim">{t('warrantyClaim')}</Link>
                <Link className={`flex-none uppercase font-['Michroma'] text-[1rem] leading-[1.8rem] border-none z-50
                    w-full h-9 cursor-pointer flex flex-col gap-0 items-start justify-center
                    bg-transparent text-[rgb(119,120,123)] lg:w-fit lg:items-center lg:hover:text-secondary-color
                    ${location === "/warranty-docs" ? "underline decoration-[3px] underline-offset-4 decoration-primary-color" : ""}`} 
                    href="/warranty-docs">{t('warrantyDocs')}</Link>
                <Link className={`flex-none uppercase font-['Michroma'] text-[1rem] leading-[1.8rem] border-none z-50
                    w-full h-9 cursor-pointer flex flex-col gap-0 items-start justify-center
                    bg-transparent text-[rgb(119,120,123)] lg:w-fit lg:items-center lg:hover:text-secondary-color
                    ${location === "/owners-manual" ? "underline decoration-[3px] underline-offset-4 decoration-primary-color" : ""}`} 
                    href="/owners-manual">{t('ownersManual')}</Link>
            </div>

            <ul className="w-full inline-flex gap-2 flex-col font-['Montserrat'] bg-white list-none relative
                select-none m-0 p-0 lg:hidden">
                <li className="p-0 border border-[#f3f3f3]" key={"help_center"}>
                    <div onClick={()=>showOrHideCheckBox("help_center")} 
                        className="py-3 px-4 cursor-pointer flex h-12 items-center justify-center bg-[#f3f3f3]">
                    <span className="w-full font-['Michroma'] text-[1rem] font-bold uppercase flex items-center">
                        {t('helpCenter')}
                    </span>
                    <span className="material-symbols-outlined notranslate ">
                        {!activeSections.includes("help_center") ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
                    </span>
                    </div>
                    <div className="flex flex-col gap-[0.2rem]">
                        <div className="help_center hidden font-['Montserrat'] rounded-[1px]">
                            <Link className={`flex-none font-['Michroma'] text-[1rem] leading-[1.8rem] border-none z-50
                                w-full h-9 cursor-pointer flex flex-col gap-0 items-start justify-center uppercase
                                bg-transparent text-[rgb(119,120,123)] lg:w-fit lg:items-center lg:hover:text-secondary-color
                                ${location === "/warranty-claim" ? "underline decoration-[3px] underline-offset-4 decoration-primary-color" : ""}`} 
                                href="/warranty-claim">{t('warrantyClaim')}</Link>
                            <Link className={`flex-none font-['Michroma'] text-[1rem] leading-[1.8rem] border-none z-50
                                w-full h-9 cursor-pointer flex flex-col gap-0 items-start justify-center uppercase
                                bg-transparent text-[rgb(119,120,123)] lg:w-fit lg:items-center lg:hover:text-secondary-color
                                ${location === "/warranty-docs" ? "underline decoration-[3px] underline-offset-4 decoration-primary-color" : ""}`} 
                                href="/warranty-docs">{t('warrantyDocs')}</Link>
                            <Link className={`flex-none font-['Michroma'] text-[1rem] leading-[1.8rem] border-none z-50
                                w-full h-9 cursor-pointer flex flex-col gap-0 items-start justify-center uppercase
                                bg-transparent text-[rgb(119,120,123)] lg:w-fit lg:items-center lg:hover:text-secondary-color
                                ${location === "/owners-manual" ? "underline decoration-[3px] underline-offset-4 decoration-primary-color" : ""}`} 
                                href="/owners-manual">{t('ownersManual')}</Link>
                        </div>
                    </div>
                </li>
            </ul>

        </div>
    )
}

export default HelpCenterBar;