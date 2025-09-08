import React from "react";
import ImageViewer from "../general/image_viewer";

const SecondTextBlock = ({data, category, status}) => {
    //#region view
    return(
        <div className="p-0 lg:py-8">
            <div className="bg-black text-white flex gap-0 py-6 flex-col
            items-center justify-center lg:rounded-[10px] max-w-(--breakpoint-xl) h-fit
            z-100 xl:w-full xl:mx-auto font-['Montserrat']">
                {
                    Array.isArray(data) && 
                    <>
                        {
                            data?.map(({subtitle, title, description, image, blockId}) => (
                                <div className="pt-28 flex gap-0.5 flex-col items-center justify-center
                                mx-4 max-w-(--breakpoint-md) h-fit text-center z-100 xl:mx-auto" 
                                    key={blockId} id={blockId}>
                                    <h4 className="text-[1rem] uppercase lg:text-[1.25rem]">{subtitle}</h4>
                                    <h3 className="uppercase font-['Michroma'] font-bold text-[1.25rem] lg:text-[1.75rem] leading-[2rem]">{title}</h3>
                                    <p className="">{description}</p>
                                    <ImageViewer src={image} alt="trailer" shadowColor="rgba(255,255,255,0.125)" category={category.toLowerCase().replace(' ','')}
                                    className={`${status ? 'blur-xs lg:blur-[0.5rem]' : ''}`}/>
                                </div>
                            ))
                        }
                    
                    </>
                }
            </div>
        </div>
    );
    //#endregion   
}

export default SecondTextBlock;