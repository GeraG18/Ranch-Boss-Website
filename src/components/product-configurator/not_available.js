'use client' // Renders on client side
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const NotAvailable = ({product}) => {
    
    const t = useTranslations('PagesTitles');
    const fT = useTranslations('ConfigureModel.file');
    //#region view
    return(
        <div className="flex flex-col-reverse items-center font-['Montserrat'] lg:h-[60vh] lg:flex-row mx-4 py-1 max-w-(--breakpoint-xl) xl:w-full xl:mx-auto">
            <div className="relative w-full flex gap-4 flex-col items-center justify-center h-fit pb-4 lg:h-[30vh] lg:p-0">
                <div className="self-start text-[2rem] inline-block uppercase z-10 font-['Michroma'] lg:text-[3rem]">{t('notAvailableForNow')}</div>
                <p className="self-start inline-block z-10 text-[1.25rem]">
                    {/* {product?.name ? `"${product?.name}"` : "This product"} is not yet available for the configurator, but it will be coming soon! Stay tuned for updates and get ready to customize your perfect trailer soon. */}
                    {t('noAvailableDescription', {length: (product.name || '').length, name: (product.name || '')})}
                </p>
                <Link href="/products" className="self-start flex-none uppercase cursor-pointer relative text-white border-none bg-primary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium  text-[1rem] select-none motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-300
                    flex gap-[2px] h-10 min-w-10 items-center justify-center rounded-[10px] disabled:cursor-not-allowed disabled:bg-[#7a7a7a] disabled:hover:bg-[#5c5b5b] px-2" >{fT('checkMoreProducts')}</Link>
            </div>
            <div className="relative w-full flex flex-col items-center justify-center">
                <div className="relative flex flex-col w-full h-full items-center justify-center ">
                    <img style={{width:'100%'}} src={ product?.descriptions?.gallery[0] || "/Images/dumpster.webp"} alt="Horizon Trailers model"/>
                </div>
            </div>
        </div>
    );
    //#endregion
}

export default NotAvailable;