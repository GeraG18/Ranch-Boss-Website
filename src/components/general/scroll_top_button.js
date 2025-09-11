'use client'
import { useTranslations } from "next-intl";
import { useEffect } from "react";

const ScrollTopButton = () => {

    const t = useTranslations('PagesTitles')

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    useEffect(() => {
        const listener = window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                document.getElementById('scroll-top-button').style.display = 'flex';
            } else {
                document.getElementById('scroll-top-button').style.display = 'none';
            }
        });

        return () => {
            window.removeEventListener('scroll', listener);
        };
    }, []);

    return (
        <div id="scroll-top-button" className="fixed bottom-[20%] left-0 *lg:right-2 border-none bg-tertiary-color text-white flex flex-col items-center 
        justify-center font-['lora'] uppercase rounded-r-lg *lg:rounded-r-lg p-4 lg:p-2 cursor-pointer z-300 motion-safe:transition-all 
        motion-reduce:transition-none will-change-auto  motion-safe:duration-300 shadow-[0px_-4px_15px_0px_rgba(0,0,0,0.3),0px_12px_12px_0px_rgba(0,0,0,0.22)] 
        *lg:bottom-2 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium text-[14px] select-none" onClick={() => goToTop()}>
            <span className="material-symbols-outlined notranslate w-6 h-6 flex items-center justify-center">arrow_upward</span>
            <span className="hidden lg:block text-xs font-semibold min-w-17 whitespace-break-spaces">{t('scrollTop')}</span>
        </div>
    )
}

export default ScrollTopButton;