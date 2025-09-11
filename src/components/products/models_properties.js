import React, { Fragment, useEffect, useState, memo, useMemo } from 'react';
import Link from "next/link";
import ImageViewer from '../general/image_viewer';
import { useTranslations } from 'next-intl';
import { formatCamelCaseToNormalCase, formatPropsToLimits } from '@/services/utils-service';

function ModelsProperties({image, id, status,notes, props, name, category, compareCategory, compareList, clickHandler = (name, category) =>{}}) {

    //#region code
    const t = useTranslations('PagesTitles');
    const kT = useTranslations('ProductsJson');
    
    const formatedProps = useMemo(() => {
        if(!props) return {};
        let newObj = {};
        for (const key in props) {
            newObj[key] = formatPropsToLimits(props[key]);
        }
        return newObj;
    }, [props]);

    //#region view   
    return (
        <Link href={`/products/standard-features/${id}`} 
            className="w-full flex gap-2 flex-col justify-around items-center cursor-pointer relative group/item
            overflow-hidden font-['lora] border border-gray-300
            transition-opacity duration-300 ease-in-out">
            <div className="h-full w-full flex flex-col p-1">
                <div className="aspect-16/10 w-full object-fill flex items-center justify-center relative">
                    {
                        notes &&
                        <div className="absolute font-['lora'] top-2 left-2 text-white -rotate-1
                                bg-tertiary-color min-h-6 min-w-6 p-1 max-w-[calc(100%-1.5rem)] flex 
                                cursor-help motion-safe:transition-all motion-reduce:transition-none text-sm
                                will-change-auto motion-safe:duration-300 group z-100 items-center justify-center"
                            onClick={(e) => e.preventDefault()}>
                            <span className="material-icons notranslate underline underline-offset-2 decoration-secondary-color
                                group-hover:no-underline">
                                warning_amber
                            </span>
                            <p className='overflow-hidden w-0 h-0 m-0 group-hover:w-fit group-hover:h-fit 
                                group-hover:ml-1 group-hover:p-1'>
                                {notes}
                            </p>
                        </div>
                    }
                    <ImageViewer
                        className={`h-4/5 transition-opacity duration-300 ${status ? 'blur-xs lg:blur-[0.5rem]' : ''}`}
                        src={image} 
                        category={category.toLowerCase().replace(' ', '')}
                        alt={`${name}`}
                    />
                    {
                        status &&
                        <div className="absolute bottom-2 font-['lora'] text-[white] *font-semibold
                            bg-secondary-color/80 rotate-[1.5deg] text-xs
                            min-h-6 min-w-6 p-0.5 *max-w-[calc(100%-1.5rem)] w-[120%] flex items-center justify-center text-center
                            motion-safe:transition-all motion-reduce:transition-none mb-1 text-[1rem] font-bold
                            will-change-auto motion-safe:duration-300 group z-20 uppercase"
                        >
                            <span>
                                {status}
                            </span>
                        </div>
                    }
                </div>

                <div className="flex items-center justify-end mx-2 my-2">
                    {
                        !status && (
                            <div className={`font-semibold text-gray-500 flex gap-2 items-center text-sm pl-2 
                            justify-center cursor-pointer h-full transition-opacity duration-200 ease-in-out 
                            ${compareList ? ( (category.includes(compareCategory)) ? "opacity-100 pointer-events-auto" 
                                : "opacity-0 pointer-events-none" ) 
                                : "opacity-0 pointer-events-none"}`}
                                onClick={(e) => {e.preventDefault(); clickHandler(id, category);} }>
                                <div className={`w-4 h-4 rotate-45 aspect-square flex items-center 
                                justify-center border transition-all duration-300
                                ${compareList ? ( compareList.includes(id) ? "border-secondary-color bg-secondary-color" : 
                                "border-gray-400" ) : "border-gray-400"}`}> 
                                    <div className={`rounded-full w-2 aspect-square bg-white
                                    motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400 
                                    ${compareList ? ( compareList.includes(id) ? "opacity-100" : "opacity-0" ) : "opacity-0"}`}>
                                    </div>
                                </div>
                                <span>{t('compare')}</span>
                            </div>
                        )
                    }
                </div>
                <span className="mx-2 w-[calc(100%-1rem)] font-medium text-[1.125rem] leading-[1.25rem] text-primary-color
                max-w-full line-clamp-2 font-['oswald']">
                    {(name)}
                </span>
                <div className="w-[calc(100%-2rem)] font-['oswald'] text-tertiary-color/70 font-medium mx-2 mb-2">
                    {/*formatedProps.type*/} {category}
                </div>
                <div className="my-2 mx-1 w-[calc(100%-1rem)] h-fit flex-none self-center
                flex flex-row gap-2">
                    <div className="bg-gray-300 w-full h-[2px]" />
                    <div className="bg-primary-color w-1 h-1 flex-none rotate-45" />
                    <div className="bg-gray-300 w-full h-[2px]" />
                    <div className="bg-primary-color w-1 h-1 flex-none rotate-45" />
                    <div className="bg-gray-300 w-full h-[2px]" />
                </div>
                <div className="mx-3 w-[calc(100%-2rem)] flex gap-2 flex-col justify-center items-center">
                    {
                        Object.keys(formatedProps).map((varName) => (
                            <Fragment key={varName}>
                            {
                                (formatedProps[varName]?.trim() !== '' && varName !== 'type') &&
                                <div className="flex flex-col w-full min-h-[2.2rem] text-sm">
                                    <span className="font-['oswald'] w-full flex justify-start items-center uppercase font-medium
                                    text-tertiary-dark-color/50 ">
                                        {formatCamelCaseToNormalCase(kT(varName))}
                                    </span>
                                    <p className="w-full flex justify-start items-center text-primary-color uppercase 
                                    font-semibold m-0">
                                        {formatedProps[varName]}
                                    </p>
                                </div>
                            }        
                            </Fragment>
                        ))
                    }
                </div>
            </div>
            <button className="text-secondary-color-20 bg-secondary-color w-full h-10 font-['oswald'] gap-2
            flex items-center justify-center cursor-pointer border-none uppercase font-medium
            transition-colors duration-300 *group-hover/item:bg-secondary-color">
                {t('view')}
                <span className="material-symbols-outlined notranslate h-6 w-6 flex items-center justify-center scale-80" >
                    east
                </span>
            </button>
        </Link>
    );
    //#endregion
}

export default memo(ModelsProperties, (prevProps, nextProps) => {
    
    return (
        prevProps.id === nextProps.id &&
        (prevProps.compareList || []).includes(prevProps.id) === (nextProps.compareList || []).includes(nextProps.id) &&
        (prevProps.compareCategory || '') === (nextProps.compareCategory || '') &&
        JSON.stringify(prevProps.formatedProps) === JSON.stringify(nextProps.formatedProps)
    );
});