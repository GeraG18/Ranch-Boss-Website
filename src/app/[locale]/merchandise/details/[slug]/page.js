import Merchandise from "@/jsons/merchandise.json"
import { notFound } from "next/navigation";
import MerchProdDetails from "@/components/merchandise/merch_prod_details"
import PopularMerchandise from "@/components/merchandise/popular_merchandise"

export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const slug = (await params).slug;
    const locale = (await params).locale;
    let product = Merchandise[locale].find((item) => item.key === slug.toUpperCase());
    const t = await getTranslations({ locale, namespace: 'SEOMetadata.Merchandise' });
    // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || []
   
    return {
        metadataBase: new URL('https://horizontrailers.com'),
        title: `${product.name} | Horizon Trailers`,
        authors:[{name: "Horizon Trailers LLC"}],
        description: t('description'),
        keywords: t('keywords'),
        openGraph: {
            title: `${product.name} | Horizon Trailers`,
            description: t('description'),
            images: ['/og-banner.webp'],
            url:"https://www.horizontrailers.com",
            siteName: "Horizon Trailers"
        },
        twitter: {
            creator:"Horizon Trailers LLC",
            site:"@TrailersHorizon",
            card: 'summary_large_image',
            title: `${product.name} | Horizon Trailers`,
            description: t('description'),
            images: ['/tw-banner.webp'],
        },
    }
  }
   
  export default async function Page({ params, searchParams }) {
    
    const slug = (await params).slug;
    const locale = (await params).locale;
    // console.log('slug', slug);
    
    let product = Merchandise[locale].find((item) => item.key === slug.toUpperCase());
    // console.log('product', product);
    

    if(!product) notFound()
    
    return(
        <>
            <MerchProdDetails productInfo={product}/>
            <PopularMerchandise/>
        </>
    );
  }