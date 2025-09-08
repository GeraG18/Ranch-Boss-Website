'use client' // Renders on client side
import React from "react";
import HorizonIcon from "@/components/icons/horizon_icon"
import { useAlertsProvider } from "../../context/alert_context";
import { useConfiguratorContext } from "../../context/configurator_context/configurator_context";
import { currencyFormat } from "../../services/utils-service";
import { useTranslations } from "next-intl";

const BottomBar = ({onClickEvent = (clicked='') => {}}) => {

    const {reachesBottom} = useAlertsProvider();
    const t = useTranslations('ConfigureModel');
    const pT = useTranslations('PagesTitles');
    const {product, totals, downloadPDF, isColorAndBaseModelEmpty, showRequestModelDialog} = useConfiguratorContext()

    return(
        <div className={`fixed bottom-0 motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-300 
        left-0 bg-white/90 text-[#1c1c1e] backdrop-blur-sm backdrop-saturate-50 w-full min-h-20 shadow-[4px_-8px_32px_-8px_rgba(0,0,0,0.75)]!
        z-200 font-['Montserrat'] flex flex-col items-center justify-center ${reachesBottom ? "translate-y-[calc(100%+5rem)]" : "translate-y-0"}`}>
            {/* {css(styles.marginContainer, styles.flexRow, styles.justifyBetween, styles.paddingX, styles.hideDesk)} */}
            <div className="mx-4 max-w-(--breakpoint-xl) w-[calc(100%-2rem)] z-100 xl:mx-auto flex flex-row items-center gap-2 justify-between py-1 pt-4
            lg:hidden">
                {t('summary.totalPrice')}: <span className="uppercase font-semibold flex-none desktopPrice">{currencyFormat(totals.total)}</span>
            </div>
            <div className="mx-4 max-w-(--breakpoint-xl) w-[calc(100%-2rem)] z-100 xl:mx-auto flex flex-row items-center gap-2 justify-between py-4 lg:py-0">
                <div className="flex flex-row items-center gap-2">
                    <HorizonIcon width="5rem" height="5rem" color="#6897d8" className="hidden lg:flex"/>
                    <div className="flex flex-col">
                        <span className="uppercase font-semibold">{product.name || "-"}</span>
                        <span className="uppercase">{pT('dynCatTrailer', {category:product.category || '-'})} </span>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-2 w-fit h-full">
                    <span className="uppercase font-semibold flex-none hidden lg:flex desktopPrice">{currencyFormat(totals.total)}</span>
                
                    <button className="flex-none uppercase cursor-pointer relative text-white border-none bg-primary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium  text-[1rem] select-none motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-300
                        flex gap-[2px] h-10 min-w-10 items-center justify-center rounded-[10px] disabled:cursor-not-allowed disabled:bg-[#7a7a7a] disabled:hover:bg-[#5c5b5b] px-2" onClick={() => {downloadPDF()}}
                        disabled={isColorAndBaseModelEmpty()}>
                        <span style={{fontSize:'1.5rem'} } className="material-icons notranslate ">picture_as_pdf</span>
                        <span className="hidden lg:flex">
                            {t('getConfig')}
                        </span>
                    </button>
                    <button className="flex-none uppercase cursor-pointer relative text-white border-none bg-primary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium  text-[1rem] select-none motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-300
                        flex gap-[2px] h-10 min-w-10 items-center justify-center rounded-[10px] disabled:cursor-not-allowed disabled:bg-[#7a7a7a] disabled:hover:bg-[#5c5b5b] px-2" onClick={() => {
                       showRequestModelDialog();
                    }}
                        disabled={isColorAndBaseModelEmpty()}>
                        <span style={{fontSize:'1.5rem'} } className="material-icons notranslate ">request_quote</span>
                        <span className="hidden lg:flex">
                           {t('requestModel')}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BottomBar;