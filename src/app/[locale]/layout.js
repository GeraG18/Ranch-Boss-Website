import FunctionalComponent from "@/components/general/functional_component";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'SEOMetadata.MainScreen' });
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
      siteName: "Ranch Boss by Horizon Trailers"
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

export default async function AppLayout({ children }) {

  return (
    <>
      <FunctionalComponent/>
      {children}
    </>
  );
}
