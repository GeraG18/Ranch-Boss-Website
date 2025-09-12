import React from "react";
import ImageViewer from "../general/image_viewer";
import parse from 'html-react-parser';
import ImageViewerAlt from "@/components/general/image_viewer_alt";
import { useTranslations } from "next-intl";
import Link from "next/link";

const AnchorItem = ({text ='', href='', image='', category, status}) => {

    const t = useTranslations('PagesTitles');

    return ( 
        <Link href={'#'+href} className="group relative flex-grow flex-none p-4 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-no-repeat before:bg-cover 
        first:before:bg-[url(/Images/barn-field.webp)] last:before:bg-[url(/Images/scenic-view.webp)] before:bg-[url(/Images/buffalos-eye.webp)] 
            before:bg-center before:contrast-150 select-none">
            <div className="z-30 flex gap-2 w-full h-full outline-2 group-hover:outline-secondary-color-20 outline-transparent relative flex-col items-center justify-center">
                <ImageViewer className={`!w-76 group-hover:scale-[1.125] motion-safe:transition-all motion-reduce:transition-none 
                    will-change-auto motion-safe:duration-400 ${status ? 'blur-xs lg:blur-[0.25rem]' : ''}`} 
                    category={category.toLowerCase().replace(' ','')}
                    src={image} alt="trailer" shadowColor="rgba(255,255,255,0.125)"/>
                <h1 className="font-['oswald'] text-shadow font-medium uppercase text-[1.75rem] leading-8 text-shadow lg:text-[2.5rem] lg:leading-[2.75rem] h-auto lg:h-[3.5rem] text-secondary-color-20/60 group-hover:text-secondary-color">
                    {text}
                </h1>
                <div className="hidden group-hover:flex col-span-full max-w-7/8 absolute bottom-4 w-full self-center justify-self-center uppercase font-['oswald'] font-medium no-underline text-secondary-color-20 bg-transparent px-10 py-2 bg-[length:200%_100%]
                    border-2 border-secondary-color-20  
                    bg-gradient-to-r from-transparent from-50% to-secondary-color-20 to-50% motion-safe:transition-all duration-500 motion-safe:ease-[cubic-bezier(0.19,1,0.22,1)] delay-50 
                    lg:hover:text-tertiary-color lg:hover:text-shadow-none! lg:hover:bg-secondary-color-20 lg:hover:bg-[-100%_100%] flex-row items-center justify-center gap-2 text-shadow">
                    {t('goToSection')}
                    <span className="material-symbols-outlined notranslate h-6 w-6 flex items-center justify-center" >
                    east
                    </span>
                </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-tertiary-dark-color/80 z-20" />
        </Link>
    )
}

const FirstTextBlock = ({buttons, description, category, status}) => {
    
    //#region view
    return(
        <>
            <div className="w-full h-36 flex flex-col items-center justify-center mb-4">
                <div className="bg-white -mt-[2rem] flex gap-6 flex-col p-6 justify-center items-center lg:gap-0 mx-4 max-w-screen-lg h-fit z-80
                    lg:w-full lg:mx-auto shadow-md mb-4">
                    <div className="flex m-4 w-full lg:mx-auto max-w-screen-lg flex-col gap-1 items-center justify-center">
                        {/* DIVIDER */}
                        <div className="w-full h-0.5 bg-secondary-color"></div>
                        <div className="w-3/4 h-0.5 bg-secondary-color"></div>
                    </div>
                    <div style={{wordWrap: "break-word",}} className="font-['lora'] font-semibold text-[1rem] text-center flex items-center self-center justify-self-center m-0">
                        {description}
                    </div>
                    <div className="flex m-4 w-full lg:mx-auto max-w-screen-lg flex-col gap-1 items-center justify-center">
                        <div className="w-3/4 h-0.5 bg-secondary-color"></div>
                        <div className="w-full h-0.5 bg-secondary-color"></div>
                        {/* DIVIDER */}
                    </div>
                </div>
            </div>
            <div className="w-full h-492 lg:h-128 bg-tertiary-dark-color flex flex-col lg:flex-row">
                {
                    buttons?.map(({image, text, redirection, imageStyle}, index) => (
                        <AnchorItem 
                            key={text+index} text={text} href={redirection} 
                            status={status} image={image} category={category}
                        />
                    ))
                }
            </div>
        </>
    );
    //#endregion
}

export default FirstTextBlock;

// const CategoriesArea = () => {

//     const t = useTranslations('PagesTitles');
    
//     return (
//         <div className="w-full h-492 lg:h-128 bg-tertiary-dark-color flex flex-col lg:flex-row">
//             <CategoriesItem category={t('dump')}/>
//             <CategoriesItem category={t('rolloff')}/>
//             <CategoriesItem category={t('utility')}/>
//             <CategoriesItem category={t('equipment')}/>
//         </div>
//     )
// }

// export default CategoriesArea;