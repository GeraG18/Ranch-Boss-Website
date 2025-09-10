import React, {useState, useEffect, Fragment, useMemo} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {formatCamelCaseToNormalCase, formatKebabCaseToCamelCase, formatPropsToLimits} from "@/services/utils-service"
import { useTranslations } from "next-intl";
import ImageViewer from "../general/image_viewer";
import { usePdfViewerProvider } from "@/context/pdf_viewer_dialog_context";
import SideMenuOptions from "./side_menu_options";
import SideMenuFeatures from "./side_menu_features";

const SideMenu = ({isOpened, item, menuStatusReceiver = () => {}}) => {
    //#region code
    /* Hooks */
    const router = useRouter();
    const t = useTranslations('PagesTitles')
    const kT = useTranslations('ProductsJson')
    const {openPdfViewer} = usePdfViewerProvider()
    /* States */
    const [opened, setOpened] = useState(false);
    const [openedScreen, setOpenedScreen] = useState('');
    const [isSticky, setIsSticky] = useState(false);
    /* Functions */
    const sendToCompare = (selectedList) => {
        let categoryForCompare = item.category;
        let route = `/products/compare/${categoryForCompare.toLowerCase().replace(' ', '+')}?`
        selectedList.forEach((element, index)=>{
            route += `model=${element}${index !== (selectedList.length - 1) ? '&' : ''}`
        });
        router.push(route)
    }
    const trackScrolling = (params) => { setIsSticky(params.target.scrollTop > 0) }
    const isObjectEmpty = (objectName) => { return Object.keys(objectName).length === 0 }
    const openComparation = () => {
        sendToCompare([item.id]);
    }
    /* Variables */
    // let formatedProps = {
    //     lengths: (item.props.lengths).join(', '), sideHeights: (item.props.sideHeights).join(', '),
    //     axleCount: item.props.axleCount.join(', '), axleRating: item.props.axleRating.join(', '),
    //     gvwr: item.props.gvwr.join(' - '), cargoCapacity: item.props.cargoCapacity.join(', '),
    //     deck: item.props.deck.join(', '), deckHeight: (item.props.deckHeight).join(', '),
    //     deckWidth: (item.props.deckWidth).join(', '), gnLengths: (item.props.gnLengths).join(' - '),
    //     phLengths: (item.props.phLengths).join(', '), rear: item.props.rear.join(', '),
    //     type: item.props.type.join(', ')
    // }
    const formatedProps = useMemo(() => {
        const props = item.props;
        if(!props) return {};
        let newObj = {};
        for (const key in props) {
            newObj[key] = formatPropsToLimits(props[key]);
        }
        return newObj;
    }, [item.props]);
    /* Effects */
    useEffect(() => {
        setOpened(isOpened); setOpenedScreen(isOpened);
        document.body.style.overflowY = isOpened ? 'hidden' : 'auto';
    }, [isOpened])
    //#endregion
    //#region view
    if(isObjectEmpty(item)) return (
        <div className={`fixed top-0 right-0 w-screen h-screen flex justify-end items-center z-500
            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400
            bg-black/40 backdrop-saturate-50 backdrop-blur-sm font-['lora'] ${opened ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"}`} onClick={() => menuStatusReceiver("")}>
            <div className={`relative bg-white motion-safe:transition-all motion-reduce:transition-none will-change-auto 
            motion-safe:duration-500 w-screen h-screen z-300 overflow-hidden flex flex-col items-center justify-center
            flex-none ${opened ? "translate-x-0" : "translate-x-[200%]"}`}
                onClick={(e) => e.stopPropagation()}>
                <span>Loading...</span>
            </div>
        </div>
    )

    return(
        <div className={`fixed top-0 right-0 w-screen h-dvh flex justify-start items-center z-500
            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400
            bg-black/40 backdrop-saturate-50 backdrop-blur-sm font-['lora'] ${opened ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"}`} onClick={() => menuStatusReceiver("")}>
            <div className={`relative bg-white motion-safe:transition-all motion-reduce:transition-none will-change-auto 
            motion-safe:duration-500 w-screen h-full max-h-full border-red-500 z-300 overflow-hidden flex flex-col *grid *grid-rows-[auto_1fr_auto] *grid-cols-1 items-center justify-start
            flex-none ${opened ? "translate-x-0" : "translate-x-[200%]"}`}
                onClick={(e) => e.stopPropagation()}>
                <div className={`z-10 relative w-full h-auto flex gap-2 portrait:flex-col landscape:flex-row lg:flex-row items-center justify-center flex-none
                    left-0 py-4 px-8 motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                    motion-safe:duration-500 bg-white ${isSticky ? "shadow-[0px_10px_25px_-12px_rgb(0,0,0,0.15)]" : "shadow-none"}`}>
                    <div className="w-full flex flex-row justify-start items-start lg:items-center">
                        <span className="text-black w-full z-30 text-[1rem] lg:text-[1.5rem] leading-[1.75rem] font-bold
                        font-['lora'] uppercase text-start">
                            {item?.name}
                            {
                                item.status &&
                                <span className="font-['lora'] text-[white] *font-semibold shadow-lg
                                    backdrop-saturate-50 backdrop-blur-sm bg-primary-color/85 
                                    min-h-6 min-w-6 p-0.5 px-2 w-fit flex items-center justify-center text-center
                                    motion-safe:transition-all motion-reduce:transition-none mb-1 text-[0.875rem]
                                    will-change-auto motion-safe:duration-300 group z-20 uppercase"
                                >
                                    {item.status}
                                </span>
                            }
                        </span>
                        <button className="bg-primary-color text-white cursor-pointer border-none w-10 aspect-square
                        portrait:flex landscape:hidden items-center justify-center lg:hidden right-4 z-80 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium" 
                        onClick={() => menuStatusReceiver("")}>
                            <span style={{color:'white'}} className="material-symbols-outlined notranslate ">close</span> 
                        </button>
                    </div>
                    <div className="portrait:w-full landscape:w-auto flex flex-row pr-0 items-center gap-4 lg:w-auto">
                        {
                            item.standardFeatures && (
                                <button className={`cursor-pointer relative text-white border-none w-full landscape:px-1
                                h-10 uppercase flex items-center justify-center text-[0.85rem] select-none
                                motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                                motion-safe:duration-300 lg:text-[1rem] lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:w-50
                                ${openedScreen === 'standard-features' ? "bg-primary-color" : "bg-[#7a7a7a]"}`} 
                                onClick={() => setOpenedScreen('standard-features')}>
                                    {t('standardFeatures')}
                                </button>
                            )
                        }
                        {
                            item.options && (
                                <button className={`cursor-pointer relative text-white border-none w-full landscape:px-1
                                h-10 uppercase flex items-center justify-center text-[0.85rem]
                                select-none motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                                motion-safe:duration-300 lg:text-[1rem] lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:w-50
                                ${openedScreen === 'options' ? "bg-primary-color" : "bg-[#7a7a7a]"}`}
                                onClick={() => setOpenedScreen('options')}>
                                    {t('options')}
                                </button>
                            )
                        }
                        <button className="bg-primary-color text-white cursor-pointer border-none w-10 aspect-square
                        lg:flex items-center justify-center portrait:hidden landscape:flex right-4 z-80 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium" 
                        onClick={() => menuStatusReceiver("")}>
                            <span style={{color:'white'}} className="material-symbols-outlined notranslate ">close</span> 
                        </button>
                    </div>
                </div>
                <div className="h-full max-h-full w-full overflow-x-hidden overflow-y-auto
                    py-4 px-8 flex flex-col bg-white"
                    onScroll={trackScrolling}>
                    {
                        openedScreen.trim().length !== 0 &&
                        <span className="text-black w-full z-30 text-[1.25rem]
                        leading-[1.8rem] *font-['lora'] uppercase h-fit font-semibold
                        text-center lg:text-start">
                            {t(formatKebabCaseToCamelCase(openedScreen))}
                        </span>
                    }
                    <div className="h-full w-full max-h-full flex flex-col bg-white lg:flex-row-reverse relative">
                        <div className="flex-none min-h-[30vh] w-full py-4 lg:p-0 flex flex-row items-center overflow-hidden
                        justify-center lg:items-start relative lg:w-[30vw] *lg:max-h-full *lg:overflow-y-auto lg:overflow-x-hidden">
                            <div className="w-full h-full lg:h-fit flex gap-4 flex-col items-end justify-center z-10 relative">
                                <div className="absolute flex flex-col items-end justify-center">
                                    {
                                        Object.keys(formatedProps).map((varName) => (
                                            <Fragment key={varName}>
                                            {
                                                (formatedProps[varName].trim() !== '' && varName !== 'type') &&
                                                <div className="min-h-9  h-full w-fit flex flex-col justify-center items-end">
                                                    <span className="w-fit flex justify-start items-center uppercase">
                                                        {formatCamelCaseToNormalCase(kT(varName))}
                                                    </span>
                                                    <p className="w-fit flex justify-start items-center text-center text-black uppercase font-semibold m-0">
                                                        {formatedProps[varName]}
                                                    </p>
                                                </div>
                                            }        
                                            </Fragment>
                                        ))
                                    }
                                </div>
                                <div className={`w-full h-fit relative top-0 left-0 flex items-center justify-center z-1 `}>
                                    <ImageViewer src={item.aerialImage}
                                        alt={`Aerial view of ${item.name}`} /*orientation="portrait"*/
                                        className={`object-center object-scale-down ${item.status ? 'blur-xs' : ''}`}
                                        category={item.category.toLowerCase().trim().replace(' ','')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            {
                                openedScreen === 'standard-features' && 
                                <SideMenuFeatures
                                    standardFeatures={item["standardFeatures"]}
                                />
                            }
                            {
                                openedScreen === 'options' && 
                                <SideMenuOptions
                                    options={item["options"]}
                                />
                            }
                        </div>
                    </div>
                </div>
                {
                    (item.standardFeatures && item.options && !item.status) && (
                        <div className="w-full h-fit z-10 flex portrait:flex-col landscape:flex-row items-center gap-2 lg:gap-4 lg:flex-row py-4 px-8 shadow-[0px_-10px_25px_-12px_rgb(0,0,0,0.15)]">
                            {
                                item.dimensionsPdf &&
                                <button className="cursor-pointer relative text-white border-none w-full h-10 uppercase flex items-center justify-center bg-primary-color text-[0.85rem]
                                select-none lg:text-[1rem] lg:w-48 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium
                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400 " onClick={() => openPdfViewer(item.dimensionsPdf)}>
                                    {t('dimensionsPdf')}
                                </button>
                            }
                            {
                                item.dryWeightsPdf &&
                                <button className="cursor-pointer relative text-white border-none w-full h-10 uppercase flex items-center justify-center bg-primary-color text-[0.85rem]
                                select-none lg:text-[1rem] lg:w-48 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium
                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400 " onClick={() => openPdfViewer(item.dryWeightsPdf)}>
                                    {t('dryWeightsPdf')}
                                </button>
                            }
                            <Link className="cursor-pointer relative text-white border-none w-full h-10 uppercase flex items-center justify-center bg-primary-color text-[0.85rem]
                            select-none lg:text-[1rem] lg:w-48 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400 " href={`/products/configure/${item?.id}`}>
                                {t('configure')}
                            </Link>
                            <button className="cursor-pointer relative text-white border-none w-full h-10 uppercase flex items-center justify-center bg-primary-color text-[0.85rem]
                            select-none lg:text-[1rem] lg:w-48 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400 " onClick={() => openComparation()}>
                                {t('compare')}
                            </button>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default SideMenu;