import NavBar from "@/components/general/nav_bar";
import PageSpacer from "@/components/general/page_spacer";
import FooterContainer from "@/components/general/footer_container";
import FABChat from "@/components/general/fab_chat";
import { getTranslations } from "next-intl/server";

// const chakraPetch = Chakra_Petch({
//   weight:['400','500','600','700'],
//   subsets:['latin']
// });
// const teko = Teko({
//   weight:['300','400', '500', '600', '700'],
//   subsets:['latin']
// });

// export const metadata = {
//   metadataBase: new URL('https://horizontrailers.com'),
//   title: 'Have Questions? Contact Us | Horizon Trailers',
//   authors:[{name: "Horizon Trailers LLC"}],
//   description: "Connect with Horizon Trailers through our contact us page. Whether you have questions about our trailers, need support, or want to explore dealership opportunities, our team is ready to assist. Reach out today for expert guidance and exceptional customer service!",
//   keywords: `horizon trailers,horizon trailers llc,dump trailer,roll off trailer,equipment trailer,gooseneck trailer,utility trailer,dump trailer,flatdeck trailer,trailer for sell,
//                     trailer rentals,dumpster trailer,trailer rental near me,quality trailer,premier trailer,premium trailer,utility trailers for sale,trailers and hitches near me,
//                     trailers albuquerque,aluminium trailers,affordable trailers,basic trailers,bike trailers,trailers craiglist,trailers cost,trailers colorado springs,trailers,
//                     cargo trailers for sale,trailers dealers near me,dump trailers for sale,trailers denver,trailers el paso,trailers east,trailers west,trailers south,trailers north,
//                     dump trailer for sale,roll off trailer for sale,equipment trailer for sale,gooseneck trailer for sale,utility trailer for sale, become a dealer, become a horizon trailers dealer,
//                     horizon trailers dealers, contact horizon trailers, contact horizon trailers llc`,
//   openGraph: {
//     title: 'Have Questions? Contact Us | Horizon Trailers Facebook',
//     description: "Connect with Horizon Trailers through our contact us page. Whether you have questions about our trailers, need support, or want to explore dealership opportunities, our team is ready to assist. Reach out today for expert guidance and exceptional customer service!",
//     images: ['/og-banner.webp'],
//     url:"https://www.horizontrailers.com",
//     siteName: "Horizon Trailers"
//   },
//   twitter: {
//     creator:"Horizon Trailers LLC",
//     site:"@TrailersHorizon",
//     card: 'summary_large_image',
//     title: 'Have Questions? Contact Us | Horizon Trailers X',
//     description: "Connect with Horizon Trailers through our contact us page. Whether you have questions about our trailers, need support, or want to explore dealership opportunities, our team is ready to assist. Reach out today for expert guidance and exceptional customer service!",
//     images: ['/tw-banner.webp'],
//   },
// };

export async function generateMetadata({ params }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'SEOMetadata.ContactUs' });
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
    <>
        <NavBar/>
        <PageSpacer showingTopbar={true} showingRoutebar={true}/>
        <div>
            {children}
        </div>
        <FooterContainer/>
        <FABChat/>
    </>
  );
}
