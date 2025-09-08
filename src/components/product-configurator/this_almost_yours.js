'use client' // Renders on client side
import React, { useEffect, useRef, useState } from "react";
import { useConfiguratorContext } from "../../context/configurator_context/configurator_context";
import ImageViewer from "../general/image_viewer";
import { useTranslations } from "next-intl";

function ThisAlmostYours({onClickEvent = (clicked='') => {}}) {

    //#region code
    const t = useTranslations('ConfigureModel');
    const {product, downloadPDF, showRequestModelDialog, isColorAndBaseModelEmpty} = useConfiguratorContext()
    let pdfDownloadRef = useRef(null);

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])
    //#endregion

    //region view
    return (
        <div className="bg-[#f3f3f3] relative font-['Montserrat'] w-full py-6 my-8">
            <div className="mx-4 max-w-(--breakpoint-xl) h-fit z-100 xl:w-full xl:mx-auto flex flex-col items-center justify-center gap-2">
                <h1 className="font-['Michroma'] text-[2.25rem] leading-8 flex items-center justify-center
                text-center lg:text-[3.8rem] lg:leading-12 uppercase">
                    {t('isAlmostYours.title', {name: product?.name})}
                </h1>
                <h3>
                    {t('isAlmostYours.subtitle')}
                </h3>
                <div className="w-full lg:w-[20rem]">
                    <ImageViewer src={product?.descriptions?.gallery?.[0]} alt={product?.name+' model'}/>
                </div>
                { isClient &&
                <div className="w-full list-none flex items-center justify-center flex-row flex-wrap gap-4">
                    <button className="flex-none uppercase cursor-pointer relative text-white border-none bg-primary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium  text-[1rem] select-none motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-300
                        flex gap-[2px] h-10 min-w-10 items-center justify-center rounded-[10px] disabled:cursor-not-allowed disabled:bg-[#7a7a7a] disabled:hover:bg-[#5c5b5b] px-2" onClick={() => {downloadPDF()}}
                        disabled={isColorAndBaseModelEmpty()}>
                        <span style={{fontSize:'1.5rem'} } className="material-icons notranslate ">picture_as_pdf</span>
                        <span className="">
                            {t('getConfig')}
                        </span>
                    </button>
                    <button className="flex-none uppercase cursor-pointer relative text-white border-none bg-primary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium  text-[1rem] select-none motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-300
                        flex gap-[2px] h-10 min-w-10 items-center justify-center rounded-[10px] disabled:cursor-not-allowed disabled:bg-[#7a7a7a] disabled:hover:bg-[#5c5b5b] px-2" onClick={() => {
                       showRequestModelDialog();
                    }} disabled={isColorAndBaseModelEmpty()}>
                        <span style={{fontSize:'1.5rem'} } className="material-icons notranslate ">request_quote</span>
                        <span className="">
                            {t('requestModel')}
                        </span>
                    </button>
                </div>
                }
            </div>
        </div>
    );
    //#endregion
}

export default ThisAlmostYours