'use client' // Renders on client side
import { useTranslations } from "next-intl";
import React from "react";

const Terms = () => {
    const t = useTranslations('TermsOfUse')
    return(
    <div className="font-['lora']">
        <div className="m-4 max-w-screen-lg  z-100 xl:mx-auto">
            {
                t.rich('data', {
                    h2:(c) => <h2 className="text-lg font-bold uppercase">{c}</h2>,
                    p: (c) => <p>{c}</p>,
                    ul: (c) => <ul>{c}</ul>,
                    li: (c) => <li>{c}</li>,
                    h3: (c) => <h3 className="font-bold uppercase italic">{c}</h3>,
                    br: (c) => <br/>,
                    h4: (c) => <h4 className="font-bold uppercase">{c}</h4>,
                    span: (c) => <span>{c}</span>,
                    strong: (c) => <strong>{c}</strong>,
                    code: (c) => <code>{c}</code>,
                    a: (c) => <a className="text-[#77787b] font-medium
                    text-wrap motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-300 underline underline-offset-4
                    decoration-2 lg:hover:text-primary-color" href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home.chooseLanguage">{c}</a>
                })
            }
        </div>
    </div>
);
}

export default Terms;