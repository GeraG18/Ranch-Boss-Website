import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link"
import { useTranslations } from "next-intl";

const MerchandiseFilter = ({availableFilters, onFilterChange = (value) => {}}) => {

    //#region code
    const fT = useTranslations('BasicForm')
      const t = useTranslations('PagesTitles')
    const [activeSections, setActiveSections] = useState([]);
    const [cleanAvailableFilters, setCleanAvailableFilters] = useState({});
    const [selectedFilters, setSelectedFilters] = useState({});

    const clearInputs = () => {
        let checkedInputs = document.querySelectorAll('input[type=checkbox]:checked');
        
        if(checkedInputs) {
          checkedInputs.forEach((element) => {
            element.checked = false;
          });
        }
        setSelectedFilters({});
        
    }

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

    const removeEmptyArrays = () => {
        let filteredObj = {};
        Object.keys(availableFilters).forEach((filterSection) => {
          if(availableFilters[filterSection].length > 0) {
            filteredObj[filterSection] ??= [...availableFilters[filterSection]]
          }
        });
        setCleanAvailableFilters(filteredObj)
    }

    const formatCamelCaseToNormalCase = (inputString) => {
        let finalString = '';
        for(let i=0; i<inputString.length; i++){
          finalString += inputString[i].match(/[A-Z]/) != null ? ' '+inputString[i].toLowerCase(): inputString[i];
        }
        return finalString;
    }

    const handleOnChange = (event, sectionName) => {
        let name = event.target.name;
        let section = selectedFilters[sectionName] ? selectedFilters[sectionName] : [];
        if(name) {
          if(section.includes(name)) {
            let newArr = section.filter((item) => item !== name)
            let newObj = {...selectedFilters,[sectionName]:newArr};
            setSelectedFilters(newObj)
          } else {
            let newArr = [...section,name];
            let newObj = {...selectedFilters,[sectionName]:newArr};
            setSelectedFilters(newObj)
          }
        }
      }

    useEffect(() => {
        removeEmptyArrays()
    }, [availableFilters]); 

    useEffect(() => {
        onFilterChange(selectedFilters);
    },[selectedFilters])

    //#region view
    return(
        <div className="w-full flex flex-col font-['lora']">
            <div className="hidden h-9 my-4 justify-center items-center lg:flex">
                <img src="/Images/filters.webp" alt="filters icon" className="p-1 left-[3.5%]" /> 
                <span className="font-['lora'] uppercase text-[1.75rem]">{t('filters')}</span>
            </div>
            <ul className="w-full flex flex-row justify-center flex-wrap gap-1 bg-transparent
            list-none relative py-[10px] m-0 select-none">
                {
                    Object.keys(cleanAvailableFilters).map((catName) => (
                        <li key={catName} className="p-0 border border-[#f3f3f3] w-full">
                            <div onClick={()=>showOrHideCheckBox(catName)} 
                            className="w-full py-3 px-4 cursor-pointer font-bold flex items-center justify-center bg-[#f3f3f3]">
                                <span className="w-full uppercase flex items-center">
                                    {formatCamelCaseToNormalCase(catName)}
                                </span>
                                <span className="text-[#babbbd] material-symbols-outlined notranslate ">
                                    {!activeSections.includes(catName) ? 'add' : 'remove'}
                                </span>
                            </div>
                            <div className={`flex flex-col gap-[0.2rem] 
                                ${ activeSections.includes(catName) ? "pt-[0.2rem] pb-[0.8rem] px-[0.4rem]" : "p-0"}`}>
                                <div className={`flex flex-row flex-wrap h-0 rounded-[1px] overflow-hidden ${catName}`}>
                                    <ul className="w-full grid grid-cols-2 justify-center flex-wrap gap-2 bg-transparent list-none
                                    relative py-[10px] m-0 select-none">
                                    {
                                        cleanAvailableFilters[catName].map((item, index) => (
                                            <Fragment key={item.name+String(index)}>
                                                {
                                                    (typeof item) === 'object' && Array.isArray(item) === false &&
                                                    <div className={`group/item hover:bg-[#f0efec] motion-safe:transition-all motion-reduce:transition-none 
                                                        p-1 will-change-auto motion-safe:duration-400 w-26 min-h-22 h-full flex flex-col items-center 
                                                        cursor-pointer relative self-center justify-self-center`}>
                                                        <input type="checkbox" name={item.name} className="m-0 absolute left-0 top-0 w-full h-full z-20 opacity-0 cursor-pointer"
                                                            onChange={(e) => handleOnChange(e,catName)} aria-label={item.name+" option"} role="form" />
                                                        <div className={`w-full h-10 flex-none bg-black 
                                                            ${(selectedFilters[catName] ? selectedFilters[catName] : []).includes(item.name) 
                                                            ? "border-primary-color border" : "border-[#babbbd] border"}
                                                            cRibbonCont flex flex-row overflow-hidden `}>
                                                            <div style={{backgroundColor:item.hex, height:'100%', width:item.extraHex ? '50%' : '100%'}}></div>
                                                            {
                                                                item.extraHex &&
                                                                <div style={{backgroundColor:item.extraHex, height:'100%', width:'50%'}}></div>
                                                            }

                                                        </div>
                                                        <p className={`motion-safe:transition-all 
                                                        motion-reduce:transition-none will-change-auto motion-safe:duration-400 w-full text-center
                                                        uppercase text-[0.8rem] font-semibold ${(selectedFilters[catName] ? selectedFilters[catName] : []).includes(item.name) 
                                                            ? "text-primary-color" : "text-black"} group-hover/item:text-secondary-color! `}>{item.name}</p>
                                                    </div>
                                                }
                                                {
                                                    ((typeof item) === 'string' || (typeof item) === 'number') &&
                                                    <div className={`m-[0.15rem] relative overflow-hidden flex
                                                        items-center justify-center uppercase motion-safe:transition-all group/item 
                                                        motion-reduce:transition-none will-change-auto motion-safe:duration-400
                                                        ${(selectedFilters[catName] ? selectedFilters[catName] : []).includes(item) 
                                                        ? "border-primary-color border" : "border-[#babbbd] border"}`} >
                                                        <input className="m-0 absolute left-0 top-0 w-full h-full z-20 opacity-0 cursor-pointer" 
                                                        name={item} aria-label={item+" option"} role="form"
                                                        type="checkbox" onChange={(e) => handleOnChange(e,catName)}/>
                                                        <span className={`${(selectedFilters[catName] ? selectedFilters[catName] : []).includes(item) 
                                                            ? "text-primary-color" : "text-black"} py-1 px-[0.4rem] text-[0.8rem]
                                                        uppercase motion-safe:transition-all motion-reduce:transition-none text-center
                                                        will-change-auto motion-safe:duration-400 group-hover/item:text-secondary-color!
                                                        font-semibold`}>{item}</span>
                                                    </div>
                                                }
                                            </Fragment>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </li>
                    ))
                }
                
            </ul>
            <div style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <button onClick={() => clearInputs()} 
                className="cursor-pointer uppercase relative text-white
                border-none mt-4 bg-primary-color text-[1rem] select-none
                motion-safe:transition-all motion-reduce:transition-none 
                will-change-auto motion-safe:duration-400 py-2 px-4
                lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium
                ">{fT('clearAll')}</button>
            </div>
        </div>
    )
}

export default MerchandiseFilter;