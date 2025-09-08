import { useTranslations } from "next-intl";
import React from "react";

const AboutHorizon = () => {

    const t = useTranslations('AboutUs')

    return( 
        <div className="relative z-20 flex flex-col text-left py-8 gap-4 w-[calc(100%-2rem)] 
        mx-4 lg:mx-auto max-w-(--breakpoint-xl) font-['Montserrat']">
            <h2 className="font-['Michroma'] font-bold text-[1.75rem] leading-10 flex items-center justify-start text-start w-full col-start-1 col-end-4 row-start-1 lg:text-[2rem] lg:leading-12 uppercase">{t('aboutHTTitle')}</h2>
            <p className="">
                {t('aboutHTDescription')}
            </p>
        </div>
    )
}

export default AboutHorizon;