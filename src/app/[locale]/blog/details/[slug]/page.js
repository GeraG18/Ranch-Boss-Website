
import BlogNavbar from "@/components/blog/blog_navbar";
import BlogContent from "@/components/blog-details/blog_content";
import Header from "@/components/blog-details/header";
import VisitCounter from "@/components/blog-details/visit_counter"
import PopularBlogs from "@/components/blog-details/popular_blogs"
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const slug = (await params).slug;
    const locale = (await params).locale;
    const t = await getTranslations({ locale, namespace: 'SEOMetadata.Blog' });

    const emulatorsAreEnabled = process.env.NEXT_PUBLIC_ENABLE_EMULATORS === '1';
    const url = emulatorsAreEnabled ? process.env.NEXT_PUBLIC_EMULATORS_DATABASEURL : process.env.NEXT_PUBLIC_RTDB_API_REST;
    const uri = `${url}/blogs/${slug}.json${emulatorsAreEnabled ? process.env.NEXT_PUBLIC_EMULATORS_DATABASEPARAMS : ''}`
    const blog = await fetch(uri).then((res) => res.json());
    
    var regex = /(<([^>]+)>)/ig;
    let formatedBody = (blog.body).replace(regex, "");
    let cuttedBody = formatedBody.split(" ").filter((item, index) => index < 40).join(" ")+'...';    
   
    return {
        metadataBase: new URL('https://horizontrailers.com'),
        title: `${blog.title || t('title')} | Horizon Trailers`,
        authors:[{name: `${blog.author+' |' || ''}  Horizon Trailers LLC`}],
        description: (blog?.seo?.description || cuttedBody),
        keywords: `${t('keywords')}, ${(blog?.seo?.keywords || []).join(", ")}`,
        openGraph: {
            title: `${blog.title} | Horizon Trailers`,
            description: (blog?.seo?.description || cuttedBody),
            images: [(blog?.seo?.image || '/og-banner.webp')],
            url:"https://www.horizontrailers.com",
            siteName: "Horizon Trailers"
        },
        twitter: {
            creator:"Horizon Trailers LLC",
            site:"@TrailersHorizon",
            card: 'summary_large_image',
            title: `${blog.title} | Horizon Trailers`,
            description: (blog?.seo?.description || cuttedBody),
            images: [(blog?.seo?.image || '/tw-banner.webp')],
        },
    }
}
   
export default async function Page({ params, searchParams }) {
    const slug = (await params).slug;
    const emulatorsAreEnabled = process.env.NEXT_PUBLIC_ENABLE_EMULATORS === '1';
    const url = emulatorsAreEnabled ? process.env.NEXT_PUBLIC_EMULATORS_DATABASEURL : process.env.NEXT_PUBLIC_RTDB_API_REST;
    const uri = `${url}/blogs/${slug}.json${emulatorsAreEnabled ? process.env.NEXT_PUBLIC_EMULATORS_DATABASEPARAMS : ''}`
    const blog = await fetch(uri).then((res) => res.json());
    
    if(!blog || blog.hasOwnProperty('error')) notFound()

    return(
        <>
            <VisitCounter slug={slug}/>
            <BlogNavbar/>
            <Header
                author={blog?.author}
                authorImg={blog?.authorImg}
                title={blog?.title}
                tags={blog?.tags}
                image={blog?.headerImg}
                date={blog?.date}
                body={blog?.body}
            />
            <BlogContent
                title={blog?.title}
                body={blog?.body}
            />
            <PopularBlogs/>
        </>
    );
}