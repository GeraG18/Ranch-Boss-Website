'use client' // Renders on client side
import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslations } from "next-intl";

const ProductGallery = ({gallery, status}) => {
    
    //#region code
    let sliderRef = useRef(null);
    const [imageNum, setImageNum] = useState(0)//image number of the slider
    const t = useTranslations('PagesTitles')
     const settings = {
        dots: false,
        centerMode: true,
        infinite: true,
        // fade:true,
        speed: 400,
        arows:false,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => {setImageNum(next)}
    };

    //#region view
    return(
        <div className="my-8 flex flex-col gap-4">
            <span className="font-['Michroma'] uppercase font-bold text-[1.75rem] leading-10 flex items-center justify-center text-center col-start-1 col-end-4 row-start-1 lg:text-[2rem] lg:leading-12">{t('gallery')}</span>
            <div className="w-full flex relative overflow-hidden items-center justify-start h-[40vh] z-100
            lg:h-[70vh]">
                <div className="w-full absolute self-center [&_div]:flex">
                    <Slider ref={(slider) => {
                        sliderRef = slider;
                    }} {...settings}>
                        {
                            gallery?.map((image, index) => (
                                <div className="flex items-center justify-center relative aspect-16/12
                                self-center justify-self-center w-full bg-[#1c1c1e] rounded-[10px] h-[40vh]
                                overflow-hidden lg:h-[70vh] 
                                mx-4 max-w-(--breakpoint-xl) *h-fit z-100 xl:mx-auto xl:w-full" 
                                key={'item'+index}>
                                    <img src={image} className="w-full h-full object-cover absolute" 
                                    alt="horizon trailers img"/>
                                </div>
                            ))
                        }
                    </Slider>
                </div>
            </div>
            <div className="flex flex-row items-center justify-end gap-2
            mx-4 max-w-(--breakpoint-xl) *h-fit z-100 xl:mx-auto xl:w-full">
                <div className="w-full h-16 overflow-y-auto overflow-x-hidden
                flex flex-row gap-2">
                {/* onClick={() => { sliderRef.slickGoTo('0') }} */}
                {
                    gallery?.map((image, index) => (
                        <div onClick={() => { sliderRef.slickGoTo(index)}}
                            className={`flex cursor-pointer items-center justify-center relative
                                aspect-16/12 self-center justify-self-center h-full bg-[#1c1c1e]
                                rounded-[3px] overflow-hidden ${imageNum === index ? "opacity-100" : "opacity-50"}`}
                            key={'item'+index}>
                            <img src={image} className={`w-full h-full object-cover absolute" alt="horizon trailers img ${status ? 'blur-xs lg:blur-[0.5rem]' : ''}`}/>
                        </div>
                    ))
                }
                </div>
                <button onClick={() => sliderRef.slickPrev()}
                className="cursor-pointer z-200 backdrop-saturate-50 backdrop-blur-sm bg-black/50
                font-bold text-[18px] motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                motion-safe:duration-600 select-none border-none text-white py-3 px-1 rounded-[10px] flex
                items-center justify-center lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium left-4">
                    <span className="material-symbols-outlined notranslate " >
                    chevron_left
                    </span>
                </button>
                <button onClick={() => sliderRef.slickNext()}
                    className="cursor-pointer z-200 backdrop-saturate-50 backdrop-blur-sm bg-black/50
                    font-bold text-[18px] motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                    motion-safe:duration-600 select-none border-none text-white py-3 px-1 rounded-[10px] flex
                    items-center justify-center lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium right-4">
                    <span className="material-symbols-outlined notranslate " >
                    chevron_right
                    </span>
                </button>
            </div>
        </div>
    );
}

export default ProductGallery;