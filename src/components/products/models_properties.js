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
            overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] font-['Montserrat] rounded-[1rem]
            bg-[radial-gradient(circle,rgba(55,62,62,0)_50%,rgba(55,62,62,0.03)_74%,rgba(55,62,62,0.06)_100%)]
            transition-opacity duration-300 ease-in-out">
            <div className="h-full w-full flex flex-col p-1">
                <div className="aspect-16/10 w-full object-fill flex items-center justify-center">
                    {
                        notes &&
                        <div className="absolute font-['Montserrat'] top-2 right-2 text-white
                            backdrop-saturate-50 backdrop-blur-sm bg-[rgb(18,18,18)]/75 rounded-[10px] 
                            min-h-6 min-w-6 p-1 max-w-[calc(100%-1.5rem)] flex items-center justify-center
                            cursor-help opacity-50 motion-safe:transition-all motion-reduce:transition-none 
                            will-change-auto motion-safe:duration-300 group hover:opacity-100 z-100"
                            onClick={(e) => e.preventDefault()}>
                            <span className="material-icons notranslate ">
                                warning_amber
                            </span>
                            <p className='overflow-hidden w-0 h-0 m-0 group-hover:w-fit group-hover:h-fit 
                            group-hover:ml-1'>
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
                        <div className="absolute font-['Michroma'] text-[white] *font-semibold
                            backdrop-saturate-50 backdrop-blur-sm bg-primary-color/70 *rounded-[10px] 
                            min-h-6 min-w-6 p-0.5 *max-w-[calc(100%-1.5rem)] w-full flex items-center justify-center text-center
                            motion-safe:transition-all motion-reduce:transition-none mb-1 text-[1rem] font-bold
                            will-change-auto motion-safe:duration-300 group z-20 uppercase"
                        >
                            <span>
                                {status}
                            </span>
                        </div>
                    }
                </div>

                <div className="flex items-center justify-end mx-4">
                    {
                        !status && (
                            <div className={`uppercase font-semibold text-[#77787b] flex gap-1 items-center
                            justify-center cursor-pointer h-full transition-opacity duration-200 ease-in-out 
                            ${compareList ? ( (category.includes(compareCategory)) ? "opacity-100 pointer-events-auto" 
                                : "opacity-0 pointer-events-none" ) 
                                : "opacity-0 pointer-events-none"}`}
                                onClick={(e) => {e.preventDefault(); clickHandler(id, category);} }>
                                <div className={`rounded-full w-4 aspect-square flex items-center 
                                justify-center border transition-all duration-300
                                ${compareList ? ( compareList.includes(id) ? "border-primary-color" : "border-[#77787b]" ) : "border-[#77787b]"}`}> 
                                    <div className={`rounded-full w-2 aspect-square bg-primary-color
                                    motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400 
                                    ${compareList ? ( compareList.includes(id) ? "opacity-100" : "opacity-0" ) : "opacity-0"}`}>
                                    </div>
                                </div>
                                <span>{t('compare')}</span>
                            </div>
                        )
                    }
                </div>
                <span className="mx-2 w-[calc(100%-1rem)] font-bold text-[1.125rem] text-black
                max-w-full line-clamp-2 font-['Michroma']">
                    {(name)}
                </span>
                <div className="w-[calc(100%-2rem)] text-black font-bold mx-4 mb-2">
                    {/*formatedProps.type*/} {category}
                </div>
                <div className="my-2 mx-1 w-[calc(100%-1rem)] h-[3px] bg-[#77787b] flex-none self-center"></div>
                <div className="mx-3 w-[calc(100%-2rem)] flex gap-2 flex-col justify-center items-center text-[#77787b]">
                    {
                        Object.keys(formatedProps).map((varName) => (
                            <Fragment key={varName}>
                            {
                                (formatedProps[varName]?.trim() !== '' && varName !== 'type') &&
                                <div className="flex flex-col w-full min-h-[2.2rem]">
                                    <span className="w-full flex justify-start items-center uppercase font-semibold">
                                        {formatCamelCaseToNormalCase(kT(varName))}
                                    </span>
                                    <p className="w-full flex justify-start items-center text-black uppercase font-bold m-0">
                                        {formatedProps[varName]}
                                    </p>
                                </div>
                            }        
                            </Fragment>
                        ))
                    }
                </div>
            </div>
            <button className="text-white bg-primary-color w-full h-11
            flex items-center justify-center cursor-pointer border-none uppercase font-medium
            transition-colors duration-300 *group-hover/item:bg-secondary-color">
                {t('view')}
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