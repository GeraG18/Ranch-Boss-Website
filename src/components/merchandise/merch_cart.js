'use client' // Renders on client side
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useMerchandiseContext } from "@/context/merchandise_cart_context";
import MerchandiseCartMenuItem from "@/components/merchandise/merchandise_cart_menu_item";
// import { CheckoutForm } from "@/components/merchandise/checkout_form";
/* STRIPE */
import {loadStripe} from '@stripe/stripe-js';
import { useAlertsProvider } from "@/context/alert_context";
import { EmbeddedCheckout, EmbeddedCheckoutProvider, AddressElement } from "@stripe/react-stripe-js";
import TrailerShadowIcon from "@/components/icons/dump_trailer_shadow_icon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";

const MerchandiseCart = () => {

    const { cartQuantity, cartTotal, formatedMerchCart, deleteLSMerchCart } = useMerchandiseContext();
    
    const router = useRouter();
    const t = useTranslations('Merchandise.Cart')
    const pT = useTranslations('PagesTitles')
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const { addAlert } = useAlertsProvider();
    const [cartStep, setCartStep] = useState(0);
    const [sessionParam, setSessionParam] = useState(null);
    const [session, setSession] = useState({});
    const [priceEl, setPriceEl] = useState({});
    const [expandBar, setExpandBar] = useState(false);
    const {reachesBottom} = useAlertsProvider();
    const [stripePromise, setStripePromise] = useState(() => {});
    const iconDictionary = {
        open: "info",
        complete: "check_circle",
        // warning: "warning",
        expired: "error",
    };

    const setQueryParam = (param, value) => {
        params.set(param, value);
        router.push(`${pathname}${params.size > 0 ? "?" : ""}${params.toString()}`);
    };

    //useQuery is a function to get the query params of the route params
    // function useQuery() {
    //     const { search } = useLocation();
    //     return React.useMemo(() => new URLSearchParams(search), [search]);
    // }

    // let query = useQuery();

    async function fetchData(sId) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRIPE_FUNCTION_URL}/session-status?session_id=${sId}`)
            if (response.ok) {
                const data = await response.json()
                
                setSession(data);
                setNewQueryParams(4);
            } else {
                setNewQueryParams(0);
                addAlert('Error processing your payment, try later');
            }
        } catch (error) {
            setNewQueryParams(0);
            addAlert('Error processing your payment, try later');
        }
    }

    useEffect(() => {
        let step = (searchParams.get('step'));//getting the query param called financer
        let sessionId = (searchParams.get('session_id'));//getting the query param called financer
        setSessionParam(sessionId)
        if(step !== null) {
            setCartStep(+step);
        }

        if(sessionId !== null) {
            
            fetchData(sessionId)
            // fetch(`${process.env.NEXT_PUBLIC_STRIPE_FUNCTION_URL}/session-status?session_id=${sessionId}`)
            //     .then((res) => res.json())
            //     .then((data) => {
            //         setSession(data);
            //         
            //         setNewQueryParams(4);
            // });
        }
    }, [searchParams]);

    const fetchClientSecret = useCallback(() => {
        // Create a Checkout Session
        
        return fetch(`${process.env.NEXT_PUBLIC_STRIPE_FUNCTION_URL}/create-checkout-session`, {
        method: "POST",
        body: JSON.stringify({
            priceId: priceEl['id']
        })
        }).then((res) => res.json()).then((data) => data.clientSecret);
      
      
    }, [priceEl]);

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }

    const convertDllToCents = (integer) => (+integer * 100);

    const loadPriceFromStripe = async () => {

        

        fetch(`${process.env.NEXT_PUBLIC_STRIPE_FUNCTION_URL}/create-price-for-checkout`, {
            method: "POST",
            body: JSON.stringify({
                price: convertDllToCents(cartTotal)
            })
        }).then(response => response.json()).then(data => {
            
            setPriceEl(data)
            setNewQueryParams(2)
        });
    }

    const setNewQueryParams = (value) => {
        setQueryParam("step",value);
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const doCartLogic = async () => {
        
        //TODO: UNCOMMENT EVERYTHING WHEN RANDY CONFIGURES THE STRIPE ACCOUNT
        switch (cartStep) {
            // case 0:
                //do something
                // break;
            // case 1:
                // loadPriceFromStripe();
                //do something
                // break;
            // case 2:
                // break;
            // case 3:
                // if(sessionParam === null) {
                //     setNewQueryParams(0);
                // }
                // break;
            // case 4:
                // if(JSON.stringify(session) === '{}' && JSON.stringify(priceEl) === '{}') {
                //     setNewQueryParams(0);
                    
                //     break;
                // }
                
                // deleteLSMerchCart()
                // setPriceEl({})
                // setSession({})
                // setSessionParam(null)
                // break;
        
            default:
                setNewQueryParams(0);
                //do something
                break;
        }
    }

    useEffect(() => {
        doCartLogic();
    }, [cartStep]);

    useEffect(() =>  {
        setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY));
    }, [])

    const options = {fetchClientSecret};

    return(
        <div className="font-['lora'] bg-[#f3f3f3]">
            {
                (cartStep === 0 && formatedMerchCart.length === 0) &&
                <div className="py-4 min-h-[50vh] mx-4 max-w-screen-lg  xl:mx-auto">
                    <div className="bg-white p-4 flex flex-col items-center justify-center">
                        <TrailerShadowIcon width="12rem" color="rgba(0,0,0,0.2)" />
                        <span>
                            {t('yourCartIsEmpty')}
                        </span>
                        <Link href="/merchandise" className="w-full uppercase cursor-pointer relative text-white
                        border-none bg-primary-color text-[1rem] select-none 
                        motion-safe:transition-all motion-reduce:transition-none 
                        will-change-auto motion-safe:duration-300 py-3 flex 
                        items-center justify-center mt-4 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium">
                            {t('goToMerch')}
                        </Link>
                    </div>
                </div>
            }
            {
                (cartStep === 0 && formatedMerchCart.length > 0) &&
                <div className="min-h-[50vh] py-4 flex flex-col gap-4 lg:flex-row mx-4 max-w-screen-lg  xl:mx-auto">
                    <div className="w-full flex flex-col relative gap-3">
                    <div className="bg-white p-4">
                        <span className="font-['lora'] text-[1.75rem] z-80 uppercase
                        flex items-center justify-start text-center lg:text-[2.2rem]
                        lg:text-start">
                            {t('title', {count: cartQuantity})}
                        </span>
                    </div>

                    <div className="bg-white p-4">
                        {
                            formatedMerchCart.map(({key, name, quantity, size, imageGallery, price, color, colorType}, index) => (
                                <Fragment key={"menuItem_"+index}>
                                    <MerchandiseCartMenuItem name={name} quantity={quantity}
                                        size={size} image={imageGallery[0]} price={price}
                                        color={color} colorType={colorType} merchId={key}/>
                                    {
                                        index < formatedMerchCart.length - 1 &&
                                        <div className="bg-[rgb(189,195,199)] h-px w-[calc(100% - 0.5rem)] my-2 mx-1"></div>
                                    }
                                </Fragment>
                            ))
                        }
                    </div>
                    </div>
                    <div className="w-160 flex flex-col relative gap-3">
                        <div className="bg-white py-4 px-8 sticky top-36 hidden lg:block">
                            <span className="font-['lora'] text-[1.75rem] z-80 uppercase
                                flex items-center justify-start text-center lg:text-[2.2rem]
                                lg:text-start">
                                {t('summary')}
                            </span>
                            <div className="flex flex-row items-center gap-2 relative">
                                <span className="w-full">{t('subtotal')}: </span>
                                <span className="flex-none">$ {cartTotal}</span>
                            </div>
                            <div className="">
                                {/* <span className={css(styles.privacyTitle)}>Notes</span> */}
                                <p className="p-0 text-[#73767a] ">
                                    {t('notes')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                cartStep === 1 &&
                <div className="w-full h-1/2 z-20 flex flex-col gap-4 text-black items-center justify-center 
                py-4 backdrop-saturate-50 backdrop-blur-sm " >
                    <div className="w-full h-full bg-white flex flex-col items-center justify-center loading-content">
                        <div className="loading-screen">
                        </div>
                        <span>{pT('loading')}</span>
                    </div>
                </div>
            }
            {
                cartStep === 2 &&
                <div className="py-4 min-h-[50vh] mx-4 max-w-screen-lg  xl:mx-auto">
                    <div className="bg-white p-4">
                        <span className="font-['lora'] text-[1.75rem] z-80 uppercase
                        flex items-center justify-start text-center lg:text-[2.2rem]
                        lg:text-start">
                            {t('checkout')}
                        </span>
                        {
                            JSON.stringify(priceEl) !== '{}' &&
                            <div id="checkout">
                                <EmbeddedCheckoutProvider
                                    stripe={stripePromise}
                                    options={options}
                                >
                                    <EmbeddedCheckout />
                                </EmbeddedCheckoutProvider>
                            </div>
                        }

                        <button onClick={() => {setNewQueryParams(0); scrollTop()}} className="w-full uppercase cursor-pointer relative text-white
                        border-none bg-primary-color text-[1rem] select-none 
                        motion-safe:transition-all motion-reduce:transition-none 
                        will-change-auto motion-safe:duration-300 py-3 flex 
                        items-center justify-center mt-4 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium">
                            {t('back')}
                        </button>
                    </div>
                </div>
            }
            {
                cartStep === 3 &&
                <div className="w-full h-1/2 z-20 flex flex-col gap-4 text-black items-center justify-center 
                py-4 backdrop-saturate-50 backdrop-blur-sm " >
                    <div className="w-full h-full bg-white flex flex-col items-center justify-center loading-content">
                        <div className="loading-screen">
                        </div>
                        <span>{t('executingPayment')}</span>
                    </div>
                </div>
            }
            {
                cartStep === 4 &&
                <div className="py-4 min-h-[50vh] mx-4 max-w-screen-lg  xl:mx-auto">
                    <div className="bg-white p-4 flex flex-col items-center justify-center">
                        <span className={`font-[1.5rem] material-icons notranslate  
                        ${(session.status || '') === "open" ? "text-[rgb(3,105,161)]" : 
                            (session.status || '') === "complete" ? "text-[rgb(101,163,13)]" : 
                                "text-[rgb(239,68,68)]"
                        }`} >
                            {
                                iconDictionary[session.status || '-']
                            }
                        </span>
                        <span>Status: {session.status || '-'}</span>
                        <Link href="/merchandise" className="w-full uppercase cursor-pointer relative text-white
                        border-none bg-primary-color text-[1rem] select-none 
                        motion-safe:transition-all motion-reduce:transition-none 
                        will-change-auto motion-safe:duration-300 py-3 flex 
                        items-center justify-center mt-4 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium">
                            {t('goToMerch')}
                        </Link>
                    </div>
                </div>
            }
            <div style={{display: cartStep === 0 ? 'flex' : 'none', transform:`translateY(${reachesBottom ? "calc(100% + 5rem)" : "0%"})`,}}
            className="fixed bottom-0 left-0 w-full bg-white/90 text-[#1c1c1e] border-none border-b-2 border-b-[#eeeeee]
            backdrop-saturate-50 backdrop-blur-sm shadow-[0px_-4px_4px_0px_rgba(0,0,0,0.25)] z-200 flex-col items-center
            lg:hidden! motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400 ">
                <div style={{padding:expandBar ? '1rem 0rem' : '0rem', height:expandBar ? 'auto' : '0px',}} 
                className="w-full relative overflow-hidden motion-safe:transition-all motion-reduce:transition-none 
                will-change-auto motion-safe:duration-400 ">
                    <div className="mx-4 max-w-screen-lg  xl:mx-auto">
                        <span className="font-['lora'] text-[1.75rem] z-80 uppercase
                        flex items-center justify-start text-center lg:text-[2.2rem]
                        lg:text-start">
                            {t('summary')}
                        </span>
                        <div className="flex flex-row items-center gap-2 relative">
                            <span className="w-full">{t('subtotal')}: </span>
                            <span className="flex-none">$ {cartTotal}</span>
                        </div>
                        {/* <div className="flex flex-row items-center gap-2 relative">
                            <span className="w-full">Shipping: </span>
                            <span className="flex-none">Approx. $ 60</span>
                        </div> */}
                        <div className="">
                            {/* <span className={css(styles.privacyTitle)}>Notes</span> */}
                            <p className="p-0 text-[#73767a] ">
                                {t('notes')}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full py-4">
                    <div className="mx-4 max-w-screen-lg  xl:mx-auto flex flex-row items-center justify-center relative gap-2">
                        <div className="flex flex-row items-center justify-center relative gap-2 w-full cursor-pointer select-none" 
                        onClick={() => setExpandBar((prev) => !prev)}>
                            <span className="w-full">{t('subtotal')}: </span>
                            <span className="flex-none">$ {cartTotal}</span>
                            <span style={{fontSize:'1.5rem'} } className="material-icons notranslate ">{!expandBar ? 'keyboard_arrow_up' : 'expand_more'}</span>
                        </div>
                        {/* <button onClick={() => {setNewQueryParams(1); scrollTop()}} className={css(styles.barButton)}>
                            Checkout ({cartQuantity})
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MerchandiseCart;