import React, { useEffect, useState } from "react";
import ImageViewer from "../general/image_viewer";
import { useTranslations } from "next-intl";

const ModelSelectorModal = ({ category, showModal, selectedList, modelsList, closeModal = (opened,selectedList) => {} }) => {

    //#region code
    const t = useTranslations('CompareModal')
    const [viewList, setViewList] = useState([]);
    const [selectedModels, setSelectedModels] = useState([]);
    const [isDesktop, setIsDesktop] = useState(false)
    // 
    
    const createViewObject = () => {
        let arr = modelsList.map((item) => (
            {
                id:item.id,
                name: item.name,
                image: item.image,
                selected: selectedModels.includes(item.id)
            }
        )).filter((item) => !item.status);

        setViewList(arr);
    }
    
    const manageSelection = (name) => {
        
        
        if(!selectedModels.includes(name)) {
            if(selectedModels.length < (isDesktop ? 3 : 2)) {
                let arr = [...selectedModels, name];
                setSelectedModels(arr)
            }
        } else {
            let arr = selectedModels.filter((item) => item !== name)
            // 
            setSelectedModels(arr)
        }
    }

    useEffect(() => {
        document.body.style.overflowY = showModal ? 'hidden' : 'auto';
    }, [showModal])

    useEffect(() => {
        createViewObject();
    }, [selectedModels])
    
    useEffect(() => {
        setSelectedModels(selectedList)
    }, [modelsList, selectedList])

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 1024px)");
        setIsDesktop(mediaQuery.matches)

        const onMediaChange = (event) => {
            if (event.matches) {
                // The viewport is 600 pixels wide or less
                
                
            } else {
                // The viewport is more than 600 pixels wide
                
            }
            setIsDesktop(event.matches)
        }

        mediaQuery.addEventListener("change", onMediaChange);

        return () => {
            // componentwillunmount
            mediaQuery.removeEventListener("change",onMediaChange)
        }
    }, [])
    //#endregion

    //#region view
    return (
        <div className={`w-full h-full fixed left-0 top-0 bg-black/50 backdrop-saturate-50 backdrop-blur-md
            z-900 flex items-center justify-center motion-safe:transition-all motion-reduce:transition-none 
            will-change-auto motion-safe:duration-400 font-['Montserrat'] select-none ${showModal ? "opacity-100 pointer-events-auto" 
                : "opacity-0 pointer-events-none"}`} 
            onClick={() => {setSelectedModels(selectedList); closeModal(false, undefined)}}>
            <div className={`z-100 overflow-hidden motion-safe:transition-all motion-reduce:transition-none 
            will-change-auto motion-safe:duration-500 relative w-[90%] h-[65vh] grid grid-rows-[auto_1fr_auto]
            bg-white text-black rounded-[10px] p-0 md:w-[40vw] ${showModal ? "translate-y-0" 
            : "translate-y-[10%]"}`} 
            onClick={(event) => event.stopPropagation()}>
                <span className="text-[1.4rem] flex flex-col items-start px-4 py-2 
                justify-center shadow-[0_10px_25px_-12px_rgba(0,0,0,0.15)] z-5 uppercase">
                    {t('title')}
                    <span className="text-[1rem] text-[#77787b] m-0 p-0 w-[90%] normal-case">
                        {/* You can only select {(isDesktop ? 3 : 2)} models to compare */}
                        {t('description', {total: (isDesktop ? 3 : 2)})}
                    </span>
                    <span className="absolute right-6 z-15 cursor-pointer motion-safe:transition-all 
                    motion-reduce:transition-none will-change-auto motion-safe:duration-400  
                    lg:hover:text-primary-color material-symbols-outlined notranslate " 
                    onClick={() => {setSelectedModels(selectedList); closeModal(false, undefined)}}>
                        close
                    </span>
                </span>
                <div className="p-4 flex gap-4 justify-center items-center flex-wrap overflow-x-hidden
                overflow-y-auto">
                {
                    viewList.map(({id, name, image, selected}) => (
                        <div key={id} onClick={() => manageSelection(id)}
                            className={`overflow-hidden select-none w-40 aspect-[1/1.25] cursor-pointer rounded-[10px] 
                            border-2 flex flex-col items-center justify-center z-10  motion-safe:transition-all 
                            motion-reduce:transition-none will-change-auto motion-safe:duration-300  
                            ${(selected ? "border-primary-color bg-transparent lg:hover:border-secondary-color lg:hover:bg-transparent" : 
                            (!selected && selectedModels.length === (isDesktop ? 3 : 2) 
                            ? "opacity-60 pointer-events-none lg:hover:border-transparent lg:hover:bg-[#eeeff0]" 
                            : "bg-[#eeeff0] border-transparent lg:hover:border-[#77787b] lg:hover:bg-transparent") )}`}
                            // className={css(styles.item, selected && styles.selectedItem, (!selected && selectedModels.length === (isDesktop ? 3 : 2)) && styles.disabledItem)}
                            >
                               <ImageViewer src={image} alt={`${name} model`} category={category.toLowerCase().replace(' ','')}/>
                                <span className="px-1">{name}</span>
                        </div>
                    ))
                }
                </div>
                <button className="bg-primary-color cursor-pointer px-4 uppercase text-white 
                border-none select-none flex items-center justify-center text-[1rem] motion-safe:transition-all 
                            motion-reduce:transition-none will-change-auto motion-safe:duration-300
                            lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium font-semibold h-12" 
                onClick={() => closeModal(false, selectedModels)}>
                    {/* compare now ({selectedModels.length}/{(isDesktop ? 3 : 2)}) */}
                    {t('button', {selected: selectedModels.length, total: (isDesktop ? 3 : 2)})}
                </button>
            </div>
        </div>
    );
    //#endregion 
}

export default ModelSelectorModal;
