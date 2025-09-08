import React from "react";
import { ProductsList } from "@/jsons/products/products";
import CompareHeader from "@/components/compare/compare_header";
import Comparator from "@/components/compare/comparator";
import { notFound } from "next/navigation";
import NavBar from "@/components/general/nav_bar";
import PageSpacer from "@/components/general/page_spacer";
import FABChat from "@/components/general/fab_chat";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const slug = (await params).slug;
    const sParams = (await searchParams);
    const locale = (await params).locale;
    const t = await getTranslations({ locale, namespace: 'SEOMetadata.Products__Compare' });

    let models = "";
    if(JSON.stringify(sParams) !== '{}') {
        (Array.isArray(sParams['model']) ? sParams['model'] : [sParams['model']]).forEach((model, index) => {
            models += `${model} ${(sParams['model'].length - 1) !== index ? "vs. " : ""}`;
        });
    } else {
        models = String(slug).charAt(0).toUpperCase() + String(slug).slice(1);
    }
   
    return {
        metadataBase: new URL('https://horizontrailers.com'),
        title: t('title', {models}),
        authors:[{name: "Horizon Trailers LLC"}],
        description: t('description'),
        keywords: t('keywords'),
        openGraph: {
            title: t('title', {models}),
            description: t('description'),
            images: ['/og-banner.webp'],
            url:"https://www.horizontrailers.com",
            siteName: "Horizon Trailers"
        },
        twitter: {
            creator:"Horizon Trailers LLC",
            site:"@TrailersHorizon",
            card: 'summary_large_image',
            title: t('title', {models}),
            description: t('description'),
            images: ['/tw-banner.webp'],
        },
    }
  }
   
  export default async function Page({ params, searchParams }) {
      const slug = decodeURIComponent((await params).slug).replace('+', ' ');
      const locale = (await params).locale;
    
    let prodsWithoutComments = ProductsList[locale].filter((item) => !item.hasOwnProperty('_comment'));
    
    let arr = prodsWithoutComments.filter((item) => item.category === slug?.toUpperCase());

    if(arr.length === 0) notFound()

    return(
        <>  
            <NavBar/>
            <PageSpacer showingTopbar={true} showingRoutebar={true}/>
            <FABChat/>
            <CompareHeader category={slug}/>
            <Comparator categoryId={slug}/>
        </>
    );
  }