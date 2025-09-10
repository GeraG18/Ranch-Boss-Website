'use client' // Renders on client side
import React, { useEffect, useRef, useState } from "react";
import { geocode, RequestType, setDefaults, OutputFormat } from "react-geocode";


import { DealersList } from "../../jsons/dealers-list/dealer-list";
import IconViewer from "../general/icon_viewer";
import { setLocalStorage } from "@/services/local_storage-service";
import Link from "next/link";
import { useTranslations } from "next-intl";

const ContactDealersGrid = () => {
    
    const [searchValue, setSearchValue] = useState("")
    const [focusedInput, setFocusedInput] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [suggestions, setSuggestions] = useState([]);
    // const [listOfMarkers, setListOfMarkers] = useState([])
    const [paginationView, setPaginationView] = useState([])
    const t = useTranslations('DealersScreen')
    const wT = useTranslations('WeReSorry')
    /* PAGINATION */
    const showingItems = 5;
    const [numOfPages, setNumOfPages] = useState (1);
    const [pagination, setPagination] = useState(1);

    let inputRef = useRef(null);

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_APIKEY;

    const normalizeCharacters = (str) => {
        return str.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    }

    const formatText = (textToFormat)=>{
        let formatedText = ""
        let arrayOfWords = textToFormat.trim().split(" ")
        if(arrayOfWords.length> 1)
            formatedText = arrayOfWords.map((word) => { 
                let text =""
                 if(word !== "" && word !==" ")
                   text = word[0] + word.substring(1); 
                return text
            }).join(" ");
        else
         formatedText = textToFormat.trim();
        return formatedText.toUpperCase()
    }

    const getCoordsFromZipCode = (zipCode = "")=>{
        return new Promise((resolve) => {
            geocode(RequestType.ADDRESS, normalizeCharacters(zipCode)).then((response)=>{
                // 
                if(response.status === 'OK'){
                    resolve(response.results)
                }
                
                resolve(false);
            }).catch((error) => {
                // 
                
                
                resolve(false)
            });
        });
    }

    const setDealerInLS = (id, name, email, latitude, longitud, numberPhone, website, currentLocation, address ) => {
       
        setLocalStorage("ht.dealer_contact_info", {
            id, 
            name, 
            email: email.split(",").map((item) => item.trim()),
            latitude, 
            longitud, 
            numberPhone, 
            website, 
            address,
        });
    }

    const applyFilters = () => {
        let auxArrayOfMarkers = [];
        if(searchValue.trim() !== "") {
            let inputValue = (formatText(searchValue))
            // 
            
            setPagination(1);
            
            auxArrayOfMarkers = DealersList.filter((marker)=>(
                marker.name.toUpperCase().includes(inputValue) ||
                marker.address.toUpperCase().includes(inputValue) ||
                marker.zip.toUpperCase().includes(inputValue) ||
                marker.city.toUpperCase().includes(inputValue) ||
                marker.state.toUpperCase().includes(inputValue) ||
                marker.country.toUpperCase().includes(inputValue)
            ));
        }else{
            auxArrayOfMarkers = DealersList;
        }
        // 
        
        setNumOfPages(Math.ceil(auxArrayOfMarkers.length/showingItems))
        // setFilteredMarkers(auxArrayOfMarkers);
        let arr = [...auxArrayOfMarkers.filter((item, index) => index >= (showingItems * (pagination - 1)) && index < (showingItems * pagination))];
        // 
        
        setPaginationView(arr);
    }

    const getLayout = (index) => {
        if(index === 0) {
            return "md:col-span-2 md:row-span-2"
        }
        if(index === 1) {
            return "md:col-span-1 md:row-span-1"
        }
        if(index === 2) {
            return "md:row-span-1 lg:row-span-2"
        } else {
            return "md:col-span-1 md:row-span-1 lg:row-span-2" 
        }
    }

    useEffect(() => {
        /*
         * Alert if clicked on outside of element
        */
        function handleClickOutside(event) {

            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setFocusedInput(false)
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [inputRef])

    useEffect(() => {
        if(searchValue.trim() !== "") {
            setLoading(true);
        }

        const delayDebounceFn = setTimeout(() => {
            applyFilters();
            setLoading(false)
        }, 600)

        // if(searchValue.trim() === "") {
        //     setFilters({searchValue:"", location: {}})
        //     setSuggestions([])
        // }
        
        // localStorage.setItem('ht.dealer_map_search', searchValue);
        return () => clearTimeout(delayDebounceFn)
    }, [searchValue]);

    useEffect(() => {
        setDefaults({
            key: apiKey,
            language:'en',
            outputFormat: OutputFormat.JSON,
            // region:'us'
        });
        applyFilters();
    }, []);

    return(
    <div className="py-8">
        <div className="flex flex-col font-['lora'] mx-4 max-w-screen-lg  xl:mx-auto relative">
            <div className="pb-8 flex flex-col">
                <h2 className="font-['lora'] font-bold text-[1.75rem] leading-10 flex items-center justify-start text-start w-full col-start-1 col-end-4 row-start-1 lg:text-[2rem] lg:leading-12 uppercase">{t('contactHorizonDTitle')}</h2>
                <h3 className="">
                {t('contactHorizonDSlogan')}
                </h3>
            </div>
        </div>
        <div className="flex flex-col items-center font-['lora'] mx-4 max-w-screen-lg  xl:mx-auto relative">
            <div ref={inputRef} className="w-full relative flex flex-col items-center max-w-(--breakpoint-lg) lg:px-2 mb-4">
                <input 
                    className="border border-[#d5d5d5] bg-white w-full h-8 text-[1rem] outline-hidden p-0 pl-[0.2rem] z-10"
                    placeholder={t('mapHeaderPlaceholder')}
                    aria-label={t('mapHeaderPlaceholder')}
                    role="search"
                    type="text"
                    autoComplete="off" 
                    value={searchValue} 
                    onFocus={() => setFocusedInput(true)}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>
        </div>
        <div className="flex flex-col font-['lora'] mx-4 max-w-screen-lg  xl:mx-auto relative">
            {
                !loading ?
                <>
                    {
                        paginationView.length === 0 ?
                        <div className="col-span-full mt-4 flex items-center justify-center gap-2 flex-col w-full h-fit">
                            <h1 className="font-['lora'] text-[2rem] m-0">{wT('title')}</h1>
                            <p className="m-0">{wT('description')}</p>
                        </div>
                        :
                        <div className="grid max-h-screen min-h-112 h-screen lg:h-auto md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 w-full max-w-(--breakpoint-lg) self-center">
                            {
                                paginationView.map((item, index) => (
                                    <Link href="/contact-to-dealer" onClick={() => setDealerInLS(
                                        item.id, item.name, item.email, item.latitude, item.longitud, item.numberPhone, item.website, item.address
                                    )} key={index}
                                    className={` group cursor-pointer relative flex items-center justify-center overflow-hidden motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-300 hover:scale-[1.02] ${getLayout(index)}`}
                                    >
                                        <div className="relative flex h-[calc(100%-1rem)] w-full md:w-[calc(100%-1rem)] flex-col justify-center p-4 my-2 md:mx-2 border border-[#d5d5d5] text-black group-hover:border-primary-color overflow-hidden">
                                            {/* text-white bg-linear-to-t from-black/70 to-transparent */}
                                            <div className="z-10 w-full h-full flex flex-col items-start justify-end">
                                                <h2 className="text-[1.25rem] uppercase font-semibold m-0 flex gap-1 justify-start items-center">{item.name}</h2>
                                                <p className="text-[1rem] max-w-full truncate">{item.address}</p>
                                            </div>
                                            <div className="z-0 absolute w-[140px] self-center justify-self-center grayscale group-hover:grayscale-0 opacity-50 bg-[#d4d4d4] p-2">
                                                <IconViewer src={item.logo} alt={`${item.name} dealer logo`}/>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    }
                </>
                :
                <div className="grid max-h-screen min-h-112 h-auto md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 w-full max-w-(--breakpoint-lg) self-center animate-pulse">
                    <div className="group relative flex items-center justify-center overflow-hidden motion-safe:transition-all motion-reduce:transition-none 
                        will-change-auto motion-safe:duration-300 md:col-span-2 md:row-span-2">
                        <div className="relative flex h-[calc(100%-1rem)] w-full flex-col justify-end p-4 m-2 text-white bg-[#d5d5d5] rounded-[10px]">
                        </div>
                    </div>
                    <div className="group relative flex items-center justify-center overflow-hidden motion-safe:transition-all motion-reduce:transition-none 
                        will-change-auto motion-safe:duration-300 md:col-span-1 md:row-span-1">
                        <div className="relative flex h-[calc(100%-1rem)] w-full flex-col justify-end p-4 m-2 text-white bg-[#d5d5d5] rounded-[10px]">
                        </div>
                    </div>
                    <div className="group relative flex items-center justify-center overflow-hidden motion-safe:transition-all motion-reduce:transition-none 
                        will-change-auto motion-safe:duration-300 md:col-span-1 md:row-span-1 lg:row-span-2">
                        <div className="relative flex h-[calc(100%-1rem)] w-full flex-col justify-end p-4 m-2 text-white bg-[#d5d5d5] rounded-[10px]">
                        </div>
                    </div>
                    <div className="group relative flex items-center justify-center overflow-hidden motion-safe:transition-all motion-reduce:transition-none 
                        will-change-auto motion-safe:duration-300 md:col-span-1 md:row-span-1 lg:row-span-2">
                        <div className="relative flex h-[calc(100%-1rem)] w-full flex-col justify-end p-4 m-2 text-white bg-[#d5d5d5] rounded-[10px]">
                        </div>
                    </div>
                    <div className="group relative flex items-center justify-center overflow-hidden motion-safe:transition-all motion-reduce:transition-none 
                        will-change-auto motion-safe:duration-300 md:col-span-1 md:row-span-1 lg:row-span-2">
                        <div className="relative flex h-[calc(100%-1rem)] w-full flex-col justify-end p-4 m-2 text-white bg-[#d5d5d5] rounded-[10px]">
                        </div>
                    </div>
                </div>
            }
        </div>
    </div>
    );
}

export default ContactDealersGrid;