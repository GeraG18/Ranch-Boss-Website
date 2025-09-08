'use client' // Renders on client side
import React from "react";
import Link from "next/link"
import { useTranslations } from "next-intl";

const SitemapContainer = () => {
    const t = useTranslations('PagesTitles')
    //region view
    return(
        <div className="font-['Montserrat'] min-h-[60vh] select-none">
            <div className="relative z-20 text-left py-8 gap-4 w-[calc(100%-2rem)] mx-4 max-w-(--breakpoint-xl) xl:mx-auto
                grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                <div className="py-4 flex flex-col gap-4">
                    <Link href="/" className="text-black font-['Michroma'] cursor-pointer 
                    text-[2.25rem] leading-8 flex items-center justify-start font-medium
                    lg:hover:text-primary-color uppercase">{t('home')}</Link>
                </div> 
                <div className="py-4 flex flex-col gap-4">
                    <Link href="/products" className="text-black font-['Michroma'] cursor-pointer 
                    text-[2.25rem] leading-8 flex items-center justify-start font-medium
                    lg:hover:text-primary-color uppercase">{t('products')}</Link>
                    <Link className="text-black cursor-pointer 
                    flex items-center justify-start font-medium
                    lg:hover:text-primary-color" href="/products?category=dump">{t('dumpTrailers')}</Link>
                    <Link className="text-black cursor-pointer 
                    flex items-center justify-start font-medium
                    lg:hover:text-primary-color" href="/products?category=roll+off">{t('rolloffTrailers')}</Link>
                    <Link className="text-black cursor-pointer 
                    flex items-center justify-start font-medium
                    lg:hover:text-primary-color" href="/products?category=equipment">{t('equipmentTrailers')}</Link>
                    <Link className="text-black cursor-pointer 
                    flex items-center justify-start font-medium
                    lg:hover:text-primary-color" href="/products?category=flatdeck">{t('flatdeckTrailers')}</Link>
                    <Link className="text-black cursor-pointer 
                    flex items-center justify-start font-medium
                    lg:hover:text-primary-color" href="/products?category=utility">{t('utilityTrailers')}</Link>
                </div> 
                <div className="py-4 flex flex-col gap-4">
                    <span className="text-black font-['Michroma']
                    text-[2.25rem] leading-8 flex items-center 
                    justify-start font-medium uppercase">{t('support')}</span>
                    <Link className="text-black cursor-pointer 
                    flex items-center justify-start font-medium
                    lg:hover:text-primary-color" href="/warranty-claim">{t('warrantyClaim')}</Link>
                    <Link className="text-black cursor-pointer 
                    flex items-center justify-start font-medium
                    lg:hover:text-primary-color" href="/warranty-docs">{t('warrantyDocs')}</Link>
                    <Link className="text-black cursor-pointer 
                    flex items-center justify-start font-medium
                    lg:hover:text-primary-color" href="/owners-manual">{t('ownersManual')}</Link>
                </div> 
                <div className="py-4 flex flex-col gap-4">
                    <span className="text-black font-['Michroma']
                    text-[2.25rem] leading-8 flex items-center 
                    justify-start font-medium uppercase">{t('dealer')}</span>
                    <Link className="text-black cursor-pointer 
                    flex items-center justify-start font-medium
                    lg:hover:text-primary-color" href="/find-a-dealer">{t('findADealer')}</Link>
                    <Link className="text-black cursor-pointer 
                    flex items-center justify-start font-medium
                    lg:hover:text-primary-color" href="/become-a-dealer">{t('dealerApplication')}</Link>
                </div> 
                <div className="py-4 flex flex-col gap-4">
                    <span className="text-black font-['Michroma']
                    text-[2.25rem] leading-8 flex items-center 
                    justify-start font-medium uppercase">{t('shop')}</span>
                    <Link className="text-black cursor-pointer 
                    flex items-center justify-start font-medium
                    lg:hover:text-primary-color" href="/merchandise">{t('merchandise')}</Link>
                </div> 
                <div className="py-4 flex flex-col gap-4">
                    <span className="text-black font-['Michroma']
                    text-[2.25rem] leading-8 flex items-center 
                    justify-start font-medium uppercase">{t('company')}</span>
                    <Link className="text-black cursor-pointer 
                    flex items-center justify-start font-medium
                    lg:hover:text-primary-color" href="/about-us">{t('aboutUs')}</Link>
                    <Link className="text-black cursor-pointer 
                    flex items-center justify-start font-medium
                    lg:hover:text-primary-color" href="/contact-us">{t('contactUs')}</Link>
                    <Link className="text-black cursor-pointer 
                    flex items-center justify-start font-medium
                    lg:hover:text-primary-color" href="/financing">{t('financeYourTrailer')}</Link>
                </div> 
                <div className="py-4 flex flex-col gap-4">
                    <span className="text-black font-['Michroma']
                    text-[2.25rem] leading-8 flex items-center 
                    justify-start font-medium uppercase">{t('insideTheTrailerWorld')}</span>
                    <Link className="text-black cursor-pointer 
                    flex items-center justify-start font-medium
                    lg:hover:text-primary-color" href="/blog">{t('blog')}</Link>
                    <Link className="text-black cursor-pointer 
                    flex items-center justify-start font-medium
                    lg:hover:text-primary-color" href="/resources">{t('resources')}</Link>
                </div> 


            </div>
        </div>
    );
}

export default SitemapContainer;