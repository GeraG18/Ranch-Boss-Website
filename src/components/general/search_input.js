import React, { useEffect, useRef, useState } from "react";
import { useSearchProvider } from "../../context/search_context";
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl";

const SearchInput = ({id = "searchInput", onInputClick = () => {}}) => {

    const {searchDictionary, suggestedList} = useSearchProvider();
    const [focusedInput, setFocusedInput] = useState(false)
    const [inputValue, setInputValue] = useState("");
    const [filteredSearch, setFilteredSearch] = useState([]);
    const t = useTranslations('PagesTitles')
    const locale = useLocale()
    let inputRef = useRef(null)
    
    const searchEngine = () => {
        let arr = searchDictionary.filter((item) => item.label.toLowerCase().includes(inputValue.toLowerCase()))
        
        setFilteredSearch([{label:'Matches'}, ...arr])
    }

    useEffect(() => {
        document.body.style.overflowY = focusedInput ? 'hidden' : 'auto';
    }, [focusedInput])

    useEffect(() => {
        setFilteredSearch([])
        
        
        if(inputValue.trim().length > 0) {
            searchEngine();
        } else {
            setFilteredSearch(suggestedList)
        }
    }, [inputValue, suggestedList])

    useEffect(() => {
        /**
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
      }, [inputRef]);

    return(
        <div className="relative col-start-1 flex h-8 w-full font-['lora']" ref={inputRef} onClick={() => {onInputClick()}}>
            <input aria-label="search in page" id={id} autoComplete="off" 
                className="border-b-2 z-10 rounded-l-[10px] rounded-r-none bg-white w-full font-['lora'] text-[1rem] outline-hidden pl-[0.2rem] font-medium" 
                onFocus={() => setFocusedInput(true)}  
                type="search" placeholder={t('search')} 
                onChange={(e) => setInputValue(e.target.value)}/>
            <button className="material-symbols-outlined notranslate  z-10 rounded-r-[10px] flex items-center justify-center text-white 
                bg-primary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium w-10 border-none cursor-pointer" 
                onClick={() => document.getElementById(id).focus()}>
                search
            </button>
            <div style={{opacity: focusedInput ? 1 : 0, pointerEvents: focusedInput ? 'auto' : 'none'}}
                className="bg-white absolute w-full border min-h-8 top-[1.6rem] z-5 py-3 px-2 flex flex-col items-start rounded-b-[10px]
                shadow-[0px_4px_12px_0px_rgba(0,0,0,0.45)]! max-h-[30vh] overflow-y-auto overflow-x-hidden font-['lora'] text-[1rem] font-normal">
                {
                    filteredSearch.map(({label, url}, index) => (
                        <Link 
                            className={`h-8 flex-none w-full capitalize text-black flex items-center justify-start px-0.5 
                            lg:hover:bg-[#f0efec] motion-safe:transition-all motion-reduce:transition-none will-change-auto ${!url && "pointer-events-none font-['lora'] text-[0.875rem]! font-bold! uppercase!"}`} 
                            href={`${url}`} key={'suggestionItem'+index}>
                            {label}
                        </Link>
                    ))
                }
                {
                    filteredSearch.length === 1 &&
                    <span className="h-8 flex-none w-full text-[#77787b] font-medium flex items-center justify-center px-0.5">{t('noResults')}</span>
                }
            </div>  
        </div>
    );
}

export default SearchInput;