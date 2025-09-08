'use client' // Renders on client side
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import ModelFilters from './model_filters';
import ModelsProperties from './models_properties';
import CompareButton from './compare_button';
import MobileFilterModal from './mobile_filter_modal';
import NoResults from './no_results';
import Pagination from './pagination';
import BareboneLayout from './barebone_layout'
import Header from './header'
import { useProductsContext } from '@/context/products_context';
import { useCampaignContext } from '@/context/campaign_context';

export default function ModelsContainer() {
    /* Hooks */
    const router = useRouter();
    const { activeCampaign } = useCampaignContext();
    
    const {
        paginatedModels, switchCategory, totalPages, totalResults, actualPage,
        ITEMS_PER_PAGE, segmentOptions, switchPage, category,
    } = useProductsContext()

    /* Translations */
    const t = useTranslations('PagesTitles');
    const wT = useTranslations('WeReSorry');
    const fT = useTranslations('BasicForm');
    
    
    /* State Hooks */
    const [loading, setLoading] = useState(true);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [categoryForCompare, setCategoryForCompare] = useState("");
    const [listToCompare, setListToCompare] = useState([]);

    /* Effect Hooks */
    useEffect(() => {
        if(JSON.stringify(paginatedModels) !== '{}') {
            setLoading(false);
        }
    }, [paginatedModels]);

    const handleCompareClick = useCallback((name, category) => {
        setListToCompare(prev => {
            const newList = prev.includes(name)
                ? prev.filter(item => item !== name)
                : prev.length < 3 ? [...prev, name] : prev;
            
            if (newList.length === 0) {
                setCategoryForCompare('');
            } else if (!prev.includes(name)) {
                setCategoryForCompare(category);
            }
            
            return newList;
        });
    }, []);

    const handleSendToCompare = useCallback(() => {
        const params = new URLSearchParams();
        listToCompare.forEach(model => params.append('model', model));
        router.push(`/products/compare/${categoryForCompare.toLowerCase().replace(' ', '+')}?${params.toString()}`);
    }, [listToCompare, categoryForCompare]);

    const handlePageChange = useCallback((newPage) => {
        switchPage(Math.max(1, Math.min(totalPages, newPage)));
        window.scrollTo(0,0)
    }, [totalPages]);
    
    if (loading) {
        return (
            <BareboneLayout/>
        );
    }

    return (
        <>
            {/* Floating Compare Button */}
            <CompareButton 
                visible={listToCompare.length > 1}
                onClick={handleSendToCompare}
                label={t('compare')}
            />

            {/* Filters Dialog */}
            <MobileFilterModal 
                showModal={showMobileFilters} 
                onFilterChange={(val) => setShowMobileFilters(val)} 
            />

            {/* Main Content */}
            <div className="flex items-start justify-center relative h-auto overflow-x-hidden mx-4 max-w-(--breakpoint-xl) z-100 xl:mx-auto font-['Montserrat']">
                {/* Desktop Filters */}
                <div className="top-0 left-0 hidden justify-end items-start w-fit z-100 relative lg:flex flex-col">
                    {
                        activeCampaign && (
                            <div className="w-[20rem] min-h-4 p-4">
                                {activeCampaign.content}
                            </div>
                        )
                    }
                    <ModelFilters 
                        isShowing={true}
                    />
                </div>

                {/* Products List */}
                <div className="w-full grid grid-cols-1 p-2 flex-col *gap-y-2 select-none mx-auto max-w-(--breakpoint-xl)">
                    <Header 
                        onShowFilters={() => setShowMobileFilters(true)}
                        resultsText={t('pageResults', {
                        page: ((actualPage - 1) * ITEMS_PER_PAGE) + 1,
                        results: ((actualPage - 1) * ITEMS_PER_PAGE) + paginatedModels.length,
                        total: totalResults
                        })}
                        segmentOptions={segmentOptions}
                        selectedSegment={category+''}
                        onSegmentChange={(value) => {
                            switchCategory(value);
                            switchPage(1);
                        }}
                    />

                    <div className="w-full flex items-center justify-center lg:hidden mb-4">
                    {
                        activeCampaign && (
                            <div className="w-[20rem] min-h-4">
                                {activeCampaign.content}
                            </div>
                        )
                    }
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {paginatedModels.length > 0 ? (
                        paginatedModels.map(model => (
                            <ModelsProperties
                                id={model.id}
                                key={model.id}
                                props={model.props}
                                status={model.status}
                                name={model.name}
                                category={model.category}
                                notes={model.notes}
                                image={model.image}
                                compareCategory={categoryForCompare}
                                compareList={listToCompare}
                                clickHandler={handleCompareClick}
                            />
                        ))
                        ) : (
                        <NoResults 
                            title={wT('title')} 
                            description={wT('description')} 
                        />
                        )}
                    </div>

                    {/* Pagination */}
                    {paginatedModels.length > 0 && (
                        <Pagination
                        currentPage={actualPage}
                        totalPages={totalPages}
                        onChange={handlePageChange}
                        prevText={fT('prev')}
                        nextText={fT('next')}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

// Componentes auxiliares (se mantienen igual que en la versión anterior)
// CompareButton, Header, NoResults, Pagination, PageButton
// selectStyles también se mantiene igual