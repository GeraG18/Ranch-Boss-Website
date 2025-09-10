'use client' // Renders on client side
import React, { useEffect, useState, useRef } from "react";
import { geocode, RequestType, setDefaults } from "react-geocode";
import dynamic from 'next/dynamic';
import LoadingLoop from "@/components/icons/loading_loop"
import { useTranslations } from "next-intl";
import { useDealersContext } from "@/context/dealers_map_context";
const Select = dynamic(() => import('react-select'), { ssr: false });

function Header() {

    //#region code
    const t = useTranslations('DealersScreen');
    const [focusedInput, setFocusedInput] = useState(false)
    const [search, setSearch] = useState("")
    const [suggestions, setSuggestions] = useState([]);
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_APIKEY;
    let inputRef = useRef();

    const {
        /* read-only variables */
        filters,
        /* switching area */
        switchFilters,
    } = useDealersContext();

    const normalizeCharacters = (str) => {
        return str.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
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

    useEffect(() => {
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
        const delayDebounceFn = setTimeout(() => {
            if(search.trim() !== "") {
                getCoordsFromZipCode(search).then((res) => {
                    switchFilters((prev) => ({...prev, search}))
                    let filtered = (res || []).filter((item) => normalizeCharacters(item.formatted_address).includes('canada') 
                    || normalizeCharacters(item.formatted_address+'').includes('ee. uu.') 
                    || normalizeCharacters(item.formatted_address+'').includes('mexico') 
                    || normalizeCharacters(item.formatted_address+'').includes('usa') )
                    setSuggestions(filtered)
                    
                    if(filtered.length === 0) {
                        switchFilters((prev) => ({...prev, location: {}}))
                        setSuggestions([])
                    }
                })
            }
        }, 600);

        if(search.trim() === "") {
            switchFilters({search:"", location: {}})
            setSuggestions([])
        }

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    useEffect(() => {
            setDefaults({
                key: apiKey,
                language:'en',
                // region:'us'
            });
    }, []);
    //#endregion

    //region view
    return (
        <div className="bg-[#f3f3f3] relative w-full py-8 font-['lora']">
            <div className="mx-4 max-w-screen-lg  h-fit z-100 xl:w-full xl:mx-auto flex flex-col items-center justify-center gap-2">
                <span className="font-['lora'] text-[2.25rem] leading-8 flex items-center justify-center
                text-center mb-4 lg:text-[4.8rem] lg:leading-16 uppercase">{t('mapHeaderTitle')}</span>

                <div ref={inputRef} className="w-full relative flex flex-col items-center lg:w-1/2">
                    <input 
                        className="border border-[#d5d5d5] bg-white w-full h-8 text-[1rem] outline-hidden p-0 pl-[0.2rem] z-10"
                        placeholder={t('mapHeaderPlaceholder')} 
                        aria-label={t('mapHeaderPlaceholder')} 
                        role="search"
                        type="text"
                        autoComplete="off" 
                        value={search} 
                        onFocus={() => setFocusedInput(true)}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className={`bg-white absolute w-[calc(100%-0.2rem)] min-h-8 top-[1.6rem] z-5 py-3 px-2 flex flex-col items-start
                    shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] max-h-[30vh] overflow-y-auto overflow-x-hidden font-['lora']
                    text-[1rem] font-normal ${(focusedInput && suggestions.length > 0) || filters.loading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                        {
                            filters.loading ? 
                            <LoadingLoop className="text-gray-700" style={{alignSelf:'center'}}/>
                            :
                            <>
                                {
                                    suggestions.map((address) => (
                                        <div 
                                            className="flex items-center h-8 cursor-pointer"
                                            key={address.place_id}
                                            onClick={() => {
                                                switchFilters((prev) => ({search:address.formatted_address, location: address.geometry.location })); 
                                                setSearch(address.formatted_address)
                                                setFocusedInput(false)
                                                }
                                            }
                                        >
                                            <span className="material-icons notranslate ">
                                                location_on
                                            </span>
                                            {address.formatted_address}
                                        </div>
                                    ))
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
    //#endregion
}

export default Header