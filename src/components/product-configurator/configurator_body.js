'use client' // Renders on client side
import React, { useEffect, useRef, useState, Fragment } from "react";
import Slider from "react-slick";
import { useConfiguratorContext } from "../../context/configurator_context/configurator_context";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageViewer from "../general/image_viewer";
import { useAlertsProvider } from "@/context/alert_context";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {cloneObject, formatCamelCaseToNormalCase, currencyFormat} from "@/services/utils-service"
import { useTranslations } from "next-intl";

const ConfiguratorBody = ({product}) => {
     //#region code
     const [activeSections, setActiveSections] = useState([]);
     const kT = useTranslations('ProductsJson')
     const {setProductInContext, initContext, formatedProps, configParams} = useConfiguratorContext();
     const { addAlert } = useAlertsProvider();
 
     const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    useEffect(() => {
        let route = `/products/configure/${product.id}?`
        let arr = Object.keys(configParams || {});

        arr.forEach((key, index) => {    
            route += `${key}=${configParams[key]}${index !== (arr.length - 1) ? '&' : ''}` 
        });
        window.history.replaceState(null, '', route);
    }, [configParams])
 
     let sliderRef = useRef(null);
     let {name, options, descriptions, standardFeatures} = product;
     
     const [optionsList, setOptionsList] = useState({});
     let colors = cloneObject(standardFeatures?.[kT('trailerSpecs')]?.[kT('finish')]?.[kT('colors')] || []).map((item) => ({...item, checked: false}));
     
     let quantityDict = {
         [kT("baseModel")]:1,
         [kT("colors")]: 1,
         [kT("color")]: 1,
         [kT("chassisColor")]: 1,
         [kT("dumpColor")]: 1,
         [kT("deckColor")]: 1,
         [kT("dump")]:1,
         [kT("liftSystem")]:1,
         [kT("runningGear")]: 1,
         [kT("electricalAndLighting")]: 999,
         [kT("finish")]: 999,
         [kT("tongue")]: 1,
         [kT("chassis")]: 1,
         [kT("deck")]: 1,
         [kT("dovetail")]: 1,
     }
     
     const settings = {
         dots: false,
         infinite: true,
         fade:true,
         speed: 400,
         arows:false,
         slidesToShow: 1,
         slidesToScroll: 1,
         autoplay: false,
         autoplaySpeed: 2000,
     };
 
     const getConfigFromQueryParams = () => {
         const params = [];
         for (const entry of searchParams.entries()) {
             params.push(entry)
         }
         return params;
     }
 
     const selectAllInOptionsList = (params) => {
         let objList = {...cloneObject(options), [kT('color')]: cloneObject(colors)};
         let categories = [];
         params.forEach(([key, value]) => {
            if(
                [
                    ...Object.keys(options), 
                    kT('color'), 
                    kT('deckColor'), 
                    kT('dumpColor'), 
                    kT('chassisColor')
                ].includes(key)
            ) {
                let codes = value.split("'").map((item) => ({code: item.split('|')[0], value: item.split('|')[1]}));
                
                if(!key.includes('>')) {
                    categories.push(key)
                    let quant = quantityDict[key];
                    //Array
                    if(key.toLowerCase().includes(kT('color'))) {
                        let copyOfColors = JSON.parse(JSON.stringify(colors))
                        objList[key] ??= copyOfColors;
                    }
                    
                    let newItems = (objList[key] || []).map((item) => ({
                        ...item, 
                        checked: ( (key.toLowerCase().includes(kT('color')) ? codes.map((it) =>(`#${it.code.toLowerCase()}`)).includes(item.hex) : codes.map((it) => (it.code)).includes(item.code ) )),
                        value: codes.find((it) => it.code === item.code)?.value 
                        })
                    );
                    
                    let counter = 0;
                    newItems.forEach((item) => {
                        if(item.checked) {
                            counter++;
                        }
                        if(counter > quant) {
                            item.checked = false;
                        }
                    });
                    if(key === kT("finish")) {
                        let find = newItems.find((item) => item.name.toLowerCase().includes(kT('twoToneColor')));
                        
                        if(find !== undefined && find.checked) {
                            let chColors = cloneObject(colors)
                            let duColors = cloneObject(colors)

                            objList[kT('dumpColor')] = duColors;
                            objList[kT('chassisColor')] = chColors;
                            delete objList[kT('color')]
                        } 
                        // else {
                        //     let colors = cloneObject(colors)
                        //     objList['colors'] = colors;
                        // }
                    }
                    objList[key] = newItems;
                } else {
                    //Object
                    let keys = key.split('>');
                    categories.push(keys[0])
                    let quant = quantityDict[ keys[0] ];
                    let objCat = cloneObject(objList[ keys[0] ]);
                    
                    let newItems = objCat[ keys[1] ].map((item) => ({
                        ...item, 
                        checked: codes.map((it) => (it.code)).includes(item.code ),
                        value: codes.find((it) => it.value ? it.value : undefined)?.value   
                    }));
                    
                    objCat[ keys[1] ] = newItems;
                    for (const id in objCat) {//?First fix
                        let counter = 0;
                        // 
                        
                        objCat[id].forEach((item) => {
                            if(item.checked) {
                                counter++;
                            }
                            if(counter > quant) {
                                item.checked = false;
                            }
                        });
                    }
                    objList[keys[0]] = objCat;
                }
            }
         });
         let finalObj = checkAndSelectDefaultValues(objList);
 
 
         setOptionsList(objList)
     }
 
     const checkAndSelectDefaultValues = (object) => {
         let returnObj = cloneObject(object)
         for (const key in object) {
             
             
         }
         return returnObj;
     }
 
     const showOrHideCheckBox = (filterselected) => {
         // 
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
 
     const checkDefaults = (list, checked) => {
 
         for (const key in list) {
             
             if(Array.isArray(list[key])) {
                 //array
 
                 if(checked) {
                     let selectedQuant = list[key].filter((item) => item.checked).length;
     
                     if(selectedQuant === 0) {
                         let index = list[key].findIndex((item) => item.code === "DEFAULT");
                         if(index !== -1) list[key][index]['checked'] = true;
                     }
                 } else {
                     let newOpts = list[key].map((item) => ({...item, checked: false}))
                     // 
                     list[key] = cloneObject(newOpts)
                 }
                 
             } else {
                 //object 
                 for (const subkey in list[key]) {
                     if(checked) {
                         let selectedQuant = list[key][subkey].filter((item) => item.checked).length;
     
                         if(selectedQuant === 0) {
                             let index = list[key][subkey].findIndex((item) => item.code === "DEFAULT");
                             if(index !== -1) list[key][subkey][index]['checked'] = true;
                         }
                     } else {
                         let newOpts = list[key][subkey].map((item) => ({...item, checked: false}))
                         list[key][subkey] = cloneObject(newOpts)
                     }
                 }
             }
 
         }
         if(!checked) {
             delete list[kT('dumpColor')];
             delete list[kT('chassisColor')];
             let cols = cloneObject(colors)
             list[kT('color')] = cols;
         }
         
     }
 
     const handleOnInputChange = (event, category, categorySection, subitem) => {
        let optList = {...optionsList};
        let htmlEl = event.target;
        let quant = quantityDict[category];
        
        if(htmlEl.type === "checkbox") {
             
            if(subitem !== undefined) {
                let selectedQuant = optList[category][categorySection].filter((item) => item.checked).length;
                
                if(quant < selectedQuant + 1) {
                    optList[category][categorySection].forEach((item) => {
                        item.checked = false;
                    });    
                }
                optList[category][categorySection][subitem]['checked'] = htmlEl.checked;

                if(category === kT("finish")) {
                    let name = optList[category][categorySection][subitem]['name'];
                    // // console.log('name>', name);
                    
                    if(name.toLowerCase().includes(kT('twoToneColor'))) {
                        if(htmlEl.checked) {
                            let chColors = cloneObject(colors)
                            let duColors = cloneObject(colors)
                            // copyOfColors[0]["checked"] = true;
                            optList[kT('dumpColor')] = duColors;
                            optList[kT('chassisColor')] = chColors;
                            delete optList[kT('color')];
                            // 
                            
                        } else {
                            delete optList[kT('dumpColor')];
                            delete optList[kT('chassisColor')];
                            let cols = cloneObject(colors)
                            optList['color'] = cols;
                            // 
                        }
                    }
                }
                // if(category === "colors" || category === "color") {
                //     setSelectedColor(htmlEl.checked ? {...optList[category][categorySection][subitem]} : {name:"", hex:""});
                // }
             } else {
                let selectedQuant = optList[category].filter((item) => item.checked).length;
                if(quant < selectedQuant + 1) {
                    optList[category].forEach((item) => {
                        item.checked = false;
                    });    
                } 
                optList[category][categorySection]['checked'] = htmlEl.checked;

                if(category === kT("baseModel")) {
                    checkDefaults(optList, htmlEl.checked);
                }

                if(category === kT("finish")) {
                    let name = optList[category][categorySection]['name'];
                    // // console.log('name>>', name);
                    if(name.toLowerCase().includes(kT('twoToneColor'))) {
                        if(htmlEl.checked) {
                            let chColors = cloneObject(colors)
                            let duColors = cloneObject(colors)
                            // copyOfColors[0]["checked"] = true;
                            optList[kT('dumpColor')] = duColors;
                            optList[kT('chassisColor')] = chColors;
                            delete optList[kT('color')];
                            // 
                            
                        } else {
                            delete optList[kT('dumpColor')];
                            delete optList[kT('chassisColor')];
                            let cols = cloneObject(colors)
                            optList[kT('color')] = cols;
                            // 
                        }
                    }
                }
                // if(category === "colors" || category === "color") {
                //     setSelectedColor(htmlEl.checked ? {...optList[category][categorySection]} : {name:"", hex:""});
                // }
            }
        }
         
        if(htmlEl.type === "number") {
            if(htmlEl.min <= +htmlEl.value && +htmlEl.value <= htmlEl.max) {
                if(subitem) {
                    optList[category][categorySection][subitem]['value'] = +htmlEl.value;
                } else {
                    optList[category][categorySection]['value'] = +htmlEl.value;
                }
            } else {
                addAlert("The quantity doesn't match with the minimim (1) and maximum (20)", 'warning')
            }
        }
        setOptionsList({...optList})
     }
 
     useEffect(() => {
         initContext(optionsList);
     }, [optionsList]);
 
     useEffect(() => {
         if(options !== undefined && JSON.stringify(options) !== "{}") {
             setProductInContext(product);
             let params = getConfigFromQueryParams();
             selectAllInOptionsList(params);
         }
     }, [product]);

    //#region view
    return(
        <>
            <div className="py-4 h-fit flex font-['lora'] flex-col items-start gap-4 relative lg:flex-row lg:grid lg:grid-cols-6 lg:grid-rows-[auto_auto]
            m-0 max-w-screen-lg  z-100 lg:mx-4 xl:mx-auto">
                <div className="w-full flex items-center justify-center rounded-b-[8px] lg:rounded-[8px] overflow-hidden sticky top-0 z-80 before:bg-[url(/Images/product-specs-bg.webp)] before:bg-center
                before:bg-no-repeat before:bg-cover before:w-full before:h-full before:absolute before:top-0 before:left-0 lg:before:rounded-[8px] lg:z-auto lg:col-span-4 before:z-0!
                lg:top-4 h-[30vh] md:h-[35vh] lg:h-[60vh]">
                    {
                        descriptions?.gallery?.length > 0 ?
                        <div className="w-full flex relative overflow-hidden items-center justify-start left-0 lg:rounded-[8px] z-50 h-full">
                            <div className="w-full h-fit absolute self-center justify-self-center ">
                                <Slider className="" ref={(slider) => {
                                    sliderRef = slider;
                                }} {...settings}>
                                    {
                                        descriptions?.gallery?.map((image, index) => (
                                            <div className="flex items-center justify-center relative motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                                                motion-safe:duration-300" key={'item'+index}>
                                                <ImageViewer src={image} alt={`${name}_image_${index + 1}`} />
                                                
                                            </div>
                                        ))
                                    }
                                </Slider>
                            </div>
                            <button onClick={() => sliderRef.slickPrev()}
                            className="cursor-pointer absolute z-200 w-8 h-14 backdrop-blur-sm backdrop-saturate-50 bg-white/20 font-bold text-[18px] 
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto left-4
                            motion-safe:duration-300 select-none border-none text-white py-[1.6rem]
                             px-4 flex items-center justify-center lg:hover:bg-primary-color" >
                            <span className="material-icons notranslate " >
                            chevron_left
                            </span>
                            </button>
                            <button onClick={() => sliderRef.slickNext()}
                                className="cursor-pointer absolute z-200 w-8 h-14 backdrop-blur-sm backdrop-saturate-50 bg-white/20 font-bold text-[18px] 
                                motion-safe:transition-all motion-reduce:transition-none will-change-auto right-4
                                motion-safe:duration-300 select-none border-none text-white py-[1.6rem]
                                 px-4 flex items-center justify-center lg:hover:bg-primary-color" >
                                <span className="material-icons notranslate " >
                                chevron_right
                                </span>
                            </button>
                        </div>
                        :
                        <div className="flex items-center justify-center relative motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                            motion-safe:duration-300 h-[25vh] md:h-[30vh] lg:h-[60vh]">
                            <ImageViewer shadowColor="rgba(0,0,0,0.45)" alt="trailer shadow-sm"/>
                        </div>
                    }
                </div>
                <div className="z-40 flex flex-col items-start justify-center px-4 pb-4 gap-4 lg:pl-0 lg:pb-0 lg:col-span-2">
                    <ul className="w-full inline-flex flex-col gap-4 bg-transparent list-none motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                            motion-safe:duration-400 pb-4 m-0 select-none"> 
                        {   
                            product && JSON.stringify(product) !== '{}' &&
                            <>
                            {    Object.keys(optionsList).map((category, index) => (
                                <Fragment key={category+index+'_'}>
                                        <li className="p-0 border border-[#f3f3f3]">
                                            <div onClick={()=>showOrHideCheckBox(category)} className="py-3 px-4 cursor-pointer font-bold flex items-center justify-center bg-[#f3f3f3]">
                                                <span className="w-full uppercase flex items-center">
                                                    {formatCamelCaseToNormalCase(category)}
                                                </span>
                                                <span className="text-[#babbbd] motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                                                motion-safe:duration-400 material-icons notranslate ">
                                                {!activeSections.includes(category) ? 'add' : 'remove'}
                                                </span>
                                            </div>
                                            <div className={`flex flex-col gap-1 motion-safe:transition-all motion-reduce:transition-none will-change-auto h-0 overflow-hidden
                                                motion-safe:duration-400 ${category}`} key={category}>
                                                <div className={`flex flex-row flex-wrap justify-center gap-2  motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                                                motion-safe:duration-400 overflow-hidden`} >
                                                    {
                                                        Object.keys(optionsList[category]).map((categorySection) => (
                                                            <div key={category+'_'+categorySection} className={`px-1 flex w-full
                                                                ${typeof optionsList[category][categorySection] === 'string' ? "flex-row" : "flex-col"}`}>
                                                                {
                                                                    Array.isArray(optionsList[category]) ?
                                                                    <label className={`px-1 flex flex-row gap-2 p-[0.5rem_1rem_0.5rem_1rem] m-0 cursor-pointer
                                                                    lg:hover:bg-[#dedede] lg:hover:rounded-[8px] group`}>
                                                                        {/* <span key={category+categorySection+'objcode'} className={css(styles.codeSection)}>
                                                                            {optionsList[category][categorySection]['code']}
                                                                        </span> */}
                                                                        {
                                                                            optionsList[category][categorySection]['image'] && 
                                                                            <img className="group-hover:opacity-100 opacity-0 absolute motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                                                                                motion-safe:duration-400 w-20 aspect-square translate-y-0 -translate-x-[130%] pointer-events-none 
                                                                                z-400 border-8 shadow-[0px_-4px_8px_0px_rgba(0,0,0,0.3),0px_12px_12px_0px_rgba(0,0,0,0.22)] imageTooltip" 
                                                                                style={{opacity:0}}
                                                                                src={optionsList[category][categorySection]['image']} 
                                                                                alt={optionsList[category][categorySection]['name']} />
                                                                        }
                                                                        <div className="w-full flex flex-col items-start gap-1 lg:flex-row lg:items-center">
                                                                            <input className="h-4 aspect-square flex-none accent-primary-color outline-hidden" type="checkbox"
                                                                            onChange={(e) => handleOnInputChange(e, category, categorySection)}
                                                                            checked={optionsList[category][categorySection]['checked'] || false}
                                                                            id={optionsList[category][categorySection]['code']}
                                                                            data-cat={category}
                                                                            />
                                                                            <span key={category+categorySection+'objname'} className="w-full font-medium uppercase flex items-center justify-start">
                                                                                {optionsList[category][categorySection]['name']}
                                                                            </span>
                                                                            <span key={category+categorySection+'objprice'} className="font-semibold shrink-0 uppercase flex flex-col items-center justify-end">
                                                                                {
                                                                                    optionsList[category][categorySection]['price'] !== undefined
                                                                                    ?
                                                                                    (
                                                                                        <>
                                                                                        {
                                                                                            
                                                                                            (
                                                                                                optionsList[category][categorySection]['price'] === -1 ?
                                                                                                'N/A' 
                                                                                                : 
                                                                                                currencyFormat(optionsList[category][categorySection]['price'])
                                                                                            )
                                                                                        }
                                                                                        &nbsp;
                                                                                        </>
                                                                                    )
                                                                                    :
                                                                                    ''
                                                                                }
                                                                                {
                                                                                    formatCamelCaseToNormalCase(optionsList[category][categorySection]['priceAddon'])
                                                                                }
                                                                                {
                                                                                    optionsList[category][categorySection]['priceAddon'] === "each" &&
                                                                                    <input className="z-20 border border-[#d5d5d5] text-[1rem] bg-transparent w-full h-8 text-center outline-hidden p-0 pl-1 " type="number" min="1" max="20" placeholder="Quantity" 
                                                                                    onClick={(e) => e.stopPropagation()}
                                                                                    value={optionsList[category][categorySection]['value'] || '1'} 
                                                                                    onChange={(e) => handleOnInputChange(e, category, categorySection)}/>
                                                                                }
                                                                            </span>
                                                                            {
                                                                                optionsList[category][categorySection]['hex'] &&
                                                                                <div style={{backgroundColor:optionsList[category][categorySection]['hex'] }}
                                                                                className="rounded-[6px] w-12 h-8 outline-hidden"></div>
                                                                                // <div className={css(styles.colorRibbon, optionsList[category][categorySection]['hex'] === hex && styles.colorSelected)} 
                                                                                // style={{backgroundColor:optionsList[category][categorySection]['hex'] }}></div>
                                                                            }
                                                                        </div>
                                                                    
                                                                    </label>
                                                                    : 
                                                                    <div className=" px-1 flex flex-col gap-2">
                                                                        <span className="uppercase font-semibold text-[#77787b]">{formatCamelCaseToNormalCase(categorySection)}</span>
                                                                        {
                                                                            Object.keys(optionsList[category][categorySection]).map((subitem) => (
                                                                                <label key={'options_'+category+categorySection+subitem} 
                                                                                    className={`px-1 flex flex-row gap-2 p-[0.5rem_1rem_0.5rem_1rem] m-0 cursor-pointer
                                                                                        lg:hover:bg-[#dedede] lg:hover:rounded-[8px] group`}>
                                                                                    {
                                                                                        optionsList[category][categorySection][subitem]['image'] && 
                                                                                        <img className="group-hover:opacity-100 opacity-0 absolute motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                                                                                        motion-safe:duration-400 w-20 aspect-square translate-y-0 -translate-x-[130%] pointer-events-none 
                                                                                        z-400 border-8 shadow-[0px_-4px_8px_0px_rgba(0,0,0,0.3),0px_12px_12px_0px_rgba(0,0,0,0.22)] imageTooltip"
                                                                                            style={{opacity:0}}
                                                                                            src={optionsList[category][categorySection][subitem]['image']} 
                                                                                            alt={optionsList[category][categorySection][subitem]['name']} />
                                                                                    }
                                                                                    <div className="w-full flex flex-col items-start gap-1 lg:flex-row lg:items-center">
                                                                                        <input className="h-4 aspect-square flex-none accent-primary-color outline-hidden" type="checkbox"
                                                                                             onChange={(e) => handleOnInputChange(e, category, categorySection, subitem)}
                                                                                            checked={optionsList[category][categorySection][subitem]['checked'] || false}
                                                                                            id={optionsList[category][categorySection][subitem]['code']}
                                                                                            data-cat={category}
                                                                                            data-subcat={categorySection}
                                                                                        />
                                                                                        <span key={category+categorySection+'objname'} className="w-full font-medium uppercase flex items-center justify-start">
                                                                                            {optionsList[category][categorySection][subitem]['name']}
                                                                                        </span>
                                                                                        <span key={category+categorySection+'objprice'} className="font-semibold shrink-0 uppercase flex flex-col items-center justify-end">
                                                                                            {
                                                                                                optionsList[category][categorySection][subitem]['price'] !== undefined
                                                                                                ?
                                                                                                (
                                                                                                   
                                                                                                    (
                                                                                                        optionsList[category][categorySection][subitem]['price'] === -1 ?
                                                                                                        'N/A'
                                                                                                        :
                                                                                                        currencyFormat(optionsList[category][categorySection][subitem]['price'])
                                                                                                    )
                                                                                                )
                                                                                                :
                                                                                                ''
                                                                                            }
                                                                                            &nbsp;
                                                                                            {
                                                                                                formatCamelCaseToNormalCase(optionsList[category][categorySection][subitem]['priceAddon'])
                                                                                            }
                                                                                            {
                                                                                                optionsList[category][categorySection][subitem]['priceAddon'] === "each" &&
                                                                                                <input className="z-20 border border-[#d5d5d5] text-[1rem] bg-transparent w-full h-8 text-center outline-hidden p-0 pl-1 " type="number" min="1" max="20"
                                                                                                onClick={(e) => e.stopPropagation()} placeholder="Quantity" 
                                                                                                value={optionsList[category][categorySection][subitem]['value']  || '1'} 
                                                                                                onChange={(e) => handleOnInputChange(e, category, categorySection, subitem)}/>
                                                                                            }
                                                                                        </span>
                                                                                    </div>
                                                                                </label>
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
                                ))}
                            </>
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ConfiguratorBody;