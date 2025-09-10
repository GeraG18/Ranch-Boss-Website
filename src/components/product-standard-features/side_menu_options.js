import { Fragment, useEffect, useState } from "react";
import {formatCamelCaseToNormalCase, currencyFormat, formatKebabCaseToCamelCase} from "@/services/utils-service"

const SideMenuOptions = ({options}) => {

    const [activeSections, setActiveSections] = useState([]);

    const showOrHideCheckBox = (filterselected) => {
        const checkBoxes = document.getElementsByClassName(filterselected)
        
        for( var index = 0; index < checkBoxes.length; index++){
            checkBoxes[index].style.cssText  = 
                checkBoxes[index].style.height === "fit-content" ? "height: 0px !important; padding: 0rem !important;": "height: fit-content !important; padding: 0.5rem !important;"  
        }
    
        if(activeSections.includes(filterselected)) {
          let newArr = activeSections.filter((item) => item !== filterselected);
          setActiveSections(newArr)
        } else {
          let newArr = [...activeSections, filterselected]
          setActiveSections(newArr)
        }
    }

    useEffect(() => {
        if(activeSections.length > 0) {
            setActiveSections([])
        }
    }, []);

    return ( 
        <ul className="w-full inline-flex flex-col font-bold bg-white list-none relative
        motion-safe:transition-all motion-reduce:transition-none will-change-auto 
        motion-safe:duration-400 py-2 m-0 gap-2 select-none pb-4">
            {
                Object.keys(options).map((category, index) => (
                    <Fragment key={category}>
                        <li className="p-0 border border-[#f3f3f3]">
                            <div onClick={()=>showOrHideCheckBox(category)} 
                            className="py-3 px-4 cursor-pointer font-bold flex
                            items-center justify-center bg-[#f3f3f3]  ">
                                <span className="w-full uppercase flex items-center">
                                    {formatCamelCaseToNormalCase(category)}
                                </span>
                                <span className="text-[#babbbd] material-symbols-outlined notranslate ">
                                    {!activeSections.includes(category) ? 'add' : 'remove'}
                                </span>
                            </div>
                            <div className="pl-[0.2rem] flex flex-col gap-[0.2rem]">
                                <div className={`flex flex-col h-0 font-bold rounded-[1px] overflow-hidden
                                motion-safe:transition-all motion-reduce:transition-none 
                                will-change-auto motion-safe:duration-400 ${category}`} >
                                    {
                                        Object.keys(options[category]).map((categorySection, categoryIndex) => (
                                            <Fragment key={categorySection+categoryIndex}>
                                                <div key={category+'_'+categorySection} 
                                                    className={`my-2 flex ${typeof options[category][categorySection] === 'string' ? "flex-row" : "flex-col"}`}>
                                                    {
                                                        Array.isArray(options[category]) ?
                                                        <div className="my-[2px] ml-4px-1 py-2 pr-4 flex flex-row gap-2 lg:hover:bg-[#eeeff0] lg:">
                                                            <span key={category+categorySection+'objcode'} className="w-fit lg:flex-none font-medium text-[#4d4d4d] uppercase flex items-center justify-start ">
                                                                {options[category][categorySection]['code']}
                                                            </span>
                                                            <span key={category+categorySection+'objname'} className="w-full font-medium uppercase flex items-center justify-start ">
                                                                {options[category][categorySection]['name']}
                                                            </span>
                                                            {
                                                                category !== "baseModel" &&
                                                                <span key={category+categorySection+'objprice'} className="w-52 font-semibold uppercase flex items-center justify-end text-end">
                                                                    {
                                                                        options[category][categorySection]['price'] !== undefined
                                                                        ?
                                                                        (
                                                                            (
                                                                                options[category][categorySection]['price'] === -1 ?
                                                                                'N/A' 
                                                                                : 
                                                                                currencyFormat(options[category][categorySection]['price'])
                                                                            )
                                                                        )
                                                                        :
                                                                        '-'
                                                                    }
                                                                    &nbsp;
                                                                    {
                                                                        formatCamelCaseToNormalCase(options[category][categorySection]['priceAddon'])
                                                                    }
                                                                </span>
                                                            }
                                                        
                                                        </div>
                                                        : 
                                                        <div className="my-[2px] ml-4 px-1 flex flex-col gap-2 hover?">
                                                            <span className="w-4/5 font-semibold uppercase flex items-start ">{formatCamelCaseToNormalCase(categorySection)}</span>
                                                            {
                                                                Object.keys(options[category][categorySection]).map((subitem) => (
                                                                    <div key={'options_'+category+categorySection+subitem} 
                                                                        className="my-[2px] ml-4px-1 py-2 pr-4 flex flex-row gap-2 lg:hover:bg-[#eeeff0] lg:">
                                                                        <span key={category+categorySection+subitem+'objcode'} className="w-fit lg:flex-none font-medium text-[#4d4d4d] uppercase flex items-center justify-start ">
                                                                            {options[category][categorySection][subitem]['code']}
                                                                        </span>
                                                                        <span key={category+categorySection+subitem+'objname'} className="w-full font-medium uppercase flex items-center justify-start ">
                                                                            {options[category][categorySection][subitem]['name']}
                                                                        </span>
                                                                        <span key={category+categorySection+subitem+'objprice'} className="w-52 font-semibold uppercase flex items-center justify-end text-end">
                                                                            {
                                                                                options[category][categorySection][subitem]['price'] !== undefined
                                                                                ?
                                                                                (
                                                                                    (
                                                                                        options[category][categorySection][subitem]['price'] === -1 ?
                                                                                        'N/A' 
                                                                                        : 
                                                                                        currencyFormat(options[category][categorySection][subitem]['price'])
                                                                                    )
                                                                                )
                                                                                :
                                                                                '-'
                                                                            }
                                                                            &nbsp;
                                                                            {
                                                                                formatCamelCaseToNormalCase(options[category][categorySection][subitem]['priceAddon'])
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                                {
                                                    categoryIndex+1 < Object.keys(options[category]).length &&
                                                    <div className="bg-[#bdc3c7] h-px w-full"></div> 
                                                }
                                            </Fragment>
                                        ))
                                    }
                                </div>
                            </div>
                        </li>
                    </Fragment>
                ))
            }
        </ul>
    );
}

export default SideMenuOptions;