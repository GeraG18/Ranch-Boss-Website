'use client' // Renders on client side
import React, { Fragment } from 'react';
import { useTranslations } from 'next-intl';

const Header = ({ 
  onShowFilters, 
  resultsText, 
  segmentOptions, 
  selectedSegment, 
  onSegmentChange
}) => {
    
    const t = useTranslations('PagesTitles');

    return (
        <div className="w-full flex flex-row flex-wrap justify-center items-center my-4 gap-x-0 gap-y-2 lg:flex-nowrap lg:h-9">
            {/* Botón de filtros para móvil */}
            <button
                className="w-1/2 h-9 flex-none border border-[#caced1] flex items-center justify-center text-[#181818] font-medium uppercase lg:hidden"
                onClick={onShowFilters}
            >
                <span className="material-symbols-outlined notranslate">tune</span>
                {t('filters')}
            </button>
            
            
            {/* Selector de segmento para desktop */}
            <div className="hidden items-center flex-none w-fit max-w-full overflow-hidden pb-1 z-60 lg:flex lg:pb-0 *direction-rtl">
                <div className="items-center max-w-full overflow-x-auto overflow-y-hidden gap-0 flex direction-ltr">
                    {segmentOptions.map(({ label, value }) => (
                        <button className={`min-w-18 flex flex-col items-center justify-center [&.selected_>_span]:text-secondary-color z-20
                            cursor-pointer ${selectedSegment.toUpperCase() === value ? 'selected' : ''}
                        `} key={value}>
                            <span
                                key={value}
                                onClick={() => onSegmentChange(value)}
                                className={`px-4 font-['oswald'] text-gray-400 font-semibold`}
                            >
                                {label}
                            </span>
                            {
                                selectedSegment.toUpperCase() === value ? (
                                    <div className="my-2 mx-1 w-full h-1 flex-none self-center
                                    flex flex-row gap-2">
                                        <div className="bg-secondary-color w-full h-[2px]" />
                                        <div className="bg-primary-color w-1 h-1 flex-none rotate-45" />
                                        <div className="bg-secondary-color w-full h-[2px]" />
                                        <div className="bg-primary-color w-1 h-1 flex-none rotate-45" />
                                        <div className="bg-secondary-color w-full h-[2px]" />
                                    </div>
                                ) : (
                                    <div className="my-2 mx-1 w-full h-1 flex-none self-center
                                    flex flex-row gap-2">
                                        <div className="bg-gray-300 w-full h-[2px]" />
                                    </div>
                                )
                            }
                        </button>
                    ))}
                </div>
            </div>

            <div className="w-full hidden lg:flex flex-col items-center justify-center [&.selected_>_span]:text-secondary-color z-10">
                <span className="px-4 font-['oswald'] text-transparent font-semibold h-6"/>
                <div className="my-2 mx-1 w-full h-1 flex-none self-center
                flex flex-row gap-2">
                    <div className="bg-gray-300 w-full h-[2px]" />
                </div>
            </div>

            <div className="w-full hidden lg:flex flex-col items-end justify-center [&.selected_>_span]:text-secondary-color z-10">
                <span className="px-4 font-['lora'] font-semibold h-6 text-tertiary-color/60 text-sm flex items-center justify-center">
                    {resultsText}
                </span>
                <div className="my-2 mx-1 w-full h-1 flex-none self-center
                flex flex-row gap-2">
                    <div className="bg-gray-300 w-full h-[2px]" />
                </div>
            </div>

            {/* Contador de resultados */}
            <span className="block lg:hidden w-1/2 flex-none text-[1rem] font-semibold text-end lg:w-52 text-tertiary-color/80">
                {resultsText}
            </span>
            
            {/* Selector de segmento para móvil */}
            <div className="w-full lg:hidden">
                <select
                value={selectedSegment.toUpperCase()}
                onChange={(e) => onSegmentChange(e.target.value)}
                className="w-full h-9 border border-[#D5D5D5] px-3 font-['lora'] text-[0.85rem] font-semibold focus:border-primary-color focus:outline-hidden"
                >
                {segmentOptions.map(({ label, value }) => (
                    <option key={value} value={value}>
                    {label}
                    </option>
                ))}
                </select>
            </div>
        </div>
    );
};

export default Header;