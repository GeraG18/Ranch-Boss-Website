'use client' // Renders on client side
import React, { useState, useRef } from "react";
import Slider from "react-slick";
import Link from "next/link"
import MainCarouselItem from "./main_carousel_item";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslations } from "next-intl";

function MainCarousel() {
  const t = useTranslations('MainCarousel');
  let imagesArr = [
    "/Images/homeCarousel/one.webp", 
    "/Images/homeCarousel/two.webp", 
    "/Images/homeCarousel/three.webp", 
    "/Images/homeCarousel/four.webp", 
    "/Images/homeCarousel/five.webp", 
    "/Images/homeCarousel/six.webp",
    "/Images/homeCarousel/seven.webp",
  ]

  //#region code
  //settings for carousel
  const settings = {
    dots: false,
    infinite: true,
    fade:true,
    speed: 400,
    lazyLoad:true,
    arows:false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    beforeChange: (current, next) => {setImageNum(next)}
  };
  
  //variables
  let sliderRef = useRef(null); //reference for the slider
  const [imageNum, setImageNum] = useState(0)//image number of the slider
  //#endregion
  
  //#region view
  return (
    <div className="w-full flex relative overflow-hidden items-center justify-start bg-black h-160 lg:h-176">
      <div className="w-full h-full absolute self-center justify-self-center z-40 ">
        <Slider ref={(slider) => {
            sliderRef = slider;
          }} {...settings}>
            {
              imagesArr.map((image, index) => (
                <MainCarouselItem src={image} key={'image'+index}/>
              ))
            }
        </Slider>
      </div>
      <div className="mx-4 max-w-(--breakpoint-xl) h-fit pointer-events-none z-100 lg:w-full xl:mx-auto relative">
        <h1 className="pointer-events-none z-30 relative text-[#f2f2f2] py-2 text-left col-start-2 col-end-4 row-start-2 row-end-4 flex flex-col items-start justify-center">
        
          <>
            {
              t.rich('slogan', {//font-['Michroma'] text-[1.75rem] leading-10 flex items-center justify-center text-center col-start-1 col-end-4 row-start-1 lg:text-[2rem] lg:leading-12
                white: (chunks) => <span className="font-['Michroma'] font-bold leading-10 uppercase text-[2rem] text-shadow lg:text-[2.5rem] lg:leading-[2.75rem] h-auto lg:h-[3.5rem]">{chunks}</span>,
                orange: (chunks) => <span className="font-['Michroma'] font-bold leading-10 uppercase text-[2rem] text-shadow lg:text-[2.5rem] lg:leading-[2.75rem] h-auto lg:h-[3.5rem] text-primary-light-color">{chunks}</span>,
              })
            }
          </>
          <Link href='/products' className="font-['Montserrat'] cursor-pointer relative mt-5 text-white border-none bg-primary-color text-[1rem] select-none
            motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto rounded-[10px] py-3 px-6 pointer-events-auto
              lg:px-10 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:text-white uppercase">
            {t('button')}
          </Link>
        </h1>
      </div>
      <div className="hidden absolute bottom-10 right-16 z-50 justify-self-center lg:block">
        {
          imagesArr.map((image, index) => (
            <div key={'dot_button_'+index}
              className={`bg-white/50 cursor-pointer inline-block h-4 aspect-square m-3 rounded-full backdrop-blur-md
              motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto lg:hover:bg-white ${imageNum === index ? "bg-primary-light-color!" : ""}`}
              onClick={() => { sliderRef.slickGoTo(index) }}></div>
          ))
        }
      </div>
      <button onClick={() => sliderRef.slickNext()}
        className="cursor-pointer absolute z-200 right-0 lg:right-4 w-8 h-14 backdrop-saturate-50 backdrop-blur-sm bold text-[1rem] bg-primary-color
        motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto select-none lg:border-none border border-white/20 border-r-0
        text-white py-[1.6rem] px-4 rounded-l-md lg:rounded-md flex items-center justify-center lg:hover:bg-primary-color ">
        <span className="material-symbols-outlined notranslate h-6 w-6 flex items-center justify-center" >
          chevron_right
        </span>
      </button>
    </div>
  );
  //#endregion
}

export default MainCarousel

