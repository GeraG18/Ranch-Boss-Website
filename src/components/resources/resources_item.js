import React, {useEffect, useState} from 'react';
import Link from "next/link"
import TrailerShadowIcon from '../icons/dump_trailer_shadow_icon';
import ImageViewer from '../general/image_viewer';
import { useTranslations } from 'next-intl';

function ResourcesItem({title="example title", description="example description", url="/", imageSrc="", imageAlt=""}) {

    const t = useTranslations('PagesTitles')
    const [imgOneLoading, setImgOneLoading] = useState(true);
    const [imgOneError, setImgOneError] = useState(false);

    //#region view
    return (
        <Link href={url} className="w-full flex gap-2 flex-col justify-around items-center cursor-pointer 
            overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] font-['Montserrat'] rounded-[10px]
            bg-[radial-gradient(circle,rgba(55,62,62,0)_50%,rgba(55,62,62,0.03)_74%,rgba(55,62,62,0.06)_100%)]">
            <div className="h-full w-auto flex flex-col items-center justify-center">
                <div className="aspect-16/10 w-full flex items-center justify-center">
                    <ImageViewer objectFit="contain" alt={imageAlt} src={imageSrc}/>
                </div>
                <h2 className="w-full font-['Michroma'] font-semibold text-[1.25rem] text-black max-w-full
                line-clamp-2 uppercase">
                    {title}
                </h2>
                <p className="w-full flex gap-2 flex-col justify-center items-center text-[#77787b]">
                    {description}
                </p>
            </div>
            <button className="text-white bg-primary-color w-full h-11 flex items-center justify-center cursor-pointer border-none uppercase font-medium transition-colors duration-300 *group-hover/item:bg-secondary-color">
                {t('view')}
            </button>
        </Link>
    );
    //#endregion
}
export default ResourcesItem