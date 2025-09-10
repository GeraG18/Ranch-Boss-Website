'use client' // Renders on client side
import React, { Fragment, useEffect, useState } from "react";
import MerchandiseItem from "./merchandise_item";
import { useTranslations } from "next-intl";
import { useMerchandiseProdsContext } from "@/context/merchandise_products_context";

const PopularMerchandise = () => {
    
    const t = useTranslations('Merchandise')
    const wT = useTranslations('WeReSorry')
    //#region code
    const [viewItems, setViewItems] = useState([])
    const [isDesktop, setIsDesktop] = useState(false)
    const { products } = useMerchandiseProdsContext();

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 1024px)");
        setIsDesktop(mediaQuery.matches)

        const onMediaChange = (event) => {
            if (event.matches) {
                // The viewport is 600 pixels wide or less
                
                
            } else {
                // The viewport is more than 600 pixels wide
                
            }
            setIsDesktop(event.matches)
        }

        mediaQuery.addEventListener("change", onMediaChange);

        return () => {
            // componentwillunmount
            mediaQuery.removeEventListener("change",onMediaChange)
        }
    }, [])

    useEffect(() => {
        let item = [];
        let index = 0; 

        while(item.length !== (isDesktop ? 3 : 2)) {
            let randomIndex = randomIntFromInterval(0, products.length - 1);
            //hacer if con find
            item.push(products[randomIndex]);
            index ++;
        }
        
        setViewItems(item)
    }, [isDesktop])
    //#region view
    return(
        <div className="my-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-4 max-w-[924px]
        h-fit z-100 xl:mx-auto xl:w-full">
            <span className="font-['lora'] font-medium text-[2.25rem] leading-8
            flex items-center justify-center text-center col-span-full
            lg:text-[3.8rem] lg:leading-12 uppercase">{t('explorePopularMerch')}</span>
            {
                viewItems.length > 0 ?
                <>
                    {viewItems.map(({key, name, description, price, imageGallery}, index) => (
                        <MerchandiseItem 
                            key={index} 
                            keyName={key} 
                            name={name} 
                            description={description} 
                            price={price} 
                            image={imageGallery[0]}
                        />
                    ))}
                </>
                :
                <div className="mt-4 flex items-center justify-center gap-2 flex-col w-full h-fit col-span-full">
                    <h1 className="font-['lora'] text-[2rem] m-0">{wT('title')}</h1>
                    <p className="font-['lora'] m-0">{wT('description')}</p>
                </div>
            }
        </div>
    );
}

export default PopularMerchandise;