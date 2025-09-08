'use client' // Renders on client side
import { css, StyleSheet } from "aphrodite";
import React, { useEffect, useState } from "react";
import MerchandiseItem from "./merchandise_item";
import MerchandiseFilter from "./merchandise_filter";
import { useMerchandiseProdsContext } from "../../context/merchandise_products_context";
import { useTranslations } from "next-intl";

const MerchContainer = () => {

    //#region code
    const [availableFilters,setAvailableFilters] = useState({});
    const [filteredMerch, setFilteredMerch] = useState([]);
    const [filters, setFilters] = useState({});
    const { products, setProducts } = useMerchandiseProdsContext();
    const t = useTranslations('PagesTitles')
    const fT = useTranslations('BasicForm')
    ////
    const showingItems = 9;
    const [numOfPages, setNumOfPages] = useState ();
    const [pagination, setPagination] = useState(1);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [totalResults, setTotalResults] = useState(0);

    const more = (value) => {
        if ( value >= numOfPages ){
            return value
        } else {
            return value+1
        }  
    }

    const minus = (value) => {
        if ( value > 1 ) {
            return value-1
        } else {
            return value
        }
    }
    ////

    const handleModalFilterChange = (selectedFilters) => {
        setFilters(selectedFilters);
    };

    const convertToArray= (object, keyName = 'key') => (
        Object.entries(object).length > 0 ?
        Object.entries(object).map((arr) => ({...arr[1], [keyName]: arr[0]}))
        : []
    );

    const findCommonValuesInArray = (filterArr, itemArr) => {
        let itArr = itemArr ? itemArr : [];
        let filteredArr = [];
        filterArr.forEach((fItem) => {
            filteredArr.push(...(Array.isArray(itArr) ? itArr : convertToArray(itArr)).filter((item) => JSON.stringify(item).includes(fItem)));
        });
        return filteredArr.length > 0
    }

    const applyFilters = () => {
        const {
            gender, size, impression,
            printingArea, color, composition, 
            logo
        } = filters;

        const filteredArr = [];

        (products || []).forEach((merch) => {
            if(
                (!gender || gender.length === 0 || findCommonValuesInArray(gender, merch.props.gender)) &&
                (!size || size.length === 0 || findCommonValuesInArray(size, merch.props.size)) &&
                (!impression || impression.length === 0 || findCommonValuesInArray(impression, merch.props.impression)) &&
                (!printingArea || printingArea.length === 0 || findCommonValuesInArray(printingArea, merch.props.printingArea)) &&
                (!color || color.length === 0 || findCommonValuesInArray(color, merch.props.color)) &&
                (!composition || composition.length === 0 || findCommonValuesInArray(composition, merch.props.composition)) &&
                (!logo || logo.length === 0 || findCommonValuesInArray(logo, merch.props.logo))
            ) {
                filteredArr.push(merch);
            }
        });

        setNumOfPages(Math.ceil(filteredArr.length/showingItems))
        setTotalResults(filteredArr.length)
        setFilteredMerch([...filteredArr.filter((item, index) => index >= (showingItems * (pagination - 1)) && index < (showingItems * pagination))]);
    };

    const getAvailableFilters = () => {

        let filtersList = {};
        let categoriesList = new Set();

        //logic to send all available filters from json to ModelFilter component
        products?.forEach(merch => {
            Object.keys(merch['props']).forEach((propName) => {
                let propertiesSet = filtersList[propName] ? filtersList[propName] : [];

                //object
                if(typeof merch['props'][propName] === 'object' && Array.isArray(merch['props'][propName]) === false) {
                    Object.keys(merch['props'][propName]).forEach((subPropName) => {
                        merch['props'][propName][subPropName].forEach((subItem) => {
                            if(propertiesSet.filter((item) => item.name === subItem.name).length === 0) {
                                propertiesSet.push(subItem)
                            }
                        });
                    });
                }
                
                //array
                if(typeof merch['props'][propName] === 'object' && Array.isArray(merch['props'][propName]) === true) {
                    merch['props'][propName].forEach((item) => {
                        if(typeof item === 'string' || typeof item === 'number'){
                            propertiesSet.push(String(item))
                        } else {
                            let find = false;
                            propertiesSet.forEach((element) => {
                                if (element.name === item.name) {
                                    find = element;
                                    return;
                                }    
                            });
                            
                            if(!find) 
                                propertiesSet.push(item)
                        }
                    })
                }
                filtersList[propName] ??= [];
                filtersList[propName] = [...new Set(propertiesSet)];//Set is like a array but removing repeated items
            });
        });
        setAvailableFilters(filtersList);
    };

    useEffect(() => {
        applyFilters()
    }, [filters, pagination])

    useEffect(()=>{
        getAvailableFilters()     
        applyFilters()   
    },[products])

    //#region view
    return(
        <>
            <div className="font-['Montserrat'] flex flex-col max-w-(--breakpoint-xl) p-4 mx-2
            lg:flex-row xl:mx-auto">
                <div className="justify-end hidden flex-none items-start px-4 w-[20rem] z-100
                relative lg:flex">
                    {/* <h2>Filters</h2> */}
                    <MerchandiseFilter availableFilters={availableFilters} onFilterChange={handleModalFilterChange}/>
                </div>
                <div className="w-full h-full flex flex-col select-none">
                    <div className="w-full flex flex-row flex-wrap justify-center items-center
                    my-4 gap-2 lg:flex-nowrap lg:h-9">
                        <div className="w-[calc(50%-0.5rem)] h-9 flex-none border border-[#caced1]
                        flex items-center justify-center rounded-[10px] text-black font-medium uppercase
                        lg:hidden" 
                            onClick={() => setShowMobileFilters(true)}>
                            <span className="material-symbols-outlined notranslate " >
                                tune
                            </span>
                            {t('filters')}
                        </div>
                        <span className="w-[calc(50%-0.5rem)] flex-none text-[1rem] font-semibold
                        text-end lg:w-48 lg:text-start">
                            {t('pageResults',{
                                page:((pagination - 1) * showingItems) + 1,
                                results:((pagination - 1) * showingItems) + (filteredMerch.length),
                                total:totalResults
                            })}
                            {/* {((pagination - 1) * showingItems) + 1} - {pagination * filteredMerch.length} of {totalResults} results */}
                        </span>
                        <div className="hidden items-center justify-center w-full max-w-full overflow-x-auto overflow-y-hidden
                        gap-4 pb-1 lg:flex lg:justify-center lg:pb-0">
                            
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            filteredMerch.map(({key, name, description, price, imageGallery}, index) => (
                                <MerchandiseItem key={index} keyName={key} name={name} description={description} price={price} image={imageGallery[0]}/>
                            ))
                        }
                    </div>
                    <div className="w-full select-none flex flex-row justify-end items-start my-8 gap-2 lg:gap-4 lg:w-auto">
                        {
                            pagination !== 1 &&
                            <button className="flex flex-row h-8 w-18 justify-center items-center text-[1rem] 
                                rounded-[10px] border border-[#d5d5d5] text-[#4d4d4d] bg-transparent cursor-pointer
                                lg:hover:border-secondary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:text-white
                                motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                                motion-safe:duration-400" 
                                onClick={()=>setPagination(value=> minus(value))}><span className="material-symbols-outlined notranslate ">chevron_left</span> {fT('prev')}</button>
                        }
                        <div className="min-h-8 flex flex-row justify-center items-center gap-2 lg:gap-4">
                        {
                            pagination > 2 &&
                            <>
                                <div className="flex flex-row h-8 w-8 justify-center items-center text-[1rem]
                                    rounded-[10px] border border-[#d5d5d5] text-[#4d4d4d] bg-transparent
                                    cursor-pointer lg:hover:border-secondary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:text-white
                                    motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                                    motion-safe:duration-400" 
                                    onClick={()=>setPagination(value => minus(1))}>{1}</div>
                                <span>...</span>
                            </>
                        }
                        </div>
                        <div className="flex flex-row justify-center items-center gap-2 lg:gap-4">
                            {
                                (pagination - 1 !== 0) &&
                                <div className="flex flex-row h-8 w-8 justify-center items-center text-[1rem]
                                rounded-[10px] border border-[#d5d5d5] text-[#4d4d4d] bg-transparent
                                cursor-pointer lg:hover:border-secondary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:text-white
                                motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                                motion-safe:duration-400" 
                                onClick={()=>setPagination(value=> minus(value))}>{pagination-1}</div>
                            }
                            <div className="flex flex-row h-8 w-8 justify-center items-center text-[1rem]
                            rounded-[10px] border border-primary-color bg-primary-color
                            cursor-default text-white">{pagination}</div>
                            {
                            pagination  !== numOfPages &&
                            <div className="flex flex-row h-8 w-8 justify-center items-center text-[1rem]
                            rounded-[10px] border border-[#d5d5d5] text-[#4d4d4d] bg-transparent
                            cursor-pointer lg:hover:border-secondary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:text-white
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                            motion-safe:duration-400" 
                            onClick={()=>setPagination(value => more(value))} >{pagination+1}</div>
                            }
                        </div>
                        <div className="min-h-8 flex flex-row justify-center items-center gap-2 lg:gap-4">
                        {
                            pagination < numOfPages - 1 &&
                            <>
                                <span>...</span>
                                <div className="flex flex-row h-8 w-8 justify-center items-center text-[1rem]
                                    rounded-[10px] border border-[#d5d5d5] text-[#4d4d4d] bg-transparent
                                    cursor-pointer lg:hover:border-secondary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:text-white
                                    motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                                    motion-safe:duration-400" 
                                    onClick={()=>setPagination(value => more(numOfPages))} >{numOfPages}</div>
                            </>
                        }
                        </div>
                        {
                            pagination !== numOfPages &&
                            <button className="flex flex-row h-8 w-18 justify-center items-center text-[1rem] 
                            rounded-[10px] border border-[#d5d5d5] text-[#4d4d4d] bg-transparent cursor-pointer
                            lg:hover:border-secondary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:text-white
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                            motion-safe:duration-400" 
                            onClick={()=>setPagination(value => more(value))}>{fT('next')} <span className="material-symbols-outlined notranslate ">chevron_right</span></button>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default MerchContainer;