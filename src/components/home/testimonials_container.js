'use client' // Renders on client side
import React, { useRef } from "react";
import Slider from "react-slick";
import TestimonialsItem from "./testimonials_items";
import { useTranslations } from "next-intl";

function TestimonialsContainer() {
  const t = useTranslations('Testimonials');
  //#region code
  const settings = {
    dots: false,
    infinite: true,
    arows:false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    pauseOnHover:true,
    pauseOnFocus:true,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
  };
  
  //variables
  let sliderRef = useRef(null);
  //#endregion

  //#region view
  return (
    <div className="bg-[#1c1c1e] py-4 flex flex-col overflow-hidden">
        <div className="text-white py-2 px-5 text-left flex flex-col relative z-30 pointer-events-none items-center
          justify-center col-start-1 col-end-3 row-start-1 row-end-2">
            <div className="font-['lora'] font-bold text-[1.75rem] leading-10 flex items-center justify-center text-center col-start-1 col-end-4 row-start-1 
            lg:text-[2rem] lg:leading-12 uppercase">{t('slogan')}</div>
            <div className="text-primary-color text-center font-['lora'] font-bold text-[1.25rem] lg:text-[2rem] uppercase">{t('title')}</div>
        </div>

        <div className="w-full flex relative overflow-hidden items-center justify-center h-[50vh] lg:h-[60vh]">
            <div className="w-full absolute self-center justify-self-center">
                <Slider ref={(slider) => {
                    sliderRef = slider;
                }} {...settings}>
                    <TestimonialsItem 
                        numStars={5}   
                        comment={t('t1Comment')} 
                        profImage="/Testimonials/strikerIcon.webp"
                        name={"STRYKER TRAILERS"}
                        job={t('horizonDealer')}></TestimonialsItem>
                        
                    <TestimonialsItem 
                        numStars={5}   
                        comment={t('t2Comment')} 
                        profImage="/Testimonials/reconIcon.webp"
                        name={"RECON TRAILER"}
                        job={t('horizonDealer')}></TestimonialsItem>
                        
                    <TestimonialsItem 
                        numStars={5}   
                        comment={t('t3Comment')} 
                        profImage="/Testimonials/affordableIcon.webp"
                        name={"AFFORDABLE TRAILERS INC."}
                        job={t('horizonDealer')}></TestimonialsItem>
                        
                    <TestimonialsItem 
                        numStars={5}   
                        comment={t('t4Comment')} 
                        profImage="/Testimonials/chipIcon.webp"
                        name={"THE CHIPPER LLC TEAM"}
                        job={t('horizonDealer')}></TestimonialsItem>
                        
                    <TestimonialsItem 
                        numStars={5}   
                        comment={t('t5Comment')} 
                        profImage="/Testimonials/southernIcon.webp"
                        name={"SOUTHERN INDIANA TRAILERS"}
                        job={t('horizonDealer')}></TestimonialsItem>

                    <TestimonialsItem 
                        numStars={5}   
                        comment={t('t6Comment')} 
                        profImage="/Testimonials/eastbayIcon.webp"
                        name={"EAST BAY TRAILERS"}
                        job={t('horizonDealer')}></TestimonialsItem>
                    <TestimonialsItem 
                        numStars={5}   
                        comment={t('t7Comment')} 
                        profImage="/Testimonials/suncityIcon.webp"
                        name={"Sun City Trailer Sales (264 trailers)"}
                        job={t('horizonDealer')}></TestimonialsItem>
                    <TestimonialsItem 
                        numStars={5}   
                        comment={t('t8Comment')} 
                        profImage="/Testimonials/twalabamaIcon.webp"
                        name={"TRAILER WORLD ALABAMA"}
                        job={t('horizonDealer')}></TestimonialsItem>
                    <TestimonialsItem 
                        numStars={5}   
                        comment={t('t9Comment')} 
                        profImage="/Testimonials/firstUserPicture.webp"
                        name={"SAMUEL REIS"}
                        job={t('horizonClient')}></TestimonialsItem>
                </Slider>
            </div>

            <button onClick={() => sliderRef.slickPrev()}
                className="cursor-pointer absolute z-200 w-[30px] backdrop-saturate-50 backdrop-blur-sm bg-white/20 h-[40px] font-bold
                text-[18px] motion-safe:transition-all motion-safe:duration-600 motion-reduce:transition-none will-change-auto 
                select-none text-white py-[1.6rem] px-4 rounded-r-[6px] lg:rounded-[6px] flex items-center justify-center 
                lg:hover:bg-primary-color left-0 lg:left-4 prev lg:border-none border border-white/20 border-r-0">
                <span className="material-symbols-outlined notranslate " >
                chevron_left
                </span>
            </button>
            <button onClick={() => sliderRef.slickNext()}
                className="cursor-pointer absolute z-200 w-[30px] backdrop-saturate-50 backdrop-blur-sm bg-white/20 h-[40px] font-bold
                text-[18px] motion-safe:transition-all motion-safe:duration-600 motion-reduce:transition-none will-change-auto 
                select-none text-white py-[1.6rem] px-4 rounded-l-[6px] lg:rounded-[6px] flex items-center justify-center 
                lg:hover:bg-primary-color right-0 lg:right-4 next lg:border-none border border-white/20 border-r-0" >
                <span className="material-symbols-outlined notranslate " >
                chevron_right
                </span>
            </button>
        </div>
    </div>
  );
  //#endregion
}

export default TestimonialsContainer

