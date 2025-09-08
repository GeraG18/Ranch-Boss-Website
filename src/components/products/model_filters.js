import React, {useEffect,useState} from 'react';
import '@djthoms/pretty-checkbox';
import { useTranslations } from 'next-intl';
import { useProductsContext } from '@/context/products_context';

function ModelFilters({isShowing}){
  //#region code
  const [fT, t, kT] = [useTranslations('BasicForm'), useTranslations('PagesTitles'), useTranslations('ProductsJson')]

  const { availableFilters, switchFilters, filters, activeCollapses, switchCollapses } = useProductsContext()

  const [cleanAvailableFilters, setCleanAvailableFilters] = useState({});
  const [selectedFilters, setSelectedFilters] = useState(filters || {});

  const showOrHideCheckBox = (filterselected) => {
    const checkBoxes = document.getElementsByClassName(filterselected)
    for( var index = 0; index < checkBoxes.length; index++){
      checkBoxes[index].style.cssText = 
        checkBoxes[index].style.display === "block" ? "display: none !important; padding: 0rem !important;": "display: block !important; padding: 0.5rem !important;"  
    }
    if(activeCollapses.includes(filterselected)) {
      let newArr = activeCollapses.filter((item) => item !== filterselected);
      // setActiveSections(newArr)
      switchCollapses(newArr)
    } else {
      let newArr = [...activeCollapses, filterselected]
      // setActiveSections(newArr)
      switchCollapses(newArr)
    }
  }
  
  const handleOnChange = (event, sectionName) => {
    let name = event.target.name;
    
    selectedFilters[sectionName] ??= []
    if(name) {
      if(selectedFilters[sectionName].includes(name)) {
        let newArr = selectedFilters[sectionName].filter((item) => item !== name)
        let newObj = {...selectedFilters,[sectionName]:newArr};
        setSelectedFilters(newObj)
      }else {
        let newArr = [...selectedFilters[sectionName],name];
        let newObj = {...selectedFilters,[sectionName]:newArr};
        setSelectedFilters(newObj)
      }
    }
  }

  const formatCamelCaseToNormalCase = (inputString) => {
    let finalString = '';
    for(let i=0; i<inputString.length; i++){
      finalString += inputString[i].match(/[A-Z]/) != null ? ' '+inputString[i].toLowerCase(): inputString[i];
    }
    return finalString;
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

  const formatLengths = (value)=>{
    let original = value+'';
    let string = ""
    if (original.charAt(0).includes("f")){
        string = original.replace("f", "")
        string += "'"  
    } else if (original.charAt(0).includes("i")){
        string = original.replace("i", '')
        string += '"'
    } else {
      string = original;
    }
    return string;
  }

  const clearInputs = () => {
    setSelectedFilters({});
    let checkedInputs = document.querySelectorAll('input[type=checkbox]:checked');
    if(checkedInputs) {
      checkedInputs.forEach((element) => {
        element.checked = false;
      });
    }
  }

  useEffect(() => {
    if(JSON.stringify(selectedFilters) !== JSON.stringify(filters)) {
      setSelectedFilters(filters)
    }
  }, [filters])
  
  useEffect(() => {
    switchFilters(selectedFilters)
  },[selectedFilters])
  
  useEffect(() => {
    removeEmptyArrays()
  }, [availableFilters]);
  
  useEffect(() => {
    if(isShowing === false) {
      Object.keys(cleanAvailableFilters).forEach((filter) => {
        const checkBoxes = document.getElementsByClassName(filter)
        for( var index = 0; index < checkBoxes.length; index++){
          checkBoxes[index].style.cssText = "display: none !important; padding: 0rem !important;"  
        }
      });
    }
  },[isShowing])
  //#endregion

  //#region view
  return (
    <div className={`p-0 w-full overflow-hidden font-['Montserrat'] ${isShowing ? "lg:w-[20rem] py-2 px-4" : "w-0 p-0"}`}>
      <div className="flex flex-col justify-center items-center p-0 select-none">
        <div className="hidden h-9 my-4 justify-center items-center lg:flex">
          <img src="/Images/filters.webp" alt="filters icon" className="p-1 left-[3.5%]" /> 
          <span className="font-['Michroma'] uppercase text-[1rem] font-bold">{t('filters')}</span>
        </div>

        <ul className="w-full inline-flex gap-2 flex-col font-bold bg-white
        list-none relative select-none m-0 p-0 pb-4">
          {
            Object.keys(cleanAvailableFilters).map((filterSection)=> (
              <li className="p-0 rounded-[10px] border border-[#f3f3f3]" key={filterSection}>
                <div onClick={()=>showOrHideCheckBox(filterSection)} 
                className="py-3 px-4 cursor-pointer font-bold flex rounded-[10px] items-center justify-center bg-[#f3f3f3]">
                  <span className="w-full uppercase flex items-center">
                    {formatCamelCaseToNormalCase(kT(filterSection))}

                    {selectedFilters[filterSection]?.length > 0 && 
                      <div className="ml-1 rounded-full bg-primary-color text-white w-auto h-4 flex
                      items-center px-[6px] justify-center text-[0.75rem] uppercase">
                        {selectedFilters[filterSection].length > 9 ? '+9' : selectedFilters[filterSection].length}
                      </div>
                    }
                  </span>
                  <span className="material-symbols-outlined notranslate ">
                    {!activeCollapses.includes(filterSection) ? 'add' : 'remove'}
                  </span>
                </div>
                <div className="flex flex-col gap-[0.2rem]">
                  {
                    cleanAvailableFilters[filterSection].map((item) => (
                      <div className={`hidden rounded-[1px] h-8 ${filterSection}`} 
                        key={item}>
                        <label className="uppercase h-full w-full flex gap-2 items-center justify-start cursor-pointer
                        font-medium">
                          <input className="flex-none accent-primary-color outline-hidden cursor-pointer h-4 aspect-square" 
                          name={item} 
                          checked = {(selectedFilters[filterSection] || []).includes(item)}
                          onChange={(e) => {handleOnChange(e,filterSection)}} type="checkbox"/>
                          {formatLengths(item)}
                        </label>
                      </div>
                    ))
                  }
                </div>
              </li>
            ))
          }
        </ul>
        <div className="w-full flex items-center justify-center">
          <button onClick={() => clearInputs()} 
            className="cursor-pointer uppercase relative text-white border-none bg-primary-color
            text-[1rem] select-none py-2 px-4 rounded-[10px] lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium
            motion-safe:transition-all motion-reduce:transition-none will-change-auto
            motion-safe:duration-400 ">
            {fT('clearAll')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelFilters;