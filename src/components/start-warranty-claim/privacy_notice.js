import React from "react";
import Link from "next/link"
import { useTranslations } from "next-intl";

const PrivacyNotice = () => {

    const t = useTranslations('PrivacyNotice')

    return(
        <div className="mx-4 mb-4 max-w-(--breakpoint-xl) z-100 xl:mx-auto flex flex-col gap-2">
            <h2 className="px-2 font-['Michroma'] uppercase text-[1rem] font-bold text-[#73767A]">{t('title')}</h2>
            <p className="px-2 font-['Montserrat'] text-[#73767A]">
                {
                    t.rich('description', {
                        policy: (chunks) => <Link className="font-semibold text-[#77787b] text-wrap motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-300 
                        underline decoration-1 decoration-[#77787b] underline-offset-[0.25rem] lg:hover:text-primary-color lg:hover:decoration-primary-color" href="/privacy-policy">{chunks}</Link>,
                        phone: (chunks) => <a className="font-semibold text-[#77787b] text-wrap motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-300 
                        underline decoration-1 decoration-[#77787b] underline-offset-[0.25rem] lg:hover:text-primary-color lg:hover:decoration-primary-color" href="tel:+19154558537">{chunks}</a>,
                        mail: (chunks) => <a className="font-semibold text-[#77787b] text-wrap motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-300 
                        underline decoration-1 decoration-[#77787b] underline-offset-[0.25rem] lg:hover:text-primary-color lg:hover:decoration-primary-color" href="mailto:privacy@bedboss.shop">{chunks}</a>,
                    })
                }
            </p>

        </div>
    )
}

export default PrivacyNotice;