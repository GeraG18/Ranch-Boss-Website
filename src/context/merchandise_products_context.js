'use client' // Renders on client side
import React, { createContext, useContext, useEffect, useState } from "react";
import merchandise from "@/jsons/merchandise.json";
import { useLocale } from "next-intl";

const MerchandiseProductsContext = createContext({});

const MerchandiseProdsContext = ({children}) => {
    const locale = useLocale()
    const [products, setProducts] = useState(merchandise[locale]);

    useEffect(() => {
        /*
            BUG: There´s a async problem when loads the data and
            redirects to "not found" page, check it and fix later
        */
       
       
        setProducts(merchandise[locale])
    }, [])

    return (
        <MerchandiseProductsContext.Provider value={{products, setProducts}}>
            {children}
        </MerchandiseProductsContext.Provider>
    );
};

export default MerchandiseProdsContext;

export const useMerchandiseProdsContext = () => useContext(MerchandiseProductsContext);