// 'use client' // Renders on client side
// import React, {useState, useEffect, useCallback} from "react";
// import CompanyMenu from "@/jsons/dropdowns/company_dropdown.json"
// import SupportMenu from "@/jsons/dropdowns/support_dropdown.json"
// import FinancingMenu from "@/jsons/dropdowns/financing_dropdown.json"
// import Link from "next/link";
// import { useAlertsProvider } from "@/context/alert_context";
// import BlogTopbar from "@/components/blog/blog_topbar";
// import BlogDropdown from "@/components/blog/blog_dropdown";
// import SearchInput from "@/components/general/search_input";
// import PlaceIcon from "@/components/icons/place_icon";
// import WrenchIcon from "@/components/icons/wrench_icon";
// import ProductsDesktopMenu from "@/components/general/products_desktop_menu";
// import DropdownMenu from "@/components/general/dropdown_menu";
// import NavbarMobileMenu from "@/components/general/nav_bar_mobile_menu";
// import { useBlogUserContext } from "@/context/blog_user_context";
// import IconViewer from "../general/icon_viewer";
// import { useLocale, useTranslations } from "next-intl";
// import LanguageSwitcher from "../general/language_switcher";


// function NavBar({showSolid = false, isStatic=false}){

//     //#region code
//     //variables
//     const t = useTranslations('PagesTitles')
//     const locale = useLocale()
//     const [selectedMenuData, setSelectedMenuData] = useState([]);
//     const { isNavSticky } = useAlertsProvider();
//     const [isSticky, setIsSticky] = useState(false);
//     const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState("");
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     const [xPos, setXPos] = useState(0);
//     const { user } = useBlogUserContext();

//     const manageClickEvent = (buttonName, menuData, event) => {
//         setSelectedMenuData(menuData);
//         setIsDesktopMenuOpen(isDesktopMenuOpen !== buttonName ? buttonName : '');
//         // 
//         setXPos(event.target.getBoundingClientRect().left)
//     }
 
//     useEffect(() => {
//         setIsSticky(isNavSticky);
        
//     }, [isNavSticky])

//     useEffect(() => {        
//         const mediaQuery = window.matchMedia("(min-width: 1024px)");
//         // setIsDesktop(mediaQuery.matches)

//         const onMediaChange = (event) => {
//             setIsMobileMenuOpen(''); setIsDesktopMenuOpen('');
//             // setIsDesktop(event.matches)
//         }

//         mediaQuery.addEventListener("change", onMediaChange);

//         return () => {
//             // componentwillunmount
//             mediaQuery.removeEventListener("change",onMediaChange)
//         }
//     }, [])

//     /* #endregion */

//     //#region view
//     return(
        
//         <div className={`top-0 z-400 before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-48
//                 before:pointer-events-none before:z-80 notranslate
//                 before:w-full ${isStatic ? "bg-transparent" : 
//                 ( (showSolid || isSticky || isDesktopMenuOpen || isMobileMenuOpen ) ? "before:bg-transparent" : "before:bg-[linear-gradient(0deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.15)_12%,rgba(0,0,0,0.35)_25%,rgba(0,0,0,0.45)_37%,rgba(0,0,0,0.55)_50%,rgba(0,0,0,0.65)_63%,rgba(0,0,0,0.75)_75%,rgba(0,0,0,0.85)_88%,rgba(0,0,0,0.95)_100%)]" )
//                 }`}
//             style={{width:isStatic ? 'auto' : '100%', position:isStatic ? 'relative' : 'fixed'}}>
//             <div className={`w-full overflow-hidden
//                 ${isStatic ? "bg-[#1C1C1E]" : ((showSolid || isSticky || isDesktopMenuOpen || isMobileMenuOpen ) ? "bg-[#1C1C1E]" : "bg-transparent")}`} 
//                 style={{height: isStatic  ? 'fit-content' : (!isSticky ? 'fit-content' : '0px')}}
//                 onClick={() => {setIsMobileMenuOpen(''); setIsDesktopMenuOpen('');}}>
//                 <BlogTopbar/>
//             </div>
//             <nav className={`relative border-none 
//                 top-0 z-140 flex flex-col items-center justify-start text-center h-26 select-none px-4 lg:h-16 lg:justify-center xl:p-0
//                 ${isStatic ? "bg-[#1C1C1E]" : ((showSolid || isSticky || isDesktopMenuOpen || isMobileMenuOpen ) ? "bg-[#1C1C1E]" : "bg-transparent")}`} >
//                 <div className="w-full flex flex-none gap-4 items-center justify-center max-w-screen-lg  pt-2 pb-4 lg:gap-8 lg:mx-auto lg:p-0">
//                     <span onClick={() => setIsMobileMenuOpen((prev) => !prev)} className="material-icons notranslate  aspect-square flex-none flex items-center justify-center text-[1.75rem] text-white 
//                         motion-safe:transition-all motion-reduce:transition-none will-change-auto lg:hidden!" style={{transform:`rotate(${isMobileMenuOpen ? "90" : "0"}deg)`}}>
//                         menu
//                     </span>
//                     <Link className="inline-block relative motion-safe:transition-all motion-reduce:transition-none will-change-auto  lg:hover:brightness-75" href="/" onClick={() => {setIsMobileMenuOpen(''); setIsDesktopMenuOpen('');}}>
//                         {
//                             process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' &&
//                             <span className="bg-[#379634] font-semibold text-black font-['lora'] text-sm absolute right-0 top-0 
//                                 px-0.5 flex items-center justify-center gap-0.5 pointer-events-none text-[0.75rem]
//                                 lg:text-[0.85rem]">
//                                 <span className="material-symbols-outlined notranslate " style={{fontSize:'1rem'}}>
//                                     code
//                                 </span>
//                                 DEV
//                             </span>
//                         }
//                         {
//                             user &&
//                             <span className="bg-[#F7C548] font-semibold text-black font-['lora'] text-sm absolute right-0 bottom-0 
//                                 px-0.5 flex items-center justify-center gap-0.5 pointer-events-none text-[0.75rem]
//                                 lg:text-[0.85rem]">
//                                 <span className="material-symbols-outlined notranslate " style={{fontSize:'1rem'}}>
//                                     edit
//                                 </span>
//                                 {t('blogEditor')}
//                             </span>
//                         }
//                         <img className="w-[200px] lg:w-[460px] lg:mr-4" src="/logos/HorizonTrailers-logo,whiteorangegrey.png" alt="horizon trailers logo"/>
//                     </Link>
//                     <div className="hidden justify-evenly text-right w-full flex-wrap font-semibold lg:flex"> 
//                         <SearchInput onInputClick={() => { setIsMobileMenuOpen(''); setIsDesktopMenuOpen(''); }}/>
//                     </div>
//                     <>
//                     {
//                     user ? 
//                     <div className="flex gap-2 items-center justify-end shrink-[1.25] w-full lg:gap-5">
                        
//                         <div style={{color:isDesktopMenuOpen === 'BLOG_USER' ? "#6897d8" : ""}} 
//                             className="font-['lora'] text-[1.5rem] flex items-center justify-evenly w-40 h-auto cursor-pointer text-white gap-2
//                             px-5 lg:hover:text-primary-light-color! group motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative"  
//                             name="BLOG_USER"
//                             onClick={(e)=> {manageClickEvent("BLOG_USER",[{name:"LOG OUT", url:"#"}], e)}}
//                             >
//                             <div className="w-8 aspect-square backdrop-saturate-50 backdrop-blur-sm bg-black/50
//                             flex items-center justify-center overflow-hidden overflow-none rounded-full border border-[#d4d4d4] 
//                             group-hover:border-primary-color  motion-safe:transition-all motion-safe:duration-300 
//                             motion-reduce:transition-none will-change-auto">
//                                 {
//                                     user?.profileImage !== '' ?
//                                     <IconViewer fullHeight={true} src={user?.profileImage}/>
//                                     : 
//                                     <span className="material-symbols-outlined notranslate " >
//                                         person_outline
//                                     </span>
//                                 }
//                             </div>
//                             <span className="pointer-events-none flex items-center justify-center text-shadow uppercase">
//                                 {t('account')}
//                                 <span className="material-symbols-outlined notranslate  pointer-events-none">
//                                     {isDesktopMenuOpen === 'BLOG_USER' ? 'expand_less' : 'expand_more'}
//                                 </span> 
//                             </span>
//                         </div>
//                     </div>
//                     :
//                     <div className="flex gap-2 items-center justify-end shrink-[1.25] w-full lg:gap-5">
//                        <Link href="/find-a-dealer" className="motion-safe:transition-all motion-reduce:transition-none will-change-auto text-white min-w-10 flex items-center justify-center gap-2 font-['lora']
//                             text-[1rem] cursor-pointer group" 
//                             onClick={() => {setIsMobileMenuOpen(''); setIsDesktopMenuOpen('');}}>
//                             <PlaceIcon width="28" height="28" color="#6897d8"/>
//                             <span className="group-hover:text-primary-light-color hidden lg:block text-shadow">{t('findADealer')}</span>
//                        </Link>
//                        <Link href="/warranty-docs" className="motion-safe:transition-all motion-reduce:transition-none will-change-auto text-white min-w-10 flex items-center justify-center gap-2 font-['lora']
//                             text-[1rem] cursor-pointer group" 
//                             onClick={() => {setIsMobileMenuOpen(''); setIsDesktopMenuOpen('');}}>
//                             <WrenchIcon width="28" height="28" color="#6897d8"/>
//                             <span className="group-hover:text-primary-light-color hidden lg:block text-shadow">{t('warranty')}</span>
//                        </Link>
//                        <LanguageSwitcher/>
//                     </div>
//                     }
//                     </>
//                 </div>
//                 <div className="flex items-center justify-center w-full lg:hidden">
//                     <SearchInput id="searchBarMobile" onInputClick={() => { setIsMobileMenuOpen(''); setIsDesktopMenuOpen(''); }}/>
//                 </div>
//             </nav>
//             <div className={`w-full h-full relative z-80 hidden lg:flex items-center justify-center select-none
            
//                 ${isStatic ? "bg-[rgba(255,255,255,0.8)] text-black backdrop-blur-sm backdrop-saturate-50 border-b-2 border-b-[#eeeeee]" : ((showSolid || isSticky || isDesktopMenuOpen || isMobileMenuOpen ) ? "bg-[rgba(255,255,255,0.8)] text-black backdrop-blur-sm backdrop-saturate-50 border-b-2 border-b-[#eeeeee]" : "bg-transparent text-white  text-shadow border-none backdrop-blur-[0px]")}`}>
//                 <div style={{color:isDesktopMenuOpen === 'PRODUCTS' ? "#6897d8" : ""}} 
//                     className="font-['lora'] text-[1.5rem] flex items-center justify-evenly w-40 h-auto cursor-pointer 
//                     px-5 lg:hover:text-primary-light-color! motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative" 
//                     name="PRODUCTS" onClick={(e)=> {manageClickEvent("PRODUCTS",[], e)}}>
//                     <span className="pointer-events-none uppercase">{t('products')}</span>
//                     <span className="material-symbols-outlined notranslate  pointer-events-none">
//                         {isDesktopMenuOpen === 'PRODUCTS' ? 'expand_less' : 'expand_more'}
//                     </span> 
//                 </div>

//                 <div style={{color:isDesktopMenuOpen === 'COMPANY' ? "#6897d8" : ""}} 
//                     className="font-['lora'] text-[1.5rem] flex items-center justify-evenly w-40 h-auto cursor-pointer 
//                     px-5 lg:hover:text-primary-light-color! motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative" 
//                     name="COMPANY"
//                     onClick={(e)=> {manageClickEvent("COMPANY",CompanyMenu[locale], e)}}
//                     >
//                     <span className="pointer-events-none uppercase">{t('company')}</span>
//                     <span className="material-symbols-outlined notranslate  pointer-events-none">
//                         {isDesktopMenuOpen === 'COMPANY' ? 'expand_less' : 'expand_more'}
//                     </span> 
//                 </div>
                
//                 <div style={{color:isDesktopMenuOpen === 'SUPPORT' ? "#6897d8" : ""}} 
//                     className="font-['lora'] text-[1.5rem] flex items-center justify-evenly w-40 h-auto cursor-pointer 
//                     px-5 lg:hover:text-primary-light-color! motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative"  
//                     name="SUPPORT"
//                     onClick={(e)=> {manageClickEvent("SUPPORT",SupportMenu[locale], e)}}
//                     >
//                     <span className="pointer-events-none uppercase">{t('support')}</span>
//                     <span className="material-symbols-outlined notranslate  pointer-events-none">
//                         {isDesktopMenuOpen === 'SUPPORT' ? 'expand_less' : 'expand_more'}
//                     </span> 
//                 </div>
//                 <div style={{color:isDesktopMenuOpen === 'FINANCING' ? "#6897d8" : ""}} 
//                     className="font-['lora'] text-[1.5rem] flex items-center justify-evenly w-40 h-auto cursor-pointer 
//                     px-5 lg:hover:text-primary-light-color! motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative" 
//                     name="FINANCING"
//                     onClick={(e)=> {manageClickEvent("FINANCING",FinancingMenu[locale], e)}}
//                     >
//                     <span className="pointer-events-none uppercase">{t('financing')}</span>
//                     <span className="material-symbols-outlined notranslate  pointer-events-none">
//                         {isDesktopMenuOpen === 'FINANCING' ? 'expand_less' : 'expand_more'}
//                     </span> 
//                 </div>
//             </div>
//             <ProductsDesktopMenu isSticky={isSticky} 
//                 isOpen={isDesktopMenuOpen === 'PRODUCTS'} isOpenCallback={ (res) => setIsDesktopMenuOpen('') }/>
//             <DropdownMenu isSticky={isSticky} menu={selectedMenuData} isShowing={isDesktopMenuOpen !== '' && isDesktopMenuOpen !== 'PRODUCTS' && isDesktopMenuOpen !== 'BLOG_USER'} 
//                 xPos={xPos} isOpenCallback={ (res) => setIsDesktopMenuOpen('') }/>
//             <BlogDropdown isSticky={isSticky} isShowing={isDesktopMenuOpen !== '' && isDesktopMenuOpen === 'BLOG_USER'} 
//                 xPos={xPos} isOpenCallback={ (res) => setIsDesktopMenuOpen('') }/>
//             <NavbarMobileMenu showMenu={isMobileMenuOpen} isSticky={isSticky}
//                 menuList={{CompanyMenu, SupportMenu, FinancingMenu, }} 
//                 isOpenCallback={(res) => setIsMobileMenuOpen(res)}/>
//         </div>
//     );
//     //#endregion
// }
// export default NavBar


'use client' // Renders on client side
import React, {useState, useEffect, useCallback} from "react";
import CompanyMenu from "@/jsons/dropdowns/company_dropdown.json"
import SupportMenu from "@/jsons/dropdowns/support_dropdown.json"
import FinancingMenu from "@/jsons/dropdowns/financing_dropdown.json"
import { useAlertsProvider } from "@/context/alert_context";
import TopBar from "@/components/blog/blog_topbar";
import SearchInput from "@/components/general/search_input";
import WrenchIcon from "@/components/icons/wrench_icon";
import ProductsDesktopMenu from "@/components/general/products_desktop_menu";
import DropdownMenu from "@/components/general/dropdown_menu";
import NavbarMobileMenu from "@/components/general/nav_bar_mobile_menu";
import { useBlogUserContext } from "@/context/blog_user_context";
import IconViewer from "../general/icon_viewer";
import { useLocale, useTranslations } from "next-intl";
import LanguageSwitcher from "../general/language_switcher";
import { useRouter } from "next/navigation";
import CustomLink from "../general/custom_link";


function NavBar({showRouteBar = false, isStatic=false, showSolid = false}){

    //#region code
    const t = useTranslations('PagesTitles');
    const locale = useLocale();
    const router = useRouter();
    const { user } = useBlogUserContext();
    
    //variables
    const [selectedMenuData, setSelectedMenuData] = useState([]);
    const { isNavSticky } = useAlertsProvider();
    const [isSticky, setIsSticky] = useState(false);
    const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [xPos, setXPos] = useState(0);

    const manageClickEvent = (buttonName, menuData, event) => {
        setSelectedMenuData(menuData);
        setIsDesktopMenuOpen(isDesktopMenuOpen !== buttonName ? buttonName : '');
        setXPos(event.target.getBoundingClientRect().left)
    }
 
    useEffect(() => {
        setIsSticky(isNavSticky);
    }, [isNavSticky])

    useEffect(() => {        
        const mediaQuery = window.matchMedia("(min-width: 1024px)");

        const onMediaChange = (event) => {
            setIsMobileMenuOpen(''); setIsDesktopMenuOpen('');
        }

        mediaQuery.addEventListener("change", onMediaChange);

        return () => {
            mediaQuery.removeEventListener("change",onMediaChange)
        }
    }, [])

    /* #endregion */

    //#region view
    return(
        <div className={`top-0 z-400 before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-48
                before:pointer-events-none before:z-80 notranslate
                before:w-full ${isStatic ? "bg-transparent" : 
                ( (showSolid || isSticky || isDesktopMenuOpen || isMobileMenuOpen ) ? "before:bg-transparent" : "before:bg-[linear-gradient(0deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.15)_12%,rgba(0,0,0,0.35)_25%,rgba(0,0,0,0.45)_37%,rgba(0,0,0,0.55)_50%,rgba(0,0,0,0.65)_63%,rgba(0,0,0,0.75)_75%,rgba(0,0,0,0.85)_88%,rgba(0,0,0,0.95)_100%)]" )
                }`}
            style={{position:isStatic ? 'relative' : 'fixed'}}>
            <div className={`w-full overflow-hidden
                 ${isStatic ? "bg-black" : ((showSolid || isSticky || isDesktopMenuOpen || isMobileMenuOpen ) ? "bg-black" : "bg-transparent")}`}
                style={{height: isStatic  ? 'fit-content' : (!isSticky ? 'fit-content' : '0px')}}
                onClick={() => {setIsMobileMenuOpen(''); setIsDesktopMenuOpen('');}}>
                <TopBar/>
            </div>
            <nav className={`relative motion-safe:transition-all motion-reduce:transition-none will-change-auto  border-none 
                top-0 z-120 flex flex-col items-center justify-start text-center h-26 select-none px-4 lg:h-16 lg:justify-center xl:p-0
                ${isStatic ? "bg-linear-to-b from-black to-dark-gray" : ((showSolid || isSticky || isDesktopMenuOpen || isMobileMenuOpen ) ? "bg-linear-to-b from-black to-dark-gray" : "bg-transparent")}`} >
                <div className="w-full lg:h-full flex flex-none gap-4 items-center justify-center max-w-screen-lg  pt-2 pb-4 lg:gap-8 lg:mx-auto lg:p-0">
                    <span onClick={() => setIsMobileMenuOpen((prev) => !prev)} className="material-icons notranslate  aspect-square flex-none flex items-center justify-center text-[1.75rem] text-white 
                        motion-safe:transition-all motion-reduce:transition-none will-change-auto lg:hidden! h-6 w-6" 
                        style={{transform:`rotate(${isMobileMenuOpen ? "90" : "0"}deg)`}}>
                        menu
                    </span>
                    <CustomLink className="inline-block relative motion-safe:transition-all motion-reduce:transition-none will-change-auto  lg:hover:brightness-75
                    " href="/" onClick={() => {setIsMobileMenuOpen(''); setIsDesktopMenuOpen('');}}>
                        {
                            process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' &&
                            <span className="bg-[#379634] font-semibold text-black font-['lora'] text-xs! absolute right-0 top-0 
                                px-0.5 flex items-center justify-center gap-0.5 z-20">
                                <span className="material-symbols-outlined notranslate " style={{fontSize:'1rem'}}>
                                    code
                                </span>
                                DEV
                            </span>
                        }
                        <img width="200" height="40" className="w-[200px] lg:w-[460px] lg:mr-4" src="/logos/bed_boss_white_logo.png" alt="horizon trailers logo"/>
                        
                    </CustomLink>
                    <div className="hidden justify-evenly text-right w-full flex-wrap font-semibold lg:flex"> 
                        <SearchInput onInputClick={() => { setIsMobileMenuOpen(''); setIsDesktopMenuOpen(''); }}/>
                    </div>
                    {
                    user ? 
                    <div className="flex gap-2 items-center justify-end shrink-[1.25] w-full lg:gap-5">
                        
                        <div style={{color:isDesktopMenuOpen === 'BLOG_USER' ? "#6897d8" : ""}} 
                            className="font-['lora'] text-[1.5rem] flex items-center justify-evenly w-40 h-auto cursor-pointer text-white gap-2
                            px-5 lg:hover:text-primary-light-color! group motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative"  
                            name="BLOG_USER"
                            onClick={(e)=> {manageClickEvent("BLOG_USER",[{name:"LOG OUT", url:"#"}], e)}}
                            >
                            <div className="w-8 aspect-square backdrop-saturate-50 backdrop-blur-sm bg-black/50
                            flex items-center justify-center overflow-hidden overflow-none rounded-full border border-[#d4d4d4] 
                            group-hover:border-primary-color  motion-safe:transition-all motion-safe:duration-300 
                            motion-reduce:transition-none will-change-auto">
                                {
                                    user?.profileImage !== '' ?
                                    <IconViewer fullHeight={true} src={user?.profileImage}/>
                                    : 
                                    <span className="material-symbols-outlined notranslate " >
                                        person_outline
                                    </span>
                                }
                            </div>
                            <span className="pointer-events-none flex items-center justify-center text-shadow uppercase">
                                {t('account')}
                                <span className="material-symbols-outlined notranslate  pointer-events-none">
                                    {isDesktopMenuOpen === 'BLOG_USER' ? 'expand_less' : 'expand_more'}
                                </span> 
                            </span>
                        </div>
                    </div>
                    :
                    <div className="flex gap-2 items-center justify-end shrink-[1.25] w-full lg:gap-5">
                       {/* <CustomLink href="/find-a-dealer" className="motion-safe:transition-all motion-reduce:transition-none will-change-auto text-white min-w-10 flex items-center justify-center gap-2 font-['lora']
                            text-[1rem] cursor-pointer group" aria-label="Find your nearest dealer"
                            onClick={() => {setIsMobileMenuOpen(''); setIsDesktopMenuOpen('');}}>
                            <PlaceIcon width="28" height="28" className="h-6 w-6 flex-none text-primary-light-color" />
                            <span className="group-hover:text-primary-light-color text-white hidden lg:block">{t('findADealer')}</span>
                       </CustomLink> */}
                       <CustomLink href="/warranty-docs" className="motion-safe:transition-all motion-reduce:transition-none will-change-auto text-white min-w-10 flex items-center justify-center gap-2 font-['lora']
                            text-[1rem] cursor-pointer group" aria-label="Check everything about horizon trailers' warranty"
                            onClick={() => {setIsMobileMenuOpen(''); setIsDesktopMenuOpen('');}}>
                            <WrenchIcon width="28" height="28" className="h-6 w-6 flex-none text-primary-light-color" />
                            <span className="group-hover:text-primary-light-color text-white hidden lg:block">{t('warranty')}</span>
                       </CustomLink>
                       <LanguageSwitcher/>
                    </div>
                    }
                </div>
                <div className="flex items-center justify-center w-full lg:hidden">
                    <SearchInput id="searchBarMobile" onInputClick={() => { setIsMobileMenuOpen(''); setIsDesktopMenuOpen(''); }}/>
                </div>
            </nav>
            <div className={`w-full h-[2.5rem] ${isStatic ? "bg-dark-gray border-b-2 border-b-primary-color" : ((showSolid || isSticky || isDesktopMenuOpen || isMobileMenuOpen ) ? "bg-dark-gray border-b-2 border-b-primary-color" : "bg-transparent text-shadow font-bold")} 
            text-white hidden lg:flex gap-1 items-center justify-center select-none`}>
                <div className={`font-['lora'] text-white [&.opened]:text-primary-light-color text-[0.875rem] flex items-center uppercase justify-evenly min-w-40 w-fit h-auto cursor-pointer 
                    px-5 lg:hover:text-primary-light-color! motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative
                    ${isDesktopMenuOpen === 'PRODUCTS' ? 'opened' : ''}`} 
                    onClick={(e)=> {manageClickEvent("PRODUCTS",[], e)}}>
                    <span className="pointer-events-none">{t('products')}</span>
                    <span className="material-symbols-outlined notranslate  pointer-events-none h-6 w-6 flex items-center justify-center">
                        {isDesktopMenuOpen === 'PRODUCTS' ? 'expand_less' : 'expand_more'}
                    </span> 
                </div>

                <div className={`font-['lora'] text-white [&.opened]:text-primary-light-color text-[0.875rem] flex items-center uppercase justify-evenly min-w-40 w-fit h-auto cursor-pointer 
                    px-5 lg:hover:text-primary-light-color! motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative
                    ${isDesktopMenuOpen === 'COMPANY' ? 'opened' : ''}`} 
                    onClick={(e)=> {manageClickEvent("COMPANY",CompanyMenu[locale], e)}}>
                    <span className="pointer-events-none">{t('company')}</span>
                    <span className="material-symbols-outlined notranslate  pointer-events-none h-6 w-6 flex items-center justify-center">
                        {isDesktopMenuOpen === 'COMPANY' ? 'expand_less' : 'expand_more'}
                    </span> 
                </div>

                <div className={`font-['lora'] text-white [&.opened]:text-primary-light-color text-[0.875rem] flex items-center uppercase justify-evenly min-w-40 w-fit h-auto cursor-pointer 
                    px-5 lg:hover:text-primary-light-color! motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative
                    ${isDesktopMenuOpen === 'SUPPORT' ? 'opened' : ''}`} 
                    onClick={(e)=> {manageClickEvent("SUPPORT",SupportMenu[locale], e)}}>
                    <span className="pointer-events-none">{t('support')}</span>
                    <span className="material-symbols-outlined notranslate  pointer-events-none h-6 w-6 flex items-center justify-center">
                        {isDesktopMenuOpen === 'SUPPORT' ? 'expand_less' : 'expand_more'}
                    </span> 
                </div>

                {/* <div className={`font-['lora'] text-white [&.opened]:text-primary-light-color text-[0.875rem] flex items-center uppercase justify-evenly min-w-40 w-fit h-auto cursor-pointer 
                    px-5 lg:hover:text-primary-light-color! motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative
                    ${isDesktopMenuOpen === 'FINANCING' ? 'opened' : ''}`} 
                    onClick={(e)=> {manageClickEvent("FINANCING",FinancingMenu[locale], e)}}>
                    <span className="pointer-events-none">{t('financing')}</span>
                    <span className="material-symbols-outlined notranslate  pointer-events-none h-6 w-6 flex items-center justify-center">
                        {isDesktopMenuOpen === 'FINANCING' ? 'expand_less' : 'expand_more'}
                    </span> 
                </div> */}
            </div>
            <ProductsDesktopMenu isSticky={isSticky} 
                isOpen={isDesktopMenuOpen === 'PRODUCTS'} isOpenCallback={ (res) => setIsDesktopMenuOpen('') }/>
            <DropdownMenu isSticky={isSticky} menu={selectedMenuData} isShowing={isDesktopMenuOpen !== '' && isDesktopMenuOpen !== 'PRODUCTS'} 
                xPos={xPos} isOpenCallback={ (res) => {setIsDesktopMenuOpen(''); router.refresh()} }/>
            <NavbarMobileMenu showMenu={isMobileMenuOpen} isSticky={isSticky}
                menuList={{CompanyMenu, SupportMenu, FinancingMenu, }} 
                isOpenCallback={(res) => setIsMobileMenuOpen(res)}/>
        </div>
    );
    //#endregion
}
export default NavBar