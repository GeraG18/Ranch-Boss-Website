import "@/styles/globals.css";
import "@/styles/material-symbols.css";
import 'react-inner-image-zoom/lib/styles.min.css';
import { Chakra_Petch, Montserrat, Teko, Michroma } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { GoogleAnalytics } from "@next/third-parties/google";
import SearchProvider from "@/context/search_context";
import CookiesProvider from "@/context/cookies_context";
import AlertsProvider from "@/context/alert_context";
import CampaignProvider from "@/context/campaign_context";
import ScrollTopButton from "@/components/general/scroll_top_button";
// import SocialpilotReviewWidget from "@/components/general/socialpilot_review_widget/socialpilot_review_widget";
import ReviewsWidget from "@/components/general/socialpilot_review_widget/reviews_widget";
import SocialpilotReviewWidget from "@/components/general/socialpilot_review_widget/socialpilot_review_widget";

/* Title font */
const teko = Teko({
  weight:['400', '500', '600'],
  subsets:['latin'],
  variable: '--font-teko'
});

const michroma = Michroma({
  weight:['400'],
  subsets:['latin'],
  variable: '--font-michroma'
});
/* Body font */
const chakraPetch = Chakra_Petch({
  weight:['400','500','600','700'],
  subsets:['latin'],
  variable: '--font-chakraPetch'
});

const montserrat = Montserrat({
  weight:['400','500','600','700'],
  subsets:['latin'],
  variable: '--font-chakraPetch'
})

export default async function RootLayout({ children, params }) {
  
  /* Hooks */
  const locale = await getLocale(); // Gets locale from the request (server side)

  return (
    <html lang={locale}>
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <GoogleAnalytics gaId="G-XLGXG0YRCR" />
      </head>
      <body className={`top-0! ${chakraPetch.variable} ${teko.variable} ${montserrat.variable} ${michroma.variable}`}>
        <NextIntlClientProvider>
          <SearchProvider>
            <CookiesProvider>
              <AlertsProvider>
                <CampaignProvider>
                  <ScrollTopButton/>
                  {children}
                  {/* <ReviewsWidget/> */}
                  {/* <SocialpilotReviewWidget/> */}
                </CampaignProvider>
              </AlertsProvider>
            </CookiesProvider>
          </SearchProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
