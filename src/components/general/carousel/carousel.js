
import React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import useEmblaCarousel from 'embla-carousel-react'
import './carousel.css';

const Carousel = (props) => {
    const { slides, options, className, autoplay } = props;

    let optArr = [Fade()];

    if(autoplay) {
        optArr.push( Autoplay({playOnInit:true, delay:6500}) )
    }

    const [emblaRef, emblaApi] = useEmblaCarousel(
        options, 
        optArr
    )
        
    return (
        <div className={`carousel flex items-center justify-center relative w-full ${className}`}>
            <div className='w-[90%] flex items-center justify-center'>
                <section className="embla">
                    <div className="embla__viewport" ref={emblaRef}>
                        <div className="embla__container">
                            {(slides || []).map((item, index) => (
                                <div className="embla__slide" key={index}>
                                {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            {
                (slides || []).length > 1 &&
                <>
                    <button onClick={() => emblaApi.scrollPrev()}
                        className="cursor-pointer absolute z-200 w-8 h-14 backdrop-saturate-50 backdrop-blur-sm
                        bg-white/20 font-bold text-[18px] motion-safe:transition-all motion-reduce:transition-none 
                        will-change-auto motion-safe:duration-600 select-none text-white py-[1.6rem]
                        px-4 flex items-center justify-center lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium
                        left-0 lg:left-4 lg:border-none border border-white/20 border-l-0 rounded-r-[6px] lg:rounded-[6px]"
                    >
                        <span className="material-symbols-outlined notranslate">
                            chevron_left
                        </span>
                    </button>
                    <button onClick={() => emblaApi.scrollNext()}
                        className="cursor-pointer absolute z-200 w-8 h-14 backdrop-saturate-50 backdrop-blur-sm
                        bg-white/20 font-bold text-[18px] motion-safe:transition-all motion-reduce:transition-none 
                        will-change-auto motion-safe:duration-600 select-none text-white py-[1.6rem]
                        px-4 flex items-center justify-center lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium
                        right-0 lg:right-4 lg:border-none border border-white/20 border-r-0 rounded-l-[6px] lg:rounded-[6px]"
                    >
                        <span className="material-symbols-outlined notranslate " >
                            chevron_right
                        </span>
                    </button>
                </>
            }
        </div>
    )
}

export default Carousel
