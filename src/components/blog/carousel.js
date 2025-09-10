'use client' // Renders on client side
import React, { useRef } from "react";
import CarouselItem from "./carousel_item";

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useBlogProvider } from "../../context/blog_context";

function BlogCarousel (){
    //Logic
    let sliderRef = useRef(null);
    // const [allBlogs, setAllBlogs] = useState ([]);
    const {getMoreRecentBlogs} = useBlogProvider();


    const blogs = getMoreRecentBlogs()

    // 
    
    // useEffect(() => {
    //     // getBlogsDemo().then((value) => {
    //     //     setAllBlogs([...value.filter((item, index) => index < 4)])
    //     // }).catch((error) => {
    //     //     console.error('error', error);
    //     // });
    //     setAllBlogs(getMoreRecentBlogs())
    // }, [blogs]);

    const settings = {
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        // centerMode:true,
        fade:true,
        pauseOnHover: true
    };

    //Display
    return (
        <div className="font-['lora'] w-full flex relative overflow-hidden items-center justify-start h-[80vh] lg:h-[70vh] bg-[#181818]">
            <div className="w-full absolute self-center justify-self-center">
                <Slider ref={(slider) => {
                    sliderRef = slider;
                }} {...settings}>
                    {
                        (blogs || []).map(({author, authorImg, body, headerImg, date, title},index) => (
                            <CarouselItem key={index}
                                title={title}
                                author={author}
                                authorImg={authorImg}
                                date= {date}
                                body={body}
                                image={headerImg} >
                            </CarouselItem>
                        ))
                    }
                </Slider>
            </div>
            {
                (blogs || []).length > 1 &&
                <>
                    <button onClick={() => sliderRef.slickPrev()}
                    className="cursor-pointer absolute z-200 left-0 lg:left-4 w-8 h-14 backdrop-saturate-50 backdrop-blur-sm bold text-[1rem] bg-primary-color
        motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto select-none lg:border-none border border-white/20 border-r-0
        text-white py-[1.6rem] px-4 rounded-r-md lg:rounded-md flex items-center justify-center lg:hover:bg-primary-color " >
                    <span className="material-symbols-outlined notranslate " >
                    chevron_left
                    </span>
                    </button>
                    <button onClick={() => sliderRef.slickNext()}
                        className="cursor-pointer absolute z-200 right-0 lg:right-4 w-8 h-14 backdrop-saturate-50 backdrop-blur-sm bold text-[1rem] bg-primary-color
                        motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto select-none lg:border-none border border-white/20 border-r-0
                        text-white py-[1.6rem] px-4 rounded-l-md lg:rounded-md flex items-center justify-center lg:hover:bg-primary-color " >
                        <span className="material-symbols-outlined notranslate " >
                        chevron_right
                        </span>
                    </button>
                </>
            }
        </div>
    )
}

export default BlogCarousel