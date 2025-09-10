import React, {useState, useEffect, Fragment, useCallback} from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Financers from "@/jsons/financers.json"

function OurFinancers (){

    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations('Financers')
    const searchParams = useSearchParams();
    const locale = useLocale();
    const params = new URLSearchParams(searchParams);
    const [activeButton, setActiveButton] = useState("sheffield");
    const segments = ['sheffield', 'mazo', 'trio', 'synchrony'];
    const selectedFinancer =  (searchParams.get('financer'));
    const financers = Financers[locale]

    const removeQueryParam = (param) => {
        params.delete(param);
        router.push(`${pathname}${params.size > 0 ? "?" : ""}${params.toString()}`);
    };

    const setQueryParam = (param, value) => {
        params.set(param, value);
        router.push(`${pathname}${params.size > 0 ? "?" : ""}${params.toString()}`);
    };

    useEffect(() => {
        if(activeButton === '') {
            removeQueryParam('financer');
        } else {
            setQueryParam('financer', activeButton.toLowerCase());
        }
    }, [activeButton]);

    useEffect(()=> {
        if(segments.find((item) => item === selectedFinancer)) {
            setActiveButton(selectedFinancer)
        } else { 
            setActiveButton("sheffield")
        }
    }, [selectedFinancer]);
    //#endregion

    //#region view
    return(
        <div className="my-8 min-h-120 flex flex-col items-center mx-4 max-w-screen-lg  z-100
            xl:mx-auto">
            <div className="hidden flex-row gap-8 lg:flex">
            {
                Object.keys(financers).map((financerId, index) => (
                    <button key={financerId} onClick={() => { setActiveButton(financerId)}} className={`font-['lora'] text-[2rem] leading-[1.8rem] border-none z-50 w-fit
                        h-9 cursor-pointer flex flex-col gap-0 items-center justify-center bg-transparent text-[rgb(119,120,123)] 
                        ${activeButton === financerId ? "underline decoration-primary-color decoration-[3px] underline-offset-4" :  ""}`}>
                        {financers[financerId].name}
                    </button>
                ))
            }
            </div>
            <div className="hidden flex-col lg:flex">
                <h2 className="font-['lora'] text-[2rem] uppercase pl-0 self-start lg:pt-[1.8rem]">
                    {t('financeTrailer', {name:financers[activeButton].name})}
                </h2>
                <div className="flex flex-col gap-4 w-full">
                    <div className="h-full flex items-center justify-center flex-col-reverse gap-8 lg:flex-row">
                        <p className="p-0 m-0 h-72 overflow-hidden w-full font-['lora'] text-[1rem] flex flex-col gap-8">
                            {financers[activeButton].body}
                        </p>
                        <img alt="sheffield" loading='lazy' 
                            className="w-full lg:flex lg:w-[300px]!" 
                            src={financers[activeButton].image}/>
                        
                    </div>
                    <div className="text-black flex flex-col gap-4 self-center w-full lg:flex-row lg:gap-10">
                        <a href={financers[activeButton].infoButton} target="_blank" 
                            className="font-['lora'] cursor-pointer relative text-white border-none bg-primary-color text-[1rem] select-none flex items-center justify-center 
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-300 py-2 pointer-events-auto
                            w-full lg:w-60 lg:px-6 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium uppercase">{t('information')}</a>
                        <Link href="/find-a-dealer" className="font-['lora'] cursor-pointer relative text-white border-none bg-primary-color text-[1rem] select-none flex items-center justify-center 
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-300 py-2 pointer-events-auto
                            w-full lg:w-60 lg:px-6 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium uppercase">{t('locateDealer')}</Link>
                        <a href={financers[activeButton].applyButton} target="_blank"  className="font-['lora'] cursor-pointer relative text-white border-none bg-primary-color text-[1rem] select-none flex items-center justify-center 
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-300 py-2 pointer-events-auto
                            w-full lg:w-60 lg:px-6 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium uppercase">{t('apply')}</a>                        
                    </div>
                </div>
            </div>

            <div className="flex gap-8 flex-col w-full lg:hidden">
                {
                    Object.keys(financers).map((active, index) => (
                        <div className="flex gap-4 flex-col w-full" 
                            key={'item'+index}>
                            <div className="w-full h-full flex items-center justify-center flex-col gap-8 lg:flex-row">
                                <img alt="sheffield" loading='lazy' className="w-full lg:flex lg:w-[300px]" 
                                    src={financers[active].image}/>
                                <h2 className="font-['lora'] text-[2rem] uppercase pl-0 self-start lg:pt-[1.8rem]">
                                    {t('financeTrailer', {name:financers[active].name})}
                                </h2>
                                <p className="h-full font-['lora'] text-[1rem] flex flex-col gap-8">
                                    {financers[active].body}
                                </p>
                            </div>
                            <div className="text-black flex flex-col gap-4 self-center w-full lg:flex-row lg:gap-10">
                                <a href={financers[active].infoButton} target="_blank" className="font-['lora'] cursor-pointer relative text-white border-none bg-primary-color text-[1rem] select-none flex items-center justify-center 
                                    motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-300 py-2 pointer-events-auto
                                    w-full lg:w-60 lg:px-6 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium uppercase">{t('information')}</a>
                                <Link href="/find-a-dealer" className="font-['lora'] cursor-pointer relative text-white border-none bg-primary-color text-[1rem] select-none flex items-center justify-center 
                                    motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-300 py-2 pointer-events-auto
                                    w-full lg:w-60 lg:px-6 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium uppercase">{t('locateDealer')}</Link>
                                <a href={financers[active].applyButton} target="_blank" className="font-['lora'] cursor-pointer relative text-white border-none bg-primary-color text-[1rem] select-none flex items-center justify-center 
                                    motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-300 py-2 pointer-events-auto
                                    w-full lg:w-60 lg:px-6 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium uppercase">{t('apply')}</a>                        
                            </div>
                        </div>
                    ))
                }
            </div>
            
        </div>
    );
    //#endregion
}

export default OurFinancers