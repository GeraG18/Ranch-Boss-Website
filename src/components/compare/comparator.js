'use client' // Renders on client side
import React, { Fragment, useEffect, useMemo, useState } from "react";
import ModelSelectorModal from "./model_selector_modal";
import {ProductsDescriptions, ProductsList} from "@/jsons/products/products";
import ImageViewer from "../general/image_viewer";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import DescriptionModal from "@/components/compare/description_modal"
import { checkIfTranslationExists, formatPropsToLimits } from "@/services/utils-service";
import LoadingLoop from "@/components/icons/loading_loop";

const Comparator = ({categoryId=""}) => {
    
    //#region code
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const t = useTranslations('PagesTitles')
    const kT = useTranslations('ProductsJson')
    const locale = useLocale()
    
    const [selectedModels, setSelectedModels] = useState([]);
    const [models, setModels] = useState({});
    const [availableModels, setAvailableModels] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);
    const [loading, setLoading] = useState(true);
    const [openDescription, setOpenDescription] = useState(false);

    console.log('data', ProductsList[locale])
    
    const setAllQueryParams = (selectedList) => {
        let route = `/products/compare/${categoryId.toLowerCase().replace(' ', '+')}?`
        selectedList.forEach((element, index)=>{
            route += `model=${element}${index !== (selectedList.length - 1) ? '&' : ''}`
        })
        router.push(route)
    }

    const prodsWithoutComments = useMemo(() => {
        return ProductsList[locale].filter((item) => (!item.hasOwnProperty('_comment') && !item.status));
    }, [])

    const findProductAndAddToList = () => {
        let newItems = prodsWithoutComments.filter((item) => selectedModels.includes(item.id) && item.category === categoryId?.toUpperCase());
        let [newObj, dashItems] = [{}, ['gvwr', 'gnLengths']];
        newItems.forEach((item) => {
            const {descriptions, standardFeatures} = ProductsDescriptions[locale][item.id];
            const props = item.props;
            let image = item.image;
            let description = descriptions.firstBlock.description;
            let lSys = (standardFeatures?.[kT('liftSystem')] || standardFeatures?.[kT('tiltSystem')] || []);
            let liftSystem = {};
            for (const prop in lSys) {
                liftSystem[prop] = "-";
                Object.entries(lSys[prop]).forEach((e, index) => {
                    liftSystem[prop] = liftSystem[prop] === "-" ? [] : liftSystem[prop] 
                    liftSystem[prop].push( <span key={e[0]+index}>▸{formatCamelCaseToNormalCase(e[0])}: <span style={{fontWeight:'400'}}>{e[1]}</span> </span>)
                });
            }
            let flooring = standardFeatures[kT('dump')] ? standardFeatures[kT('dump')][kT('bed')][kT('flooring')] : (standardFeatures[kT('deck')] ? standardFeatures[kT('deck')][kT('bed')][kT('flooring')] : "-");
            let nProps = {
                model: {name: item.name, image, id:item.id}, 
                description: {id: item.id, description}, 
                ...props, 
                liftSystem, 
                flooring
            }
            Object.keys(nProps).forEach((key) => {
                newObj[key] ??= []
                let converted = formatPropsToLimits(nProps[key], dashItems.includes(key) ? ' - ' : ', ');
                newObj[key].push(typeof converted === 'string' ? {id: item.id, name: item.name, value:converted} : {...converted})
            });
        })
        
        setModels(newObj)
        setLoading(false)
    }

    const formatCamelCaseToNormalCase = (inputString) => {
        let finalString = '';
        for(let i=0; i<inputString.length; i++){
          finalString += inputString[i].match(/[A-Z]/) != null ? ' '+inputString[i].toLowerCase(): inputString[i];
        }
        return finalString;
    }

    const modalHandler = (opened, selectedList) => {
        setIsModalOpen(opened);
        if(selectedList) {
            setSelectedModels(selectedList)
            setAllQueryParams(selectedList)
        }
    }

    const loadAvailableModelsInCategory = () => {
        let arr = prodsWithoutComments.filter((item) => (item.category === categoryId?.toUpperCase() ));
        setAvailableModels(arr);
    }

    const removeItem = (name, index) => {
        let arr = selectedModels.filter((item) => item !== name)
        setSelectedModels(arr)
        setAllQueryParams(arr)
    }

    const generateComparation = () => {
        let models = (params.getAll('model')).filter((item, index) => index < (isDesktop ? 3 : 2));
        if(models !== null) { setSelectedModels(models); }
    }

    useEffect(() => { generateComparation(); }, [isDesktop]);

    useEffect(() => { setLoading(true); findProductAndAddToList(); }, [selectedModels])

    useEffect(() => {
        loadAvailableModelsInCategory();
        
        const mediaQuery = window.matchMedia("(min-width: 1024px)");
        setIsDesktop(mediaQuery.matches)
        const onMediaChange = (event) => { setIsDesktop(event.matches) }
        mediaQuery.addEventListener("change", onMediaChange);
        return () => {
            mediaQuery.removeEventListener("change",onMediaChange)
        }
    }, [])
    //#endregion

    //#region view
    return (
        <>
            <DescriptionModal showModal={openDescription !== false} description={openDescription} closeModal={(val) => {setOpenDescription(val)}}/>
            <ModelSelectorModal category={categoryId} showModal={isModalOpen} selectedList={selectedModels} modelsList={availableModels} closeModal={modalHandler}/>
            <div className="font-['lora'] flex flex-col relative pt-4 pb-16 overflow-x-hidden">
                <div className="mx-4 w-[calc(100%-2rem)] max-w-screen-lg  xl:mx-auto">
                    {
                        loading ?
                        <div className="flex items-center justify-center h-72">
                            <LoadingLoop/>
                        </div>
                        :
                        <div className="flex flex-col gap-2">
                            <div className={`overflow-hidden grid gap-2 lg:gap-4 ${isDesktop ? "grid-cols-3" : "grid-cols-2"}`}>
                                {
                                    (models['model'] || []).map((values, index) => (
                                        <div 
                                            key={`${values.id}_${index}`} 
                                            className="w-full relative group flex flex-col items-center justify-end *pt-4 *lg:pt-0"
                                        >
                                            <span className="absolute top-[0.2rem] right-4 z-15 uppercase cursor-pointer
                                            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400 
                                            py-0.5 px-2 bg-primary-color text-white lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium" 
                                            onClick={() => removeItem(values.id, index)}>
                                                {t('remove')}
                                            </span>
                                            {
                                                values.image &&
                                                <div className="-mb-12 self-center w-4/5 z-10 pointer-events-none lg:-mb-16">
                                                    <ImageViewer className="lg:group-hover:scale-110 motion-safe:transition-all 
                                                    motion-reduce:transition-none will-change-auto motion-safe:duration-300" 
                                                    category={categoryId.toLowerCase().replace(' ', '')}
                                                    src={values.image} alt={`${values.name} model`}/>
                                                </div>
                                            }
                                            <div className={`relative w-[calc(100%-2rem)] p-4 flex flex-col
                                                items-start justify-end pt-12 mb-4 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]
                                                bg-[radial-gradient(circle,rgba(55,62,62,0)_50%,rgba(55,62,62,0.03)_74%,rgba(55,62,62,0.06)_100%)]
                                                lg:h-24 h-full
                                            `}>
                                                <Link href={`/products/standard-features/${values.id}`} 
                                                className="font-semibold select-none max-w-full relative top-0 cursor-pointer
                                                text-[1rem] motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                                                motion-safe:duration-300 text-black lg:hover:text-secondary-color 
                                                underline-offset-4 underline">{values.name}</Link>
                                                <span className="w-full uppercase text-[0.75rem] text-start">
                                                    {formatCamelCaseToNormalCase(checkIfTranslationExists('ProductsJson', kT('model')))}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                }
                                {
                                    (new Array(((isDesktop ? 3 : 2) - ((models['model'] || []).length)) < 0 ? 0 : (isDesktop ? 3 : 2) - ((models['model'] || []).length))
                                    .fill('')).map((item, index) => (
                                        <div key={'addButton'+index} className="relative w-full flex flex-col items-center justify-center
                                        border border-dotted border-[#d9d9d9] h-56 my-8 bg-[url(/Images/comparator_add_bg.webp)]
                                        bg-center bg-no-repeat bg-contain overflow-hidden">
                                            <button className="cursor-pointer relative uppercase text-white border-none bg-primary-color
                                            text-[1rem] select-none motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                                            motion-safe:duration-300 py-2 px-4 lg:px-9 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium" 
                                            onClick={() => setIsModalOpen(true)}>
                                                {t('addNewModel')}
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                        </div> 
                    }
                    <div className="flex flex-col gap-2"> 
                        {
                            Object.keys(models).map((propName, propIndex) => (
                                <Fragment key={propName}>
                                    {
                                        !(['model', 'phLengths', 'gnLengths'].includes(propName)) &&
                                        <>
                                            <div className={`overflow-hidden grid gap-2 lg:gap-4 ${isDesktop ? "grid-cols-3" : "grid-cols-2"}`}>
                                                {
                                                    models[propName].map((values, index) => (
                                                        <div key={`${propName}_${index}`} 
                                                            className="w-full relative flex flex-col items-center justify-end"
                                                        >
                                                            <div className={`relative w-[calc(100%-2rem)] p-4 flex flex-col items-center justify-end bg-[#f3f3f3] self-center justify-self-center h-full`}>
                                                                {
                                                                    propName === 'description' ?
                                                                    <>
                                                                        {
                                                                            isDesktop ? 
                                                                            <p className="max-w-full h-full self-start font-medium uppercase m-0 p-0">
                                                                                {values.description}
                                                                            </p>
                                                                            :
                                                                            <button className="cursor-pointer relative uppercase text-white border-none
                                                                            bg-primary-color text-[1rem] flex items-center justify-center w-full h-8
                                                                            select-none motion-safe:transition-all motion-reduce:transition-none 
                                                                            will-change-auto motion-safe:duration-300 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium"
                                                                            onClick={() => {
                                                                                setOpenDescription(values.description)
                                                                            }}>
                                                                                {t('show')}
                                                                            </button>

                                                                        }
                                                                    </>
                                                                    : 
                                                                    <span className="w-full flex flex-col items-start justify-center p-0 font-semibold lg:hover:bg-[#eeeff0] uppercase">
                                                                        {
                                                                            Object.keys(values).filter((key) => !(['id', 'name'].includes(key))).length > 0 ?
                                                                            <>
                                                                                {
                                                                                    Object.keys(values).filter((key) => !(['id', 'name', 'image'].includes(key))).map((it) => (
                                                                                        <Fragment key={it}>{values[it] || '-'}</Fragment>
                                                                                    ))
                                                                                }
                                                                            </>
                                                                            :
                                                                            <span>- </span>
                                                                        }
                                                                    </span>
                                                                }
                                                                <span className="w-full uppercase text-[0.75rem] text-start">
                                                                    {formatCamelCaseToNormalCase(checkIfTranslationExists('ProductsJson', propName) ? kT(propName) : propName)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                                {
                                                    propIndex === 0 &&
                                                    <>
                                                        {
                                                            (new Array(((isDesktop ? 3 : 2) - (models[propName].length)) < 0 ? 0 : (isDesktop ? 3 : 2) - (models[propName].length))
                                                            .fill('')).map((item, index) => (
                                                            <div key={'addButton'+index} className="relative w-full flex flex-col items-center justify-center
                                                            border border-dotted border-[#d9d9d9] h-56 my-8 bg-[url(/Images/comparator_add_bg.webp)]
                                                            bg-center bg-no-repeat bg-contain overflow-hidden">
                                                                <button className="cursor-pointer relative uppercase text-white border-none bg-primary-color
                                                                text-[1rem] select-none motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                                                                motion-safe:duration-300 py-2 px-4 lg:px-9 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium" 
                                                                onClick={() => setIsModalOpen(true)}>
                                                                    {t('addNewModel')}
                                                                </button>
                                                            </div>
                                                            ))
            
                                                        }
                                                    </>
                                                }
                                            </div>
                                            {
                                                (propIndex + 1) ===  Object.keys(models).length &&
                                                <div className={`overflow-hidden mt-4 grid gap-2 lg:gap-4 ${isDesktop ? "grid-cols-3" : "grid-cols-2"}`}>
                                                    {
                                                    models[Object.keys(models)[0]].map((product, index) => (
                                                        <div 
                                                            key={product.id}
                                                            className="w-full **h-[18rem] *mb-4 relative flex flex-col items-center justify-end *pt-4 *lg:pt-0"
                                                        >
                                                            <Link className="cursor-pointer relative uppercase text-white border-none bg-primary-color
                                                                text-[1rem] py-1 px-4 flex items-center justify-center w-[calc(100%-2rem)] lg:h-10 select-none
                                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-300
                                                                lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium text-center" 
                                                                href={'/products/configure/'+product.id}
                                                            >
                                                                {t('configureThisModel')}
                                                            </Link>
                                                        </div>
                                                    )) 
                                                    }
                                                </div>
                                            }
                                        </>
                                    }
                                </Fragment>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
    //#endregion
}

export default Comparator;