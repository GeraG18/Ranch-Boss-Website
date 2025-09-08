'use client' // Renders on client side
import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import ModelSelectorModal from "../compare/model_selector_modal";
import ImageViewer from "../general/image_viewer";
import { useRouter } from "next/navigation";
import SideMenu from "@/components/product-standard-features/standard_features_side_menu";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { usePdfViewerProvider } from "@/context/pdf_viewer_dialog_context";
import { useTranslations } from "next-intl";
import { formatCamelCaseToNormalCase, formatPropsToLimits } from "@/services/utils-service";
import InnerImageZoom from 'react-inner-image-zoom'
import Carousel from "../general/carousel/carousel";
import ElementorText from "@/components/general/elementor_text/elementor_text";

const ThreeModelViewer = ({item, isMenuShowing, showingMenu, selectedItemChange, fullModelsList}) => {
    
    //#region code
    const router = useRouter();
    const {openPdfViewer} = usePdfViewerProvider()
    const t = useTranslations('PagesTitles')
    const kT = useTranslations('ProductsJson')
    const [selectedSegment, setSelectedSegment] = useState('');
    const [activateMenu, setActivateMenu] = useState('');
    const [selectedModels, setSelectedModels] = useState([]);
    const [availableModels, setAvailableModels] = useState([]);
    const [isModelLoading, setModelLoading] = useState(false);
    const [isARAvailable, setIsARAvailable] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [switchToModel, setSwitchToModel] = useState(false);
    const [optionsForSegment, setOptionsForSegment] = useState([{name: 'ALL', value: ''}]);
    const [isDesktop, setIsDesktop] = useState(false);
    const [modelsList, setModelsList] = useState([])

    const loadTypesOfProduct = () => {
        let categoriesList = item.props.type;
        let newObjs = categoriesList.map((element) => ({name: element, value:element}));
        let newCategories = [
            ...newObjs,
            {name: 'ALL', value: ''},
        ];
        setOptionsForSegment((newObjs.length > 1 ? newCategories : newObjs).sort((a,b) => a.name.localeCompare(b.name)));
        if(newObjs.length === 1) {
            setSelectedSegment(newObjs[0].value)
        }
    }

    const formatedProps = useMemo(() => {
        const props = item.props;
        if(!props) return {};
        let newObj = {};
        for (const key in props) {
            newObj[key] = formatPropsToLimits(props[key]);
        }
        return newObj;
    }, [item.props]);

    const generateArrayOfModels = () => {
        let arr = [];
        for (const key in item.models) {
            let models = item.models[key];
            arr.push({name: key, src: models.src, iosSrc: models.iosSrc})            
        }
        return arr;
    }

    const modalHandler = (opened, selectedList) => {
        setIsModalOpen(opened);
        if(selectedList) {
            setSelectedModels(selectedList);
            sendToCompare(selectedList);
        }
    }

    const sendToCompare = (selectedList) => {
        let categoryForCompare = item.category;
        let route = `/products/compare/${categoryForCompare.toLowerCase().replace(' ', '+')}?`
        selectedList.forEach((element, index)=>{
            route += `model=${element}${index !== (selectedList.length - 1) ? '&' : ''}`
        });
        router.push(route)
    }

    const loadAvailableModelsInCategory = () => {
        let categoryId = item.category;
        if(categoryId) {
            let arr = fullModelsList.filter((item) => item.category === categoryId.toUpperCase());
            setAvailableModels(arr);
        }
    }

    const startAR = () => {
        let viewer = document.getElementById('modelViewer');
        if(viewer && viewer.canActivateAR) {
            viewer.activateAR();
        } else {
            console.warn('AR not available, try later');
            
        }
    }

    useEffect(() => {
        const modelViewer = document.querySelector('#modelViewer');
        
        if(modelViewer) {
            const modelViewerEvent = (value) => {
                setModelLoading(false);
            }
            modelViewer.addEventListener("load", modelViewerEvent);
            setIsARAvailable(modelViewer.canActivateAR)
            if(!switchToModel) {
                modelViewer.removeEventListener("load", modelViewerEvent)
            }
        }

    }, [switchToModel]);

    useEffect(() => {
        if(item && JSON.stringify(item) !== '{}') {
            setSelectedModels([item.id])
            loadTypesOfProduct();
            setModelsList(generateArrayOfModels());
            loadAvailableModelsInCategory(); 

            let mediaBigSC = window.matchMedia("(min-width: 1024px)")
            setIsDesktop(mediaBigSC.matches)
        }
    },[item])

    //#region styles
    const ModelViewerStyle = {
        width: '100%',
        height: '40vh',
        zIndex: "20",
        outline: '2px solid transparent',
        outlineOffset: '2px',
        opacity: isModelLoading ? 0 : 1,
        transition: 'all 0.4s',
        willChange: "transform, box-shadow, z-index",
    };
    //#endregion

    //#region view
    return ( 
        <>
            <SideMenu isOpened={activateMenu}
                item={item} menuStatusReceiver={(val) => {setActivateMenu(val)}}/>
            <div className="relative overflow-hidden font-['Montserrat'] select-none flex flex-col items-center justify-center">
                <ModelSelectorModal category={item.category} showModal={isModalOpen} selectedList={selectedModels} modelsList={availableModels} closeModal={modalHandler}/>
                <div className="mt-6 flex gap-[2px] flex-col items-center justify-center">
                    <h1 
                        className="z-50 text-white uppercase max-w-(--breakpoint-xl) text-center 
                        lg:text-[2.25rem] lg:leading-[2.8rem] w-[calc(100%-2rem)] lg:w-full mx-4 
                        font-bold text-[1.5rem] leading-8 font-['Michroma']"
                    >
                        {item.seo.h1Tag || item.name}
                    </h1>
                    <h2 className="m-0 z-50 text-white font-bold text-[1.25rem]
                    uppercase">{t('dynCatTrailer', {category: item?.category})}</h2>
                </div>
                <div className={`w-full relative overflow-hidden select-none flex flex-col items-center justify-center ${item.status ? "[&_figure]:blur-xs lg:[&_figure]:blur-[0.5rem] [&_figure]:pointer-events-none" : ""}`}>
                    {
                        item.status &&
                        <div className="md:absolute font-['Michroma'] text-[white] *font-semibold shadow-lg
                            backdrop-saturate-50 backdrop-blur-sm bg-primary-color/70 *rounded-[10px] *mx-4
                            min-h-6 min-w-6 p-0.5 w-full flex items-center justify-center text-center
                            motion-safe:transition-all motion-reduce:transition-none mb-1 text-[1.5rem]
                            top-[70%] whitespace-nowrap my-0 mx-8 overflow-hidden
                            h-15 will-change-auto motion-safe:duration-300 group z-40 uppercase"
                        >
                           <ElementorText text={item.status}/>
                        </div>
                    }
                    {
                        switchToModel ? 
                        <>
                            <model-viewer src={ item.models.src || '' }
                                ios-src={ item.models.iosSrc || '' }
                                environment-image="legacy"
                                ref={(ref) => {
                                    if(ref) {
                                        ref.dracoDecoderLocation = "https://www.gstatic.com/draco/versioned/decoders/1.5.7/";
                                    }
                                }}
                                alt={'3D model of '+item.name} ar camera-controls shadow-intensity="1" disable-tap disable-zoom
                                camera-orbit={isDesktop ? "80deg 80deg 4m" : "80deg 80deg 10m"}
                                auto-rotate
                                id="modelViewer" style={ModelViewerStyle}>
                                    <button slot="ar-button" className="bg-transparent text-transparent border-none cursor-default pointer-events-none">
                                        👋 AR
                                    </button>
                            </model-viewer>
                        </>
                        :
                        <>
                        {
                            item?.gallery?.length > 0 ?
                            <div className="w-full flex relative overflow-hidden items-center justify-center z-30">
                                <Carousel
                                    className="*h-[16rem] *lg:h-[40rem]"
                                    slides={
                                        item?.gallery?.map((image, index) => (
                                            <div 
                                                className="aspect-21/9 flex items-center justify-center overflow-hidden" 
                                                key={'item'+index}
                                            >
                                                <InnerImageZoom
                                                    src={image}
                                                    zoomSrc={image}
                                                    mobileBreakpoint={1024}
                                                    fullscreenOnMobile={true}
                                                />
                                            </div>
                                        )) 
                                    }
                                    options={{
                                        containScroll:false,
                                        loop: true,
                                    }}
                                />
                            </div>
                            :
                            <div className="flex items-center justify-center relative z-20 aspect-video h-[40vh] 
                            self-center justify-self-center w-auto lg:h-[55vh]">
                                <ImageViewer shadowColor="rgba(0,0,0,0.45)" category={item.category.toLowerCase().replace(' ','')}/>
                            </div>
                        }
                        </>
                    }
                    {
                        isModelLoading &&
                        <div className="w-full h-full z-20 flex flex-col gap-4 text-white items-center justify-center
                        motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400 
                        absolute bg-black/20 backdrop-saturate-50 backdrop-blur-sm">
                            <div className="loading-screen">
                            </div>
                            <span>{t('loading')}</span>
                        </div>
                    }

                </div>
                <div className="h-auto font-[1rem] text-white z-50 hidden lg:grid grid-cols-1 gap-1 flex-nowrap my-2 mx-12 w-[calc(100%-6rem)] max-w-(--breakpoint-md)">
                    <div className="flex flex-row flex-nowrap w-full">
                        {
                            Object.keys(formatedProps).map((varName) => (
                                <Fragment key={varName}>
                                {
                                    (formatedProps[varName].trim() !== '' && varName !== 'type') &&
                                    <span className="w-24 text-center grow flex justify-center items-center uppercase font-semibold px-4">
                                        {formatCamelCaseToNormalCase(kT(varName))}:
                                    </span>
                                }        
                                </Fragment>
                            ))
                        }
                    </div>
                    <div className="w-full col-span-full z-50 h-[3px] bg-[#77787b]"></div>
                    <div className="flex flex-row flex-nowrap w-full">
                        {
                            Object.keys(formatedProps).map((varName) => (
                                <Fragment key={varName}>
                                {
                                    (formatedProps[varName].trim() !== '' && varName !== 'type') &&
                                    <p className="w-24 text-center grow flex justify-center items-center uppercase font-bold m-0 px-4">
                                        {formatedProps[varName]}
                                    </p>
                                }        
                                </Fragment>
                            ))
                        }
                    </div>

                </div>
                <div className="w-[calc(100%-2rem)] lg:w-auto h-auto my-8 mx-4 flex flex-wrap gap-4 justify-center items-center
                z-50 lg:mx-16">
                    {
                        item.standardFeatures && (
                            <button className="cursor-pointer relative text-white border-none w-[calc(50%-1rem)]
                            h-10 uppercase flex items-center justify-center backdrop-saturate-50
                            backdrop-blur-sm bg-white/20 text-[0.85rem] select-none 
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                            motion-safe:duration-300 rounded-[10px] lg:text-[1rem]
                            lg:w-[16rem] lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium" 
                                name="standardFeaturesButton"
                                onClick={() => setActivateMenu('standard-features')}>
                                {t('standardFeatures')}
                            </button>
                        )
                    }
                    {
                        item.options && (
                            <button className="cursor-pointer relative text-white border-none w-[calc(50%-1rem)]
                            h-10 uppercase flex items-center justify-center backdrop-saturate-50
                            backdrop-blur-sm bg-white/20 text-[0.85rem] select-none 
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                            motion-safe:duration-300 rounded-[10px] lg:text-[1rem]
                            lg:w-[16rem] lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium" 
                                name="optionsButton"
                                onClick={() => setActivateMenu('options')}>
                                {t('options')}
                            </button>
                        )
                    }
                    {
                        (item.standardFeatures && item.options && !item.status) && (
                           <>
                                <button className="cursor-pointer relative text-white border-none w-[calc(50%-1rem)]
                                h-10 uppercase flex items-center justify-center backdrop-saturate-50
                                backdrop-blur-sm bg-white/20 text-[0.85rem] select-none 
                                motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                                motion-safe:duration-300 rounded-[10px] lg:text-[1rem]
                                lg:w-[16rem] lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium" 
                                    name="compareButton"
                                    onClick={() =>{setIsModalOpen(true)}}>
                                    {t('compare')}
                                </button>
                                {/* <Link className="cursor-pointer relative text-white border-none w-[calc(50%-1rem)]
                                h-10 uppercase flex items-center justify-center backdrop-saturate-50
                                backdrop-blur-sm bg-white/20 text-[0.85rem] select-none 
                                motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                                motion-safe:duration-300 rounded-[10px] lg:text-[1rem]
                                lg:w-[16rem] lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium" href={`/products/configure/${item.id}`}>
                                    {t('configure')}
                                </Link> */}
                           </>
                        )
                    }
                    {
                        item?.brochure &&
                        <button className="cursor-pointer relative text-white border-none w-[calc(50%-1rem)]
                        h-10 uppercase flex items-center justify-center backdrop-saturate-50
                        backdrop-blur-sm bg-white/20 text-[0.85rem] select-none 
                        motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                        motion-safe:duration-300 rounded-[10px] lg:text-[1rem]
                        lg:w-[16rem] lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium" onClick={() => openPdfViewer(item.brochure, true)}
                            name="brochureButton">
                            {t('brochure')}
                        </button>
                    }
                    {
                        (item.models && item.models.src && item.models.src.trim() !== '') &&
                        <button className="cursor-pointer relative text-white border-none w-10
                        h-10 uppercase flex items-center justify-center backdrop-saturate-50
                        backdrop-blur-sm bg-white/20 text-[0.85rem] select-none 
                        motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                        motion-safe:duration-300 rounded-[10px] lg:text-[1rem]
                        lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium" 
                            name="3dModel"
                            onClick={() =>{ setModelLoading(true); setSwitchToModel((prev) => !prev)}}>
                                <span className="material-symbols-outlined notranslate ">
                                    {switchToModel ? 'image' : '3d_rotation'}
                                </span>
                        </button>
                    }
                    {
                        (switchToModel) &&
                        <button className="cursor-pointer relative text-white border-none w-[calc(50%-1rem)]
                        h-10 uppercase flex items-center justify-center backdrop-saturate-50
                        backdrop-blur-sm bg-white/20 text-[0.85rem] select-none 
                        motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                        motion-safe:duration-300 rounded-[10px] lg:text-[1rem]
                        lg:w-[16rem] lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium" 
                            name="3dModel"
                            onClick={() =>{ startAR() }}>
                                <span className="material-symbols-outlined notranslate ">
                                view_in_ar
                                </span>
                                {t('viewOnCamera')}
                        </button>
                    }
                </div>
                <img className="absolute top-0 w-full h-full aspect-video z-1" src="/Images/product-specs-bg.webp" alt="background" />
            </div>
            <div className="h-auto font-[1.25rem] z-50 text-black justify-center items-center
            my-8 mx-4 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:hidden font-['Montserrat']">
                <span className="col-span-full w-full text-center font-['Michroma'] text-[1.5rem] font-bold uppercase">
                    {t('specsOfThisModel')}
                </span>
                {
                    Object.keys(formatedProps).map((varName) => (
                        <Fragment key={varName}>
                        {
                            (formatedProps[varName].trim() !== '' && varName !== 'type') &&
                            <div className="flex shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] 
                            bg-[radial-gradient(circle,rgba(55,62,62,0)_50%,rgba(55,62,62,0.03)_74%,rgba(55,62,62,0.06)_100%)]
                            gap-1 items-center justify-center flex-col w-full min-h-[2.2rem] z-50">
                                <span className="text-[0.75rem] w-full flex text-[#a2a2a2] justify-center items-center 
                                uppercase pt-2 px-4" >
                                    {formatCamelCaseToNormalCase(kT(varName))}:
                                </span>
                                <p className="text-[0.85rem] w-full flex text-black justify-center items-center 
                                uppercase pb-2 px-4 text-start font-bold m-0">
                                    {formatedProps[varName]}
                                </p>
                            </div>
                        }        
                        </Fragment>
                    ))
                }
                
            </div>
        </>
        
    );
    //#endregion
}

export default ThreeModelViewer;