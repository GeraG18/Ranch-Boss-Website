import { Fragment, useEffect, useState } from "react";
import {formatCamelCaseToNormalCase, currencyFormat, formatKebabCaseToCamelCase} from "@/services/utils-service"

const SideMenuFeatures = ({standardFeatures}) => {
    console.log('standardFeatures', standardFeatures)
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
                Object.keys(standardFeatures).map((category, index) => (
                    <Fragment key={category}>
                        <li className="p-0 border border-[#f3f3f3]">
                            <div onClick={()=>showOrHideCheckBox(category)} className="py-3 px-4 cursor-pointer font-bold flex
                            items-center justify-center bg-[#f3f3f3] ">
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
                                        Object.keys(standardFeatures[category]).map((categorySection) => (
                                            <div key={category+'_'+categorySection} 
                                            className={`my-2 flex ${typeof standardFeatures[category][categorySection] === 'string' ? "flex-row" : "flex-col"}`}>
                                                <span className="w-4/5 font-medium uppercase flex items-start ">{formatCamelCaseToNormalCase(categorySection)}</span>
                                                {
                                                    typeof standardFeatures[category][categorySection] === 'string' ?
                                                    <span className="text-black w-full font-semibold uppercase flex items-start justify-end text-end ">{standardFeatures[category][categorySection]}</span>
                                                    :
                                                    <div className="my-[2px] ml-4 px-1 flex flex-col gap-2 hover?">
                                                        {
                                                            Object.keys(standardFeatures[category][categorySection]).map((subProperty, subPropIndex) => (
                                                                <Fragment key={subProperty+subPropIndex}>
                                                                    <div key={category+'_'+categorySection+'_'+subProperty} 
                                                                        className={`my-2 flex ${typeof standardFeatures[category][categorySection][subProperty] === 'string' ? "flex-row" : "flex-col"}`}>
                                                                        <span className="w-4/5 font-medium uppercase flex items-start ">{formatCamelCaseToNormalCase(subProperty)}</span>
                                                                        {
                                                                            typeof standardFeatures[category][categorySection][subProperty] === 'string' ?
                                                                            <span className="text-black w-full font-semibold uppercase flex items-start justify-end text-end ">{standardFeatures[category][categorySection][subProperty]}</span>
                                                                            :
                                                                            <>
                                                                                {
                                                                                    Array.isArray(standardFeatures[category][categorySection][subProperty]) ?
                                                                                    <div className="" style={{padding:'0px', display:'flex',flexDirection:'column', gap:'0.5rem'}}>
                                                                                        {
                                                                                            standardFeatures[category][categorySection][subProperty].map((color, index) => (
                                                                                                <div key={color.name+index} style={{width:'100%', height:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'end', gap:'0.25rem',
                                                                                                    textTransform:"uppercase"
                                                                                                }}>
                                                                                                    <span>
                                                                                                        {color.name}
                                                                                                    </span>
                                                                                                    <div style={{width:'4rem', height:'1.5rem', backgroundColor:color.hex, borderRadius:'5px'}}></div>
                                                                                                </div>
                                                                                            ))
                                                                                        }
                                                                                    </div>
                                                                                    :
                                                                                    <div style={{margin:'2px 16px', padding:'0px 4px', display:'flex',flexDirection:'column', gap:'0.5rem'}}>
                                                                                        {
                                                                                            Object.keys(standardFeatures[category][categorySection][subProperty]).map((subItem) => (
                                                                                                <div key={category+'_'+categorySection+'_'+subProperty+"_"+subItem}>
                                                                                                    <span className="w-4/5 font-medium uppercase flex items-start ">{formatCamelCaseToNormalCase(subItem)}</span>
                                                                                                    <span className="text-black w-full font-semibold uppercase flex items-start justify-end text-end ">
                                                                                                        {standardFeatures[category][categorySection][subProperty][subItem]}
                                                                                                    </span>
                                                                                                </div>
                                                                                            ))
                                                                                        }
                                                                                    </div>

                                                                                }
                                                                            </>
                                                                        }
                                                                    </div>
                                                                    {
                                                                        subPropIndex+1 < Object.keys(standardFeatures[category][categorySection]).length &&
                                                                        <div className="bg-[#bdc3c7] h-px w-full"></div> 
                                                                    }
                                                                </Fragment>
                                                            ))
                                                        }
                                                    </div>
                                                }
                                            </div>
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

export default SideMenuFeatures;
