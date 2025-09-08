import NavBar from "@/components/general/nav_bar";
import PageSpacer from "@/components/general/page_spacer";
import FooterContainer from "@/components/general/footer_container";
import FABChat from "@/components/general/fab_chat";

export const metadata = {
  metadataBase: new URL('https://horizontrailers.com'),
  title: 'Warranty Claim | Horizon Trailers',
  authors:[{name: "Horizon Trailers LLC"}],
  description: "Submit your warranty claim for Horizon Trailers easily and efficiently. Our dedicated support team ensures quick processing to address your concerns. Protect your investment and maintain your trailer’s performance with our hassle-free warranty claim process.",
  keywords: `horizon trailers,horizon trailers llc,dump trailer,roll off trailer,equipment trailer,gooseneck trailer,utility trailer,dump trailer,flatdeck trailer,trailer for sell,
                    trailer rentals,dumpster trailer,trailer rental near me,quality trailer,premier trailer,premium trailer,utility trailers for sale,trailers and hitches near me,
                    trailers albuquerque,aluminium trailers,affordable trailers,basic trailers,bike trailers,trailers craiglist,trailers cost,trailers colorado springs,trailers,
                    cargo trailers for sale,trailers dealers near me,dump trailers for sale,trailers denver,trailers el paso,trailers east,trailers west,trailers south,trailers north,
                    dump trailer for sale,roll off trailer for sale,equipment trailer for sale,gooseneck trailer for sale,utility trailer for sale, become a dealer, become a horizon trailers dealer,
                    horizon trailers dealers, contact horizon trailers, contact horizon trailers llc, horizon trailers owners manual`,
  openGraph: {
    title: 'Warranty Claim | Horizon Trailers Facebook',
    description: "Submit your warranty claim for Horizon Trailers easily and efficiently. Our dedicated support team ensures quick processing to address your concerns. Protect your investment and maintain your trailer’s performance with our hassle-free warranty claim process.",
    images: ['/og-banner.webp'],
    url:"https://www.horizontrailers.com",
    siteName: "Horizon Trailers"
  },
  twitter: {
    creator:"Horizon Trailers LLC",
    site:"@TrailersHorizon",
    card: 'summary_large_image',
    title: 'Warranty Claim | Horizon Trailers X',
    description: "Submit your warranty claim for Horizon Trailers easily and efficiently. Our dedicated support team ensures quick processing to address your concerns. Protect your investment and maintain your trailer’s performance with our hassle-free warranty claim process.",
    images: ['/tw-banner.webp'],
  },
};

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
