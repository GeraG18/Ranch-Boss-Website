'use client' // Renders on client side
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from "next-intl";
import { useGeolocated } from "react-geolocated";
import { DealersList as dealers } from "@/jsons/dealers-list/dealer-list";
import { getDistanceFromLatLonInKm, includesSimilarWords, normalizeCharacters } from "@/services/utils-service";

const DealersContext = createContext();

const DealersProvider = ({ children }) => {

    /* Variables */
    const ITEMS_PER_PAGE_MAP = 4;
    const ITEMS_PER_PAGE_LIST = 12;
    const DEFAULT_CAM_VALUES = {
        center: {lat:31.657838, lng:-106.247719},
        zoom: 5
    };
    const MILLES_CONVERTION = (0.6213711922);

    /* Hooks */
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: true,
        },
        userDecisionTimeout: 5000,
    });

    /* Translations */
    const fT = useTranslations('BasicForm');

    //TODO: Maybe add geolocation
    /* State Hooks */
    const [filters, setFilters] = useState({
        search: '',
        location:{}
    });
    const [tab, setTab] = useState(searchParams.get('category') || 'map')
    const [actualPage, setActualPage] = useState(parseInt(searchParams.get('page') || '1', 10));
    const [mapProps, setMapProps] = useState(DEFAULT_CAM_VALUES);
    const [lastCachedProps, setLastCachedProps] = useState(undefined);
    const [userPoint, setUserPoint] = useState(DEFAULT_CAM_VALUES.center)
    const [activeMarkerId, setActiveMarkerId] = useState(null);
    const [isLoading, setLoading] = useState(true)
    /* Callbacks */
    const switchTab = useCallback((tab) => setTab(tab), []);
    const switchPage = useCallback((pageNumber) => setActualPage(pageNumber), []);
    const switchFilters = useCallback((filtersList) => setFilters(filtersList), []);
    const switchMapProps = useCallback((mapPr) => setMapProps(mapPr), []);
    const switchActiveMarkerId = useCallback((markerId) => setActiveMarkerId(markerId), []);
    const getMapsUrl = useCallback((latitude, longitude) => (
        `https://www.google.com/maps/search/?api=1&query=${latitude}%2C${longitude}`
    ), []);

    /* In-Cache Hooks */   
    const normalizedSearch = useMemo(() => normalizeCharacters(filters.search + ''), [filters.search]);

    const [dealersList] = useMemo(() => {
        return [dealers.map((it) => ({
            ...it,
            directionUrl: getMapsUrl(+it.latitude, +it.longitud),
            distance: (+getDistanceFromLatLonInKm(
                +userPoint.lat, +userPoint.lng, 
                +it.latitude, +it.longitud
            ) * MILLES_CONVERTION).toFixed(2)
        }))];
    }, [dealers, userPoint, getMapsUrl]);

    const activeDealer = useMemo(
        () => dealersList.find(d => d.id === activeMarkerId),
        [dealers, activeMarkerId]
    );

    const selectedFilters = useMemo(() => {
        let tabP = searchParams.get('tab');
        let pNumber = searchParams.get('page');
        setTab(tabP || 'map')
        setActualPage(parseInt(pNumber || 1, 10))

        return (filters)
    }, [searchParams])

    const itemsPerPage = useMemo(() => {
        // switchPage(1)
        return tab === 'list' ? ITEMS_PER_PAGE_LIST : ITEMS_PER_PAGE_MAP
    }, [tab])

    const [paginatedModels, totalResults, totalPages, allLocations, closestDealer] = useMemo(() => {
        const filtered = dealersList.filter((marker) => {
            const normalizedName = normalizeCharacters(marker.name);
            const normalizedState = normalizeCharacters(marker.state);
            const normalizedAddress = normalizeCharacters(`${marker.address} ${marker.state} ${marker.city}`);
            
            return normalizedName.includes(normalizedSearch) ||
                   normalizedState.includes(normalizedSearch) ||
                   includesSimilarWords(normalizedAddress, normalizedSearch);
        });
        (tab === 'map' ? filtered.sort((a, b) => a.distance - b.distance) : null);

        const closest = filtered.at(0);
        const total = filtered.length;
        const pages = Math.ceil(total / itemsPerPage);
        if(actualPage > pages) switchPage(1);
        const paginated = filtered.slice(
            (actualPage - 1) * itemsPerPage,
            actualPage * itemsPerPage
        );
        return [paginated, total, pages, filtered, closest];
    }, [dealersList, filters, actualPage, itemsPerPage, tab]);

    const mapCameraProps = useMemo(() => {
        if (filters.location && Object.keys(filters.location).length > 0) {
            return ({
                center: filters.location,
                zoom: 8
            });
        } else if(lastCachedProps) {
            return (lastCachedProps);
        } else if (coords) {
            return ({
                center: {
                    lat: coords.latitude,
                    lng: coords.longitude
                },
                zoom: 5
            });
        } else {
            return DEFAULT_CAM_VALUES;
        }
    }, [filters.location, coords, lastCachedProps])

    useEffect(() => {
        /* get filters from route params */
        const params = new URLSearchParams();
        params.set('tab', tab);
        params.set('page', actualPage.toString());

        //TODO: Maybe add current location and search (in filters)
        // // console.log('FILTERS', filters);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [filters, tab, actualPage]);

    useEffect(() => {
        /* set filters from route params */
        switchFilters(selectedFilters)
    }, [searchParams])

    useEffect(() => {
        if(activeDealer) {
            setLastCachedProps({ center: {lat: +activeDealer.latitude, lng: +activeDealer.longitud}, zoom:5 })
            setMapProps({ center: {lat: +activeDealer.latitude, lng: +activeDealer.longitud}, zoom:5 })
        } else if(lastCachedProps) {
            setMapProps(lastCachedProps);
            setLastCachedProps(undefined)
        } else {
            setMapProps(mapCameraProps);
            setUserPoint(mapCameraProps.center)
        }
    }, [filters.location, activeDealer, coords]);

    useEffect(() => {
        // Loading state management
        setLoading(false);
    }, [paginatedModels]);
    
    /* Returns */
    let functions = {
        /* readonly variables */
        paginatedModels, closestDealer, actualPage, totalPages, totalResults, 
        activeDealer, activeMarkerId, allLocations, mapProps, DEFAULT_CAM_VALUES, 
        tab, isLoading, filters, userPoint,
        /* switching area */
        switchTab, switchPage, switchFilters, switchActiveMarkerId, switchMapProps,
        /* utils */
    }

    return (
        <DealersContext.Provider value={functions}>
            {children}
        </DealersContext.Provider>
    );
};

export default DealersProvider;

export const useDealersContext = () => useContext(DealersContext);