
import PageSpacer from "@/components/general/page_spacer";
import FooterContainer from "@/components/general/footer_container";
import FABChat from "@/components/general/fab_chat";
import MerchandiseProdsContext from "@/context/merchandise_products_context";
import MerchandiseNavbar from "@/components/merchandise/merchandise_navbar"
import MerchandiseCContext from "@/context/merchandise_cart_context";
import { getTranslations } from "next-intl/server";

// export const metadata = {
//   metadataBase: new URL('https://horizontrailers.com'),
//   title: 'Merchandise | Horizon Trailers',
//   authors:[{name: "Horizon Trailers LLC"}],
//   description: "Show your Horizon Trailers pride with our official merchandise. From comfy tees to cozy hoodies, find the perfect gear to represent your love for quality trailers. Shop now! ",
//   keywords: `horizon trailers,horizon trailers llc,dump trailer,roll off trailer,equipment trailer,gooseneck trailer,utility trailer,dump trailer,flatdeck trailer,trailer for sell,
//                     trailer rentals,dumpster trailer,trailer rental near me,quality trailer,premier trailer,premium trailer,utility trailers for sale,trailers and hitches near me,
//                     trailers albuquerque,aluminium trailers,affordable trailers,basic trailers,bike trailers,trailers craiglist,trailers cost,trailers colorado springs,trailers,
//                     cargo trailers for sale,trailers dealers near me,dump trailers for sale,trailers denver,trailers el paso,trailers east,trailers west,trailers south,trailers north,
//                     dump trailer for sale,roll off trailer for sale,equipment trailer for sale,gooseneck trailer for sale,utility trailer for sale, become a dealer, become a horizon trailers dealer,
//                     horizon trailers dealers, contact horizon trailers, contact horizon trailers llc, horizon trailers owners manual`,
//   openGraph: {
//     title: 'All Products | Horizon Trailers Facebook',
//     description: "Show your Horizon Trailers pride with our official merchandise. From comfy tees to cozy hoodies, find the perfect gear to represent your love for quality trailers. Shop now! ",
//     images: ['/og-banner.webp'],
//     url:"https://www.horizontrailers.com",
//     siteName: "Horizon Trailers"
//   },
//   twitter: {
//     creator:"Horizon Trailers LLC",
//     site:"@TrailersHorizon",
//     card: 'summary_large_image',
//     title: 'All Products | Horizon Trailers X',
//     description: "Show your Horizon Trailers pride with our official merchandise. From comfy tees to cozy hoodies, find the perfect gear to represent your love for quality trailers. Shop now! ",
//     images: ['/tw-banner.webp'],
//   },
// };

export async function generateMetadata({ params }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'SEOMetadata.Merchandise' });
  return {
    metadataBase: new URL('https://horizontrailers.com'),
    title: t('title'),
    authors:[{name: "Horizon Trailers LLC"}],
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: ['/og-banner.webp'],
      url:"https://www.horizontrailers.com",
      siteName: "Horizon Trailers"
    },
    twitter: {
      creator:"Horizon Trailers LLC",
      site:"@TrailersHorizon",
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/tw-banner.webp'],
    },
  };
}

export default function DefaultLayout({ children }) {
  return (
    <MerchandiseProdsContext>
        <MerchandiseCContext>
            <MerchandiseNavbar/>
            <PageSpacer showingTopbar={true} showingRoutebar={true}/>
            <div>
                {children}
            </div>
            <FooterContainer/>
        </MerchandiseCContext>
    </MerchandiseProdsContext>
  );
}
