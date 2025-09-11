import React, {useEffect,useState, Fragment} from 'react';
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
      switchCollapses(newArr);
    } else {
      let newArr = [...activeCollapses, filterselected];
      switchCollapses(newArr);
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
    <div className={`p-0 w-full overflow-hidden font-['lora'] ${isShowing ? "lg:w-[20rem] py-2 px-4" : "w-0 p-0"}`}>
      <div className="flex flex-col justify-center items-center p-0 select-none">
        <div className="hidden h-9 my-4 justify-center items-center lg:flex gap-1 text-primary-color">
          {/* <img src="/Images/filters.webp" alt="filters icon" className="p-1 left-[3.5%]" />  */}
          <span className="material-symbols-outlined notranslate h-8 w-8 !text-[2rem] flex items-center justify-center" >
            page_info
          </span>
          <span className="font-['oswald'] uppercase text-[1rem] font-medium">{t('filters')}</span>
        </div>

        <ul className="w-full inline-flex gap-2 flex-col font-bold bg-white
        list-none relative select-none m-0 p-0 pb-4">
          {
            Object.keys(cleanAvailableFilters).map((filterSection)=> (
              <li className={`p-0 border border-l-2 border-gray-300 [&.open]:border-secondary-color-30 ${activeCollapses.includes(filterSection) ? 'open' : ''}`} 
                key={filterSection}>
                <div onClick={()=>showOrHideCheckBox(filterSection)} 
                className={`py-3 px-4 cursor-pointer font-['oswald'] flex gap-2 items-center justify-center lg:hover:bg-secondary-color-20
                [&.open]:text-tertiary-dark-color text-tertiary-color/70 lg:hover:text-tertiary-color/90 ${activeCollapses.includes(filterSection) ? 'open' : ''}`}>
                  <div className={`border border-gray-400 w-[0.625rem] h-[0.625rem] rotate-45 flex-none [&.open]:border-tertiary-dark-color 
                    [&.open]:bg-tertiary-dark-color ${activeCollapses.includes(filterSection) ? 'open' : ''}`}/>
                  <span className="w-full uppercase flex items-center">
                    {formatCamelCaseToNormalCase(kT(filterSection))}

                    {selectedFilters[filterSection]?.length > 0 && 
                      <div className="ml-1 rounded-full bg-secondary-color text-white w-auto h-4 flex
                      items-center px-[6px] justify-center text-[0.75rem] uppercase">
                        {selectedFilters[filterSection].length > 9 ? '+9' : selectedFilters[filterSection].length}
                      </div>
                    }
                  </span>
                  <span className="material-symbols-outlined notranslate text-gray-400">
                    {!activeCollapses.includes(filterSection) ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
                  </span>
                </div>
                <div className="flex flex-col gap-[0.75rem] pl-[0.325rem]">
                  {
                    cleanAvailableFilters[filterSection].map((item) => (
                      <Fragment key={item}>
                        <div className={`hidden rounded-[1px] h-fit ${filterSection}`}>
                          <div className={`font-semibold text-gray-500 flex gap-2 items-center text-sm pl-2 
                            justify-center h-6 w-full transition-opacity duration-200 ease-in-out 
                            opacity-100 pointer-events-auto relative`}>
                              <input className="flex-none accent-primary-color outline-hidden aspect-square absolute
                              top-0 left-0 w-full h-full opacity-0 cursor-pointer z-20" 
                              name={item} 
                              checked = {(selectedFilters[filterSection] || []).includes(item)}
                              onChange={(e) => {handleOnChange(e,filterSection)}} type="checkbox"/>
                              <div className={`w-4 h-4 rotate-45 aspect-square flex items-center 
                              justify-center border transition-all duration-300 z-10
                              ${( (selectedFilters[filterSection] || []).includes(item) ? "border-secondary-color bg-secondary-color" : 
                              "border-gray-400" )}`}> 
                                  <div className={`rounded-full w-2 aspect-square bg-white
                                  motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400 
                                  ${( (selectedFilters[filterSection] || []).includes(item) ? "opacity-100" : "opacity-0" )}`}>
                                  </div>
                              </div>
                              <span className='w-full'>{formatLengths(item)}</span>
                          </div>
                        </div>
                      </Fragment>
                    ))
                  }
                </div>
              </li>
            ))
          }
        </ul>
        <div className="w-full flex items-center justify-center mt-2">
          <button onClick={() => clearInputs()} 
            className="col-span-full self-center justify-self-center inline-block font-['oswald'] font-medium no-underline 
            text-white bg-secondary-color px-6 py-2 bg-[length:200%_100%] bg-gradient-to-r from-secondary-color from-50% 
            to-tertiary-color to-50% motion-safe:transition-all duration-500 motion-safe:ease-[cubic-bezier(0.19,1,0.22,1)] 
            delay-50 lg:hover:text-white lg:hover:bg-tertiary-color lg:hover:bg-[-100%_100%] cursor-pointer uppercase">
            {fT('clearAll')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelFilters;