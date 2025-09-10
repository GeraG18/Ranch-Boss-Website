import React, {useState, useEffect, Fragment} from "react";
import { useLocale, useTranslations } from "next-intl";
import { ProductsList, ModelsImageDictionary } from "@/jsons/products/products";
import { useLockBodyScroll } from "@/hooks/lock_body_scroll/lock_body_scroll";
import ImageViewer from "./image_viewer";
import CustomLink from "./custom_link";

const ProductsDesktopMenu = ({isSticky, isOpen, isOpenCallback}) => {

    //#region code
    const t = useTranslations('PagesTitles');
    const locale = useLocale()
    const [submenuOpened, setOpenedSubmenu] = useState('');
    const [submenuItems, setSubmenuItems] = useState([]);

    const [prodsMenu, setProdsMenu] = useState([]);

    const getChildsOfItem = () => {
        let item = [];
        if(submenuOpened !== '') {
            item = prodsMenu.find((item) => item.name === submenuOpened)
        }
        return item ? (item.childs ? item.childs : []) : [];
    }

    const manageMenuOpened = (childs) => {
        if(!childs) {
            isOpenCallback(false)
        }
    };

    useEffect(() => {
        if(prodsMenu.length > 0) {
            setOpenedSubmenu(prodsMenu[1].name)
        }
    },[prodsMenu]);

    const generateProductsMenu = () => {
        let obj = [{name: t('allproducts'), url:"/products"}];
        
        let removedComments = ProductsList[locale].filter((item) => !item.hasOwnProperty('_comment'));
        let categories = [...new Set([...removedComments.map((item) => item.category)])]
        
        categories.forEach((category) => {
            let allItems = removedComments.filter((item) => item.category === category);
            let models = [...new Set([...allItems.map((item) => (item.name.split(' ')[0]) )])]
            // console.log('MODELS', models);
            
            let subCat = {};

            models.forEach((model) => {
                let tempItemsArr =  removedComments.filter((item) => item.name.includes(model) && item.category === category);
                // console.log('tempItemsArr,', tempItemsArr);
                
                let image = ModelsImageDictionary[model];
                let stat = tempItemsArr[0].status;
                let cat = tempItemsArr[0].category;
                let subcategory = tempItemsArr[0].subcategory || '';
                // console.log('>>', model, subcategory);
                // console.log('>>>>', cat, category);
                
                
                subCat[subcategory] ??= [];
                
                subCat[subcategory].push({
                    name:model,
                    imgUrl:image,
                    status: stat,
                    url:`/products?model=${model}`,
                    description:`${t('dynCatTrailer', {category: ( (typeof subcategory === 'string' && subcategory !== '') ? subcategory : cat )}).toUpperCase()}`
                })
                // console.log('subCat', subCat, subcategory, model);
            });

            let toPush = {
                name: category,
                childs: subCat//typesArr
            }
            obj.push(toPush)
        });
        setProdsMenu(obj)
    }

    useEffect(() => {
        // prodsMenu
        generateProductsMenu()
    }, [])

    useLockBodyScroll(isOpen); // hook to lock body scrolling when menu is open

    useEffect(() => {
        let items = getChildsOfItem();
        setSubmenuItems(items)
        // console.log('opened: ',submenuOpened);
        
    },[submenuOpened])
    //#endregion

    //#region view
    return (
        <div className="w-full max-h-full overflow-hidden relative left-0 top-0 bg-[rgba(255,255,255,0.5)] backdrop-blur-md backdrop-saturate-50 z-100 flex items-center justify-center
            motion-safe:transition-opacity motion-safe:duration-400 motion-reduce:transition-none will-change-auto select-none" style={{height: isOpen ? `calc(100vh - ${isSticky ? '6.4rem' : '8.9rem'})` : '0',
            opacity:isOpen ? "1" : "0", pointerEvents:isOpen ? "auto" : "none",}}
            onClick={() => isOpenCallback(false)}>
            <div className="bg-white w-full h-full motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto 
                flex flex-row" style={{maxHeight:`calc(100vh - ${isSticky ? '6.5rem' : '9rem'})`, transform: !isOpen ? 'translateY(-10%)' : 'translateY(0%)',}}
                onClick={(e) => e.stopPropagation()}>
                <div className="z-100 flex flex-row w-full">
                    <div className="p-4 bg-[#f3f3f3] flex-none">
                        {prodsMenu.map(({name, url, imgUrl, childs}) => (
                            <Fragment key={name}>
                            {
                                url ? 
                                <CustomLink href={`${url}`} className={`w-[16rem] flex-none flex flex-col items-baseline justify-center text-[#4d4d4d] rounded-[20px] relative
                                    py-3 px-4 font-['lora'] uppercase text-[0.875rem] cursor-pointer lg:hover:bg-[rgb(220,220,220)] ${name} 
                                    ${submenuOpened === name ? "bg-white before:content-[''] before:absolute before:left-0 before:w-[0.5rem] before:h-[0.5rem] before:rounded-full before:bg-primary-color" : ""}`}
                                    onClick={() => {isOpenCallback(false)}}
                                >
                                    <div className="w-full flex items-center justify-center text-[#77787b]">
                                        <span className="w-full tracking-[1px] text-[0.875rem] font-bold">
                                            {(name)}
                                        </span>
                                        {
                                            childs &&
                                            <span className="material-icons notranslate ">
                                            chevron_right
                                        </span>
                                        }
                                    </div>
                                </CustomLink>
                                :
                                <div className={`w-[16rem] flex-none flex flex-col items-baseline justify-center text-[#4d4d4d] rounded-[20px] relative
                                    py-3 px-4 font-['lora'] uppercase text-[1rem] cursor-pointer lg:hover:bg-[rgb(220,220,220)] ${name} 
                                    ${submenuOpened === name ? `bg-white before:content-[''] before:absolute before:left-0 before:w-[0.5rem] before:h-[0.5rem] before:rounded-full before:bg-primary-color
                                        after:content-[''] after:absolute after:left-0 after:w-[0.5rem] after:h-[0.5rem] after:rounded-full after:bg-primary-color` : ""}`}
                                    onClick={() => {setOpenedSubmenu(childs ? (name) : prodsMenu[1].name); manageMenuOpened(childs); }}>
                                    <div className="w-full flex items-center justify-center text-[#77787b]">
                                        <span className="w-full tracking-[1px] text-[0.875rem] font-bold">
                                            {(name)}
                                        </span>
                                        {
                                            childs &&
                                            <span className="material-icons notranslate ">
                                            chevron_right
                                        </span>
                                        }
                                    </div>
                                </div>
                            }
                            </Fragment>
                        ))}
                    </div>
                    <div style={{maxHeight:`calc(100vh - ${isSticky ? '8.5rem' : '11rem'})`,}} className="w-full overflow-x-hidden overflow-y-auto p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                           {
                            Object.keys(submenuItems).map((subcategory, index) => (
                                <Fragment key={subcategory}>
                                    {
                                        (index !== 0) &&
                                        <span className="col-span-full m-2 w-[calc(100%-1rem)] h-[2px] bg-[#f3f3f3] flex-none"></span>
                                    }
                                    {submenuItems[subcategory].map(({name, url, imgUrl, description, status}, index) => (
                                        <CustomLink href={`${url}`} className="group p-8 w-full font-['lora'] h-auto flex-none font-semibold flex flex-col items-baseline justify-start relative
                                            motion-safe:transition-all motion-reduce:transition-none will-change-auto text-[1rem] tracking-[1px]  lg:hover:bg-[#f0efec]
                                            overflow-hidden" 
                                            key={name+index} onClick={() => isOpenCallback(false) }>
                                            {
                                                status &&
                                                <div className="absolute font-['lora'] text-[white] top-1/3 
                                                    backdrop-saturate-50 backdrop-blur-sm bg-primary-color/70 rounded-[20px] 
                                                    min-h-6 min-w-6 p-0.5 max-w-[calc(100%-4rem)] w-full flex items-center justify-center text-center
                                                    motion-safe:transition-all motion-reduce:transition-none mb-1 text-[0.875rem] font-bold
                                                    will-change-auto motion-safe:duration-300 group z-20 uppercase"
                                                >
                                                    <span>
                                                        {status}
                                                    </span>
                                                </div>
                                            }
                                            <div className="w-full flex items-center justify-center">
                                                <span className="w-full font-['lora'] font-bold bg-clip-text text-transparent bg-gradient-to-b from-secondary-color to-primary-color tracking-[1px] text-[1.125rem] text-shadow-gray-400!">
                                                    {name}
                                                </span>
                                            </div>
                                            <ImageViewer 
                                                sizes="50vh"
                                                className={`group-hover:scale-[1.125] motion-safe:transition-all motion-safe:duration-200 motion-reduce:transition-none will-change-auto 
                                                ${status ? 'blur-xs lg:blur-[0.5rem]' : ''}`} 
                                                src={imgUrl} 
                                                category={submenuOpened.toLowerCase().replace(' ', '')}
                                                alt={`${name} ${description}`}
                                            />
                                            <div className="bg-[#f0efec] font-['lora'] text-[0.875rem] text-bold text-gray/60! rounded-[20px] py-2 px-8 self-center text-center group-hover:bg-white">
                                                {description}
                                            </div>
                                        </CustomLink>
                                    ))}
                                </Fragment>
                            ))
                           }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    //#endregion
}

export default ProductsDesktopMenu;