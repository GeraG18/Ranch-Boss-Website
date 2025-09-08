import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import CustomLink from "@/components/general/custom_link"
import NavbarMobileItem from "./nav_bar_mobile_item";
import { ProductsList, ModelsImageDictionary } from "@/jsons/products/products";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";

const NavbarMobileMenu = ({showMenu, isSticky, menuList, isOpenCallback}) => {

    //#region code
    // const navigateTo = useNavigate();
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('PagesTitles')
    const [submenuOpened, setOpenedSubmenu] = useState({first:'', second:''});
    const [activeSections, setActiveSections] = useState([]);
    const [menuContent, setMenuContent] = useState([]);
    const [prodsMenu, setProdsMenu] = useState([]);

    const defaultMenu = [
        <NavbarMobileItem key={'products'} name={t('products')} icon="chevron_right" 
            altButton={true} altFont={true} onItemClick={() => {doMenuContentChange({first:t('products'), second:''})}}/>,
        <NavbarMobileItem key={'company'} name={t('company')} icon="chevron_right" 
            altButton={true} altFont={true} onItemClick={() => {doMenuContentChange({first:t('company'), second:''})}}/>,
        <NavbarMobileItem key={'support'} name={t('support')} icon="chevron_right" 
            altButton={true} altFont={true} onItemClick={() => {doMenuContentChange({first:t('support'), second:''})}}/>,
        <NavbarMobileItem key={'financing'} name={t('financing')} icon="chevron_right" 
            altButton={true} altFont={true} onItemClick={() => {doMenuContentChange({first:t('financing'), second:''})}}/>,
    ];
    
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

    const generateProductsMenu = () => {
        let obj = [{name:t('allproducts'), url:"/products"}];
        let removedComments = ProductsList[locale].filter((item) => !item.hasOwnProperty('_comment'));
        let categories = [...new Set([...removedComments.map((item) => item.category)])]
        
        categories.forEach((category) => {
            
            let allItems = removedComments.filter((item) => item.category === category);
            let models = [...new Set([...allItems.map((item) => (item.name.split(' ')[0]) )])]
            // let subCategories = [... new Set([...allItems.map((item) => (item.subcategory || ''))])]

            let subCat = {};

            models.forEach((model) => {
                let tempItemsArr =  removedComments.filter((item) => item.name.includes(model) && item.category === category);
                let image = ModelsImageDictionary[model]
                let stat = tempItemsArr[0].status;
                let cat = tempItemsArr[0].category;
                let subcategory = tempItemsArr[0].subcategory || '';
                subCat[subcategory] ??= [];

                subCat[subcategory].push({
                    name:model,
                    imgUrl:image,
                    status: stat,
                    url:`/products?model=${model}`,
                     description:`${t('dynCatTrailer', {category: ( (typeof subcategory === 'string' && subcategory !== '') ? subcategory : cat )}).toUpperCase()}`
                })
            });

            // 

            let toPush = {
                name: category,
                childs: subCat//typesArr
            }
            obj.push(toPush)
        });
        // 
        setProdsMenu(obj)
    }

    useEffect(() => {
        // prodsMenu
        generateProductsMenu()
    }, [])

    const navigateAndExit = (url)  => {
        // navigateTo(url)
        router.push(url)
        router.refresh()
        isOpenCallback('')
    }

    const fadeInOutAnimation = (htmlElement, show, isHeader=false) => {
        if(isHeader) {
            htmlElement.style.cssText = !show ? "opacity: 0 !important; height: 0px !important" :
            "opacity:1 !important; height: 6.5rem !important"
        } else {
            htmlElement.style.cssText  = show ? 
            "opacity: 1 !important"
            : "opacity: 0 !important"
        }
    }

    const getProductsMenu = (subMenuItem='') => {
        let arr = []
        // 
        
        if(subMenuItem === '') {
            
            prodsMenu.forEach(({name, url, imgUrl, status, childs}) => {
                arr.push(
                    <NavbarMobileItem key={name} 
                    name={name}
                    status={status}
                    icon="chevron_right"
                    altButton={true} altFont={true}
                    onItemClick={
                        () => {(childs ? doMenuContentChange({first: t('products'), second:name}) : 
                        navigateAndExit(url))
                    }}/>
                )
            });
        } else {
            
            let item =  prodsMenu.find((item) => item.name === subMenuItem);
            Object.keys(item.childs).forEach((subcategory) => {
                
                (item.childs)[subcategory].forEach(({name, url, imgUrl, description, status, childs}) => {
                    arr.push(
                        <NavbarMobileItem key={name} 
                        name={name}
                        imgUrl={imgUrl}
                        status={status}
                        badge={description}
                        category={subMenuItem}
                        icon="chevron_right"
                        onItemClick={
                            () => {(childs ? doMenuContentChange({first: t('products'), second:name}) : 
                            navigateAndExit(url))
                        }}/>
                    )
                });
            });
        }
        return arr;
    }

    const getCompanyMenu = () => {
        let arr = []
        menuList['CompanyMenu'][locale].forEach(({name, url, imgUrl, childs}) => {
            arr.push(
                <NavbarMobileItem key={name} 
                    name={name}
                    altButton={true} altFont={true}
                    icon="chevron_right"
                    onItemClick={
                        () => {(childs ? doMenuContentChange({first: 'company', second:name}) : navigateAndExit(url));
                }}/>
            )
        });
        return arr;
    }

    const getSupportMenu = () => {
        let arr = []
        menuList['SupportMenu'][locale].forEach(({name, url, imgUrl, childs}) => {
            arr.push(
                <NavbarMobileItem key={name} 
                    name={name}
                    altButton={true} altFont={true}
                    icon="chevron_right"
                    onItemClick={
                        () => {(childs ? doMenuContentChange({first: 'support', second:name}) : navigateAndExit(url));
                }}/>
            )
        });
        return arr;
    }

    const getFinancingMenu = () => {
        let arr = []
        menuList['FinancingMenu'][locale].forEach(({name, url, imgUrl, childs}) => {
            arr.push(
                <NavbarMobileItem key={name} 
                    name={name}
                    altButton={true} altFont={true}
                    icon="chevron_right"
                    onItemClick={
                        () => {(childs ? doMenuContentChange({first: 'financing', second:name}) : navigateAndExit(url));
                }}/>
            )
        });
        return arr;
    }

    const doMenuContentChange = (menu) => {
        let headerNav = document.getElementById("HeaderContainerMenuNav")
        let innerNav = document.getElementById("InternalContainerMenuNav")

        fadeInOutAnimation(innerNav, false)
        fadeInOutAnimation(headerNav, false)
        
        setTimeout(() => {
            switch(menu.first) {
                case t('products'):
                    setMenuContent(getProductsMenu(menu.second))
                    break;
                case t('company'):
                    setMenuContent(getCompanyMenu())
                    break;
                case t('support'):
                    setMenuContent(getSupportMenu())
                    break;
                case t('financing'):
                    setMenuContent(getFinancingMenu())
                    break;
                    
                default:
                    setMenuContent(defaultMenu)
                    break;
            }
            fadeInOutAnimation(innerNav, true)
            fadeInOutAnimation(headerNav, true)
            setOpenedSubmenu(menu)
        },400)
    }

    useEffect(() => {
        doMenuContentChange({first:'', second:''})
        setMenuContent(defaultMenu)
    },[])

    useEffect(() => {
        document.body.style.overflowY = showMenu ? 'hidden' : 'auto';
        

        doMenuContentChange({first:'', second:''})
        setMenuContent(defaultMenu)
    }, [showMenu])
    //#endregion
    
    return(
        <div style={{height: showMenu ? `calc(100vh - 5rem)` : "0px", opacity: showMenu ? "1" : "0", pointerEvents: showMenu ? 'auto' : 'none'}} 
            className="motion-safe:transition-transform motion-safe:duration-300 motion-reduce:transition-none will-change-auto overflow-hidden relative left-0 top-0 bg-[rgba(0,0,0,0.5)]
            backdrop-blur-md backdrop-saturate-50 z-1000 flex items-start justify-center font-['Montserrat'] select-none">
            <div style={{ transform:showMenu ? 'translateX(0%)' : 'translateX(-100%)',}} 
                className="motion-safe:transition-transform motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative bg-white overflow-y-auto overflow-x-hidden
                flex flex-none items-center flex-col gap-2 w-[85vw] max-h-full h-full">
                <div className={`w-full h-fit motion-safe:transition-transform motion-safe:duration-300 motion-reduce:transition-none will-change-auto flex flex-col items-start 
                    justify-center gap-2 overflow-hidden flex-none ${submenuOpened.first === '' ? 'p-0' : `pt-6 px-4 pb-0`} `} id="HeaderContainerMenuNav" >
                    
                    {
                        (submenuOpened.first !== '') &&    
                        <>
                            <button className="font-['Montserrat'] border-none bg-transparent flex items-center justify-center uppercase h-8 text-[#77787B] p-0"
                                onClick={() => doMenuContentChange({first:'', second:''})}>
                                <span className="material-symbols-outlined notranslate ">
                                    chevron_left
                                </span>
                                {t('mainMenu')}
                            </button>
                            <span className="font-['Michroma'] font-bold text-[1.25rem] text-[#77787B] tracking-[1px] flex uppercase items-center justify-start">
                                {((submenuOpened.second !== "" ? submenuOpened.second : submenuOpened.first).replace(' ', '').toLowerCase())}
                            </span>
                            <div className="h-px w-full bg-[rgba(0,0,0,0.6)]"></div>
                        </> 
                    }
                </div>
                
                <div className="w-full motion-safe:transition-transform motion-safe:duration-400 motion-reduce:transition-none will-change-auto
                    flex flex-none flex-col items-center gap-2 opacity-0 p-4 pb-20"
                id="InternalContainerMenuNav">
                    {menuContent}
                    <div className="w-[calc(100%-2rem)] flex flex-wrap items-center justify-center gap-x-6 gap-y-4 text-black bg-white px-4 pt-6 pb-0">
                        <div className="h-px w-full bg-[rgba(0,0,0,0.6)]"></div>
                        <CustomLink className="motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto
                            cursor-pointer h-8 text-black text-[0.75rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-color" 
                            onClick={() => isOpenCallback('')} href="/find-a-dealer">{t('findADealer')}</CustomLink>
                        <CustomLink className="motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto
                            cursor-pointer h-8 text-black text-[0.75rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-color" 
                            onClick={() => isOpenCallback('')} href="/warranty-claim">{t('warranty')}</CustomLink>
                        <CustomLink className="motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto
                            cursor-pointer h-8 text-black text-[0.75rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-color"
                            onClick={() => isOpenCallback('')} href="/blog">{t('blog')}</CustomLink>
                        <CustomLink className="motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto
                            cursor-pointer h-8 text-black text-[0.75rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-color"
                            onClick={() => isOpenCallback('')} href="/contact-us">{t('contactUs')}</CustomLink>
                        <CustomLink className="motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto
                            cursor-pointer h-8 text-black text-[0.75rem] flex items-center justify-start lg:h-auto lg:hover:text-primary-color"
                            onClick={() => isOpenCallback('')} href="/become-a-dealer">{t('becomeADealer')}</CustomLink>
                    </div>
                </div>
            </div>
            <div className="w-full h-full" onClick={() => isOpenCallback('')}>
            </div>
        </div>
    );
}

export default NavbarMobileMenu;