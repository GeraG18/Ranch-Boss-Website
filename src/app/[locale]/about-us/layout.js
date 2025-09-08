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

export async function generateMetadata({ params }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'SEOMetadata.AboutUs' });
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
