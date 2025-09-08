import MerchProducts from "@/jsons/merchandise.json";
import Products from "@/jsons/products.json";
import { ProductsList } from "@/jsons/products/products";
import { getBlogs } from "@/services/firebase-service";

/* Global */
/*
This variable sets the revalidation time for the sitemap in seconds.
Taking the measurements of the time: 1hr - 3600s you can determine 
how many seconds you want to wait for the next sitemap generation.
In this case 14400s = 4hrs. Is set to 4hrs because of the every 
modification in the website content.
*/
export const revalidate = 14400; 

export default async function sitemap() {
    const pageURL = "https://horizontrailers.com";
    let blogs = await getBlogs();
    
    const staticRoutes = [
        {
          url: `${pageURL}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 1,
        },
        {
          url: `${pageURL}/about-us`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.8,
        },
        {
          url: `${pageURL}/become-a-dealer`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.8,
        },
        {
          url: `${pageURL}/blog`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.8,
        },
        {
          url: `${pageURL}/contact-to-dealer`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.8,
        },
        {
          url: `${pageURL}/contact-us`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.8,
        },
        {
          url: `${pageURL}/financing`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.8,
        },
        {
          url: `${pageURL}/find-a-dealer`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        },
        {
          url: `${pageURL}/findadealer`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        },
        {
          url: `${pageURL}/maintenance`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.2,
        },
        {
          url: `${pageURL}/merchandise`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.2,
        },
        {
          url: `${pageURL}/owners-manual`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.5,
        },
        {
          url: `${pageURL}/privacy-policy`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.5,
        },
        {
            url: `${pageURL}/products`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
          url: `${pageURL}/quality`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        },
        {
          url: `${pageURL}/resources`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.3,
        },
        {
          url: `${pageURL}/resources/logos`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.3,
        },
        {
          url: `${pageURL}/sitemap`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.3,
        },
        {
          url: `${pageURL}/terms-of-use`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.3,
        },
        {
          url: `${pageURL}/warranty-claim`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.5,
        },
        {
          url: `${pageURL}/warranty-docs`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.5,
        },
    ];

    let dynamicRoutes = [
        ...(
            ProductsList['en'].map((item) => ( {
                url: `${pageURL}/products/standard-features/${item.id}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.9,
            } ) ) 
        ),
        ...(
            MerchProducts['en'].map((item) => ( {
                url: `${pageURL}/merchandise/details/${item.key}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.2,
            } ) )
        ),
        ... (
            ( blogs || [] ).map((item) => ( {
                url: `${pageURL}/blog/details/${item.slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.8,
            } ) )
        ),
    ];

    return [...staticRoutes, ...dynamicRoutes] 
  }