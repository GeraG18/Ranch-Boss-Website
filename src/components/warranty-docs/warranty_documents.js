'use client' // Renders on client side
import React, {useState} from "react";
import { useTranslations } from "next-intl";
import { useOSDetector } from "@/hooks/os_detector/os_detector";

function WarrantyDocuments(){
    //#region code
    const [pdfSource, changePdfSource] = useState("/pdfs/HorizonWarrantyPolicy.pdf");//string of pdf source
    const [activeButton, setActiveButton] = useState("policy");//string of active button (for pdf source)
    const [activeSections, setActiveSections] = useState([]);//array of active collapse <li>
    const { os, } = useOSDetector();
    const t = useTranslations('WarrantyDocs')
    const pT = useTranslations('PagesTitles')

    const showOrHideLi = (filterselected) => {
        //document query for select li element
        const liElement = document.getElementById(filterselected);
        //changing the display of li collapse container
        liElement.style.cssText  = liElement.style.display === "flex" ? "display: none !important": "display: flex !important"  
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
    //#endregion

    //#region styles
    //#endregion

    //#region view
    return(
        <div className="h-fit flex flex-col my-4 lg:h-200 lg:flex-row gap-8 mx-4 
            max-w-screen-lg  z-100 xl:mx-auto">
            <div className="flex flex-col mb-4 gap-4 lg:mb-0">
                <ul className="w-full inline-flex flex-col gap-4 bg-white list-none relative p-0 m-0 
                    select-none lg:w-56">
                        <li className="p-0 border border-[#f3f3f3]">
                            <div onClick={()=>showOrHideLi("HORIZON")} className="px-3 flex flex-row items-center justify-center h-12 cursor-pointer font-bold bg-[#f3f3f3]">
                                <span className="w-full uppercase font-['lora'] font-semibold text-[#77787b] bg-transparent border-none gap-[0.2rem]" >
                                    {t('horizon')}
                                </span>
                                <span className="material-symbols-outlined notranslate ">
                                {!activeSections.includes("HORIZON") ? 'add' : 'remove'}
                                </span>
                            </div>
                            <div className="flex flex-col gap-[0.2rem]">
                                <div className="hidden font-semibold rounded-[1px] text-gray-500 flex-col items-start justify-center gap-2" id="HORIZON">
                                <h2 onClick={() => {changePdfSource("/pdfs/HorizonWarrantyPolicy.pdf"); setActiveButton("policy")}}
                                className={`font-['lora'] min-h-9 my-2 flex items-center justify-start w-full text-[1rem] bg-transparent border-none 
                                    cursor-pointer text-start px-4 ${activeButton === "policy" ? "text-primary-color" : ""}`}>{t('horizonWarranty')}</h2>
                                </div>
                            </div>
                        </li>

                        <li className="p-0 border border-[#f3f3f3]">
                            <div onClick={()=>showOrHideLi("AXLE")} className="px-3 flex flex-row items-center justify-center h-12 cursor-pointer font-bold bg-[#f3f3f3]">
                                <span className="w-full uppercase font-['lora'] font-semibold text-[#77787b] bg-transparent border-none gap-[0.2rem]" >
                                {t('axle')}
                                </span>
                                <span className="material-symbols-outlined notranslate ">
                                {!activeSections.includes("AXLE") ? 'add' : 'remove'}
                                </span>
                            </div>
                            <div className="flex flex-col gap-[0.2rem]">
                                <div className="hidden font-semibold rounded-[1px] text-gray-500 flex-col items-start justify-center gap-2" id="AXLE">
                                <h2 onClick={() => {changePdfSource("/pdfs/GRAxleWarranty.pdf"); setActiveButton("glwarranty")}} 
                                    className={`font-['lora'] min-h-9 my-2 flex items-center justify-start w-full text-[1rem] bg-transparent border-none 
                                    cursor-pointer text-start px-4 ${activeButton === "glwarranty" ? "text-primary-color" : ""}`}>{t('grAxles')}</h2>
                                <h2 onClick={() => {changePdfSource("/pdfs/DexterAxlesWarranty.pdf"); setActiveButton("lippertwarranty")}}
                                    className={`font-['lora'] min-h-9 my-2 flex items-center justify-start w-full text-[1rem] bg-transparent border-none 
                                    cursor-pointer text-start px-4 ${activeButton === "lippertwarranty" ? "text-primary-color" : ""}`}>{t('lippertAxles')}</h2>
                                </div>
                            </div>
                        </li>

                        <li className="p-0 border border-[#f3f3f3]">
                            <div onClick={()=>showOrHideLi("BATTERY")} className="px-3 flex flex-row items-center justify-center h-12 cursor-pointer font-bold bg-[#f3f3f3]">
                                <span className="w-full uppercase font-['lora'] font-semibold text-[#77787b] bg-transparent border-none gap-[0.2rem]" >
                                {t('battery')}
                                </span>
                                <span className="material-symbols-outlined notranslate ">
                                {!activeSections.includes("BATTERY") ? 'add' : 'remove'}
                                </span>
                            </div>
                            <div className="flex flex-col gap-[0.2rem]">
                                <div className="hidden font-semibold rounded-[1px] text-gray-500 flex-col items-start justify-center gap-2" id="BATTERY">
                                    <h2 onClick={() => {changePdfSource("/pdfs/Warranty-UnitedStates.pdf"); setActiveButton("usa")}} 
                                        className={`font-['lora'] min-h-9 my-2 flex items-center justify-start w-full text-[1rem] bg-transparent border-none 
                                            cursor-pointer text-start px-4 ${activeButton === "usa" ? "text-primary-color" : ""}`}>{t('interstateBatteriesUS')}</h2>
                                    <h2 onClick={() => {changePdfSource("/pdfs/Warranty-Canada.pdf"); setActiveButton("canada")}}
                                        className={`font-['lora'] min-h-9 my-2 flex items-center justify-start w-full text-[1rem] bg-transparent border-none 
                                            cursor-pointer text-start px-4 ${activeButton === "canada" ? "text-primary-color" : ""}`}>{t('interstateBatteriesCA')}</h2>
                                    <h2 onClick={() => {changePdfSource("/pdfs/GroupWarranty.pdf"); setActiveButton("group")}} 
                                        className={`font-['lora'] min-h-9 my-2 flex items-center justify-start w-full text-[1rem] bg-transparent border-none 
                                            cursor-pointer text-start px-4 ${activeButton === "group" ? "text-primary-color" : ""}`}>{t('brightGroup')}</h2>
                                </div>
                            </div>
                        </li>

                        <li className="p-0 border border-[#f3f3f3]">
                            <div onClick={()=>showOrHideLi("TARP")} className="px-3 flex flex-row items-center justify-center h-12 cursor-pointer font-bold bg-[#f3f3f3]">
                                <span className="w-full uppercase font-['lora'] font-semibold text-[#77787b] bg-transparent border-none gap-[0.2rem]" >
                                {t('tarp')}
                                </span>
                                <span className="material-symbols-outlined notranslate ">
                                {!activeSections.includes("TARP") ? 'add' : 'remove'}
                                </span>
                            </div>
                            <div className="flex flex-col gap-[0.2rem]">
                                <div className="hidden font-semibold rounded-[1px] text-gray-500 flex-col items-start justify-center gap-2" id="TARP">
                                    <h2 onClick={() => {changePdfSource("/pdfs/CarolinaTarpsWarranty.pdf"); setActiveButton("carolina")}} 
                                        className={`font-['lora'] min-h-9 my-2 flex items-center justify-start w-full text-[1rem] bg-transparent border-none 
                                            cursor-pointer text-start px-4 ${activeButton === "carolina" ? "text-primary-color" : ""}`}>{t('carolinaTarp')}</h2>
                                    <h2 onClick={() => {changePdfSource("/pdfs/DiamondTarpsWarranty.pdf"); setActiveButton("diamond")}} 
                                        className={`font-['lora'] min-h-9 my-2 flex items-center justify-start w-full text-[1rem] bg-transparent border-none 
                                            cursor-pointer text-start px-4 ${activeButton === "diamond" ? "text-primary-color" : ""}`}>{t('diamondTarp')}</h2>
                                </div>
                            </div>
                        </li>
                </ul>
            </div>

            <div className="flex h-[80vh] overflow-hidden flex-col w-full lg:h-auto">
                {
                    os === 'iOS' ? 
                    <div className="w-full h-full bg-[#f3f3f3] flex items-center justify-center">
                        <a className="font-['lora'] cursor-pointer relative text-white border-none bg-primary-color text-[1rem] select-none 
                        motion-safe:transition-all motion-reduce:transition-none will-change-auto py-3 px-10 w-fit 
                        lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:text-white self-center justify-self-center uppercase"
                        href={pdfSource} target="_blank" rel="noopener noreferrer">{pT('openPdf')}</a>
                    </div>
                    :
                    <embed src={pdfSource} type="application/pdf" width="100%" height="100%"/>
                }
            </div>

        </div>
    );
    //#endregion
}

export default WarrantyDocuments