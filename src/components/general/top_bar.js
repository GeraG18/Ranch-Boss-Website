import React from "react";
import Link from "next/link"
import { useTranslations } from "use-intl";
import LanguageSwitcher from "@/components/general/language_switcher";

function TopBar (){
    //#endregion
    const t = useTranslations('PagesTitles');
    return(
        <div className="font-['oswald'] text-[1rem] text-base leading-5 relative uppercase text-right w-auto h-10 border-none flex flex-row items-center justify-center select-none">
            <div className="flex items-center justify-center gap-4 mx-4 w-full max-w-screen-lg  sm:gap-8 lg:gap-12  xl:mx-auto">
                <Link className="motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto text-secondary-color-20 lg:hover:text-secondary-color" 
                    href="/blog">
                    {t('blog')}
                </Link>
                <Link className="motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto text-secondary-color-20 lg:hover:text-secondary-color" 
                    href="/contact-us">
                    {t('contactUs')}
                </Link>
                <Link className="motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto text-secondary-color-20 lg:hover:text-secondary-color" 
                    href="/become-a-dealer">
                    {t('becomeADealer')}
                </Link>
                <LanguageSwitcher/>
            </div>
        </div>
    );
}



export default  TopBar