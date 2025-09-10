import React from "react";
import Link from "next/link"
import { useTranslations } from "next-intl";

const MerchandiseItem = ({name, keyName, description, price, image}) => {
    const t = useTranslations('PagesTitles')
    //#region view
    return(
        <div className="font-['lora'] text-black w-full h-full flex flex-col
        justify-around items-center cursor-pointer overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]
        bg-[radial-gradient(circle,rgba(55,62,62,0)_50%,rgba(55,62,62,0.03)_74%,rgba(55,62,62,0.06)_100%)]">
            <Link href={`/merchandise/details/${keyName}`}  className="text-black w-full h-full
            flex flex-col justify-around items-center cursor-pointer overflow-hidden p-0 m-0">
                <div className="w-full aspect-square relative flex items-center justify-center">
                    <img className="absolute w-full h-full bg-center" src={image} alt={name} />
                </div>
                <div className="w-full h-full flex flex-col">
                    <span className="uppercase w-[calc(100%-1rem)] whitespace-nowrap overflow-hidden 
                    text-ellipsis px-2 my-2 font-bold">{name}</span>
                    <span className="uppercase w-[calc(100%-1rem)] whitespace-nowrap overflow-hidden
                    text-ellipsis px-2 text-[0.8rem] my-1">{description}</span>
                    <div className="text-[1.25rem] min-h-8 mx-2 w-[calc(100%-1rem)] 
                    flex flex-col items-start justify-center">
                        <span>$ {price}</span>
                    </div>

                </div>
                <button className="font-['lora'] text-[1.5rem] text-white uppercase bg-primary-color
                w-full h-9 flex items-center justify-center cursor-pointer border-none">
                    {t('view')} 
                </button>
            </Link>
        </div>
    );
}

export default MerchandiseItem;