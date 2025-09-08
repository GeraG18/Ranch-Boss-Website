'use client' // Renders on client side
import React, { act, createContext, useContext, useEffect, useState } from "react";
import { useMerchandiseProdsContext } from "./merchandise_products_context";
import {setLocalStorage, getLocalStorage, deleteLocalStorage} from "../services/local_storage-service"

const MerchandiseCartContext = createContext({});
const MerchandiseCContext = ({children}) => {

    //#region code
    const [merchCart, setMerchCart] = useState([]);
    const [formatedMerchCart, setFormatedMerchCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [cartQuantity, setCartQuantity] = useState(0);

    const { products } = useMerchandiseProdsContext();

    const setLSMerchCart = (lsData) => {
        
        
        localStorage.setItem('ht.merch.cart', JSON.stringify(lsData));
        setLocalStorage("ht.merch.cart.test", lsData)
        setMerchCart(lsData)
        loadFormatedCart(lsData)
    }

    const deleteLSMerchCart = () => {
        localStorage.removeItem("ht.merch.cart")
        setMerchCart([]);
        setFormatedMerchCart([]);
        setCartQuantity(0);
        setCartTotal(0);
    }

    const deleteLSCouponCode = () => {
        localStorage.removeItem("ht.ccode")
    }

    const loadFormatedCart = (list) => {
        let cartArr = [];
        // // console.log('products', products);
        list.forEach((item) => {
            let find = products.find((prod) => prod.key === item.key);
            
            if(find) {
                cartArr.push({...find, ...item})
            }       
        });
        setFormatedMerchCart(cartArr);
        getCartQuantity(cartArr);
        getCartTotal(cartArr);
        // // console.log('formated cartArr', cartArr);
        
    }

    const loadLSCartData = () => {
        let lsData = localStorage.getItem('ht.merch.cart') !== null ? JSON.parse(localStorage.getItem('ht.merch.cart')) : [];
        // console.warn('test load',lsData);
        
        setMerchCart(lsData)
        loadFormatedCart(lsData)
    }
    
    const getCartQuantity = (arr) => {
        let quantity = arr.reduce((accumulator, item) => accumulator + Number(item.quantity), 0)
        setCartQuantity(quantity)
    }

    const getCartTotal = (arr) => {
        let subtotal = arr.reduce((accumulator, item) => accumulator + (Number(item.price ? item.price : 0) * Number(item.quantity)), 0);
        let total = subtotal;
        
        setCartTotal(total % 1 !== 0 ? total.toFixed(2) : total)
    }

    useEffect(() => {
        loadLSCartData();
    }, []);

    //#region view
    return (
        <MerchandiseCartContext.Provider value={{merchCart, formatedMerchCart, setMerchCart, setLSMerchCart, getCartQuantity, getCartTotal,
            cartTotal, cartQuantity, deleteLSMerchCart
        }}>
            {children}
        </MerchandiseCartContext.Provider>
    );
};

export default MerchandiseCContext;

export const useMerchandiseContext = () => useContext(MerchandiseCartContext);