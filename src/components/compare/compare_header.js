import { useTranslations } from "next-intl";
import React from "react";

function CompareHeader({category}) {

    const t = useTranslations('PagesTitles')
    const cT = useTranslations('CompareModels.header')
    //region view
    return (
        <div className="bg-[#f3f3f3] relative font-['lora'] w-full py-6">
            <div className="mx-4 max-w-screen-lg  h-fit z-100 xl:mx-auto xl:w-full
            flex flex-col items-center justify-center gap-2">
                <h1 className="font-['lora'] text-[2.25rem] leading-8 flex uppercase
                items-center justify-center text-center lg:text-[3.8rem] lg:leading-12"
                >{cT('title')}</h1>
                <h2>
                    {cT('subtitle',{category: t('dynCatTrailer', {category}) })}
                </h2>
            </div>
        </div>
    );
    //#endregion
}

export default CompareHeader