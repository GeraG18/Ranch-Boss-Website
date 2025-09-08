import React, { useEffect, useState } from "react";
import { useTranslations } from "use-intl";
import { useDealersContext } from "@/context/dealers_map_context";

function DealerListHeader() {

    //#region code
    const [searchInput, setSearchInput] = useState('');
    const t = useTranslations('DealersScreen')
    
    const {
        /* read-only variables */
        filters,
        /* switching area */
        switchFilters,
    } = useDealersContext();

    useEffect(() => {
        
    }, [searchInput])
    //#endregion

    //region view
    return (
        <div className="bg-[#f3f3f3] relative w-full py-8 font-['Montserrat']">
            <div className="mx-4 max-w-(--breakpoint-xl) h-fit z-100 xl:w-full xl:mx-auto flex flex-col items-center justify-center gap-2">
                <span className="font-['Michroma'] text-[2.25rem] leading-8 flex items-center justify-center
                text-center mb-4 lg:text-[4.8rem] lg:leading-16 uppercase">{t('listHeaderTitle')}</span>

                <input className="border border-[#d5d5d5] rounded-[10px] bg-white w-full h-8 text-[1rem]
                outline-hidden p-0 pl-[0.2rem] lg:w-1/2" type="text" placeholder={t('mapHeaderPlaceholder')}
                aria-label={t('mapHeaderPlaceholder')} role="search"
                value={filters.search} onChange={(e) => switchFilters({
                    search: e.target.value,
                    location: {}
                })}/>
            </div>
        </div>
    );
    //#endregion
}

export default DealerListHeader