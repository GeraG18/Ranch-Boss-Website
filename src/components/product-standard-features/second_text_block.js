import React from "react";
import ImageViewer from "../general/image_viewer";

const AnchorBlock = ({subtitle, title, description, image, blockId, isPair, status, category}) => {
    return (
        <div id={blockId} className="gap-0 py-6 items-center justify-center lg:max-w-screen-lg  h-fit w-full z-30 xl:w-full xl:mx-auto font-['lora']
            text-white grid grid-cols-6 grid-rows-[auto_auto_auto_auto_auto]">
            <div className={`relative bg-primary-alt-color flex items-center justify-center text-white col-span-3 row-span-4 h-full w-full col-start-1 [&.alt]:col-start-4 row-start-2 z-20 ${isPair ? 'alt' : ''}
                before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-no-repeat before:bg-cover 
                first:before:bg-[url(/Images/barn-field.webp)] last:before:bg-[url(/Images/scenic-view.webp)] before:bg-[url(/Images/buffalos-eye.webp)] 
                before:bg-center before:contrast-150`}>
                <ImageViewer className={`!w-76 motion-safe:transition-all motion-reduce:transition-none z-30
                will-change-auto motion-safe:duration-400 ${status ? 'blur-xs lg:blur-[0.25rem]' : ''}`} 
                category={category.toLowerCase().replace(' ','')}
                src={image} alt="trailer" shadowColor="rgba(255,255,255,0.125)"/>
                <div className="absolute top-0 left-0 w-full h-full bg-tertiary-dark-color/80 z-20" />
            </div>
            <div className={`col-span-3 row-span-2 w-full px-10 py-12 flex flex-col gap-2 justify-center col-start-4 [&.alt]:col-start-1 row-start-2 z-20 h-56 ${isPair ? 'alt' : ''}`}>
                <span className="font-['oswald'] text-shadow font-medium uppercase text-[0.75rem] leading-4 lg:text-[1.25rem] lg:leading-[1.5rem] h-auto text-secondary-color-20">
                    {subtitle}
                </span>
                <h1 className="font-['oswald'] text-shadow font-medium uppercase text-[1.75rem] leading-8 lg:text-[2.5rem] lg:leading-[2.75rem] h-auto text-secondary-color">
                    {title}
                </h1>
            </div>
            <div className={`col-span-2 row-span-3 bg-white text-black w-full h-full min-h-8 row-start-4 col-start-2 [&.alt]:col-start-4 z-10 ${isPair ? 'alt' : ''}`}>
            </div>
            <div className={`col-span-3 row-span-3 bg-white px-10 py-12 text-black w-full h-full min-h-8 row-start-4 col-start-4 [&.alt]:col-start-1 z-10 ${isPair ? 'alt' : ''}`}>
                {description}
            </div>
        </div>
    )
}

const SecondTextBlock = ({data, category, status}) => {
    //#region view
    return(
        <div className="w-full min-h-128 bg-primary-color border-y-1 border-secondary-color-20 text-white flex flex-col">
            {
                Array.isArray(data) && (
                    <>
                    {
                        data?.map(({subtitle, title, description, image, blockId}, index) => (
                            <AnchorBlock 
                                key={index} title={title} isPair={(index+1)%2 === 0} 
                                blockId={blockId} category={category} status={status} 
                                subtitle={subtitle} description={description} image={image} 
                            />
                        ))
                    }
                    </>
                )
            }
        </div>
        // <div className="p-0 lg:py-8">
        //     <div className="bg-black text-white flex gap-0 py-6 flex-col
        //     items-center justify-center lg:max-w-screen-lg  h-fit w-full
        //     z-30 xl:w-full xl:mx-auto font-['lora']">
        //         {
        //             Array.isArray(data) && 
        //             <>
        //                 {
        //                     data?.map(({subtitle, title, description, image, blockId}) => (
        //                         <div className="pt-28 flex gap-0.5 flex-col items-center justify-center
        //                         mx-4 max-w-full h-fit text-center z-100 xl:mx-auto" 
        //                             key={blockId} id={blockId}>
        //                             <h4 className="text-[1rem] w-full uppercase lg:text-[1.25rem]">{subtitle}</h4>
        //                             <h3 className="uppercase w-full font-['lora'] font-bold text-[1.25rem] lg:text-[1.75rem] leading-[2rem]">{title}</h3>
        //                             <p className="w-full">{description}</p>
        //                             <ImageViewer src={image} alt="trailer" shadowColor="rgba(255,255,255,0.125)" category={category.toLowerCase().replace(' ','')}
        //                             className={`w-full ${status ? 'blur-xs lg:blur-[0.5rem]' : ''}`}/>
        //                         </div>
        //                     ))
        //                 }
                    
        //             </>
        //         }
        //     </div>
        // </div>
    );
    //#endregion   
}

export default SecondTextBlock;