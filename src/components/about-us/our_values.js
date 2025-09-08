import { useTranslations } from "next-intl";
import React from "react";

const ValuesItem = ({title, values}) => {

    const t = useTranslations('AboutUs')
    //#region view
    return(
        <div className="w-full flex gap-8 flex-col justify-around items-center rounded-[1rem]
            motion-safe:transition-all motion-reduce:transition-none will-change-auto font-['Montserrat']
            motion-safe:duration-200 overflow-hidden py-8 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]
            bg-[radial-gradient(circle,rgba(55,62,62,0)_50%,rgba(55,62,62,0.03)_74%,rgba(55,62,62,0.06)_100%)]">
            <div className="font-['Montserrat'] flex flex-col text-primary-color uppercase">
                <h3 className="font-['Michroma'] text-[1.25rem] font-bold leading-8 flex
                items-center justify-start">{title}</h3>
            </div>
            {
                values.map((value, index) => (
                    <div key={index} className="w-[calc(100%-2rem)] flex gap-2 flex-row items-center justify-center">
                        <p className="m-0">{value}</p>
                    </div>
                ))
            }
        </div>
    )
}

const OurValues = () => {
    const t = useTranslations('AboutUs')

    const ourValues = {
        [t('integrityTitle')]: [
            t('integrityDescription')
        ],
        [t('qualityTitle')]: [
            t('qualityDescription')
        ],
        [t('reliabilityTitle')]: [
            t('reliabilityDescription')
        ],
        [t('customerCommitmentTitle')]: [
            t('customerCommitmentDescription')
        ],
        [t('communityTitle')]: [
            t('communityDescription')
        ],
        [t('innovationTitle')]: [
            t('innovationDescription')
        ],
    }

    return(
        <div className="mx-4 max-w-(--breakpoint-xl) xl:mx-auto">
            <div className="font-['Montserrat'] py-8 flex flex-col">
                <h2 className="font-['Michroma'] font-bold text-[1.75rem] leading-10 flex items-center justify-start text-start w-full col-start-1 col-end-4 row-start-1 lg:text-[2rem] lg:leading-12 uppercase">{t('valuesTitle')}</h2>
            </div>
            <div className="mb-8 grid grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-none lg:mx-auto lg:max-w-(--breakpoint-xl)">
                {
                    Object.keys(ourValues).map((value) => (

                        <ValuesItem key={value} 
                            title={value}
                            values={ourValues[value]}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default OurValues;