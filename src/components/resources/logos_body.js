'use client' // Renders on client side
import React from "react";
import Link from "next/link"
import { useTranslations } from "next-intl";

const LogosBody = () => {

    const t = useTranslations('Resources.Logos')

    return(
        <div className="font-['lora'] text-black my-8 mx-4 z-100 max-w-screen-lg  xl:mx-auto">
            <div className="py-8 flex flex-col">
                <span className="font-['lora'] font-medium text-[2.25rem] leading-8
                    flex items-center justify-start uppercase">{t('title')}</span>
                <span className="">
                    {t('publishedDate')}
                </span>
            </div>

            <div className="py-8 flex flex-col">
                <span className="font-bold text-[1.5rem] leading-5
                    flex items-center justify-start uppercase text-primary-color">{t('htLogo')}</span>
            </div>
            <div className="flex flex-row gap-4 flex-wrap">
                <div className="flex flex-col w-full sm:w-[12rem]">
                    {/* <span className="text-[0.85rem]">{t('htlbogCtB')}</span> */}
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_logotype-isotype_blue_bg_gray.png" alt="" />
                </div>
                <div className="flex flex-col w-full sm:w-[12rem]">
                    {/* <span className="text-[0.85rem]">{t('htlbogtB')}</span> */}
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_logotype-isotype_blue_bg_transparent.png" alt="" />
                </div>
                <div className="flex flex-col w-full sm:w-[12rem]">
                    {/* <span className="text-[0.85rem]">{t('htlbogtB')}</span> */}
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_logotype-isotype_blue_gray_bg_transparent.png" alt="" />
                </div>
                <div className="flex flex-col w-full sm:w-[12rem]">
                    {/* <span className="text-[0.85rem]">{t('htlbogtB')}</span> */}
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_logotype-isotype_gray_bg_transparent.png" alt="" />
                </div>
                <div className="flex flex-col w-full sm:w-[12rem]">
                    {/* <span className="text-[0.85rem]">{t('htlbogtB')}</span> */}
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_logotype-isotype_light_gray_bg_blue.png" alt="" />
                </div>
            </div>
            <div className="py-8 flex flex-col">
                <span className="font-bold text-[1.5rem] leading-5
                    flex items-center justify-start uppercase text-primary-color">{t('htLogoAlt')}</span>
            </div>
            <div className="flex flex-row gap-4 flex-wrap">
                <div className="flex flex-col w-full sm:w-[12rem]">
                    {/* <span className="text-[0.85rem]">{t('htlbogCtB')}</span> */}
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_logotype_isotype_alt_blue_gray.png" alt="" />
                </div>
                <div className="flex flex-col w-full sm:w-[12rem]">
                    {/* <span className="text-[0.85rem]">{t('htlbogtB')}</span> */}
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_logotype_isotype_alt_blue_transparent.png" alt="" />
                </div>
                <div className="flex flex-col w-full sm:w-[12rem]">
                    {/* <span className="text-[0.85rem]">{t('htlbogtB')}</span> */}
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_logotype_isotype_alt_gray_blue_transparent.png" alt="" />
                </div>
                <div className="flex flex-col w-full sm:w-[12rem]">
                    {/* <span className="text-[0.85rem]">{t('htlbogtB')}</span> */}
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_logotype_isotype_alt_gray_transparent.png" alt="" />
                </div>
                <div className="flex flex-col w-full sm:w-[12rem]">
                    {/* <span className="text-[0.85rem]">{t('htlbogtB')}</span> */}
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_logotype_isotype_alt_gray_blue.png" alt="" />
                </div>
            </div>
            <div className="py-8 flex flex-col">
                <span className="font-bold text-[1.5rem] leading-5
                    flex items-center justify-start uppercase text-primary-color">{t('htLogoVert')}</span>
            </div>
            <div className="flex flex-row gap-4 flex-wrap">
                <div className="flex flex-col w-full sm:w-[12rem]">
                    {/* <span className="text-[0.85rem]">{t('htlbogCtB')}</span> */}
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_logotype_isotype_vert_blue_gray.png" alt="" />
                </div>
                <div className="flex flex-col w-full sm:w-[12rem]">
                    {/* <span className="text-[0.85rem]">{t('htlbogtB')}</span> */}
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_logotype_isotype_vert_blue_transparent.png" alt="" />
                </div>
                <div className="flex flex-col w-full sm:w-[12rem]">
                    {/* <span className="text-[0.85rem]">{t('htlbogtB')}</span> */}
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_logotype_isotype_vert_gray_transparent.png" alt="" />
                </div>
                <div className="flex flex-col w-full sm:w-[12rem]">
                    {/* <span className="text-[0.85rem]">{t('htlbogtB')}</span> */}
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_logotype_isotype_vert_gray_blue.png
                    " alt="" />
                </div>
            </div>
            <div className="py-8 flex flex-col">
                <span className="font-bold text-[1.5rem] leading-5
                    flex items-center justify-start uppercase text-primary-color">{t('hLogo')}</span>
            </div>
            <div className="flex flex-row gap-4 flex-wrap">
                <div className="flex flex-col w-full sm:w-[12rem]">
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_logotype_blue_gray.png" alt="" />
                </div>
                <div className="flex flex-col w-full sm:w-[12rem]">
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_logotype_blue_transparent.png" alt="" />
                </div>
                <div className="flex flex-col w-full sm:w-[12rem]">
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_logotype_gray_transparent.png" alt="" />
                </div>
                <div className="flex flex-col w-full sm:w-[12rem]">
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_logotype_gray_blue.png" alt="" />
                </div>
            </div>
            <div className="py-8 flex flex-col">
                <span className="font-bold text-[1.5rem] leading-5
                    flex items-center justify-start uppercase text-primary-color">{t('isoLogo')}</span>
            </div>
            <div className="flex flex-row gap-4 flex-wrap">
                <div className="flex flex-col w-full sm:w-[12rem]">
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_isotype_blue_gray.png" alt="" />
                </div>
                <div className="flex flex-col w-full sm:w-[12rem]">
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_isotype_blue_transparent.png" alt="" />
                </div>
                <div className="flex flex-col w-full sm:w-[12rem]">
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_isotype_gray_transparent.png" alt="" />
                </div>
                <div className="flex flex-col w-full sm:w-[12rem]">
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_isotype_gray_blue.png" alt="" />
                </div>
            </div>
            <div className="py-8 flex flex-col">
                <span className="font-bold text-[1.5rem] leading-5
                    flex items-center justify-start uppercase text-primary-color">{t('isoLogoAlt')}</span>
            </div>
            <div className="flex flex-row gap-4 flex-wrap">
                <div className="flex flex-col w-full sm:w-[12rem]">
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_isotype_alt_blue_gray.png" alt="" />
                </div>
                <div className="flex flex-col w-full sm:w-[12rem]">
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_isotype_alt_blue_transparent.png" alt="" />
                </div>
                <div className="flex flex-col w-full sm:w-[12rem]">
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_isotype_alt_gray_transparent.png" alt="" />
                </div>
                <div className="flex flex-col w-full sm:w-[12rem]">
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_isotype_alt_gray_blue.png" alt="" />
                </div>
            </div>
            <div className="py-8 flex flex-col">
                <span className="font-bold text-[1.5rem] leading-5
                    flex items-center justify-start uppercase text-primary-color">{t('sloganLogo')}</span>
            </div>
            <div className="flex flex-row gap-4 flex-wrap">
                <div className="flex flex-col w-full sm:w-[12rem]">
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_slogan_blue_gray.png" alt="" />
                </div>
                <div className="flex flex-col w-full sm:w-[12rem]">
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_slogan_blue_transparent.png" alt="" />
                </div>
                <div className="flex flex-col w-full sm:w-[12rem]">
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_slogan_gray_transparent.png" alt="" />
                </div>
                <div className="flex flex-col w-full sm:w-[12rem]">
                    <img className="bg-[#b0b2b4]" 
                    src="/logos/bedboss_slogan_gray_blue.png" alt="" />
                </div>
            </div>
            <a href="/Downloadable-Resources/Logotypes_Full_Suite.zip" className="w-full my-8 bg-primary-color text-white py-1 px-3 text-center
                cursor-pointer flex items-center justify-center border-none gap-2 min-h-11 rounded-lg uppercase
                motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400
                text-[1rem] lg:px-4 lg:w-fit lg:mx-auto lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium">
                {t('downloadFullSuite')}
            </a>

            <span>
                {
                    t.rich('doYouNeedOtherFormat', {
                        link: (c) => <Link className="text-[#77787b] motion-safe:transition-all 
                        motion-reduce:transition-none will-change-auto motion-safe:duration-400 
                        decoration-[3px] underline underline-offset-4 lg:hover:text-primary-color" 
                        href="/contact-us">{c}</Link>
                    })
                }
            </span>
        </div>
    )
}

export default LogosBody;