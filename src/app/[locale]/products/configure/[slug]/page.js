import React from "react";
import {Products} from "@/jsons/products/products";
import { notFound } from "next/navigation";
import ConfiguratorBody from "@/components/product-configurator/configurator_body";
import ThisAlmostYours from "@/components/product-configurator/this_almost_yours";
import ConfiguratorSummary from "@/components/product-configurator/configurator-summary";
import ConfiguratorContext from "@/context/configurator_context/configurator_context";
import NavBar from "@/components/general/nav_bar";
import NotAvailable from "@/components/product-configurator/not_available";
import BottomBar from "@/components/product-configurator/bottom_bar";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const slug = (await params).slug;
    const locale = (await params).locale;
    const t = await getTranslations({ locale, namespace: 'SEOMetadata.Products__Configure' });
    
    let prodsWithoutComments = Products[locale].filter((item) => !item.hasOwnProperty('_comment'));
    let product = prodsWithoutComments.find((item) => item.id === slug.toUpperCase());
    // 
    return {
        metadataBase: new URL('https://horizontrailers.com'),
        title: t('title', {product: product.name}),//`Configure ${product.name} | Horizon Trailers`,
        authors:[{name: "Horizon Trailers LLC"}],
        description: t('description'),
        keywords: t('keywords'),
        openGraph: {
            title: t('title', {product: product.name}),
            description: t('description'),
            images: ['/og-banner.webp'],
            url:"https://www.horizontrailers.com",
            siteName: "Horizon Trailers"
        },
        twitter: {
            creator:"Horizon Trailers LLC",
            site:"@TrailersHorizon",
            card: 'summary_large_image',
            title: t('title', {product: product.name}),
            description: t('description'),
            images: ['/tw-banner.webp'],
        },
    }
  }
   
  export default async function Page({ params, searchParams }) {
    const slug = (await params).slug;
    const locale = (await params).locale;
    
    let prodsWithoutComments = Products[locale].filter((item) => !item.hasOwnProperty('_comment'));
    let product = prodsWithoutComments.find((item) => item.id === slug.toUpperCase());

    if(!product) notFound()

    return(
        <>
            <NavBar isStatic={true}/>
            {
                (slug.includes('HZ5') || slug.includes('HZ6')) ?
                <ConfiguratorContext>
                    <ConfiguratorBody product={product}/>
                    <ThisAlmostYours/>
                    <ConfiguratorSummary name={product?.name}/>
                    <BottomBar/>
                </ConfiguratorContext>
                :
                <NotAvailable product={product}/>
            }
        </>
    );
  }