'use client' // Renders on client side
import React from "react";
import { useState } from "react";

import FeaturedProductItem from "./featured_products_item"
import { useTranslations } from "next-intl";

function FeaturedProducts(){
    //#region code
    const t = useTranslations('FeaturedProducts');
    const [productSelected, setProduct] = useState("dump");

    const productList = {
        dump:       <FeaturedProductItem 
                        img="/Images/dump.webp"
                        firstText={t('dTitle')}
                        secondText={t('dDescription')}
                        linkMoreProducts={"/products?category=dump"}
                        alt={"Dump Trailers"}/>,
        rollOff:    <FeaturedProductItem 
                        img="/Images/rolloff.webp"
                        firstText={t('rTitle')}
                        secondText={t('rDescription')}
                        linkMoreProducts={"/products?category=rolloff"}
                        alt={"RollOff Trailers"}/>,
        equipment:   <FeaturedProductItem 
                        img="/Images/equipment.webp" 
                        firstText={t('eTitle')}
                        secondText={t('eDescription')}
                        linkMoreProducts={"/products?category=equipment"}
                        alt={"Equipment Trailers"}/>,
        flatdeck:  <FeaturedProductItem 
                        img="/Images/gooseneck.webp" 
                        firstText={t('gTitle')}
                        secondText={t('gDescription')}
                        linkMoreProducts={"/products?category=flat+deck"}
                        alt={"Flatdeck Trailers"}/>,
        utility:  <FeaturedProductItem 
                        img="/Images/utility.webp" 
                        firstText={t('uTitle')}
                        secondText={t('uDescription')}
                        linkMoreProducts={"/products?category=utility"}
                        alt={"Utility Trailers"}/>,
    }    
    
    const changeProduct = () => {
        switch(productSelected){
            case "dump":
                setProduct("rollOff")
                return
            case "rollOff":
                setProduct("equipment")
                return
            case "equipment":
                setProduct("flatdeck")
                return
            case "flatdeck":
                setProduct("utility")
                return
            case "utility":
                setProduct("dump")
                return
        }
    }
    //#endregion

    //#region display
    return (
        <div className="flex flex-col relative text-center items-center overflow-hidden gap-8 p-8">
            <div className="w-full flex flex-col gap-4 mt-4 mx-4 max-w-(--breakpoint-xl) z-10 lg:mx-auto">
                <div className="font-['Michroma'] font-bold text-[1.75rem] leading-10 flex items-center justify-center text-center col-start-1 col-end-4 row-start-1 lg:text-[2rem] lg:leading-12 uppercase text-white">{t('title')}</div>
                <div className="flex flex-col items-center justify-center gap-4 lg:w-full lg:flex-row lg:m-0">
                    <button className={`font-['Montserrat'] cursor-pointer relative text-white border-none 
                        motion-safe:transition-all motion-reduce:transition-none will-change-auto font-medium
                        motion-safe:duration-300 rounded-[10px] py-3 uppercase px-6 pointer-events-auto 
                        w-full lg:px-10 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium text-[1rem] select-none ${productSelected === 'dump' ? "bg-primary-color" : "bg-[#7a7a7a]"}`} 
                        onClick={() => setProduct("dump")}>
                        {t('dTitle')}
                    </button>
                    <button className={`font-['Montserrat'] cursor-pointer relative text-white border-none 
                        motion-safe:transition-all motion-reduce:transition-none will-change-auto font-medium
                        motion-safe:duration-300 rounded-[10px] py-3 uppercase px-6 pointer-events-auto 
                        w-full lg:px-10 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium text-[1rem] select-none ${productSelected === 'rollOff' ? "bg-primary-color" : "bg-[#7a7a7a]"}`} 
                        onClick={() => setProduct("rollOff")}>
                        {t('rTitle')}
                    </button>
                    <button className={`font-['Montserrat'] cursor-pointer relative text-white border-none 
                        motion-safe:transition-all motion-reduce:transition-none will-change-auto font-medium
                        motion-safe:duration-300 rounded-[10px] py-3 uppercase px-6 pointer-events-auto 
                        w-full lg:px-10 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium text-[1rem] select-none ${productSelected === 'equipment' ? "bg-primary-color" : "bg-[#7a7a7a]"}`} 
                        onClick={() => setProduct("equipment")}>
                        {t('eTitle')}
                    </button>
                    <button className={`font-['Montserrat'] cursor-pointer relative text-white border-none 
                        motion-safe:transition-all motion-reduce:transition-none will-change-auto font-medium
                        motion-safe:duration-300 rounded-[10px] py-3 uppercase px-6 pointer-events-auto 
                        w-full lg:px-10 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium text-[1rem] select-none ${productSelected === 'flatdeck' ? "bg-primary-color" : "bg-[#7a7a7a]"}`} 
                        onClick={() => setProduct("flatdeck")}>
                        {t('gTitle')}
                    </button>
                    <button className={`font-['Montserrat'] cursor-pointer relative text-white border-none 
                        motion-safe:transition-all motion-reduce:transition-none will-change-auto font-medium
                        motion-safe:duration-300 rounded-[10px] py-3 uppercase px-6 pointer-events-auto 
                        w-full lg:px-10 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium text-[1rem] select-none ${productSelected === 'utility' ? "bg-primary-color" : "bg-[#7a7a7a]"}`} 
                        onClick={() => setProduct("utility")}>
                        {t('uTitle')}
                    </button>
                </div>
            </div>
            <div className="w-full h-full flex flex-row gap-4 items-center justify-center mx-4 max-w-(--breakpoint-xl) z-10 lg:mx-auto">
                <div className="z-10 overflow-hidden block rounded-[10px] w-full max-w-(--breakpoint-xl) lg:h-140 lg:rounded-none lg:mx-auto">
                    {productList[productSelected]}
                </div>
                <button onClick={changeProduct} className="cursor-pointer w-8 z-8900 relative h-14 backdrop-saturate-50 backdrop-blur-sm bg-white/20 font-bold text-[1.2rem] 
                    motion-safe:transition-all motion-safe:duration-600 motion-reduce:transition-none will-change-auto select-none border-none text-white py-[1.6rem] px-4 
                    rounded-md hidden items-center justify-center lg:flex lg:hover:bg-primary-color">
                    <span className="material-symbols-outlined notranslate ">
                        chevron_right
                    </span>
                </button> 
            </div>
            <div className="absolute right-0 left-0 bg-no-repeat bg-cover bg-[url(/Images/firstBackgroundImage.webp)] z-1 block w-full h-full bg-black pointer-events-none"></div>
        </div>
    );
    //#endregion
}
export default FeaturedProducts