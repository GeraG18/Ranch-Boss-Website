'use client' // Renders on client side
import React, { useCallback, useState } from "react";

import IgIcon from "../icons/ig_icon";
import YtIcon from "../icons/yt_icon";
import PtIcon from "../icons/pt_icon";
import FbIcon from "../icons/fb_icon";
import TkIcon from "../icons/tk_icon";
import XIcon from "../icons/x_icon";
import LnIcon from "../icons/ln_icon";
import MailchimpForm from "./mailchimp_form";
import Image from "next/image";
import { useTranslations } from "next-intl";
import CustomLink from "@/components/general/custom_link"

function FooterContainer(){

    //#region code
    const [activeSections, setActiveSections] = useState([]);
    const mcT = useTranslations('FooterMailchimpForm')
    const t = useTranslations('PagesTitles')
    const fT = useTranslations('FooterArea')

    let getKey = useCallback(
        (location, matches) => {
          let match = matches.find((m) => (m.handle)?.scrollMode);
          if ((match?.handle)?.scrollMode === "pathname") {
            return location.pathname;
          }
    
          return location.key;
        },
        []
    );    


    const showOrHideCheckBox = (filterselected) => {
        const checkBoxes = document.getElementsByClassName(filterselected)
        
        for( var index = 0; index < checkBoxes.length; index++){
            checkBoxes[index].style.cssText  = 
                checkBoxes[index].style.height === "fit-content" ? "height: 0px !important": "height: fit-content !important"  
        }
    
        if(activeSections.includes(filterselected)) {
          let newArr = activeSections.filter((item) => item !== filterselected);
          setActiveSections(newArr)
        } else {
          let newArr = [...activeSections, filterselected]
          setActiveSections(newArr)
        }
    }
    //#endregion

    //#region view
    return(
        <div className="flex flex-col select-none notranslate">
            <div className="h-auto flex flex-row items-center justify-center bg-linear-to-t from-black to-dark-gray py-[3%] px-4 lg:px-0 lg:pt-[1%] lg:pb-[2%] border-t-2 border-t-primary-color">
                <div className="flex mx-4 flex-col max-w-(--breakpoint-xl) w-full gap-8 lg:flex-row xl:mx-auto">
                    <div className="flex flex-col items-center justify-center lg:w-[30%] lg:items-start">
                        <div className="w-[245px] h-[140px] py-5 px-[10px] shrink-3 relative">
                            <Image
                                alt="Ranch Boss by Horizon Trailers logotype"
                                priority={true}
                                src="/logos/bed_boss_white_logo.png"
                                placeholder="empty"
                                quality={90}
                                fill
                                sizes="50vw"
                                style={{
                                objectFit: "contain",
                                }}
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-white">
                            <CustomLink href="https://www.instagram.com/horizon.trailers/" target="_blank" rel="noreferrer"
                            aria-label="Check Horizon Trailers' Instagram"
                            className="text-[#d9dcdc] lg:hover:text-primary-light-color
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400 
                            ">
                                <span style={{display:'none'}}>Horizon Trailers Instagram</span>
                                <IgIcon width="20" height="20"/>
                            </CustomLink>
                            <CustomLink href="https://www.youtube.com/@horizontrailersllc/featured" target="_blank" rel="noreferrer"
                            aria-label="Check Horizon Trailers' Youtube"
                            className="text-[#d9dcdc] lg:hover:text-primary-light-color
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400 
                            ">
                                <span style={{display:'none'}}>Horizon Trailers Youtube</span>
                                <YtIcon width="20" height="20"/>
                            </CustomLink>
                            <CustomLink href="https://www.pinterest.com/horizontrailers/" target="_blank" rel="noreferrer"
                            aria-label="Check Horizon Trailers' Pinterest"
                            className="text-[#d9dcdc] lg:hover:text-primary-light-color
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400 
                            ">
                                <span style={{display:'none'}}>Horizon Trailers Pinterest</span>
                                <PtIcon width="20" height="20"/>
                            </CustomLink>
                            <CustomLink href="https://www.facebook.com/share/xGgkJp4tvgRY1H2c/?mibextid=qi2Omg" target="_blank" rel="noreferrer"
                            aria-label="Check Horizon Trailers' Facebook"
                            className="text-[#d9dcdc] lg:hover:text-primary-light-color
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400 
                            ">
                                <span style={{display:'none'}}>Horizon Trailers Facebook</span>
                                <FbIcon width="20" height="20"/>
                            </CustomLink>
                            <CustomLink href="https://www.tiktok.com/@horizontrailersllc?_t=8pnkZFFGbLB&_r=1" target="_blank" rel="noreferrer"
                            aria-label="Check Horizon Trailers' Tiktok"
                            className="text-[#d9dcdc] lg:hover:text-primary-light-color
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400 
                            ">
                                <span style={{display:'none'}}>Horizon Trailers Tiktok</span>
                                <TkIcon width="20" height="20"/>
                            </CustomLink>
                            <CustomLink href="https://www.x.com/TrailersHorizon" target="_blank" rel="noreferrer"
                            aria-label="Check Horizon Trailers' X (Twitter)"
                            className="text-[#d9dcdc] lg:hover:text-primary-light-color
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400 
                            ">
                                <span style={{display:'none'}}>Horizon Trailers X</span>
                                <XIcon width="20" height="20"/>
                            </CustomLink>
                            <CustomLink href="https://www.linkedin.com/company/horizontrailers" target="_blank" rel="noreferrer"
                            aria-label="Check Horizon Trailers' LinkedIn"
                            className="text-[#d9dcdc] lg:hover:text-primary-light-color
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400 
                            ">
                                <span style={{display:'none'}}>Horizon Trailers LinkedIn</span>
                                <LnIcon width="20" height="20"/>
                            </CustomLink>
                        </div>
                        <div className="font-['Michroma'] text-[1rem] my-[3%] text-left text-[#d9dcdc] col-start-1 uppercase">{mcT('title')}</div>
                        <span className="font-['Montserrat'] text-[1rem] mb-[5%] text-left text-[#d9dcdc] col-start-1 lg:text-[0.9rem]">
                             {mcT('description')}
                        </span>
                        <MailchimpForm/>
                    </div>
                    
                    <div className="w-full flex flex-col gap-3">
                        <div className="flex flex-row h-full gap-[40px] text-white font-['Montserrat'] text-[1rem] lg:hidden">
                            <ul className="w-full inline-flex flex-col gap-4 font-['Montserrat'] bg-transparent list-none
                                relative motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400
                                py-4 m-0 select-none">
                                <li className="py-1 motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400
                                    rounded-lg border border-[#252525] bg-[#181818]">
                                    <div onClick={()=>showOrHideCheckBox("products")} className="py-[0.8rem] px-[0.4rem] font-['Michroma'] text-[0.875rem]
                                        cursor-pointer flex items-center justify-center motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                                        motion-safe:duration-400">
                                        <span className="w-full uppercase flex items-center">
                                            {t('products')}
                                        </span>
                                        <span className={`material-symbols-outlined notranslate  text-white motion-safe:transition-all 
                                        motion-reduce:transition-none will-change-auto motion-safe:duration-400 ${!activeSections.includes("products") ? "rotate-0" : "rotate-45"}`}>
                                            add
                                        </span>
                                    </div>
                                    <div className={`flex flex-col gap-[0.2rem] motion-safe:transition-all 
                                        motion-reduce:transition-none will-change-auto motion-safe:duration-400 
                                        ${activeSections.includes("products") ? "pt-[0.2rem] px-[0.4rem] pb-[0.8rem]" : "p-0"}`}>
                                        <div className="flex flex-col h-0 overflow-hidden motion-safe:transition-all motion-reduce:transition-none 
                                            will-change-auto motion-safe:duration-400 products">
                                            <CustomLink className="cursor-pointer h-10 text-[1rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" 
                                                href="/products">{t('allproducts')}</CustomLink>

                                            <CustomLink className="cursor-pointer h-10 text-[1rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" 
                                                href={`/products?category=${t('dovetail').toLowerCase().replace(' ', '+')}`}>{t('dovetail')}</CustomLink>
                                            <CustomLink className="cursor-pointer h-10 text-[1rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" 
                                                href={`/products?category=${t('flatbed').toLowerCase().replace(' ', '+')}`}>{t('flatbed')}</CustomLink>
                                            <CustomLink className="cursor-pointer h-10 text-[1rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" 
                                                href={`/products?category=${t('service').toLowerCase().replace(' ', '+')}`}>{t('service')}</CustomLink>
                                        </div>
                                    </div>
                                </li>
                                <li className="py-1 rounded-lg border border-[#252525] bg-[#181818] motion-safe:transition-all 
                                        motion-reduce:transition-none will-change-auto motion-safe:duration-400 ">
                                    <div onClick={()=>showOrHideCheckBox("support")} 
                                        className="py-[0.8rem] px-[0.4rem] font-['Michroma'] text-[0.875rem] cursor-pointer flex items-center 
                                        justify-center motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                                        motion-safe:duration-400">
                                        <span className="w-full uppercase flex items-center">
                                            {t('support')}
                                        </span>
                                        <span style={{transform: `rotate(${!activeSections.includes("support") ? '0deg' : '45deg'})`}}
                                            className="color-[#babbbd] motion-safe:transition-all motion-reduce:transition-none 
                                            will-change-auto motion-safe:duration-300 material-symbols-outlined notranslate ">
                                            add
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-[0.2rem] motion-safe:transition-all motion-reduce:transition-none 
                                        will-change-auto motion-safe:duration-400" 
                                        style={{padding:activeSections.includes("support") ?'0.2rem 0.4rem 0.8rem 0.4rem' : '0px'}}>
                                        <div className="flex flex-col h-0 overflow-hidden motion-safe:transition-all motion-reduce:transition-none 
                                            will-change-auto motion-safe:duration-400 support">
                                            <CustomLink className="cursor-pointer h-10 text-[1rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" href="/warranty-claim">{t('warrantyClaim')}</CustomLink>
                                            {/* <CustomLink className="cursor-pointer h-10 text-[1rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" href="/warranty-docs">{t('warrantyDocs')}</CustomLink>
                                            <CustomLink className="cursor-pointer h-10 text-[1rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" href="/owners-manual">{t('ownersManual')}</CustomLink> */}
                                        </div>
                                    </div>
                                </li>
                                <li className="py-1 rounded-lg border border-[#252525] bg-[#181818] motion-safe:transition-all 
                                        motion-reduce:transition-none will-change-auto motion-safe:duration-400 ">
                                    <div onClick={()=>showOrHideCheckBox("dealer")} 
                                        className="py-[0.8rem] px-[0.4rem] font-['Michroma'] text-[0.875rem] cursor-pointer flex items-center 
                                        justify-center motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                                        motion-safe:duration-400">
                                        <span className="w-full uppercase flex items-center">
                                            {t('dealer')}
                                        </span>
                                        <span style={{transform: `rotate(${!activeSections.includes("dealer") ? '0deg' : '45deg'})`}}
                                            className="color-[#babbbd] motion-safe:transition-all motion-reduce:transition-none 
                                            will-change-auto motion-safe:duration-300 material-symbols-outlined notranslate ">
                                            add
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-[0.2rem] motion-safe:transition-all motion-reduce:transition-none 
                                        will-change-auto motion-safe:duration-400" 
                                        style={{padding:activeSections.includes("dealer") ?'0.2rem 0.4rem 0.8rem 0.4rem' : '0px'}}>
                                        <div className="flex flex-col h-0 overflow-hidden motion-safe:transition-all motion-reduce:transition-none 
                                            will-change-auto motion-safe:duration-400 dealer">
                                            {/* <CustomLink className="cursor-pointer h-10 text-[1rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" href="/find-a-dealer">{t('findADealer')}</CustomLink> */}
                                            {/* <CustomLink className="text-[#d9dcdc] lg:hover:text-primary-light-color" href="/" className="cursor-pointer h-10 text-[1rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400">Dealer Port</CustomLink> */}
                                            <CustomLink href="/become-a-dealer" className="cursor-pointer h-10 text-[1rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400">{t('becomeADealer')}</CustomLink>
                                            {/* <CustomLink>Dealer Port</CustomLink> */}
                                        </div>
                                    </div>
                                </li>
                                {/* <li className="py-1 rounded-lg border border-[#252525] bg-[#181818] motion-safe:transition-all 
                                        motion-reduce:transition-none will-change-auto motion-safe:duration-400 ">
                                    <div onClick={()=>showOrHideCheckBox("shop")} 
                                        className="py-[0.8rem] px-[0.4rem] font-['Michroma'] text-[0.875rem] cursor-pointer flex items-center 
                                        justify-center motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                                        motion-safe:duration-400">
                                        <span className="w-full uppercase flex items-center">
                                            {t('shop')}
                                        </span>
                                        <span style={{transform: `rotate(${!activeSections.includes("shop") ? '0deg' : '45deg'})`}}
                                            className="color-[#babbbd] motion-safe:transition-all motion-reduce:transition-none 
                                            will-change-auto motion-safe:duration-300 material-symbols-outlined notranslate ">
                                            add
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-[0.2rem] motion-safe:transition-all motion-reduce:transition-none 
                                        will-change-auto motion-safe:duration-400" 
                                        style={{padding:activeSections.includes("shop") ?'0.2rem 0.4rem 0.8rem 0.4rem' : '0px'}}>
                                        <div className="flex flex-col h-0 overflow-hidden motion-safe:transition-all motion-reduce:transition-none 
                                            will-change-auto motion-safe:duration-400 shop">
                                            <CustomLink className="cursor-pointer h-10 text-[1rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" href="/merchandise">{t('merchandise')}</CustomLink>
                                        </div>
                                    </div>
                                </li> */}
                                <li className="py-1 rounded-lg border border-[#252525] bg-[#181818] motion-safe:transition-all 
                                        motion-reduce:transition-none will-change-auto motion-safe:duration-400 ">
                                    <div onClick={()=>showOrHideCheckBox("company")} 
                                        className="py-[0.8rem] px-[0.4rem] font-['Michroma'] text-[0.875rem] cursor-pointer flex items-center 
                                        justify-center motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                                        motion-safe:duration-400">
                                        <span className="w-full uppercase flex items-center">
                                            {t('company')}
                                        </span>
                                        <span style={{transform: `rotate(${!activeSections.includes("company") ? '0deg' : '45deg'})`}}
                                            className="color-[#babbbd] motion-safe:transition-all motion-reduce:transition-none 
                                            will-change-auto motion-safe:duration-300 material-symbols-outlined notranslate ">
                                            add
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-[0.2rem] motion-safe:transition-all motion-reduce:transition-none 
                                        will-change-auto motion-safe:duration-400" 
                                        style={{padding:activeSections.includes("company") ?'0.2rem 0.4rem 0.8rem 0.4rem' : '0px'}}>
                                        <div className="flex flex-col h-0 overflow-hidden motion-safe:transition-all motion-reduce:transition-none 
                                            will-change-auto motion-safe:duration-400 company">
                                            <CustomLink className="cursor-pointer h-10 text-[1rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" href="/about-us">{t('aboutUs')}</CustomLink>
                                            <CustomLink className="cursor-pointer h-10 text-[1rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" href="/contact-us">{t('contactUs')}</CustomLink>
                                            {/* <CustomLink className="cursor-pointer h-10 text-[1rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" href="/">Employment</CustomLink> */}
                                            {/* <CustomLink className="cursor-pointer h-10 text-[1rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" href="/financing">{t('financeYourTrailer')}</CustomLink> */}
                                        </div>
                                    </div>
                                </li>
                                <li className="py-1 rounded-lg border border-[#252525] bg-[#181818] motion-safe:transition-all 
                                        motion-reduce:transition-none will-change-auto motion-safe:duration-400 ">
                                    <div onClick={()=>showOrHideCheckBox("insideTrailer")} 
                                        className="py-[0.8rem] px-[0.4rem] font-['Michroma'] text-[0.875rem] cursor-pointer flex items-center 
                                        justify-center motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                                        motion-safe:duration-400">
                                        <span className="w-full uppercase flex items-center">
                                            {t('insideTheTrailerWorld')}
                                        </span>
                                        <span style={{transform: `rotate(${!activeSections.includes("insideTrailer") ? '0deg' : '45deg'})`}}
                                            className="color-[#babbbd] motion-safe:transition-all motion-reduce:transition-none 
                                            will-change-auto motion-safe:duration-300 material-symbols-outlined notranslate ">
                                            add
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-[0.2rem] motion-safe:transition-all motion-reduce:transition-none 
                                        will-change-auto motion-safe:duration-400" 
                                        style={{padding:activeSections.includes("insideTrailer") ?'0.2rem 0.4rem 0.8rem 0.4rem' : '0px'}}>
                                        <div className="flex flex-col h-0 overflow-hidden motion-safe:transition-all motion-reduce:transition-none 
                                            will-change-auto motion-safe:duration-400 insideTrailer">
                                            <CustomLink className="cursor-pointer h-10 text-[1rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" href="/blog">{t('blog')}</CustomLink> 
                                            <CustomLink className="cursor-pointer h-10 text-[1rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" href="/resources">{t('resources')}</CustomLink> 
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="hidden flex-row gap-1 h-full font-['Montserrat'] text-[1rem] lg:flex justify-between">
                            <div className="flex flex-col flex-wrap text-white gap-5">
                                <span className="font-['Michroma'] font-medium text-[0.875rem] uppercase">{t('products')}</span>
                                <CustomLink className="cursor-pointer h-10 text-[0.85rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                    motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" href="/products">{t('allproducts')}</CustomLink>
                                <CustomLink className="cursor-pointer h-10 text-[0.85rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                    motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" 
                                    href={`/products?category=${t('dovetail').toLowerCase().replace(' ', '+')}`}>{t('dovetail')}</CustomLink>
                                <CustomLink className="cursor-pointer h-10 text-[0.85rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                    motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" 
                                    href={`/products?category=${t('flatbed').toLowerCase().replace(' ', '+')}`}>{t('flatbed')}</CustomLink>
                                <CustomLink className="cursor-pointer h-10 text-[0.85rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                    motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" 
                                    href={`/products?category=${t('service').toLowerCase().replace(' ', '+')}`}>{t('service')}</CustomLink>
                            </div>
                            <div className="flex flex-col flex-wrap text-white gap-5">
                                <span className="font-['Michroma'] font-medium text-[0.875rem] uppercase">{t('support')}</span>
                                <CustomLink className="cursor-pointer h-10 text-[0.85rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" href="/warranty-claim">{t('warrantyClaim')}</CustomLink>
                                {/* <CustomLink className="cursor-pointer h-10 text-[0.85rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" href="/warranty-docs">{t('warrantyDocs')}</CustomLink>
                                <CustomLink className="cursor-pointer h-10 text-[0.85rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" href="/owners-manual">{t('ownersManual')}</CustomLink> */}
                            </div>
                            <div className="flex flex-col flex-wrap text-white gap-5">
                                <span className="font-['Michroma'] font-medium text-[0.875rem] uppercase">{t('dealer')}</span>
                                {/* <CustomLink className="cursor-pointer h-10 text-[0.85rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                // motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" href="/find-a-dealer">{t('findADealer')}</CustomLink> */}
                                {/* <CustomLink className="cursor-pointer h-10 text-[0.85rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400">Dealer Port</CustomLink> */}
                                <CustomLink className="cursor-pointer h-10 text-[0.85rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" href="/become-a-dealer">{t('becomeADealer')}</CustomLink>
                                {/* <CustomLink>Dealer Port</CustomLink> */}
                            </div>
                            {/* <div className="flex flex-col flex-wrap text-white gap-5">
                                <span className="font-['Michroma'] font-medium text-[0.875rem] uppercase">{t('shop')}</span>
                                <CustomLink className="cursor-pointer h-10 text-[0.85rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" href="/merchandise">{t('merchandise')}</CustomLink>
                            </div> */}
                            <div className="flex flex-col flex-wrap text-white gap-5">
                                <span className="font-['Michroma'] font-medium text-[0.875rem] uppercase">{t('company')}</span>
                                <CustomLink className="cursor-pointer h-10 text-[0.85rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" href="/about-us">{t('aboutUs')}</CustomLink>
                                <CustomLink className="cursor-pointer h-10 text-[0.85rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" href="/contact-us">{t('contactUs')}</CustomLink>
                                {/* <CustomLink className="cursor-pointer h-10 text-[0.85rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" href="/">Employment</CustomLink> */}
                                {/* <CustomLink className="cursor-pointer h-10 text-[0.85rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" href="/financing">{t('financeYourTrailer')}</CustomLink> */}
                            </div>
                            <div className="flex flex-col flex-wrap text-white gap-5">
                                <span className="font-['Michroma'] font-medium text-[0.875rem] uppercase">{t('insideTheTrailerWorld')}</span>
                                <CustomLink className="cursor-pointer h-10 text-[0.85rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" href="/blog">{t('blog')}</CustomLink> 
                                <CustomLink className="cursor-pointer h-10 text-[0.85rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-light-color 
                                                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400" href="/resources">{t('resources')}</CustomLink> 
                            </div>
                        </div>
                        {/* <CustomLink href="https://www.natm.com/"
                            className="font-['Montserrat'] font-medium text-[0.75rem] text-white! flex flex-row items-center justify-center
                            w-fit h-8 my-4 gap-1 self-center lg:self-end lg:items-center lg:h-auto lg:m-0 hover:text-primary-color">
                            <span className="uppercase">{t('proudNATM')}</span>
                            <img loading="lazy" width="80" height="30" className="w-[80px] h-auto" src="/Images/natm.webp" alt="NATM Decal" />
                        </CustomLink> */}
                        <div className="font-['Montserrat'] text-[0.875rem] font-medium text-white flex flex-col items-center justify-center
                            w-full h-8 my-4 lg:w-fit lg:items-start lg:h-auto lg:m-0">
                             <span> COPYRIGHT <span className="text-white self-end text-[0.75rem]! material-icons notranslate "> copyright</span> Ranch Boss BY HORIZON TRAILERS LLC {new Date().getFullYear()}</span>
                             <span className="text-[0.75rem] uppercase opacity-50 text-left">*{fT('policy')}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-black border-t border-t-[#383838] text-white flex flex-wrap items-center justify-center min-h-10 flex-row gap-4 
                lg:pl-16 pt-2 pb-2">
                <CustomLink href="/privacy-policy" className=" font-['Montserrat'] text-white lg:hover:text-primary-light-color!
                    motion-safe:transition-all motion-reduce:transition-none will-change-auto uppercase 
                    motion-safe:duration-300">{t('privacyPolicy')}</CustomLink>
                {/* <span className=" font-['Montserrat'] hidden lg:block text-[12px]">|</span> */}
                <CustomLink href="/terms-of-use" className=" font-['Montserrat'] text-white lg:hover:text-primary-light-color!
                    motion-safe:transition-all motion-reduce:transition-none will-change-auto uppercase 
                    motion-safe:duration-300">{t('termsOfUse')}</CustomLink>
                {/* <span className=" font-['Montserrat'] hidden lg:block text-[12px]">|</span> */}
                <CustomLink href="/quality#faqs-section" className=" font-['Montserrat'] text-white lg:hover:text-primary-light-color!
                    motion-safe:transition-all motion-reduce:transition-none will-change-auto uppercase 
                    motion-safe:duration-300">{t('faqs')}</CustomLink>
                {/* <span className=" font-['Montserrat'] hidden lg:block text-[12px]">|</span> */}
                <CustomLink href="/sitemap" className=" font-['Montserrat'] text-white lg:hover:text-primary-light-color!
                    motion-safe:transition-all motion-reduce:transition-none will-change-auto uppercase 
                    motion-safe:duration-300">{t('sitemap')}</CustomLink> 
            </div>
        </div>
    );
    //#endregion
}
export default FooterContainer