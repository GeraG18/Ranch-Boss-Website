'use client' // Renders on client side
import React from "react";
import Link from "next/link"
import { useTranslations } from "next-intl";

const BodyContainer = () => {

    const t = useTranslations('PrivacyPolicy')
    //#region view
    return(
        <div className="font-['lora']">
            <div className="my-8 mx-4 z-100 max-w-screen-lg  xl:mx-auto">
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
                    a: (c) => <Link href="/contact-us" className="text-[#77787b] font-medium
                    text-wrap motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-300 underline underline-offset-4
                    decoration-2 lg:hover:text-primary-color">{c}</Link>
                })
            }
            </div>
        </div>
    );
}

export default BodyContainer;