import {ProductsDynamicAssets, ProductsStaticAssets, ProductsDescriptions, ProductsList, ProductsSeo} from "@/jsons/products/products"
import ThreeModelViewer from "@/components/product-standard-features/3d_model_viewer";
import NotesBlock from "@/components/product-standard-features/notes_block";
import FirstTextBlock from "@/components/product-standard-features/first_text_block";
import SecondTextBlock from "@/components/product-standard-features/second_text_block";
import ScrollAnimation from "@/components/product-standard-features/scroll_animation";
import ProductGallery from "@/components/product-standard-features/product_gallery";
import NextStep from "@/components/product-standard-features/next_step";
import PopularTrailers from "@/components/products/popular_trailers";
import { notFound } from "next/navigation";
import NavBar from "@/components/general/nav_bar";
import PageSpacer from "@/components/general/page_spacer";
import FABChat from "@/components/general/fab_chat";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params, searchParams }, parent) {
    /* Route Params */
    const slug = (await params).slug
    const locale = (await params).locale;

    /* Hooks */
    const t = await getTranslations({ locale, namespace: 'SEOMetadata.Products' });
    
    /* Variables */
    const productItem = ProductsList[locale].find((item) => item.id === slug.toUpperCase());
    const productSeo = ProductsSeo[locale][slug.toUpperCase()];
    
    return {
        metadataBase: new URL('https://horizontrailers.com'),
        title: productSeo.title || `${productItem.name} | Horizon Trailers`,
        authors:[{name: "Horizon Trailers LLC"}],
        description: productSeo.description || t('description'),
        keywords: t('keywords'),
        openGraph: {
            title: productSeo.title || `${productItem.name} | Horizon Trailers`,
            description: productSeo.description || t('description'),
            images: ['/og-banner.webp'],
            url:"https://www.horizontrailers.com",
            siteName: "Horizon Trailers"
        },
        twitter: {
            creator:"Horizon Trailers LLC",
            site:"@TrailersHorizon",
            card: 'summary_large_image',
            title: productSeo.title || `${productItem.name} | Horizon Trailers`,
            description: productSeo.description || t('description'),
            images: ['/tw-banner.webp'],
        },
    }
}

export default async function Page({ params, searchParams }) {
    /* Route Params */
    const slug = (await params).slug;
    const locale = (await params).locale;
    
    /* Variables */
    // Search the id on the list of products
    const productItem = ProductsList[locale].find((item) => item.id === slug.toUpperCase());
    //If not found, send it to not found page
    if(!productItem) notFound();
    // Get the product assets and descriptions
    const productDescriptions = ProductsDescriptions[locale][slug.toUpperCase()];
    const productSeo = ProductsSeo[locale][slug.toUpperCase()];
    const productsStaticAssets = ProductsStaticAssets[slug.toUpperCase()];
    const productsDynamicAssets = ProductsDynamicAssets[locale][slug.toUpperCase()]; 
    // Generate the product object (for components that may need the full object)
    const product = {
        ...productItem,
        ...productDescriptions,
        ...productsStaticAssets,
        ...productsDynamicAssets,
        seo: productSeo,
    };
    // console.log('product',product);
    
    return(
        <>
            <NavBar/>
            <PageSpacer showingTopbar={true} showingRoutebar={true}/>
            <FABChat/>
            <ThreeModelViewer 
                item={product} 
                fullModelsList={ProductsList[locale]}
            />
            <NotesBlock notes={product.notes}/>
            {
                product.descriptions && (
                    <>
                        <FirstTextBlock 
                            category={product.category}
                            status={product.status}
                            buttons={product.descriptions.firstBlock.buttons}
                            description={product.descriptions.firstBlock.description}
                        />
                        <SecondTextBlock 
                            status={product.status}
                            category={product.category}
                            data={product.descriptions.secondBlock}  
                        />
                    </>
                )
            }
            {
                (product.scrollGallery && product.scrollGallery.length > 0) &&
                <ScrollAnimation gallery={product.scrollGallery}/>
            }
            {
                (product.productGallery && product.productGallery.length > 0) &&
                <ProductGallery gallery={product.productGallery} status={product.status} />
            }
            {
                product.videos && (
                    <NextStep 
                        actionVideo={product.videos.action}
                        reviewVideo={product.videos.review}
                    />
                )
            }
            <PopularTrailers/>
        </>
    );
  }