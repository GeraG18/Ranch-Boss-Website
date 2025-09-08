import React, {useState, useEffect, useCallback} from 'react';
import DealerListItem from './dealer_list_item';
import { DealersList as dList } from "@/jsons/dealers-list/dealer-list";
import {  useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useDealersContext } from '@/context/dealers_map_context';
import Pagination from '@/components/products/pagination';

const DealersList = ({searchBox="", setPageParam = (quant) => {}}) => {

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const wT = useTranslations('WeReSorry')

    const {
        /* read-only variables */
        paginatedModels, actualPage, totalPages,
        /* switching area */
        switchPage, switchActiveMarkerId, switchTab,
    } = useDealersContext();

    const [filterdMarkers, setFilteredMarkers] = useState([])
    const [listOfMarkers, setListOfMarkers] = useState([])
    const [paginationView, setPaginationView] = useState([])
    /* PAGINATION */
    const showingItems = 12;
    const [numOfPages, setNumOfPages] = useState (1);
    const [pagination, setPagination] = useState(1);
    let pageNumber = params.get('page');

    /* END PAGINATION */

    const applyFilters = () => {
        let auxArrayOfMarkers = []
        if(searchBox.trim() !== "") {
            let inputValue = formatText(searchBox)
            setPagination(1)
            
            // let valueToSearch = typeOfData === "state" ? listOfStates[inputValue] : inputValue
            auxArrayOfMarkers = listOfMarkers.filter((marker)=>(
                marker.name.toUpperCase().includes(inputValue) ||
                marker.address.includes(inputValue) ||
                marker.zip.includes(inputValue)
            ))
        }else{
            auxArrayOfMarkers = listOfMarkers;
        }
        // listOfMarkers.map((item, index) => ({...item, index}));
        // 
        
        
        setNumOfPages(Math.ceil(auxArrayOfMarkers.length/showingItems))
        setFilteredMarkers(auxArrayOfMarkers)
        setPaginationView([...auxArrayOfMarkers.filter((item, index) => index >= (showingItems * (pagination - 1)) && index < (showingItems * pagination))])
    }


    useEffect(() => {
        applyFilters()
        setPageParam(pagination)
    }, [pagination, listOfMarkers, searchBox])
    
    useEffect(()=>{
        let nPages = Math.ceil(dList.length/showingItems);
        
        if(pageNumber) {
            if(+pageNumber > nPages) {
                setPagination(1)
            } else {
                setPagination(+pageNumber)
            }
        }
        createListOfMarkers()
    },[pageNumber]);

    const createListOfMarkers = async ()=>{
        let arrayOfMarkers = []
        
        setListOfMarkers(dList)
        setFilteredMarkers(dList)
    }

    const formatText = (textToFormat)=>{
        let formatedText = ""
        let arrayOfWords = textToFormat.trim().split(" ")
        if(arrayOfWords.length> 1)
            formatedText = arrayOfWords.map((word) => { 
                let text =""
                 if(word !== "" && word !==" ")
                   text = word[0] + word.substring(1); 
                return text
            }).join(" ");
        else
         formatedText = textToFormat.trim();
        return formatedText.toUpperCase()
    }
    //#endregion
    const handleMarkerClick = useCallback((id) => {
        switchActiveMarkerId(id);
        switchTab('map')
        scrollTo(0,0)
    }, []);
    
    //#region view
    return (
        <div className="flex gap-4 flex-col-reverse my-8 lg:flex-row lg:gap-0
        mx-4 max-w-(--breakpoint-xl) h-fit z-100 xl:w-full xl:mx-auto font-['Montserrat']">
            <div className="w-full h-full flex flex-col lg:px-4">
                <div className="h-full w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-0">
                    {
                        paginatedModels.length > 0 ?
                        <>
                            {
                                paginatedModels.map((marker) => (
                                    <DealerListItem key={marker.id}
                                        id={marker.id} 
                                        index={marker.index+1} 
                                        name={marker.name} 
                                        logo={marker.logo} 
                                        address={marker.address} 
                                        phoneNumber={marker.numberPhone} 
                                        website={marker.website}
                                        clickedElement={(id) => handleMarkerClick(id)}
                                    />
                                ))
                            }
                        </>
                        :
                        <div className="col-span-full mt-4 flex items-center justify-center gap-2 flex-col w-full h-fit">
                            <h1 className="font-['Michroma'] text-[2rem] m-0">{wT('title')}</h1>
                            <p className="m-0">{wT('description')}</p>
                        </div>
                    }
                    
                </div>
                {
                    paginatedModels.length > 0 &&
                    <Pagination
                        currentPage={actualPage} 
                        totalPages={totalPages} 
                        onChange={(val) => {switchPage(val)}}
                    />
                }
            </div>
        </div>
    );
    //#endregion
}

export default DealersList;