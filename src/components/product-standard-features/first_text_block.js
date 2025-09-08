import React from "react";
import ImageViewer from "../general/image_viewer";
import parse from 'html-react-parser';

const FirstTextBlock = ({buttons, description, category, status}) => {
    
    //#region view
    return(
        <div className="flex flex-col items-center justify-center bg-[#181818] lg:flex-row lg:items-start font-['Montserrat']">
            <div className="text-center mt-8 mb-12 flex gap-8 flex-col items-center justify-center text-white
            mx-4 max-w-(--breakpoint-xl) h-fit z-100 xl:w-full xl:mx-auto">
                <p>{description}</p>

                <div className="w-full h-full grid gap-4 grid-rows-3 lg:grid-cols-3 lg:grid-rows-none">
                    {
                        buttons?.map(({image, text, redirection, imageStyle}, index) => (
                            <a href={'#'+redirection} key={'button'+index} 
                            className="h-80 relative flex flex-col items-start justify-start bg-black overflow-hidden 
                            rounded-[20px] group">
                                <div className="m-4 relative z-10 text-[1.25rem] lg:text-[1.75rem] leading-[2rem] uppercase font-bold font-['Michroma'] flex" 
                                >{parse(text)}</div>
                                <div className="absolute w-md aspect-video" style={imageStyle}>
                                    <ImageViewer className={`group-hover:scale-[1.125] motion-safe:transition-all motion-reduce:transition-none 
                                    will-change-auto motion-safe:duration-400 ${status ? 'blur-xs lg:blur-[0.5rem]' : ''}`} 
                                    category={category.toLowerCase().replace(' ','')}
                                    src={image} alt="trailer" shadowColor="rgba(255,255,255,0.125)"/>
                                </div>
                            </a>
                        ))
                    }
                </div>
            </div>
        </div>
    );
    //#endregion
}

export default FirstTextBlock;