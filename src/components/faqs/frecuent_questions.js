'use client' // Renders on client side
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";
import faqs from "@/jsons/faqs.json"

const FrecuentQuestions = () => {

    const t = useTranslations('QualityPage')
    const locale = useLocale()
    //#region code
    const questions = faqs[locale]

    const [activeSections, setActiveSections] = useState([]);//array of active collapse <li>

    const showOrHideLi = (filterselected) => {
        //document query for select li element
        const liArr = document.getElementsByClassName(filterselected)
        //changing the display of li collapse container
        for( var index = 0; index < liArr.length; index++){
            liArr[index].style.cssText  = 
                liArr[index].style.height === "fit-content" ? "height: 0px !important": "height: fit-content !important"  
        }
        //if active sections contains the selected element
        if(activeSections.includes(filterselected)) {
            //filter and remove of the array    
            let newArr = activeSections.filter((item) => item !== filterselected);
            setActiveSections(newArr)
        } else {
            //adding the new element in array   
            let newArr = [...activeSections, filterselected]
            setActiveSections(newArr)
        }
    }

    //#region view
    return(
        <div className="font-['Montserrat'] py-28" id="faqs-section">
            <div className="mx-4 max-w-(--breakpoint-xl) z-100 xl:mx-auto select-none">
                <span className="font-['Michroma'] uppercase font-bold text-[1.75rem] leading-10 flex items-center justify-center text-center col-start-1 col-end-4 row-start-1 lg:text-[2rem] lg:leading-12">{t('faqTitle')}</span>
                <ul className="w-full inline-flex gap-4 flex-col bg-white list-none relative
                motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                motion-safe:duration-400 py-[10px] m-0">
                    {
                        questions.map(({question, answer}, index) => (
                            <li key={`question_${index}`} className="p-0 rounded-[10px] border border-[#f3f3f3]">
                                <div onClick={()=>showOrHideLi(`question_${index}`)} 
                                    className="py-3 px-4 cursor-pointer font-bold flex items-center justify-center bg-[#f3f3f3]">
                                    <span className="w-full uppercase flex items-center">
                                        {question}
                                    </span>
                                    <span className="text-[#babbbd] material-symbols-outlined notranslate ">
                                        {!activeSections.includes(`question_${index}`) ? 'add' : 'remove'}
                                    </span>
                                </div>
                                <div className="pl-[0.2rem] flex flex-col gap-[0.2rem] motion-safe:transition-all 
                                    motion-reduce:transition-none will-change-auto motion-safe:duration-400 ">
                                    <div className={`flex flex-col h-0 rounded-[1px] overflow-hidden whitespace-pre-line
                                        px-4 motion-safe:transition-all motion-reduce:transition-none 
                                        will-change-auto motion-safe:duration-400 question_${index}`}>
                                        {answer}
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default FrecuentQuestions;