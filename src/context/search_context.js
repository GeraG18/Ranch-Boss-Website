'use client' // Renders on client side
import { createContext, useContext, useEffect, useState } from "react";
import Products from "../jsons/products.json"
import FinancingMenu from "@/jsons/dropdowns/financing_dropdown.json"
import SupportMenu from "@/jsons/dropdowns/support_dropdown.json"
import CompanyMenu from "@/jsons/dropdowns/company_dropdown.json"
import MerchProducts from "../jsons/merchandise.json"
import { useLocale, useTranslations } from "next-intl";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {

    const [searchDictionary, setSearchDictionary] = useState([]);
    const [suggestedList, setSuggestedList] = useState([]);
    const locale = useLocale();
    const t = useTranslations('PagesTitles');

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const generateSearchList = () => { //TODO MOVER A UN CONTEXT GENERAL
        let obj = [{label:t('allproducts'), url:"/products"}];

        //PRODUCTS//
        let removedComments = Products.filter((item) => !item.hasOwnProperty('_comment'));
        let categories = [...new Set([...removedComments.map((item) => item.category)])]
        
        categories.forEach((category) => {
            
            let allItems = removedComments.filter((item) => item.category === category);
            let models = [...new Set([...allItems.map((item) => (item.name.split(' ')[0]) )])]
            // 
            
            let typesArr = [];
            models.forEach((model) => {
                let tempItemsArr =  removedComments.filter((item) => item.name.includes(model) && item.category === category);
                
                // let image = tempItemsArr[randomIntFromInterval(0, tempItemsArr.length - 1)].descriptions.gallery[0];
                let cat = tempItemsArr[0].category;
                typesArr.push({
                    label:t('dynTrailer', {name: model}),
                    url:`/products?model=${model}`
                })
            });
            
            let toPush = {
                label: t('dynCatTrailer', {category: t(category.replaceAll(' ', '').toLowerCase())}),//`${category.toLowerCase()} trailer`,
                url:`/products?category=${t(category.replaceAll(' ', '').toLowerCase()).toLowerCase()}`
            }
            obj.push(toPush, ...typesArr)
        });
        
        //FinancingMenu SupportMenu CompanyMenu
        //FINANCING//
        obj.push(...FinancingMenu[locale].map((item) => ({label: `${item.name.toLowerCase()}`, url: item.url})))
        //SUPPORT//
        obj.push(...SupportMenu[locale].map((item) => ({label: item.name.toLowerCase(), url: item.url})))
        //COMPANY//
        obj.push(...CompanyMenu[locale].map((item) => ({label: item.name.toLowerCase(), url: item.url})))
        //MERCH PRODUCTS//
        obj.push(...MerchProducts[locale].map((item) => ({label: item.name.toLowerCase(), url: `/merchandise/details/${item.key}`})))
        //MISCELLANEOUS//
        obj.push(
            {label: t('blog'), url:'/blog'},
            // {label: t('merchandise'), url:'/merchandise'},
            {label: t('privacyPolicy'), url:'/privacy-policy'},
            {label: t('termsOfUse'), url:'/terms-of-use'},
            // {label: t('quality'), url:'/quality'},
            {label: t('faqs'), url:'/quality#faqs-section'},
            {label: t('sitemap'), url:'/sitemap'},
        )
        setSearchDictionary(obj)
    }

    useEffect(() => {
        // 
        
        let arr = [{label:t('suggestedSearch')}];
        if(searchDictionary.length > 0) {
            for (let index = 0; index < 4; index++) {
                let pos = randomIntFromInterval(0, searchDictionary.length - 1);
                arr.push(searchDictionary[pos])
            }
        }
        
        setSuggestedList(arr)
    }, [searchDictionary])

    useEffect(() => {
        generateSearchList();
    }, [])

    return (
        <SearchContext.Provider value={{ searchDictionary, suggestedList }}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchProvider;

export const useSearchProvider = () => useContext(SearchContext);