'use client' // Renders on client side
import React from 'react';
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
        <div className="w-full flex flex-row flex-wrap justify-center items-center my-4 gap-2 lg:flex-nowrap lg:h-9">
            {/* Botón de filtros para móvil */}
            <button
                className="w-[calc(50%-0.5rem)] h-9 flex-none border border-[#caced1] flex items-center justify-center rounded-[10px] text-[#181818] font-medium uppercase lg:hidden"
                onClick={onShowFilters}
            >
                <span className="material-symbols-outlined notranslate">tune</span>
                {t('filters')}
            </button>
            
            {/* Contador de resultados */}
            <span className="w-[calc(50%-0.5rem)] flex-none text-[1rem] font-semibold text-end lg:w-52 lg:text-start">
                {resultsText}
            </span>
            
            {/* Selector de segmento para desktop */}
            <div className="hidden items-center w-full max-w-full overflow-hidden pb-1 z-60 lg:flex lg:pb-0 direction-rtl">
                <div className="items-center max-w-full overflow-x-auto overflow-y-hidden gap-4 flex direction-ltr">
                    {segmentOptions.map(({ label, value }) => (
                    <button
                        key={value}
                        onClick={() => onSegmentChange(value)}
                        className={`flex-none font-['Montserrat'] font-bold leading-[1.8rem] border-none w-full h-9 cursor-pointer flex flex-col gap-0 items-start justify-center bg-transparent text-[rgb(119,120,123)] lg:w-fit lg:items-center hover:text-secondary-color transition-colors duration-300 ${
                        selectedSegment.toUpperCase() === value ? "underline decoration-[3px] underline-offset-4 decoration-primary-color" : ""
                        }`}
                    >
                        {label}
                    </button>
                    ))}
                </div>
            </div>
            
            {/* Selector de segmento para móvil */}
            <div className="w-full lg:hidden">
                <select
                value={selectedSegment.toUpperCase()}
                onChange={(e) => onSegmentChange(e.target.value)}
                className="w-full h-9 border border-[#D5D5D5] rounded-[10px] px-3 font-['Montserrat'] text-[0.85rem] font-semibold focus:border-primary-color focus:outline-hidden"
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