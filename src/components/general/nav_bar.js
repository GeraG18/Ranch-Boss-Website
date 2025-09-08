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
import DropdownMenu from "./dropdown_menu";
import SearchInput from "./search_input";
import LanguageSwitcher from "@/components/general/language_switcher";
import { useLocale, useTranslations } from "next-intl";
import CustomLink from "@/components/general/custom_link"
import { useRouter } from "next/navigation";


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
        <div className="top-0 z-400 w-full"
            style={{position:isStatic ? 'relative' : 'fixed'}}>
            <div className="w-full overflow-hidden motion-safe:transition-all motion-reduce:transition-none will-change-auto" 
                style={{height: isStatic  ? 'fit-content' : (!isSticky ? 'fit-content' : '0px')}}
                onClick={() => {setIsMobileMenuOpen(''); setIsDesktopMenuOpen('');}}>
                <TopBar/>
            </div>
            <nav className="relative motion-safe:transition-all motion-reduce:transition-none will-change-auto bg-linear-to-b from-black to-dark-gray border-none shadow-2xl 
                top-0 z-120 flex flex-col items-center justify-start text-center h-26 select-none px-4 lg:h-16 lg:justify-center xl:p-0" >
                <div className="w-full lg:h-full flex flex-none gap-4 items-center justify-center max-w-(--breakpoint-xl) pt-2 pb-4 lg:gap-8 lg:mx-auto lg:p-0">
                    <span onClick={() => setIsMobileMenuOpen((prev) => !prev)} className="material-icons notranslate  aspect-square flex-none flex items-center justify-center text-[1.75rem] text-white 
                        motion-safe:transition-all motion-reduce:transition-none will-change-auto lg:hidden! h-6 w-6" 
                        style={{transform:`rotate(${isMobileMenuOpen ? "90" : "0"}deg)`}}>
                        menu
                    </span>
                    <CustomLink className="inline-block relative motion-safe:transition-all motion-reduce:transition-none will-change-auto  lg:hover:brightness-75
                    " href="/" onClick={() => {setIsMobileMenuOpen(''); setIsDesktopMenuOpen('');}}>
                        {
                            process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' &&
                            <span className="bg-[#379634] font-semibold text-black font-['Montserrat'] text-xs! absolute right-0 top-0 
                                rounded-[10px] px-0.5 flex items-center justify-center gap-0.5 z-20">
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
                    <div className="flex gap-2 items-center justify-end shrink-[1.25] w-full lg:gap-5">
                       {/* <CustomLink href="/find-a-dealer" className="motion-safe:transition-all motion-reduce:transition-none will-change-auto text-white min-w-10 flex items-center justify-center gap-2 font-['Montserrat']
                            text-[1rem] cursor-pointer group" aria-label="Find your nearest dealer"
                            onClick={() => {setIsMobileMenuOpen(''); setIsDesktopMenuOpen('');}}>
                            <PlaceIcon width="28" height="28" className="h-6 w-6 flex-none text-primary-light-color" />
                            <span className="group-hover:text-primary-light-color text-white hidden lg:block">{t('findADealer')}</span>
                       </CustomLink> */}
                       <CustomLink href="/warranty-docs" className="motion-safe:transition-all motion-reduce:transition-none will-change-auto text-white min-w-10 flex items-center justify-center gap-2 font-['Montserrat']
                            text-[1rem] cursor-pointer group" aria-label="Check everything about horizon trailers' warranty"
                            onClick={() => {setIsMobileMenuOpen(''); setIsDesktopMenuOpen('');}}>
                            <WrenchIcon width="28" height="28" className="h-6 w-6 flex-none text-primary-light-color" />
                            <span className="group-hover:text-primary-light-color text-white hidden lg:block">{t('warranty')}</span>
                       </CustomLink>
                       <LanguageSwitcher/>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full lg:hidden">
                    <SearchInput id="searchBarMobile" onInputClick={() => { setIsMobileMenuOpen(''); setIsDesktopMenuOpen(''); }}/>
                </div>
            </nav>
            <div className="w-full h-[2.5rem] bg-dark-gray text-white border-b-2 border-b-primary-color hidden lg:flex gap-1 items-center justify-center backdrop-blur-sm backdrop-saturate-50 select-none">
                <div className={`font-['Michroma'] text-white [&.opened]:text-primary-light-color text-[0.875rem] flex items-center uppercase justify-evenly min-w-40 w-fit h-auto cursor-pointer 
                    px-5 lg:hover:text-primary-light-color! font-bold motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative
                    ${isDesktopMenuOpen === 'PRODUCTS' ? 'opened' : ''}`} 
                    onClick={(e)=> {manageClickEvent("PRODUCTS",[], e)}}>
                    <span className="pointer-events-none">{t('products')}</span>
                    <span className="material-symbols-outlined notranslate  pointer-events-none h-6 w-6 flex items-center justify-center">
                        {isDesktopMenuOpen === 'PRODUCTS' ? 'expand_less' : 'expand_more'}
                    </span> 
                </div>

                <div className={`font-['Michroma'] text-white [&.opened]:text-primary-light-color text-[0.875rem] flex items-center uppercase justify-evenly min-w-40 w-fit h-auto cursor-pointer 
                    px-5 lg:hover:text-primary-light-color! font-bold motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative
                    ${isDesktopMenuOpen === 'COMPANY' ? 'opened' : ''}`} 
                    onClick={(e)=> {manageClickEvent("COMPANY",CompanyMenu[locale], e)}}>
                    <span className="pointer-events-none">{t('company')}</span>
                    <span className="material-symbols-outlined notranslate  pointer-events-none h-6 w-6 flex items-center justify-center">
                        {isDesktopMenuOpen === 'COMPANY' ? 'expand_less' : 'expand_more'}
                    </span> 
                </div>

                <div className={`font-['Michroma'] text-white [&.opened]:text-primary-light-color text-[0.875rem] flex items-center uppercase justify-evenly min-w-40 w-fit h-auto cursor-pointer 
                    px-5 lg:hover:text-primary-light-color! font-bold motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative
                    ${isDesktopMenuOpen === 'SUPPORT' ? 'opened' : ''}`} 
                    onClick={(e)=> {manageClickEvent("SUPPORT",SupportMenu[locale], e)}}>
                    <span className="pointer-events-none">{t('support')}</span>
                    <span className="material-symbols-outlined notranslate  pointer-events-none h-6 w-6 flex items-center justify-center">
                        {isDesktopMenuOpen === 'SUPPORT' ? 'expand_less' : 'expand_more'}
                    </span> 
                </div>

                {/* <div className={`font-['Michroma'] text-white [&.opened]:text-primary-light-color text-[0.875rem] flex items-center uppercase justify-evenly min-w-40 w-fit h-auto cursor-pointer 
                    px-5 lg:hover:text-primary-light-color! font-bold motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative
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