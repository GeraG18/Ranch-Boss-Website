'use client' // Renders on client side
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { useAlertsProvider } from "../../context/alert_context";
import { useRouter } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMerchandiseContext } from "@/context/merchandise_cart_context";
import { useTranslations } from "next-intl";

const MerchProdDetails = ({productInfo}) => {
    
    //#region code
    const t = useTranslations('Merchandise.Details')
    const settings = {
        dots: false,
        infinite: true,
        fade:true,
        speed: 400,
        arows:false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
    };
    const router = useRouter();
    const { merchCart, setMerchCart, setLSMerchCart } = useMerchandiseContext();
    const { addAlert } = useAlertsProvider();
    const [activeSections, setActiveSections] = useState([]);
    const [productConfig, setProductConfig] = useState({
        key:"",
        size: "",
        color: "",
        quantity: 1
    });

    const [review, setReview] = useState({
        stars:0,
        title:"",
        message:""
    })

    let sliderRef = useRef(null);

    useEffect(() => {
        if(productInfo) {
            setProductConfig((prev) => ({...prev, key: productInfo.key}))
        }
    }, [productInfo])

    const addToCart = () => {
        if(productInfo?.props.hasOwnProperty('size') && String(productConfig.size).trim() === "") {
            addAlert('Select a Size', 'warning')
            return;
        }
        if(productInfo?.props.hasOwnProperty('color') && productConfig.color.trim() === "") {
            addAlert('Select a Color', 'warning')
            return;
        }
        
        
        let lsData = [...(merchCart || [])];
        // // console.log('merchCart', merchCart);
        
        let find = lsData.findIndex((item) => 
            item.key === productConfig.key && item.size === productConfig.size && 
        item.color === productConfig.color && 
        (productConfig.colorType ? item.colorType === productConfig.colorType : true));
        // // console.log('details find',productConfig.key);
        
        if(find !== -1) {
            let newItem = {...lsData[find], quantity: lsData[find].quantity + productConfig.quantity}
            lsData.splice(find, 1, newItem);
            // // console.log('details',productConfig, newItem);
        } else {
            // // console.log('details e',productConfig);
            lsData.push(productConfig);
        }
        
        setProductConfig((prev) => ({
            ...prev, 
            size: "",
            color: "",
            quantity: 1
        }));
        // setMerchCart(lsData);
        setLSMerchCart(lsData);
        addAlert('Product added to cart', 'info')
    }

    const checkoutItem = () => {
        if(productInfo?.props.hasOwnProperty('size') && String(productConfig.size).trim() === "") {
            addAlert('Select a Size', 'warning')
            return;
        }
        if(productInfo?.props.hasOwnProperty('color') && productConfig.color.trim() === "") {
            addAlert('Select a Color', 'warning')
            return;
        }
        
        let lsData = [...merchCart];
        let find = lsData.findIndex((item) => 
            item.key === productConfig.key && item.size === productConfig.size && 
        item.color === productConfig.color && 
        (productConfig.colorType ? item.colorType === productConfig.colorType : true));
        
        if(find !== -1) {
            let newItem = {...lsData[find], quantity: lsData[find].quantity + productConfig.quantity}
            lsData.splice(find, 1, newItem);
        } else {
            lsData.push(productConfig);
        }
        
        setProductConfig((prev) => ({
            ...prev, 
            size: "",
            color: "",
            quantity: 1
        }));
        // setMerchCart(lsData);
        setLSMerchCart(lsData);
        router.push('/merchandise/cart')
        addAlert('Product added to cart', 'info')
    }

    const formatCamelCaseToNormalCase = (inputString) => {
        let finalString = '';
        for(let i=0; i<inputString.length; i++){
          finalString += inputString[i].match(/[A-Z]/) != null ? ' '+inputString[i].toLowerCase(): inputString[i];
        }
        return finalString;
    }

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

    //#region view
    return(
        <>
            <div className="font-['lora']! py-4 flex flex-col lg:grid lg:grid-cols-2
            mx-4 max-w-screen-lg  xl:mx-auto">
                <div className="w-full overflow-hidden flex flex-col items-center
                shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] bg-[radial-gradient(circle,rgba(55,62,62,0)_50%,rgba(55,62,62,0.03)_74%,rgba(55,62,62,0.06)_100%)]
                lg:h-fit">
                    <div className="border border-[#eeeff0] bg-[#eeeff0] w-full flex relative
                    overflow-hidden items-center justify-start left-0 h-[30vh] z-50 lg:h-[60vh]">
                        <div className="w-full absolute self-center justify-self-center">
                            <Slider ref={(slider) => {
                                sliderRef = slider;
                            }} {...settings}>
                                {
                                    productInfo?.imageGallery?.map((image, index) => (
                                        <div key={'image_'+index} className="flex items-center justify-center
                                        relative h-[25vh] md:h-[30vh] lg:h-[60vh]">
                                            <img src={image} className="w-full h-full absolute" alt={productInfo?.name}/>
                                        </div>
                                    ))
                                }
                            </Slider>
                        </div>
                        <button onClick={() => sliderRef.slickPrev()}
                            className="cursor-pointer absolute z-100 w-[30px]
                            h-[40px] backdrop-saturate-50 backdrop-blur-sm bg-black/50
                            font-bold text-[1rem] select-none motion-safe:transition-all 
                            motion-reduce:transition-none will-change-auto motion-safe:duration-400
                            border-none text-white py-[1.6rem] px-4 flex items-center 
                            justify-center lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium left-0 lg:left-4">
                            <span className="material-icons notranslate " >
                            chevron_left
                            </span>
                        </button>
                        <button onClick={() => sliderRef.slickNext()}
                            className="cursor-pointer absolute z-100 w-[30px]
                            h-[40px] backdrop-saturate-50 backdrop-blur-sm bg-black/50
                            font-bold text-[1rem] select-none motion-safe:transition-all 
                            motion-reduce:transition-none will-change-auto motion-safe:duration-400
                            border-none text-white py-[1.6rem] px-4 flex items-center 
                            justify-center lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium right-0 lg:right-4" >
                            <span className="material-icons notranslate " >
                            chevron_right
                            </span>
                        </button>
                    </div>
                </div>
                <div className="py-4 flex gap-1 flex-col items-start lg:p-0 lg:ml-8">
                    <div className="w-full flex items-start justify-center flex-col gap-0.5">
                        <h2 className="uppercase whitespace-pre-wrap font-medium overflow-hidden
                        text-[3rem] leading-[2.8rem] font-['lora'] text-ellipsis m-0">{productInfo?.name}</h2>
                        <p className="text-[0.8rem] m-0 p-0">{productInfo?.description}</p>
                    </div>
                    <div className="w-full flex items-center justify-start flex-row gap-2">
                        <div className="text-[1.5rem] min-h-8 w-[calc(100%-1rem)] 
                        flex flex-col items-start justify-center">
                            <span>$ {productInfo?.price}</span>
                        </div>
                    </div>
                    <div className="bg-[#f3f3f3] h-px w-full my-2"></div>
                    {
                        productInfo?.props?.size &&
                        <div className="w-full flex items-start justify-center flex-col gap-0.5">
                            <span className="text-[1.5rem] font-['lora'] text-center flex-none uppercase">{t('selectSize')}</span>
                            <div className="w-full list-none flex items-center justify-start flex-row flex-wrap gap-1">
                                {
                                    productInfo?.props.size?.map((size, index) => (
                                        <div key={'size_'+index} 
                                            className={`h-8 min-w-8 m-[0.15rem] relative overflow-hidden border 
                                                flex items-center justify-center capitalize cursor-pointer
                                                ${(String(productConfig.size) === String(size)) ? "border-primary-color text-primary-color" : "border-[#babbbd] text-black"}`}
                                            onClick={() => setProductConfig((prev) => ({...prev, size: prev.size !== size ? size : '' }))}>
                                            <input className="m-0 absolute left-0 top-0 w-full h-full z-20 opacity-0 cursor-pointer" 
                                            name={size}type="checkbox" aria-label={size+" size option"} role="form"/>
                                            <span className="py-1 px-[0.4rem] font-[0.8rem]">{size}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    }
                    {
                        productInfo?.props?.color &&
                        <div className="w-full flex items-start justify-center flex-col gap-0.5">
                            <span className="text-[1.5rem] uppercase font-['lora'] text-center flex-none">{t('availableColors')}</span>
                            <div className="w-full list-none flex items-center justify-center flex-row flex-wrap gap-1">
                                {
                                    Array.isArray(productInfo?.props.color) &&
                                    <>
                                    { 
                                        productInfo?.props.color.map((color, index) => (
                                            <div onClick={() => setProductConfig((prev) => ({...prev, color: prev.color !== color.name ? color.name : '' }))} 
                                            key={'notes_'+index} className={`group/item hover:bg-[#f0efec] motion-safe:transition-all motion-reduce:transition-none 
                                                p-1 will-change-auto motion-safe:duration-400 w-26 min-h-22 h-full flex flex-col items-center 
                                                cursor-pointer relative self-center justify-self-center`}>
                                                <input type="checkbox" name={color.name} className="m-0 absolute left-0 top-0 w-full h-full z-20 opacity-0 cursor-pointer"
                                                    aria-label={color.name+" option"} role="form" />
                                                <div className={`w-full h-10 flex-none bg-black 
                                                    ${(String(productConfig.color) === String(color.name)) 
                                                    ? "border-primary-color border" : "border-[#f3f3f3] border"}
                                                    cRibbonCont flex flex-row overflow-hidden `}>
                                                    <div style={{backgroundColor:color.hex, height:'100%', width:color.extraHex ? '50%' : '100%'}}></div>
                                                    {
                                                        color.extraHex &&
                                                        <div style={{backgroundColor:color.extraHex, height:'100%', width:'50%'}}></div>
                                                    }

                                                </div>
                                                <p className={`motion-safe:transition-all 
                                                motion-reduce:transition-none will-change-auto motion-safe:duration-400 w-full text-center
                                                uppercase text-[0.8rem] font-semibold ${(String(productConfig.color) === String(color.name)) 
                                                    ? "text-primary-color" : "text-black"} group-hover/item:text-secondary-color! `}>{color.name}</p>
                                            </div>
                                        ))
                                    }
                                    </>
                                }
                                {
                                    (typeof productInfo?.props.color === "object" && !(Array.isArray(productInfo?.props.color)))&&
                                    <>
                                    {
                                        Object.keys(productInfo?.props.color).map((catName) => (
                                            <li key={catName} className="w-full bg-transparent border border-[#f3f3f3]">
                                                <div onClick={()=>showOrHideCheckBox(catName)} className="py-[0.8rem] px-[0.4rem] bg-[#f3f3f3]
                                                text-[0.8rem] cursor-pointer flex items-center">
                                                    <span className="w-full uppercase flex items-center text-[1rem] font-bold">
                                                        {formatCamelCaseToNormalCase(catName)}
                                                    </span>
                                                    <span className={`text-[#babbbd] ${!activeSections.includes(catName) ? "rotate-0" : "rotate-45"} material-icons notranslate `}>
                                                        add
                                                    </span>
                                                </div>
                                                <div className={`flex flex-col gap-[0.2rem] motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400 
                                                ${activeSections.includes(catName) ? "pt-[0.2rem] px-[0.4rem] pb-[0.8rem]" : "p-0"}`}>
                                                    <div className={`grid grid-cols-5 flex-wrap h-0 rounded-[1px] overflow-hidden ${catName}`}>
                                                    { 
                                                        productInfo?.props.color[catName].map((color, index) => (
                                                            // <div key={'notesSI_'+index} className={css(styles.colorContainer)} 
                                                            //     onClick={() => setProductConfig((prev) => ({...prev, color: prev.color !== color.name ? color.name : '', colorType: prev.colorType !== catName ? catName : '' }))}>
                                                            //     <input aria-label={color.name+" option"} role="form" type="checkbox" name={color.name} className={css(styles.hiddenCheckbox)}/>
                                                            //     <div className={css(styles.colorRibbon, (String(productConfig.color) === String(color.name)) && styles.colorSelected) + " cRibbonCont"}>
                                                            //         <div style={{backgroundColor:color.hex, height:'100%', width:color.extraHex ? '50%' : '100%'}}></div>
                                                            //         {
                                                            //             color.extraHex &&
                                                            //             <div style={{backgroundColor:color.extraHex, height:'100%', width:'50%'}}></div>
                                                            //         }
                                                            //     </div>
                                                            //     <p className={css(styles.colorName)}>{color.name}</p>
                                                            // </div>

                                                            <div onClick={() => setProductConfig((prev) => ({...prev, color: prev.color !== color.name ? color.name : '', colorType: prev.colorType !== catName ? catName : '' }))} 
                                                            key={'notesSI_'+index} className={`group/item hover:bg-[#f0efec] motion-safe:transition-all motion-reduce:transition-none 
                                                                p-1 will-change-auto motion-safe:duration-400 w-26 min-h-22 h-full flex flex-col items-center 
                                                                cursor-pointer relative self-center justify-self-center`}>
                                                                <input type="checkbox" name={color.name} className="m-0 absolute left-0 top-0 w-full h-full z-20 opacity-0 cursor-pointer"
                                                                    aria-label={color.name+" option"} role="form" />
                                                                <div className={`w-full h-10 flex-none bg-black 
                                                                    ${(String(productConfig.color) === String(color.name)) 
                                                                    ? "border-primary-color border" : "border-[#babbbd] border"}
                                                                    cRibbonCont flex flex-row overflow-hidden `}>
                                                                    <div style={{backgroundColor:color.hex, height:'100%', width:color.extraHex ? '50%' : '100%'}}></div>
                                                                    {
                                                                        color.extraHex &&
                                                                        <div style={{backgroundColor:color.extraHex, height:'100%', width:'50%'}}></div>
                                                                    }

                                                                </div>
                                                                <p className={`motion-safe:transition-all 
                                                                motion-reduce:transition-none will-change-auto motion-safe:duration-400 w-full text-center
                                                                uppercase text-[0.8rem] font-semibold ${(String(productConfig.color) === String(color.name)) 
                                                                    ? "text-primary-color" : "text-black"} group-hover/item:text-secondary-color! `}>{color.name}</p>
                                                            </div>
                                                        ))
                                                    }
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                    </>
                                }
                            </div>
                        </div>
                    }
                    <div className="w-full flex items-start justify-center flex-col gap-0.5">
                        <span className="text-[1.5rem] uppercase font-['lora'] text-center flex-none">{t('quantity')}</span>
                        <div className="w-full list-none flex items-center justify-center flex-row flex-wrap gap-1">
                            <div className="cursor-pointer h-11 px-1 border border-[#d5d5d5] 
                            text-[#4d4d4d] flex flex-row items-center justify-center">
                                <span className="material-icons notranslate " onClick={() => setProductConfig((prev) => ({...prev, quantity: (prev.quantity - 1 !== 0 ? prev.quantity - 1 : prev.quantity) }))}>
                                    remove
                                </span>
                                <input aria-label="quantity option" role="form" className="text-[#4d4d4d] bg-transparent
                                border-none h-full text-center w-24 outline-hidden" 
                                type="number" value={productConfig.quantity} onChange={(e) => setProductConfig((prev) => ({...prev, quantity: Number(e.target.value)}))}/>
                                <span className="material-icons notranslate " onClick={() => setProductConfig((prev) => ({...prev, quantity: (prev.quantity + 1 < 6 ? prev.quantity + 1 : prev.quantity) }))}>
                                    add
                                </span>
                            </div>
                        </div>
                        <p className="w-full max-w-full m-0 text-[0.8rem]">{t('youCanAdd5Only')}</p>
                    </div>
                    <div className="w-full list-none flex items-center justify-center flex-row flex-wrap gap-1 pt-4">
                        <button onClick={() => addToCart()} 
                        className="w-full uppercase cursor-pointer relative text-white border-none bg-primary-color
                        text-[1rem] select-none motion-safe:transition-all motion-reduce:transition-none 
                        will-change-auto motion-safe:duration-400 py-2 px-4 
                        lg:w-60 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium">{t('addToCart')}</button>
                        <button onClick={() => checkoutItem()} 
                        className="w-full uppercase cursor-pointer relative text-white border-none bg-primary-color
                        text-[1rem] select-none motion-safe:transition-all motion-reduce:transition-none 
                        will-change-auto motion-safe:duration-400 py-2 px-4 
                        lg:w-60 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium">{t('checkoutNow')}</button>
                    </div>

                    <div className="bg-[#f3f3f3] h-px w-full my-2"></div>

                    <div className="w-full flex items-start justify-center flex-col gap-0.5">
                        <span className="text-[1.5rem] uppercase font-['lora'] text-center flex-none">{t('notes')}</span>
                        {
                            productInfo?.notes?.map((description, index) => (
                                <p key={'notes_'+index} className="w-full max-w-full m-0 text-[0.8rem]">{description}</p>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="flex gap-1 flex-col items-start mx-4 max-w-screen-lg  xl:mx-auto">
                {/* <span className="text-[1.5rem] capitalize font-['lora'] text-center flex-none">About this article</span>
                <p>{productInfo?.about}</p> */}
                {/* <span className="text-[1.5rem] capitalize font-['lora'] text-center flex-none">Customer reviews</span>
                
                <div className={css(styles.reviewContainer)}>
                    dad

                </div>
                <span className="text-[1.5rem] capitalize font-['lora'] text-center flex-none">Give your review</span>
                <div className={css(styles.formContainer)}>
                    <div className={css(styles.inputContainer)}>
                        <span className={css(styles.containerTitle)}>Review</span>
                        <div className={css(styles.input, styles.otherInput)+ ' inputForm'}>
                            <span className={css(styles.grayStar, review.stars >= 1 && styles.activeStar) +" material-icons notranslate "}
                                onClick={() => setReview((prev) => ({...prev, stars: 1}))}>
                                star
                            </span>
                            <span className={css(styles.grayStar, review.stars >= 2 && styles.activeStar) +" material-icons notranslate "}
                                onClick={() => setReview((prev) => ({...prev, stars: 2}))}>
                                star
                            </span>
                            <span className={css(styles.grayStar, review.stars >= 3 && styles.activeStar) +" material-icons notranslate "}
                                onClick={() => setReview((prev) => ({...prev, stars: 3}))}>
                                star
                            </span>
                            <span className={css(styles.grayStar, review.stars >= 4 && styles.activeStar) +" material-icons notranslate "}
                                onClick={() => setReview((prev) => ({...prev, stars: 4}))}>
                                star
                            </span>
                            <span className={css(styles.grayStar, review.stars >= 5 && styles.activeStar) +" material-icons notranslate "}
                                onClick={() => setReview((prev) => ({...prev, stars: 5}))}>
                                star
                            </span>
                        </div>
                    </div>
                    <div className={css(styles.inputContainer)}>
                        <span className={css(styles.containerTitle)}>Title</span>
                        <input value={review.title} onChange={(e) => setReview((prev) => ({...prev, title: e.target.value}))}
                            placeholder="Example: The best product ever" className={css(styles.input, styles.otherInput)+ ' inputForm'} />
                    </div>
                    <div className={css(styles.inputContainer)}>
                        <span className={css(styles.containerTitle)}>Message</span>
                        <textarea value={review.message} onChange={(e) => setReview((prev) => ({...prev, message: e.target.value}))} 
                            className={css(styles.inputAlt)+ ' inputForm'} placeholder="Example: This is my review about this product"></textarea>
                    </div>
                    <button className="w-full uppercase cursor-pointer relative text-white border-none bg-primary-color
text-[1rem] select-none motion-safe:transition-all motion-reduce:transition-none 
will-change-auto motion-safe:duration-400 py-3 px-[2.6rem] 
lg:w-56 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium">Send review</button>
                </div> */}
            </div>
        </>
    )
}

export default MerchProdDetails;