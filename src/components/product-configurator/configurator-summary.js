'use client' // Renders on client side
import React, { Fragment, useEffect, useState } from "react";
import Select, { StylesConfig } from 'react-select';
import { useConfiguratorContext } from "../../context/configurator_context/configurator_context";
import { formatCamelCaseToNormalCase, currencyFormat } from "../../services/utils-service";
import Link from "next/link";
import { useTranslations } from "next-intl";

function ConfiguratorSummary({onClickEvent = (clicked='') => {}}) {

    //#region code
    const t = useTranslations('ConfigureModel.summary');
    const pT = useTranslations('PagesTitles')
    const {product, totals, formatedProps, pdfFile} = useConfiguratorContext()

    //region view
    return (
        <div className="relative font-['lora'] w-full py-6 my-8">
            <div className="mx-4 max-w-screen-lg  h-fit z-100 xl:w-full xl:mx-auto flex flex-col items-center justify-center gap-2">
                <span className="font-['lora'] uppercase text-[2.25rem] leading-loose flex items-center justify-center text-center lg:text-[3.8rem] lg:leading-12">
                    {t('title')}
                </span>
                <div className="my-1 w-full h-px bg-[#f3f3f3] hidden flex-col gap-2 lg:flex"></div>
                <div className="w-full grid lg:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <span className="w-full font-semibold uppercase text-start">
                            {t('yourModelConfig', {name:product?.name})}
                        </span>
                        <div className="w-full hidden flex-col gap-2 lg:flex ">
                            <Link href={`/products/standard-features/${product?.id}`} onClick={() => onClickEvent('request')} className="flex-none uppercase cursor-pointer relative text-[#6c6c6c] border-none bg-transparent select-none motion-safe:transition-all motion-reduce:transition-none 
                                will-change-auto motion-safe:duration-[500ms]flex items-center gap-1 w-auto lg:hover:text-secondary-color">
                                <span className="material-icons notranslate ">format_list_bulleted</span>
                                {pT('standardFeatures')}
                            </Link>
                            <Link href="/warranty-docs" className="flex-none uppercase cursor-pointer relative text-[#6c6c6c] border-none bg-transparent select-none motion-safe:transition-all motion-reduce:transition-none 
                                will-change-auto motion-safe:duration-[500ms]flex items-center gap-1 w-auto lg:hover:text-secondary-color">
                                <span className="material-icons notranslate ">brightness_high</span>
                                {pT('warrantyDocs')}
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="my-1 w-full h-px bg-[#f3f3f3] flex lg:hidden"></div>
                        <div className="w-full flex items-center justify-center">
                            <span className="w-full">{t('basePrice')}</span>
                            <span className="w-fit flex-none">{`${currencyFormat(totals.subtotal)}` || '-'}</span>
                        </div>
                        <div className="w-full flex items-center justify-center">
                        <span className="w-full">{t('selectedOptions')}</span>
                        <span className="w-fit flex-none">{`${currencyFormat(totals.options)}` || '-'}</span>
                        </div>
                        <div className="my-1 w-full h-px bg-[#f3f3f3]"></div>
                        <div className="text-[1.5rem] w-full flex items-center justify-center">
                            <span className="w-full">{t('totalPrice')}</span>
                            <span className="w-fit flex-none">{`${currencyFormat(totals.total)}` || '-'}</span>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:hidden">
                    <div className="my-1 w-full h-px bg-[#f3f3f3]"></div>
                    <div className="w-full list-none flex items-center justify-start flex-row flex-wrap gap-2">
                        <Link href={`/products/standard-features/${product?.id}`} onClick={() => onClickEvent('request')} className="flex-none uppercase cursor-pointer relative text-[#6c6c6c] border-none bg-transparent select-none motion-safe:transition-all motion-reduce:transition-none 
                            will-change-auto motion-safe:duration-[500ms]flex items-center gap-1 w-auto lg:hover:text-secondary-color">
                            <span className="material-icons notranslate ">format_list_bulleted</span>
                            {pT('standardFeatures')}
                        </Link>
                        <Link href="/warranty-docs" className="flex-none uppercase cursor-pointer relative text-[#6c6c6c] border-none bg-transparent select-none motion-safe:transition-all motion-reduce:transition-none 
                            will-change-auto motion-safe:duration-[500ms]flex items-center gap-1 w-auto lg:hover:text-secondary-color">
                            <span className="material-icons notranslate ">brightness_high</span>
                            {pT('warrantyDocs')}
                        </Link>
                    </div>
                </div>
                <div className="mtp-8 w-full">
                    <div className="my-1 w-full h-px bg-[#f3f3f3]"></div>

                    <div className={'category'} >
                        {
                            Object.keys(formatedProps).map((categorySection, categoryIndex) => (
                                <Fragment key={categorySection+categoryIndex}>
                                    <div key={'category'+'_'+categorySection} 
                                        className={`mx-2 flex ${typeof formatedProps[categorySection] === 'string' ? "flex-row" : "flex-col"}`}>
                                        {
                                            Array.isArray(formatedProps[categorySection]) ?
                                            <div className="w-[calc(100%)] py-4 bg-white">
                                                <span className="w-4/5 font-semibold uppercase flex items-start">{formatCamelCaseToNormalCase(categorySection)}</span>
                                                {
                                                    Object.keys(formatedProps[categorySection]).map((subitem) => (
                                                        <div key={'options_'+'category'+categorySection+subitem} 
                                                            className="py-2 pl-4 m-0 flex flex-col lg:flex-row gap-2 lg:hover:bg-[#eeeff0] ">
                                                            {
                                                                formatedProps[categorySection][subitem]['hex'] &&
                                                                <div style={{borderRadius:'5px', width:'4rem', height:'100%', backgroundColor:formatedProps[categorySection][subitem]['hex']}}>
                                                                    &nbsp;
                                                                </div>
                                                            }
                                                            {
                                                                formatedProps[categorySection][subitem]['code'] &&
                                                                <span key={'category'+categorySection+subitem+'objcode'} className="font-semibold text-[#4d4d4d] uppercase flex items-center justify-start shrink-0 ">
                                                                    {formatedProps[categorySection][subitem]['code']}
                                                                </span>
                                                            }
                                                            <span key={'category'+categorySection+subitem+'objname'} className="w-full font-medium uppercase flex items-center justify-start">
                                                                {formatedProps[categorySection][subitem]['name']}
                                                            </span>
                                                            <span key={'category'+categorySection+subitem+'objprice'} className="shrink-0 font-semibold uppercase flex items-center justify-end w-fit flex-none">
                                                                {
                                                                    formatedProps[categorySection][subitem]['price'] !== undefined
                                                                    ?
                                                                    (
                                                                        (
                                                                            formatedProps[categorySection][subitem]['price'] === -1 ?
                                                                            'N/A' 
                                                                            : 
                                                                            currencyFormat(formatedProps[categorySection][subitem]['price'])
                                                                        )
                                                                    )
                                                                    :
                                                                    ''
                                                                }
                                                                &nbsp;
                                                                {
                                                                    formatCamelCaseToNormalCase(formatedProps[categorySection][subitem]['priceAddon'])
                                                                }
                                                                &nbsp;
                                                                {
                                                                    ( formatedProps[categorySection][subitem]['value'] && 
                                                                    formatedProps[categorySection][subitem]['price'] ) && 
                                                                    `x ${formatedProps[categorySection][subitem]['value']} Units =
                                                                    ${formatedProps[categorySection][subitem]['value'] * formatedProps[categorySection][subitem]['price']}`
                                                                }
                                                            </span>
                                                        </div>
                                                    ))
                                                }
                                                {
                                                    Object.keys(formatedProps[categorySection]).length === 0 &&
                                                    <span className="w-full font-medium uppercase flex items-center justify-start">{t('nothingSelected')}</span>
                                                }
                                            </div>
                                            : 
                                            <div className="w-[calc(100%)] py-4 bg-white">
                                                <span className="w-4/5 font-semibold uppercase flex items-start">{formatCamelCaseToNormalCase(categorySection)}</span>
                                                {
                                                    Object.keys(formatedProps[categorySection]).length > 0 &&
                                                    <div className="w-[calc(100%)] py-4 bg-white">
                                                        {
                                                            Object.keys(formatedProps[categorySection]).map((subitem) => (
                                                                <Fragment key={'fragment'+categorySection+subitem}>
                                                                    <span className="w-4/5 font-semibold uppercase flex items-start">{formatCamelCaseToNormalCase(subitem)}</span>
                                                                    {
                                                                    Object.keys(formatedProps[categorySection][subitem]).map((index) => (
                                                                        <div key={'options_'+'category'+categorySection+subitem+index} 
                                                                        className="py-2 pl-4 m-0 flex flex-col lg:flex-row gap-2 lg:hover:bg-[#eeeff0] ">
                                                                    {
                                                                        formatedProps[categorySection][subitem][index]['hex'] &&
                                                                        <div style={{borderRadius:'5px', minWidth:'4rem', height:'100%', backgroundColor:formatedProps[categorySection][subitem]['hex']}}>
                                                                            &nbsp;
                                                                        </div>
                                                                    }
                                                                    {
                                                                        formatedProps[categorySection][subitem][index]['code'] &&
                                                                        <span key={'category'+categorySection+subitem+index+'objcode'} className="font-semibold text-[#4d4d4d] uppercase flex items-center justify-start
                                                                         shrink-0 ">
                                                                            {formatedProps[categorySection][subitem][index]['code']}
                                                                        </span>
                                                                    }
                                                                    <span key={'category'+categorySection+subitem+index+'objname'} className="w-full font-medium uppercase flex items-center justify-start">
                                                                        {formatedProps[categorySection][subitem][index]['name']}
                                                                    </span>
                                                                    <span key={'category'+categorySection+subitem+index+'objprice'} className="shrink-0 font-semibold uppercase flex items-center justify-end w-fit flex-none">
                                                                        {
                                                                            formatedProps[categorySection][subitem][index]['price'] !== undefined
                                                                            ?
                                                                            (
                                                                                (
                                                                                    formatedProps[categorySection][subitem][index]['price'] === -1 ?
                                                                                    'N/A' 
                                                                                    : 
                                                                                    currencyFormat(formatedProps[categorySection][subitem][index]['price'])
                                                                                )
                                                                            )
                                                                            :
                                                                            ''
                                                                        }
                                                                        &nbsp;
                                                                        {
                                                                            formatCamelCaseToNormalCase(formatedProps[categorySection][subitem][index]['priceAddon'])
                                                                        }
                                                                        </span>
                                                                    </div>
                                                                ))
                                                            }
                                                                </Fragment>
                                                            ))
                                                        }
                                                    </div>
                                                }
                                                {
                                                    Object.keys(formatedProps[categorySection]).length === 0 &&
                                                    <span className="w-full font-medium uppercase flex items-center justify-start">{t('nothingSelected')}</span>
                                                }
                                            </div>
                                        }
                                    </div>
                                    {
                                        categoryIndex+1 < Object.keys(formatedProps).length &&
                                        <div className="my-1 w-full h-px bg-[#f3f3f3]"></div> 
                                    }
                                </Fragment>
                            ))
                        }
                    </div>
                </div>
                <div className="my-1 w-full h-px bg-[#f3f3f3] hidden flex-col gap-2 lg:flex"></div>
                <span className="font-['lora'] text-[2.25rem] leading-loose flex items-center justify-center text-center lg:text-[3.8rem] lg:leading-12 uppercase">{t('notes.title')}</span>
                <div className="my-1 w-full h-px bg-[#f3f3f3] hidden flex-col gap-2 lg:flex"></div>
                <div className="my-2 flex flex-col" style={{width:'100%', paddingLeft:'1rem'}}>
                    <ol className="list-decimal list-inside">
                        {
                            t.rich('notes.description', {
                                li: (chunks) => <li>{chunks}</li>
                            })
                        }
                    </ol>
                </div>
            </div>
        </div>
    );
    //#endregion
}

export default ConfiguratorSummary