import React, {useState, useEffect} from "react";
import Link from "next/link"
import { useMerchandiseContext } from "../../context/merchandise_cart_context";
import { useMerchandiseProdsContext } from "../../context/merchandise_products_context";
import MerchandiseCartMenuItem from "./merchandise_cart_menu_item";

const SideMenu = ({isSticky, isOpen, menuName, isOpenCallback}) => {

    //#region code
    const [isIntSticky, setIsIntSticky] = useState(false);
    const [isBotSticky, setIsBotSticky] = useState(false);

    const { cartQuantity, cartTotal, formatedMerchCart, validateCartCouponCode } = useMerchandiseContext();

    const [cartList, setCartList] = useState([]);

    const [isInputShowing, setIsInputShowing] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);

    const [coupon, setCoupon] = useState("");
    // const manageMenuOpened = (childs) => {
    //     
        
    //     if(!childs) {
    //         isOpenCallback('')
    //     }
    // };
    // const loadCartList = () => {
    //     if(products.length > 0 && merchCart.length > 0) {
    //         let cartArr = [];
    //         merchCart.forEach((item) => {
    //             let find = products.find((prod) => prod.key === item.key);
                
    //             if(find) {
    //                 cartArr.push({...find, ...item})
    //             }       
    //         });
    //         // 
    //         setCartList(cartArr);
    //     }
    // }
    
    const trackScrolling = (params) => {
        setIsIntSticky(params.target.scrollTop > 0)
        setIsBotSticky(Math.ceil(params.target.scrollTop) === (params.target.scrollHeight - params.target.clientHeight));
    }

    const formatCamelCaseToNormalCase = (inputString) => {
        let finalString = '';
        if(inputString) {
            for(let i=0; i<inputString.length; i++){
              finalString += inputString[i].match(/[A-Z]/) != null ? ' '+inputString[i].toLowerCase(): inputString[i];
            }
        }
        return finalString;
    }

    const getTitleCase = (string) => {
        return string ? string.replace(/-+/g, ' ').replace(
            /\w\S*/g,
            (text) => text.length === 3 ? 
                text : text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
        ) : '';
    };

    useEffect(() => {
        // getcartQuant, cartTotal
        // setCartQuant(cartQuantity)
        // setCartSubtotal(cartTotal)
        setCartList(formatedMerchCart)
        let couponCode = localStorage.getItem("ht.ccode");
        setCoupon(couponCode !== null ? couponCode : '')
    }, [formatedMerchCart, cartQuantity])

    useEffect(() => {
        let res = validateCartCouponCode(coupon);
    }, [coupon]) 

    useEffect(() => {
        document.body.style.overflowY = isOpen ? 'hidden' : 'auto';
    }, [isOpen])

    //#region styles
    const styles = StyleSheet.create({
        backdropContainer: {
            width:'100%',
            height:'0px',
            overflow:'hidden',
            position:'relative',
            left:'0',
            top:'0',
            backgroundColor: "rgba(0, 0, 0,0.5)",
            backdropFilter:'saturate(50%) blur(12px)',
            zIndex:'100',
            display:'flex',
            alignItems:'start',
            justifyContent:'end',
            opacity:"0",
            pointerEvents:'none',
            transition:'0.4s opacity',
            willChange: "transform, box-shadow, z-index",
            fontFamily:'Chakra Petch',
            WebkitUserSelect: 'none',
            MsUserSelect: 'none',
            UserSelect: 'none',
        },
        showMenu: {
            height:`calc(100vh - 5rem)`,
            opacity:"1",
            pointerEvents:'auto',
            /*tablet and bigger screens*/
            "@media (min-width: 1024px)": {
                height:`calc(100vh - ${isSticky ? '6.5rem' : '9rem'})`,
                
            }
        },
        menuListContainer: {
            
            backgroundColor:'white',
            width:'100vw',
            maxHeight:'100%',
            height:'100%',
            overflowY:'auto',
            position:'relative',
            overflowX:'hidden',
            display:'flex',
            flex:'none',
            flexDirection:'column',
            // gap:'8px', 
            transition:'all 0.3s',
            willChange: "transform, box-shadow, z-index",
            transform:'translateX(110%)',
            /*tablet and bigger screens*/
            "@media (min-width: 1024px)": {
                width:'50vw',
            }
        },
        showMenuListContainer: {
            transform:'translateX(0%)',
        },
        /////
        headerMenu: {
            position:'relative',
            width:'calc(100% - 2rem)',
            // height:'5rem',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'start',
            flex:'none',
            gap:'0.25rem',
            left:0,
            padding:'1.5rem 1rem',
            transition:'all 0.4s',
            willChange: "transform, box-shadow, z-index",
            backgroundColor:'white',
            boxShadow: isIntSticky ? '0 10px 25px -12px rgb(0 0 0 / 0.15)' : 'none',
            zIndex:'20'
        },
        footerMenu: {
            position:'relative',
            width:'calc(100% - 2rem)',
            // height:'5rem',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            flex:'none',
            gap:'0.25rem',
            left:0,
            padding:'1.5rem 1rem',
            transition:'all 0.4s',
            willChange: "transform, box-shadow, z-index",
            backgroundColor:'white',
            boxShadow: !isBotSticky ? '0 -10px 25px -12px rgb(0 0 0 / 0.15)' : 'none',
            zIndex:'20'
        },
        ModelTitle: {
            color:'#77787b',
            zIndex: 30,
            fontSize:'2rem',
            fontFamily:'Teko',
        },
        ModelSubtitle: {
            width:'100%',
            color:'black',
            // fontWeight:'600',
            zIndex: 30,
            fontSize:'2rem',
            fontFamily:'Teko',
            textTransform:"uppercase",
            height:'fit-content',
            textAlign:'start'
        },
        BodyContainer: {
            height:'100%',
            maxHeight:'100%',
            width:'calc(100% - 2rem)',
            overflowX: 'hidden',
            overflowY:'auto',
            padding:'1rem',
            backgroundColor:'white'
        },
        internalScreen:{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            gap:'1rem',
            paddingBottom:"1.5rem",
        },
        colContainer: {
            width:"100%",
            display:'flex',
            gap:'0.25rem',
            flexDirection:'column',
            alignItems:'start',
            justifyContent:'center'
        },
        button: {
            backgroundColor: '#6897d8',
            color:'white',
            padding: '0.4rem 2rem',
            width:'calc(100% - 4rem)',
            cursor:'pointer',
            display:'flex',
            alignItems:'center',
            justifyContent: 'center',
            gap: '0.5rem',
            borderRadius:'8px',
            fontWeight: 'regular',
            transition: 'ease 0.4s',
            willChange: "transform, box-shadow, z-index",
            /*tablet and bigger screens*/
            "@media (min-width: 1024px)": {
                ":hover":{
                    backgroundColor:'orange'
                }
            }
        },
        closeButton: {
            backgroundColor:'#6897d8',
            transition: 'ease 0.4s',
            willChange: "transform, box-shadow, z-index",
            color:'white',
            cursor:'pointer',
            border:'none',
            width:'1.8rem',
            height:'1.8rem',
            borderRadius:'4px',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            zIndex:80,
            /*tablet and bigger screens*/
            "@media (min-width: 1024px)": {
                ":hover":{
                    backgroundColor:'orange'
                }
            }
        },
        flexRow: {
            width:"100%",
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center'
        },
        rowTitle: {
            width:'100%'
        },
        rowDesc: {
            flex:'none'
        },
        searchBoxContainer: {
            flex:'none',
            display:'none',
            alignItems:'center',
            justifyContent:'end',
            width:'9rem',
            /*tablet and bigger screens*/
            "@media (min-width: 1024px)": {
                display:'flex'
            }
        },
        searchBox: {
            // height: '2rem',
            minWidth: '2rem',
            display:'flex',
            flexDirection:'row',
            justifyContent:'end',
            alignItems:'center',
            overflow:'hidden',
            transition:'all 0.3s',
            willChange: "transform, box-shadow, z-index",
            width: '100%',
        },
        searchBoxInput: {
            height: '2rem',
            border:'1px solid #bdc3c7',
            borderTopLeftRadius:'10px',
            borderBottomLeftRadius:'10px',
            outline: '2px solid transparent',
            outlineOffset: '2px',
            fontFamily:'Montserrat',
            marginRight:'-10px',
            transition:'all 0.4s',
            willChange: "transform, box-shadow, z-index",
            width: isInputShowing || isInputFocused || coupon.slice() !== '' ? '100%' : '0px',
            padding: isInputShowing || isInputFocused || coupon.slice() !== '' ? '0px 0.75rem' : '0px',
        },
        searchBoxIcon: {
            height: '2rem',
            backgroundColor: '#6897d8',
            border: '1px solid #6897d8',
            color:'white',
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            aspectRatio:'1/1',
            transition:'all 0.2s',
            willChange: "transform, box-shadow, z-index",
            borderRadius:'10px'
            // borderRadius:isInputShowing || isInputFocused || coupon.slice() !== '' ? '0px' : '10px'
        },
        disabledSearchBoxIcon: {
            backgroundColor:'#979da1',
            border:'1px solid #979da1',
        },
        emptyCartContainer: {
            width:'100%',
            height:'calc(100% - 4rem)',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            color:'#979da1'

        },
        clickeable: {
            color:'#979da1',
            cursor:'pointer',
            textDecoration:'underline',
            /*tablet and bigger screens*/
            "@media (min-width: 1024px)": {
                ":hover":{
                    color:'#6897d8'
                }
            }
        },
    });
    
    //#region view
    return(
        <div className={css(styles.backdropContainer, isOpen && styles.showMenu)} onClick={() => isOpenCallback('')}>
            <div className={css(styles.menuListContainer, isOpen && styles.showMenuListContainer)} onClick={(e) => e.stopPropagation()}>
                <div className={css(styles.headerMenu)}>
                    <div className={css(styles.flexRow)}>
                        <span className={css(styles.ModelSubtitle)}>
                            {menuName}
                        </span>
                        <div onClick={() => isOpenCallback('')}
                            className={css(styles.closeButton)}><span className="material-symbols-outlined notranslate ">close</span></div>
                    </div>
                    {
                        menuName === 'account' &&
                        <span className={css(styles.ModelTitle)}>userName</span>
                    }
                    
                </div>
                <div className={css(styles.BodyContainer)} onScroll={trackScrolling}>
                    {
                        menuName === 'account' &&
                        <div className={css(styles.internalScreen)}>
                            account
                        </div>
                    }
                    {
                        menuName === 'cart' &&
                        <>
                            <div className={css(styles.internalScreen)}>
                                {
                                    cartList.map(({key, name, quantity, size, imageGallery, price, color, colorType}, index) => (
                                        <MerchandiseCartMenuItem key={"menuItem_"+index} name={name} quantity={quantity} 
                                            size={size} image={imageGallery[0]} price={price} 
                                            color={color} colorType={colorType} merchId={key}/>
                                    ))
                                }
                            </div>
                            {
                                cartQuantity === 0 &&
                                <div className={css(styles.emptyCartContainer)}>
                                    <span>Your cart is currently empty</span>
                                    <span>Check out our&nbsp;
                                        <Link href="/merchandise" className={css(styles.clickeable)}  onClick={() => isOpenCallback('')}>merchandise products</Link>
                                    </span>
                                </div>
                            }
                        </>
                    }
                </div>
                {
                    menuName === 'cart' &&
                    <div className={css(styles.footerMenu)}>
                        <div className={css(styles.flexRow)}>
                            <span className={css(styles.rowTitle)}>Products ({cartQuantity} Products): </span>
                            <span className={css(styles.rowDesc)}>$ {cartTotal}</span>
                        </div>
                        {/* <div className={css(styles.flexRow)}>
                            <span className={css(styles.rowTitle)}>Shipping</span>
                            <span className={css(styles.rowDesc)}>Pending</span>
                        </div> */}
                        {/* <div className={css(styles.flexRow)}>
                            <span className={css(styles.rowTitle)}>Coupon</span>
                            <div className={css(styles.searchBoxContainer)}>
                                <div className={css(styles.searchBox)} onMouseEnter={()=> {setIsInputShowing(cartQuantity > 0 ? true : false)}} 
                                    onMouseLeave={() => setIsInputShowing(false)}>
                                    <input onChange={(e) => setCoupon(e.target.value)} className={css(styles.searchBoxInput)}
                                        type="text" name="" id="" placeholder="Coupon Code"
                                        value={coupon}
                                        onFocus={() => setIsInputFocused(true)}
                                        onBlur={() => setIsInputFocused(false)}/>
                                    <span className={css(styles.searchBoxIcon, cartQuantity === 0 && styles.disabledSearchBoxIcon) + " material-symbols-outlined notranslate "}>
                                        confirmation_number
                                    </span>
                                </div>
                            </div>
                        </div> */}
                        <div className={css(styles.button)}>Checkout now <span className="material-symbols-outlined notranslate ">chevron_right</span> </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default SideMenu;