'use client' // Renders on client side
import React, {useState, useEffect, useCallback, useRef} from "react";
// import { Link, ScrollRestoration } from "react-router-dom";
import Link from "next/link";
import TopBar from "@/components/general/top_bar";
import CompanyMenu from "@/jsons/dropdowns/company_dropdown.json"
import SupportMenu from "@/jsons/dropdowns/support_dropdown.json"
import FinancingMenu from "@/jsons/dropdowns/financing_dropdown.json";
import NavbarMobileMenu from "@/components/general/nav_bar_mobile_menu";
import { useAlertsProvider } from "@/context/alert_context";
import PlaceIcon from "@/components/icons/place_icon";
import WrenchIcon from "@/components/icons/wrench_icon";
import ProductsDesktopMenu from "@/components/general/products_desktop_menu";
import DropdownMenu from "@/components/general/dropdown_menu";
import SearchInput from "@/components/general/search_input";
import ShoppingBagIcon from "@/components/icons/shopping_bag_icon";
import CartIcon from "@/components/icons/cart_icon";
import { useMerchandiseContext } from "@/context/merchandise_cart_context";
import { useLocale, useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/general/language_switcher"


function MerchandiseNavbar({showRouteBar = false, isStatic=false}){
    
    //#region code
    const t = useTranslations('PagesTitles');
    const locale = useLocale()
    //variables
    const { cartQuantity } = useMerchandiseContext();
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
        // 
        setXPos(event.target.getBoundingClientRect().left)
    }
 
    useEffect(() => {
        setIsSticky(isNavSticky);
        
    }, [isNavSticky])

    useEffect(() => {        
        const mediaQuery = window.matchMedia("(min-width: 1024px)");
        // setIsDesktop(mediaQuery.matches)

        const onMediaChange = (event) => {
            // if (event.matches) {
            //     // The viewport is 600 pixels wide or less
            //     
                
            // } else {
            //     // The viewport is more than 600 pixels wide
            //     
            // }
            setIsMobileMenuOpen(''); setIsDesktopMenuOpen('');
            // setIsDesktop(event.matches)
        }

        mediaQuery.addEventListener("change", onMediaChange);

        return () => {
            // componentwillunmount
            mediaQuery.removeEventListener("change",onMediaChange)
        }
    }, [])

    /* #endregion */

    //#region view
    return(
        <div className="top-0 z-400"
            style={{width:isStatic ? 'auto' : '100%', position:isStatic ? 'relative' : 'fixed'}}>
            <div className="w-full overflow-hidden motion-safe:transition-all motion-reduce:transition-none will-change-auto" 
                style={{height: isStatic  ? 'fit-content' : (!isSticky ? 'fit-content' : '0px')}}
                onClick={() => {setIsMobileMenuOpen(''); setIsDesktopMenuOpen('');}}>
                <TopBar/>
            </div>
            <nav className="relative motion-safe:transition-all motion-reduce:transition-none will-change-auto bg-[#1c1c1e] border-none shadow-2xl 
                top-0 z-120 flex flex-col items-center justify-start text-center h-26 select-none px-4 lg:h-16 lg:justify-center xl:p-0" >
                <div className="w-full flex flex-none gap-4 items-center justify-center max-w-screen-lg  pt-2 pb-4 lg:gap-8 lg:mx-auto lg:p-0">
                    <span onClick={() => setIsMobileMenuOpen((prev) => !prev)} className="material-icons notranslate  aspect-square flex-none flex items-center justify-center text-[1.75rem] text-white 
                        motion-safe:transition-all motion-reduce:transition-none will-change-auto lg:hidden!" style={{transform:`rotate(${isMobileMenuOpen ? "90" : "0"}deg)`}}>
                        menu
                    </span>
                    <Link className="inline-block relative motion-safe:transition-all motion-reduce:transition-none will-change-auto  lg:hover:brightness-75" href="/" onClick={() => {setIsMobileMenuOpen(''); setIsDesktopMenuOpen('');}}>
                        {
                            process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' &&
                            <span className="bg-[#379634] font-semibold text-black font-['lora'] text-sm absolute right-0 top-0 
                                px-0.5 flex items-center justify-center gap-0.5">
                                <span className="material-symbols-outlined notranslate " style={{fontSize:'1rem'}}>
                                    code
                                </span>
                                DEV
                            </span>
                        }
                        <img className="w-[200px] lg:w-[460px] lg:mr-4" src="/logos/HorizonTrailers-logo,whiteorangegrey.png" alt="horizon trailers logo"/>
                    </Link>
                    <div className="hidden justify-evenly text-right w-full flex-wrap font-semibold lg:flex"> 
                        <SearchInput onInputClick={() => { setIsMobileMenuOpen(''); setIsDesktopMenuOpen(''); }}/>
                    </div>
                    <div className="flex gap-2 items-center justify-end shrink-[1.25] w-full lg:gap-5">

                       <Link href="/merchandise" className="motion-safe:transition-all motion-reduce:transition-none will-change-auto text-white min-w-10 flex items-center justify-center gap-2 font-['lora']
                            text-[1rem] cursor-pointer group" >
                             <ShoppingBagIcon width="28" height="28" color="#6897d8"/>
                             <span className="group-hover:text-primary-color hidden lg:block">{t('merchandise')}</span>
                        </Link>
                        <Link href="/merchandise/cart" className="motion-safe:transition-all motion-reduce:transition-none will-change-auto text-white min-w-10 flex items-center justify-center gap-2 font-['lora']
                            text-[1rem] cursor-pointer group relative" >
                             <CartIcon width="28" height="28" color="#6897d8" /> 
                             {
                                 cartQuantity > 0 &&
                                <div className="absolute -top-1 left-4 bg-primary-color border border-white
                                text-white text-[0.75rem] font-medium aspect-square w-[0.8rem] flex items-center
                                justify-center flex-none px-[0.15rem] rounded-full">{cartQuantity}</div>
                            }
                           <span className="group-hover:text-primary-color hidden lg:block">{t('cart')}</span>
                        </Link>
                        <LanguageSwitcher/>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full lg:hidden">
                    <SearchInput id="searchBarMobile" onInputClick={() => { setIsMobileMenuOpen(''); setIsDesktopMenuOpen(''); }}/>
                </div>
            </nav>
            <div className="w-full h-f bg-[rgba(255,255,255,0.8)] border-b-2 border-b-[#eeeeee] hidden lg:flex items-center justify-center backdrop-blur-sm backdrop-saturate-50 select-none">
            <div style={{color:isDesktopMenuOpen === 'PRODUCTS' ? "#6897d8" : "#000"}} 
                    className="font-['lora'] text-[1.5rem] flex items-center uppercase justify-evenly w-40 h-auto text-black cursor-pointer 
                    px-5 lg:hover:text-secondary-color! motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative" 
                    onClick={(e)=> {manageClickEvent("PRODUCTS",[], e)}}>
                    <span className="pointer-events-none">{t('products')}</span>
                    <span className="material-symbols-outlined notranslate  pointer-events-none h-6 w-6 flex items-center justify-center">
                        {isDesktopMenuOpen === 'PRODUCTS' ? 'expand_less' : 'expand_more'}
                    </span> 
                </div>

                <div style={{color:isDesktopMenuOpen === 'COMPANY' ? "#6897d8" : "#000"}} 
                    className="font-['lora'] text-[1.5rem] flex items-center uppercase justify-evenly w-40 h-auto text-black cursor-pointer 
                    px-5 lg:hover:text-secondary-color! motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative" 
                    onClick={(e)=> {manageClickEvent("COMPANY",CompanyMenu[locale], e)}}
                    >
                    <span className="pointer-events-none">{t('company')}</span>
                    <span className="material-symbols-outlined notranslate  pointer-events-none h-6 w-6 flex items-center justify-center">
                        {isDesktopMenuOpen === 'COMPANY' ? 'expand_less' : 'expand_more'}
                    </span> 
                </div>
                
                <div style={{color:isDesktopMenuOpen === 'SUPPORT' ? "#6897d8" : "#000"}} 
                    className="font-['lora'] text-[1.5rem] flex items-center uppercase justify-evenly w-40 h-auto text-black cursor-pointer 
                    px-5 lg:hover:text-secondary-color! motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative"  
                    onClick={(e)=> {manageClickEvent("SUPPORT",SupportMenu[locale], e)}}
                    >
                    <span className="pointer-events-none">{t('support')}</span>
                    <span className="material-symbols-outlined notranslate  pointer-events-none h-6 w-6 flex items-center justify-center">
                        {isDesktopMenuOpen === 'SUPPORT' ? 'expand_less' : 'expand_more'}
                    </span> 
                </div>
                <div style={{color:isDesktopMenuOpen === 'FINANCING' ? "#6897d8" : "#000"}} 
                    className="font-['lora'] text-[1.5rem] flex items-center uppercase justify-evenly w-40 h-auto text-black cursor-pointer 
                    px-5 lg:hover:text-secondary-color! motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto relative" 
                    onClick={(e)=> {manageClickEvent("FINANCING",FinancingMenu[locale], e)}}
                    >
                    <span className="pointer-events-none">{t('financing')}</span>
                    <span className="material-symbols-outlined notranslate  pointer-events-none h-6 w-6 flex items-center justify-center">
                        {isDesktopMenuOpen === 'FINANCING' ? 'expand_less' : 'expand_more'}
                    </span> 
                </div>
            </div>
            <ProductsDesktopMenu isSticky={isSticky} 
                isOpen={isDesktopMenuOpen === 'PRODUCTS'} isOpenCallback={ (res) => setIsDesktopMenuOpen('') }/>
            <DropdownMenu isSticky={isSticky} menu={selectedMenuData} isShowing={isDesktopMenuOpen !== '' && isDesktopMenuOpen !== 'PRODUCTS'} 
                xPos={xPos} isOpenCallback={ (res) => setIsDesktopMenuOpen('') }/>
            <NavbarMobileMenu showMenu={isMobileMenuOpen} isSticky={isSticky}
                menuList={{CompanyMenu, SupportMenu, FinancingMenu, }} 
                isOpenCallback={(res) => setIsMobileMenuOpen(res)}/>
        </div>
    );
    //#endregion
}
export default MerchandiseNavbar