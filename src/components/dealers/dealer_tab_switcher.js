import { useDealersContext } from "@/context/dealers_map_context";

const { useTranslations } = require("next-intl");

const DealerTabSwitcher = () => {

    const t = useTranslations('PagesTitles')
    const {
            /* read-only variables */
            tab,
            /* switching area */
            switchTab, switchActiveMarkerId,
    } = useDealersContext();

    return(
        <div className="mx-4 py-1 max-w-(--breakpoint-xl) h-fit z-100 xl:w-full xl:mx-auto
            flex flex-row pr-0 items-center justify-end gap-4 lg:w-auto font-['Montserrat']">
            <button className={`cursor-pointer relative text-white border-none w-full h-10
            uppercase flex justify-center items-center text-[0.85rem]
            select-none motion-safe:transition-all motion-reduce:transition-none 
            will-change-auto motion-safe:duration-300 rounded-[10px] lg:text-[1rem]
            lg:w-60 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium ${tab === 'map' ? "bg-primary-color" : "bg-[#7a7a7a]"}`}
                onClick={() => {switchTab('map'); }}>
                {t('dealersMap')}
            </button>
            <button className={`cursor-pointer relative text-white border-none w-full h-10
            uppercase flex justify-center items-center text-[0.85rem]
            select-none motion-safe:transition-all motion-reduce:transition-none 
            will-change-auto motion-safe:duration-300 rounded-[10px] lg:text-[1rem]
            lg:w-60 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium ${tab === 'list' ? "bg-primary-color" : "bg-[#7a7a7a]"}`}
                onClick={() => {switchTab('list'); switchActiveMarkerId(null)  }}>
                {t('dealersList')}
            </button>
        </div>
    )
}

export default DealerTabSwitcher;