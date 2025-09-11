// 'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RibbonText from "@/components/general/ribbon_text";
import ImageViewerAlt from "@/components/general/image_viewer_alt"
import { useTranslations } from "next-intl";
import WhyChooseItem from "@/components/home/why_choose_item";

const WhyChooseArea = () => {

    const t = useTranslations('WhyChooseArea');

    return (
        <div className="w-full min-h-16 flex flex-col items-center justify-center mb-4">
            <div className="relative w-full h-[32rem]">
                <div className="absolute top-[20%] justify-self-center z-30 flex flex-col items-center justify-center">
                    {
                    t.rich('title', {
                        line: (chunks) => <span className="w-full uppercase wrap-break-word break-normal text-white text-shadow font-['oswald'] font-medium text-[1.75rem] leading-10 flex flex-wrap gap-1 lg:gap-2 items-center justify-center text-center col-start-1 col-end-4 row-start-1 lg:text-[2.5rem] lg:leading-12">{chunks}</span>,
                    })
                    }
                    <RibbonText text={t('ribbon')} className="mt-4"/>
                </div>
                <div className="absolute top-0 left-0 w-full h-full mask-b-from-20% mask-b-to-80%">
                    <div className="absolute top-0 left-0 w-full h-full bg-tertiary-dark-color/60 z-20" />
                    {/* <ImageViewerAlt className="motion-safe:transition-all motion-safe:duration-300 z-10 blur-[1px]
                        motion-reduce:transition-none will-change-auto saturate-50 grayscale-60 brightness-90
                        mask-b-from-20% mask-b-to-80%"
                        alt="Background of why choose us header's component"
                        src="/Images/moomoo.webp"
                    /> */}
                    <div className="absolute w-full h-full bg-[url(/Images/homeCarousel/one.webp)]
                        bg-center bg-cover bg-no-repeat z-5 saturate-50 grayscale-60 brightness-90">
                    </div> 
                </div>
            </div>
            <div className="bg-white -mt-[10rem] flex gap-6 flex-col p-6 justify-center items-center lg:gap-0 mx-4 max-w-screen-lg h-fit z-80
                lg:w-full lg:mx-auto shadow-md mb-4">
                <div className="flex m-4 w-full lg:mx-auto max-w-screen-lg flex-col gap-1 items-center justify-center">
                    {/* DIVIDER */}
                    <div className="w-full h-0.5 bg-secondary-color"></div>
                    <div className="w-3/4 h-0.5 bg-secondary-color"></div>
                </div>
                <p style={{wordWrap: "break-word",}} className="font-['lora'] font-semibold text-[1rem] text-center flex items-center self-center justify-self-center m-0">
                    {t('description')}
                </p>
                <div className="flex m-4 w-full lg:mx-auto max-w-screen-lg flex-col gap-1 items-center justify-center">
                    <div className="w-3/4 h-0.5 bg-secondary-color"></div>
                    <div className="w-full h-0.5 bg-secondary-color"></div>
                    {/* DIVIDER */}
                </div>
            </div>
            <div className="bg-white flex flex-col lg:flex-row gap-6 lg:gap-0 px-4 py-6 lg:px-0 justify-center items-center mx-4 max-w-screen-lg h-fit z-80
                lg:w-full lg:mx-auto w-full">
                <div className="w-full flex flex-col items-center justify-start gap-8">
                   <WhyChooseItem title={t('p1Title')} description={t('p1Description')}/>
                   <WhyChooseItem title={t('p2Title')} description={t('p2Description')}/>
                   <WhyChooseItem title={t('p3Title')} description={t('p3Description')}/>
                </div>
                <div className="flex flex-col items-center lg:items-end justify-center relative w-full h-96">
                    <ImageViewerAlt className="!h-[18rem] !w-[18rem] shadow-md relative
                        motion-reduce:transition-none will-change-auto0 grayscale-60 brightness-140
                        after:content-[''] after:w-full after:h-full after:bg-tertiary-dark-color/50 after:absolute
                        after:left-0 after:top-0 after:2-50" 
                        orientation="portrait" src="/Images/moomoo.webp" 
                        alt="Landscape with a cows into it"
                    />
                    <ImageViewerAlt 
                        className="!h-[16rem] !w-[12rem] absolute! shadow-md bottom-0 left-4 lg:left-16 self-center
                        motion-reduce:transition-none will-change-auto grayscale-60 brightness-140
                        after:content-[''] after:w-full after:h-full after:bg-tertiary-dark-color/50 after:absolute
                        after:left-0 after:top-0 after:2-50" 
                        orientation="portrait" 
                        src="/Images/barn-field.webp" 
                        alt="A rustic fence of a barn field"
                    />
                </div>
            </div>
        </div>
    ) 
}  

export default WhyChooseArea;