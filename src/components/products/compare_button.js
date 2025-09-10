import { useTranslations } from "next-intl";

const CompareButton = ({visible, onClick}) => {

    const t = useTranslations('PagesTitles')

    return(
        <button id="floating-action-button" className={`fixed bottom-[28%] right-0  border-none bg-primary-color
            text-white flex flex-col items-center justify-center font-['lora'] uppercase rounded-l-lg *lg:rounded-r-lg
            p-4 lg:p-2 cursor-pointer z-450 motion-safe:transition-all motion-reduce:transition-none will-change-auto 
            motion-safe:duration-300 shadow-[0px_-4px_15px_0px_rgba(0,0,0,0.3),0px_12px_12px_0px_rgba(0,0,0,0.22)]
            *lg:bottom-2 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium text-[14px] ${visible ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"}`} 
            onClick={() => onClick()}>
            <span className="material-symbols-outlined notranslate w-6 h-6 flex items-center justify-center" >
                compare_arrows
            </span>
            {/* <span className="notranslate w-6 h-6 flex items-center justify-center font-semibold text-lg" >
                VS
            </span> */}
            <span className="hidden lg:block text-xs font-semibold min-w-17">
                {t('compare')}
            </span>
        </button>
    )
}

export default CompareButton;