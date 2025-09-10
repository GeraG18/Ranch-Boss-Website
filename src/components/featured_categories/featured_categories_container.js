// 'use client' // Renders on client side
import React, { useMemo } from "react";
import FeaturedCategoriesItem from "./featured_categories_item";
import { useLocale, useTranslations } from "next-intl";
import { ProductsList } from "@/jsons/products/products";

function FeaturedCategoriesContainer(){
    const t = useTranslations('FeaturedCategories');
    const fT = useTranslations('PagesTitles');

    const locale = useLocale();

    const [categories, length] = useMemo(() => {
        let removedComments = ProductsList[locale].filter((item) => !item.hasOwnProperty('_comment'));
        let cats = [...new Set([...removedComments.map((item) => item.category)])];
        return [cats, cats.length];
    }, [locale, ProductsList])

    console.log('categories',categories);
    
    //Display
    return (
        <div className="flex flex-col items-center justify-center gap-px h-full select-none">
            <span className="font-['lora'] font-bold text-[1.75rem] leading-10 flex items-center justify-center text-center col-start-1 col-end-4 
            row-start-1 lg:text-[2rem] lg:leading-12 uppercase">{t('title')}</span>
            <div className="m-[2%_1%_2%_1%] flex flex-wrap gap-2 items-center justify-center w-full h-full max-w-screen-lg  mx-auto">
                {/* <FeaturedCategoriesItem responsive="w-full h-[50vh] lg:w-[calc(50%-0.5rem)] lg:h-full" size="calc(50%-0.5rem)" mobileSize="50vh" image="/Images/dump.webp" firstText={t('dTitle')} description={t('dDescription')} url={`/products?category=${fT('dump').toLowerCase().replace(' ', '+')}`} alt={"Go to Dumps"}/>
                <FeaturedCategoriesItem responsive="w-full h-[50vh] lg:w-[calc(50%-0.5rem)] lg:h-full" size="calc(50%-0.5rem)" mobileSize="50vh" image="/Images/rolloff.webp" firstText={t('rTitle')} description={t('rDescription')} url={`/products?category=${fT('rolloff').toLowerCase().replace(' ', '+')}`} alt={"Go to Roll Off"}/> */}
                {
                    categories.map((item, index) => {
                        return (
                            <FeaturedCategoriesItem key={index} responsive="w-full h-[30vh] lg:w-[calc(33.33%-0.5rem)] lg:h-full" size="calc(33.33%-0.5rem)" mobileSize="30vh" image="/Images/equipment.webp" firstText={fT('dynCatTrailer', {category: item}).toUpperCase()} description={''} url={`/products?category=${encodeURI(item.toLowerCase())}`} alt={item}/>
                        )
                    })
                }
                {/* <FeaturedCategoriesItem responsive="w-full h-[30vh] lg:w-[calc(33.33%-0.5rem)] lg:h-full" size="calc(33.33%-0.5rem)" mobileSize="30vh" image="/Images/equipment.webp" firstText={t('eTitle')} description={t('eDescription')} url={`/products?category=${fT('equipment').toLowerCase().replace(' ', '+')}`} alt={"Go to Equipment"}/>
                <FeaturedCategoriesItem responsive="w-full h-[30vh] lg:w-[calc(33.33%-0.5rem)] lg:h-full" size="calc(33.33%-0.5rem)" image="/Images/gooseneck.webp" firstText={t('fTitle')} description={t('fDescription')} url={`/products?category=${fT('flatdeck').toLowerCase().replace(' ', '+')}`} alt={"Go to Flatdeck"}/>
                <FeaturedCategoriesItem responsive="w-full h-[30vh] lg:w-[calc(33.33%-0.5rem)] lg:h-full" size="calc(33.33%-0.5rem)" mobileSize="30vh" image="/Images/utility.webp" firstText={t('uTitle')} description={t('uDescription')} url={`/products?category=${fT('utility').toLowerCase().replace(' ', '+')}`} alt={"Go to Utility"}/> */}
            </div>
        </div>
    );
}
export default FeaturedCategoriesContainer
