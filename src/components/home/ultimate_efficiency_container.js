// 'use client' // Renders on client side
import React from "react";
import UltimateEfficiencyItem from "./ultimate_efficiency_item";
import { useTranslations } from "next-intl";

function UltimateEfficiencyContainer (){
    const t = useTranslations('UltimateEfficiencyContainer');
    //#region view
    return(
        <div className="flex items-center justify-center overflow-hidden gap-px h-full select-none">
            <div className="mb-8 gap-1 flex flex-col *h-full lg:grid lg:grid-cols-2 max-w-(--breakpoint-xl) lg:mx-auto h-200 lg:h-120 w-full">
                <UltimateEfficiencyItem alt={"Why HYZ is the Best Choice for Efficient Transport"} image="/Images/FirstBlogList.webp" firstText={t('block1')} secondText= "Why HYZ is the Best Choice for Efficient Transport, Why HYZ is the Best Choice for Efficient TransportWhy HYZ is the Best Choice for Efficient TransportWhy HYZ is the Best Choice for Efficient Transport"/>
                <UltimateEfficiencyItem alt={"Discover the Premium Advantages of HZ7 Trailers"} image="/Images/SecondBlogList.webp" firstText={t('block2')} secondText= "Discover the Premium Advantages of HZ7 Trailers Discover the Premium Advantages of HZ7 Trailers Discover the Premium Advantages of HZ7 Trailers Discover the Premium Advantages of HZ7 Trailers"/>
            </div>
        </div>
    );
    //#endregion
}

export default UltimateEfficiencyContainer;