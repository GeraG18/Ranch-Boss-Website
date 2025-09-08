'use client' // Renders on client side
import React, { useEffect, useState } from "react";
import { ProductsList } from "@/jsons/products/products"
import ModelsProperties from "./models_properties";
import { useLocale, useTranslations } from "next-intl";

const PopularTrailers = () => {
    
    //#region code
    const t = useTranslations('PagesTitles')
    const wT = useTranslations('WeReSorry')
    const locale = useLocale()
    const [viewItems, setViewItems] = useState([])
    const [isDesktop, setIsDesktop] = useState(false)

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

        let prodsWithoutComments = ProductsList[locale].filter((item) => !item.hasOwnProperty('_comment'));
        let turns = 0;
        while(item.length !== (isDesktop ? 3 : 2)) {
            let randomIndex = randomIntFromInterval(0, prodsWithoutComments.length - 1);
            let newItem = prodsWithoutComments[randomIndex];
            
            let find = item.find((el) => el.id === newItem.id);
            
            
            if(find === undefined) {
                item.push(prodsWithoutComments[randomIndex]);
                index ++;
            }
            turns++;
            if(turns > 12) break;
        }
        
        setViewItems(item)
    }, [isDesktop])

    //#region styles

    //#region view
    return(
        <div className="my-8 grid gap-4 grid-cols-2 lg:grid-cols-3 mx-4 max-w-(--breakpoint-lg) h-fit
        z-100 xl:w-full xl:mx-auto font-['Montserrat']">
            <h2 className="font-['Michroma'] font-bold text-[1.75rem] leading-10 flex items-center justify-center text-center col-start-1 col-end-4 row-start-1 lg:text-[2rem] lg:leading-12 uppercase"
                >{t('explorePopularTrailers')}</h2>
            {
                viewItems.length > 0 ?
                <>
                    {viewItems.map((model, index) => (
                        <ModelsProperties key={model.name+index} 
                            id={model.id}
                            status={model.status}
                            image={model.image}
                            props={model.props}
                            name={model.name}
                            category={model.category}
                            compareCategory={""}
                            compareList={false}
                            // clickHandler={(name, category) => 
                        />
                    ))}
                </>
                :
                <div className="mt-4 flex items-center justify-center gap-2 flex-col w-full
                h-fit col-span-full">
                    <h2 className="font-['Michroma'] text-[2rem] m-0">{wT('title')}</h2>
                    <p className="m-0">{wT('description')}</p>
                </div>
            }
        </div>
    );
}

export default PopularTrailers;