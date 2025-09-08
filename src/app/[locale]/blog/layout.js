import FooterContainer from "@/components/general/footer_container";
import FABChat from "@/components/general/fab_chat";
import BlogProvider from "@/context/blog_context";
import BlogUserContext from "@/context/blog_user_context";
import { getTranslations } from "next-intl/server";

// export const metadata = {
//   metadataBase: new URL('https://horizontrailers.com'),
//   title: 'Check Our Blog and Last News | Horizon Trailers',
//   authors:[{name: "Horizon Trailers LLC"}],
//   description: 'Discover expert insights, tips, and updates on the Horizon Trailers blog. Stay informed about the latest trailer trends, maintenance advice, and hauling solutions. Explore articles tailored for trailer enthusiasts, professionals, and anyone seeking reliable transportation solutions.',
//   keywords: `horizon trailers,horizon trailers llc,dump trailer,roll off trailer,equipment trailer,gooseneck trailer,utility trailer,dump trailer,flatdeck trailer,trailer for sell,
//                     trailer rentals,dumpster trailer,trailer rental near me,quality trailer,premier trailer,premium trailer,utility trailers for sale,trailers and hitches near me,
//                     trailers albuquerque,aluminium trailers,affordable trailers,basic trailers,bike trailers,trailers craiglist,trailers cost,trailers colorado springs,trailers,
//                     cargo trailers for sale,trailers dealers near me,dump trailers for sale,trailers denver,trailers el paso,trailers east,trailers west,trailers south,trailers north,
//                     dump trailer for sale,roll off trailer for sale,equipment trailer for sale,gooseneck trailer for sale,utility trailer for sale, become a dealer, become a horizon trailers dealer,
//                     horizon trailers dealers`,
//   openGraph: {
//     title: 'Check Our Blog and Last News | Horizon Trailers Facebook',
//     description: 'Discover expert insights, tips, and updates on the Horizon Trailers blog. Stay informed about the latest trailer trends, maintenance advice, and hauling solutions. Explore articles tailored for trailer enthusiasts, professionals, and anyone seeking reliable transportation solutions.',
//     images: ['/og-banner.webp'],
//     url:"https://www.horizontrailers.com",
//     siteName: "Horizon Trailers"
//   },
//   twitter: {
//     creator:"Horizon Trailers LLC",
//     site:"@TrailersHorizon",
//     card: 'summary_large_image',
//     title: 'Check Our Blog and Last News | Horizon Trailers X',
//     description: 'Discover expert insights, tips, and updates on the Horizon Trailers blog. Stay informed about the latest trailer trends, maintenance advice, and hauling solutions. Explore articles tailored for trailer enthusiasts, professionals, and anyone seeking reliable transportation solutions.',
//     images: ['/tw-banner.webp'],
//   },
// };

export async function generateMetadata({ params }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'SEOMetadata.Blog' });
  // // console.log('locale', locale);
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
    <BlogUserContext>
      <BlogProvider>
          {/* <NavBar/> */}
          {/* <PageSpacer showingTopbar={true} showingRoutebar={true}/> */}
          <div>
              {children}
          </div>
          <FooterContainer/>
          {/* <FABChat/> */}
      </BlogProvider>
    </BlogUserContext>
  );
}
