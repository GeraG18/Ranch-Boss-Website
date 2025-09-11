'use client' // Renders on client side
import React, {useState, useEffect, useCallback, useRef} from "react";
import TopBar from "./top_bar";
import CompanyMenu from "@/jsons/dropdowns/company_dropdown.json"
import SupportMenu from "@/jsons/dropdowns/support_dropdown.json"
import FinancingMenu from "@/jsons/dropdowns/financing_dropdown.json";
import NavbarMobileMenu from "./nav_bar_mobile_menu";
import { useAlertsProvider } from "../../context/alert_context";
import PlaceIcon from "../icons/place_icon";
import WrenchIcon from "../icons/wrench_icon";
import ProductsDesktopMenu from "./products_desktop_menu";
import HybridMenu from "./hybrid_menu/hybrid_menu";
import DropdownMenu from "./dropdown_menu";
import SearchInput from "./search_input";
// import LanguageSwitcher from "@/components/general/language_switcher";
import { useLocale, useTranslations } from "next-intl";
import CustomLink from "@/components/general/custom_link"
import { useRouter } from "next/navigation";
import RbLogoVerticalWeathered from "@/components/icons/logotypes/logo-vertical-weathered"


function NavBar({showRouteBar = false, isStatic=false}){

    //#region code
    const t = useTranslations('PagesTitles');
    const locale = useLocale();
    const router = useRouter();
    // const language = getInsecureCookie('NEXT_LOCALE');
    //variables
    const [selectedMenuData, setSelectedMenuData] = useState([]);
    const { isNavSticky } = useAlertsProvider();
    const [isSticky, setIsSticky] = useState(false);
    const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [xPos, setXPos] = useState(0);

    

    let getKey = useCallback(
        (location, matches) => {
          let match = matches.find((m) => (m.handle)?.scrollMode);
          if ((match?.handle)?.scrollMode === "pathname") {
            return location.pathname;
          }
    
          return location.key;
        },
        []
    ); 

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
        <div className="top-0 z-400 w-full" style={{position: isStatic ? 'relative' : 'fixed', background: isSticky ? '#1D2639' : 
            'linear-gradient(0deg,rgba(0, 0, 0, 0) 0%,rgba(23, 23, 23, 0.35) 29%,rgba(36, 36, 36, 0.45) 50%,rgba(36, 36, 36, 0.55) 75%,rgba(36, 36, 36, 0.75) 100%)',
            border:'none', borderBottom: isSticky ? '2px solid #D38F27' : 'none'
        }}>
            <div className="w-full motion-safe:transition-all motion-reduce:transition-none will-change-auto z-140 relative" 
                // style={{height: isStatic  ? 'fit-content' : (!isSticky ? 'fit-content' : '0px')}}
                onClick={() => {setIsMobileMenuOpen(''); setIsDesktopMenuOpen('');}}>
                <TopBar/>
            </div>
            <div className="hidden lg:flex m-4 lg:mx-auto max-w-screen-lg flex-col gap-1 items-center justify-center">
                {/* DIVIDER HERE */}
                <div className="w-full h-0.5 bg-secondary-color-20"></div>
                <div className="w-3/4 h-0.5 bg-secondary-color-20"></div>
            </div>
            <nav className="relative motion-safe:transition-all motion-reduce:transition-none will-change-auto border-none 
                top-0 z-120 flex flex-col items-center justify-start text-center h-fit select-none px-4 lg:h-16 lg:justify-center xl:p-0" >
                <div className="w-full lg:h-full flex flex-none gap-4 items-center justify-center max-w-screen-lg  pt-2 pb-4 lg:gap-8 lg:mx-auto lg:p-0">
                     <div className={`font-['oswald'] text-secondary-color-20 [&.opened]:text-secondary-color text-[0.875rem] hidden lg:flex items-center uppercase justify-evenly min-w-40 w-fit h-auto cursor-pointer 
                        px-5 lg:hover:text-secondary-color font-medium motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative
                        ${isDesktopMenuOpen === 'PRODUCTS' ? 'opened' : ''}`} 
                        onClick={(e)=> {manageClickEvent("PRODUCTS",[], e)}}>
                        <span className="pointer-events-none">{t('products')}</span>
                        <span className="material-symbols-outlined notranslate  pointer-events-none h-6 w-6 flex items-center justify-center">
                            {isDesktopMenuOpen === 'PRODUCTS' ? 'expand_less' : 'expand_more'}
                        </span> 
                    </div>

                    <div className={`font-['oswald'] text-secondary-color-20 [&.opened]:text-secondary-color text-[0.875rem] hidden lg:flex items-center uppercase justify-evenly min-w-40 w-fit h-auto cursor-pointer 
                        px-5 lg:hover:text-secondary-color font-medium motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative
                        ${isDesktopMenuOpen === 'COMPANY' ? 'opened' : ''}`} 
                        onClick={(e)=> {manageClickEvent("COMPANY",CompanyMenu[locale], e)}}>
                        <span className="pointer-events-none">{t('company')}</span>
                        <span className="material-symbols-outlined notranslate  pointer-events-none h-6 w-6 flex items-center justify-center">
                            {isDesktopMenuOpen === 'COMPANY' ? 'expand_less' : 'expand_more'}
                        </span> 
                    </div>
                    {/* onClick={() => setIsMobileMenuOpen((prev) => !prev)} */}
                    <span onClick={(e) => {manageClickEvent("SUPPORT",SupportMenu[locale], e)}} className="material-icons notranslate  aspect-square flex-none flex items-center justify-center text-[1.75rem] text-secondary-color-20 
                        motion-safe:transition-all motion-reduce:transition-none will-change-auto lg:hidden! h-6 w-6" 
                        style={{transform:`rotate(${isMobileMenuOpen ? "90" : "0"}deg)`}}>
                        menu
                    </span>
                    <CustomLink 
                        className="flex flex-col items-center justify-center relative motion-safe:transition-all motion-reduce:transition-none will-change-auto  *lg:hover:brightness-75" 
                        href="/" onClick={() => {setIsMobileMenuOpen(''); setIsDesktopMenuOpen('');}}
                    >
                        {
                            process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' &&
                            <span className="bg-[#379634] font-semibold text-black font-['lora'] text-xs! absolute bottom-1/2 right-0
                                px-0.5 flex items-center justify-center gap-0.5 z-20">
                                <span className="material-symbols-outlined notranslate " style={{fontSize:'1rem'}}>
                                    code
                                </span>
                            </span>
                        }
                        {/* <img width="200" height="40" className="h-fit lg:mr-4" src="/logos/bed_boss_white_logo.png" alt="horizon trailers logo"/> */}
                        <RbLogoVerticalWeathered className="text-secondary-color-20 lg:hover:text-secondary-color h-16"/>
                    </CustomLink>
                    <span className="material-icons notranslate  aspect-square flex-none flex items-center justify-center text-[1.75rem] text-transparent 
                        motion-safe:transition-all motion-reduce:transition-none will-change-auto lg:hidden! h-6 w-6 pointer-events-none opacity-0" >
                        menu
                    </span>

                    <div className={`font-['oswald'] text-secondary-color-20 [&.opened]:text-secondary-color text-[0.875rem] hidden lg:flex items-center uppercase justify-evenly min-w-40 w-fit h-auto cursor-pointer 
                        px-5 lg:hover:text-secondary-color font-medium motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative
                        ${isDesktopMenuOpen === 'SUPPORT' ? 'opened' : ''}`} 
                        onClick={(e)=> {manageClickEvent("SUPPORT",SupportMenu[locale], e)}}>
                        <span className="pointer-events-none">{t('support')}</span>
                        <span className="material-symbols-outlined notranslate  pointer-events-none h-6 w-6 flex items-center justify-center">
                            {isDesktopMenuOpen === 'SUPPORT' ? 'expand_less' : 'expand_more'}
                        </span> 
                    </div>

                    <div className={`font-['oswald'] text-secondary-color-20 [&.opened]:text-secondary-color text-[0.875rem] hidden lg:flex items-center uppercase justify-evenly min-w-40 w-fit h-auto cursor-pointer 
                        px-5 lg:hover:text-secondary-color font-medium motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative
                        ${isDesktopMenuOpen === 'FINANCING' ? 'opened' : ''}`} 
                        onClick={(e)=> {manageClickEvent("FINANCING",FinancingMenu[locale], e)}}>
                        <span className="pointer-events-none">{t('financing')}</span>
                        <span className="material-symbols-outlined notranslate  pointer-events-none h-6 w-6 flex items-center justify-center">
                            {isDesktopMenuOpen === 'FINANCING' ? 'expand_less' : 'expand_more'}
                        </span> 
                    </div>
            
                    {/* <div className="hidden justify-evenly text-right w-full flex-wrap font-semibold lg:flex"> 
                        <SearchInput onInputClick={() => { setIsMobileMenuOpen(''); setIsDesktopMenuOpen(''); }}/>
                    </div> */}
                    {/* <div className="flex gap-2 items-center justify-end shrink-[1.25] w-full lg:gap-5">
                       <CustomLink href="/find-a-dealer" className="motion-safe:transition-all motion-reduce:transition-none will-change-auto text-secondary-color-20 min-w-10 flex items-center justify-center gap-2 font-['lora']
                            text-[1rem] cursor-pointer group" aria-label="Find your nearest dealer"
                            onClick={() => {setIsMobileMenuOpen(''); setIsDesktopMenuOpen('');}}>
                            <PlaceIcon width="28" height="28" className="h-6 w-6 flex-none text-primary-light-color" />
                            <span className="group-hover:text-primary-light-color text-secondary-color-20 hidden lg:block">{t('findADealer')}</span>
                       </CustomLink>
                       <CustomLink href="/warranty-docs" className="motion-safe:transition-all motion-reduce:transition-none will-change-auto text-secondary-color-20 min-w-10 flex items-center justify-center gap-2 font-['lora']
                            text-[1rem] cursor-pointer group" aria-label="Check everything about horizon trailers' warranty"
                            onClick={() => {setIsMobileMenuOpen(''); setIsDesktopMenuOpen('');}}>
                            <WrenchIcon width="28" height="28" className="h-6 w-6 flex-none text-primary-light-color" />
                            <span className="group-hover:text-primary-light-color text-secondary-color-20 hidden lg:block">{t('warranty')}</span>
                       </CustomLink>
                    </div> */}
                </div>
                {/* <div className="flex items-center justify-center w-full lg:hidden">
                    <SearchInput id="searchBarMobile" onInputClick={() => { setIsMobileMenuOpen(''); setIsDesktopMenuOpen(''); }}/>
                </div> */}
            </nav>
            {/* <div className="w-full h-[2.5rem] bg-dark-gray text-secondary-color-20 border-b-2 border-b-primary-color hidden lg:flex gap-1 items-center justify-center backdrop-blur-sm backdrop-saturate-50 select-none">
                <div className={`font-['lora'] text-secondary-color-20 [&.opened]:text-secondary-color text-[0.875rem] flex items-center uppercase justify-evenly min-w-40 w-fit h-auto cursor-pointer 
                    px-5 lg:hover:text-secondary-color font-bold motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative
                    ${isDesktopMenuOpen === 'PRODUCTS' ? 'opened' : ''}`} 
                    onClick={(e)=> {manageClickEvent("PRODUCTS",[], e)}}>
                    <span className="pointer-events-none">{t('products')}</span>
                    <span className="material-symbols-outlined notranslate  pointer-events-none h-6 w-6 flex items-center justify-center">
                        {isDesktopMenuOpen === 'PRODUCTS' ? 'expand_less' : 'expand_more'}
                    </span> 
                </div>

                <div className={`font-['lora'] text-secondary-color-20 [&.opened]:text-secondary-color text-[0.875rem] flex items-center uppercase justify-evenly min-w-40 w-fit h-auto cursor-pointer 
                    px-5 lg:hover:text-secondary-color font-bold motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative
                    ${isDesktopMenuOpen === 'COMPANY' ? 'opened' : ''}`} 
                    onClick={(e)=> {manageClickEvent("COMPANY",CompanyMenu[locale], e)}}>
                    <span className="pointer-events-none">{t('company')}</span>
                    <span className="material-symbols-outlined notranslate  pointer-events-none h-6 w-6 flex items-center justify-center">
                        {isDesktopMenuOpen === 'COMPANY' ? 'expand_less' : 'expand_more'}
                    </span> 
                </div>

                <div className={`font-['lora'] text-secondary-color-20 [&.opened]:text-secondary-color text-[0.875rem] flex items-center uppercase justify-evenly min-w-40 w-fit h-auto cursor-pointer 
                    px-5 lg:hover:text-secondary-color font-bold motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative
                    ${isDesktopMenuOpen === 'SUPPORT' ? 'opened' : ''}`} 
                    onClick={(e)=> {manageClickEvent("SUPPORT",SupportMenu[locale], e)}}>
                    <span className="pointer-events-none">{t('support')}</span>
                    <span className="material-symbols-outlined notranslate  pointer-events-none h-6 w-6 flex items-center justify-center">
                        {isDesktopMenuOpen === 'SUPPORT' ? 'expand_less' : 'expand_more'}
                    </span> 
                </div>

                <div className={`font-['lora'] text-secondary-color-20 [&.opened]:text-secondary-color text-[0.875rem] flex items-center uppercase justify-evenly min-w-40 w-fit h-auto cursor-pointer 
                    px-5 lg:hover:text-secondary-color font-bold motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative
                    ${isDesktopMenuOpen === 'FINANCING' ? 'opened' : ''}`} 
                    onClick={(e)=> {manageClickEvent("FINANCING",FinancingMenu[locale], e)}}>
                    <span className="pointer-events-none">{t('financing')}</span>
                    <span className="material-symbols-outlined notranslate  pointer-events-none h-6 w-6 flex items-center justify-center">
                        {isDesktopMenuOpen === 'FINANCING' ? 'expand_less' : 'expand_more'}
                    </span> 
                </div>
            </div> */}
            <HybridMenu isOpen={isDesktopMenuOpen} isOpenCallback={ (res) => setIsDesktopMenuOpen('') }/>
            {/* <ProductsDesktopMenu isSticky={isSticky} 
                isOpen={isDesktopMenuOpen === 'PRODUCTS'} isOpenCallback={ (res) => setIsDesktopMenuOpen('') }/>
            <DropdownMenu isSticky={isSticky} menu={selectedMenuData} isShowing={isDesktopMenuOpen !== '' && isDesktopMenuOpen !== 'PRODUCTS'} 
                xPos={xPos} isOpenCallback={ (res) => {setIsDesktopMenuOpen(''); router.refresh()} }/>
            <NavbarMobileMenu showMenu={isMobileMenuOpen} isSticky={isSticky}
                menuList={{CompanyMenu, SupportMenu, FinancingMenu, }} 
                isOpenCallback={(res) => setIsMobileMenuOpen(res)}/> */}
        </div>
    );
    //#endregion
}
export default NavBar