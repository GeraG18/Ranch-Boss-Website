
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
                        className="absolute z-200 left-0 lg:left-4 col-span-full self-center justify-self-center uppercase font-['oswald'] font-medium no-underline text-secondary-color-20 bg-transparent h-10 w-10 bg-[length:200%_100%]
                        border-2 border-secondary-color-20 bg-gradient-to-r from-transparent from-50% to-secondary-color to-50% motion-safe:transition-all duration-500 motion-safe:ease-[cubic-bezier(0.19,1,0.22,1)] delay-50 
                        lg:hover:text-secondary-color-20 lg:hover:text-shadow-none! lg:hover:bg-secondary-color lg:hover:border-secondary-color lg:hover:bg-[-100%_100%] flex flex-row items-center 
                        justify-center gap-2 cursor-pointer select-none"
                    >
                        <span className="material-symbols-outlined notranslate">
                            west
                        </span>
                    </button>
                    <button onClick={() => emblaApi.scrollNext()}
                        className="absolute z-200 right-0 lg:right-4 col-span-full self-center justify-self-center uppercase font-['oswald'] font-medium no-underline text-secondary-color-20 bg-transparent h-10 w-10 bg-[length:200%_100%]
                        border-2 border-secondary-color-20 bg-gradient-to-r from-transparent from-50% to-secondary-color to-50% motion-safe:transition-all duration-500 motion-safe:ease-[cubic-bezier(0.19,1,0.22,1)] delay-50 
                        lg:hover:text-secondary-color-20 lg:hover:text-shadow-none! lg:hover:bg-secondary-color lg:hover:border-secondary-color lg:hover:bg-[-100%_100%] flex flex-row items-center 
                        justify-center gap-2 cursor-pointer select-none"
                    >
                        <span className="material-symbols-outlined notranslate " >
                            east
                        </span>
                    </button>
                </>
            }
        </div>
    )
}

export default Carousel
