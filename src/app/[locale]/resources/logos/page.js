import LogosBody from "@/components/resources/logos_body";
import { getTranslations } from "next-intl/server";
import React from "react";

export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const locale = (await params).locale;
    const t = await getTranslations({ locale, namespace: 'SEOMetadata.Resources' });
    const rT = await getTranslations({ locale, namespace: 'Resources.Wallpapers' });

    return {
        metadataBase: new URL('https://horizontrailers.com'),
        title: t('titleAlt', {name: rT('title')}),
        authors:[{name: "Horizon Trailers LLC"}],
        description: t('description'),
        keywords: t('keywords'),
        openGraph: {
            title: `${rT('title')} | Horizon Trailers`,
            description: t('description'),
            images: ['/og-banner.webp'],
            url:"https://www.horizontrailers.com",
            siteName: "Horizon Trailers"
        },
        twitter: {
            creator:"Horizon Trailers LLC",
            site:"@TrailersHorizon",
            card: 'summary_large_image',
            title: `${rT('title')} | Horizon Trailers`,
            description: t('description'),
            images: ['/tw-banner.webp'],
        },
    }
}

export default async function LogosPage({ params, searchParams }) {
    return(
        <>
            <LogosBody/>
        </>
    )
}