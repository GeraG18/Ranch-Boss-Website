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
    "/Images/homeCarousel/four.webp"
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
    <div className="w-full flex relative overflow-hidden items-center justify-start bg-black h-160 lg:h-176 z-50">
      <div className="mx-4 max-w-screen-lg  h-fit select-none z-100 lg:w-full xl:mx-auto relative">
        <div className="z-30 relative text-[#f2f2f2] py-2 text-center col-start-2 col-end-4 row-start-2 row-end-4 flex flex-col gap-4 items-center justify-center">
          <div>
            {
              t.rich('slogan', {//font-['lora'] text-[1.75rem] leading-10 flex items-center justify-center text-center col-start-1 col-end-4 row-start-1 lg:text-[2rem] lg:leading-12
                white: (chunks) => <h1 className="font-['oswald'] font-medium leading-10 uppercase text-[2rem] text-shadow lg:text-[2.5rem] lg:leading-[2.75rem] h-auto lg:h-[3.5rem] text-secondary-color-20">{chunks}</h1>,
                orange: (chunks) => <h1 className="font-['oswald'] font-medium leading-10 uppercase text-[2rem] text-shadow lg:text-[2.5rem] lg:leading-[2.75rem] h-auto lg:h-[3.5rem] text-secondary-color">{chunks}</h1>,
              })
            }
          </div>
          <p className="m-0 p-0 font-['lora'] font-semibold max-w-3/4 text-secondary-color-20 text-shadow">
            {t('description')}
          </p>
          {/* <Link href='/products' className="font-['oswald'] cursor-pointer relative mt-5 text-secondary-color-20 text-[1rem] select-none
            motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto py-2.5 px-6
              lg:px-10 bg-transparent border-2 border-secondary-color-20 font-medium lg:hover:text-secondary-color lg:hover:border-secondary-color uppercase
              flex flex-row items-center justify-center gap-2 text-shadow">
            {t('button')}
            <span className="material-symbols-outlined notranslate h-6 w-6 flex items-center justify-center" >
              east
            </span>
          </Link> */}
          <Link href="/products" className="col-span-full self-center justify-self-center uppercase font-['oswald'] font-medium no-underline text-secondary-color-20 bg-transparent px-10 py-3 bg-[length:200%_100%]
            border-2 border-secondary-color-20  
            bg-gradient-to-r from-transparent from-50% to-secondary-color-20 to-50% motion-safe:transition-all duration-500 motion-safe:ease-[cubic-bezier(0.19,1,0.22,1)] delay-50 
            lg:hover:text-tertiary-color lg:hover:text-shadow-none! lg:hover:bg-secondary-color-20 lg:hover:bg-[-100%_100%] flex flex-row items-center justify-center gap-2 text-shadow">
            {t('button')}
            <span className="material-symbols-outlined notranslate h-6 w-6 flex items-center justify-center" >
              east
            </span>
          </Link>
        </div>
      </div>
      <div className="hidden lg:block absolute bottom-0 w-full z-50 pb-12">
        <div className="z-50 mx-4 max-w-screen-lg  lg:w-full xl:mx-auto flex flex-col justify-start gap-0 select-none">
          {
            imagesArr.map((image, index) => (
              <span className="relative font-['lora'] px-2 text-secondary-color-20 cursor-pointer before:content-[''] before:h-full before:w-0.5 before:bg-secondary-color-20
              before:absolute before:left-0 before:top-0 before:z-10" 
                style={{opacity: (imageNum === index ? 1 : 0.5),}}
                onClick={() => { sliderRef.slickGoTo(index) }}
                key={'carousel_button_'+index}
              >
                {(index + 1).toString().padStart(2, '0')}
              </span>
            ))
          }
        </div>
      </div>
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
    </div>
  );
  //#endregion
}

export default MainCarousel

