import React from "react";
import Link from "next/link"
import { useTranslations } from "use-intl";

function TopBar (){
    //#endregion
    const t = useTranslations('PagesTitles');
    return(
        <div className="font-['Montserrat'] text-base leading-5 relative uppercase bg-black text-white text-right w-auto h-10 border-none z-120 flex flex-row items-center justify-center">
            <div className="flex items-center justify-center gap-4 mx-4 w-full max-w-(--breakpoint-xl) sm:gap-8 lg:justify-end xl:mx-auto">
                <Link className="motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto lg:hover:text-primary-light-color" 
                    href="/blog">
                    {t('blog')}
                </Link>
                <Link className="motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto lg:hover:text-primary-light-color" 
                    href="/contact-us">
                    {t('contactUs')}
                </Link>
                <Link className="motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto lg:hover:text-primary-light-color" 
                    href="/become-a-dealer">
                    {t('becomeADealer')}
                </Link>
            </div>
        </div>
    );
}



export default  TopBar