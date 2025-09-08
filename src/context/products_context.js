'use client' // Renders on client side
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from "next-intl";

import { ProductsList } from "@/jsons/products/products";
import { decodeURIToString } from "@/services/utils-service";

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {

    /* Variables */
    const ITEMS_PER_PAGE = 12;
    const FILTER_BLACKLIST = ['axleCount', 'axleRating', 'deck', 'deckHeight', 'rear', 'sideHeights'];

    /* Hooks */
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    /* Translations */
    const fT = useTranslations('BasicForm');

    /* State Hooks */
    const [filters, setFilters] = useState({});
    const [category, setCategory] = useState(searchParams.get('category') || '')
    const [actualPage, setActualPage] = useState(parseInt(searchParams.get('page') || '1', 10));
    const [activeCollapses, setActiveCollapses] = useState([]);
    
    /* In-Cache Hooks */
    const [products, stringifiedProducts] = useMemo(() => {
        
        const prods = ProductsList[locale].filter(item => !item.hasOwnProperty('_comment'));
        const removedDescriptions = prods.map(
            ({id, name, category, subcategory, props, standardFeatures, options}) => (
                {id, name, category, subcategory, props, standardFeatures, options}
            )
        );
        
        return [
            prods,
            JSON.stringify(removedDescriptions).replaceAll('\\"', `"`)
        ]

    }, [locale]);
    const segmentOptions = useMemo(() => {
        const categories = [...new Set(products.map(p => p.category))];
        return [
        { label: fT('all').toUpperCase(), value: '' },
        ...categories.map(cat => ({ label: cat, value: cat }))
            .sort((a, b) => a.label.localeCompare(b.label))
        ];
    }, [products, fT]);
    const availableFilters = useMemo(() => {
        const filtersData = products.reduce((acc, model) => {
        Object.entries(model.props).forEach(([key, values]) => {
            if (!key.includes('Image') && !FILTER_BLACKLIST.includes(key)) {
            acc[key] = [...new Set([...(acc[key] || []), ...values])];
            }
        });
        return acc;
        }, {});

        filtersData.model = [...new Set(products.map(m => m.name.split(' ')[0]))];
        return filtersData;
    }, [products]);
    const selectedFilters = useMemo(() => {
        const fCategories = ['model', 'type', 'cargoCapacity', 'deckWidth', 'gvwr', 'lengths'];
        let filters = {};
        fCategories.forEach((category) => {
            const opt = searchParams.getAll(category).filter((item) => {
                return stringifiedProducts.includes(item)
            });
            if(opt.length > 0) {
                filters[category] = opt.map((item) => decodeURIToString(item));
            }
        });

        let cat = searchParams.get('category');
        let pNumber = searchParams.get('page');
        setCategory(cat || '')
        setActualPage(parseInt(pNumber || 1, 10))

        return (filters)
    }, [searchParams, stringifiedProducts])
    const [paginatedModels, totalResults, totalPages, filtered] = useMemo(() => {
        const filtered = products.filter(product => {
            const matchesFilters = Object.entries(filters).every(([key, values]) => {
                if (!values?.length) return true;            
                const productValues = (
                    (
                    key === 'model' 
                    ? [product.name.split(' ')[0]] 
                    : product.props[key]
                    )
                );
                return values.some((v) => 
                    productValues.map((it) => String(it)).includes(String(v))
                );
            });
            return (
                matchesFilters && 
                (
                    !category || 
                    product.category.toUpperCase() === category.toUpperCase()
                )
            );
        });
        const total = filtered.length;
        const pages = Math.ceil(total / ITEMS_PER_PAGE);
        const paginated = filtered.slice(
            (actualPage - 1) * ITEMS_PER_PAGE,
            actualPage * ITEMS_PER_PAGE
        );
        return [paginated, total, pages, filtered];
    }, [products, filters, category, actualPage, locale]);

    /* Functions */
    const findAProduct = (productId) => products.find((item) => item.id === productId.toUpperCase());
    const switchCategory = (category) => setCategory(category);
    const switchPage = (pageNumber) => setActualPage(pageNumber);
    const switchFilters = (filtersList) => setFilters(filtersList);
    const switchCollapses = (list) => setActiveCollapses(list)

    /* Effect Hooks */
    useEffect(() => {
            const params = new URLSearchParams();
            if (category) {
                params.set('category', category.toLowerCase());
            } else {
                params.delete('category');
            }
    
            params.set('page', actualPage.toString());
    
            Object.entries(filters).forEach(([key, values]) => {
                params.delete(key);
                values?.forEach(value => params.append(key, value));
            });
    
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [filters, category, actualPage]);

    useEffect(() => {
        /* set filters from route params */
        switchFilters(selectedFilters)
    }, [searchParams])
    
    /* Returns */
    let functions = {
        /* readonly variables */
        actualPage, totalResults, totalPages, filters, category,
        paginatedModels, availableFilters, activeCollapses,
        ITEMS_PER_PAGE, segmentOptions,
        /* switching area */
        switchCategory, switchPage, switchFilters, switchCollapses,
        /* utils */
        findAProduct,
    }

    return (
        <ProductsContext.Provider value={functions}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsProvider;

export const useProductsContext = () => useContext(ProductsContext);