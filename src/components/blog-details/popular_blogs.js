'use client' // Renders on client side
import React from "react";
import { useBlogProvider } from "@/context/blog_context";
import AllBlogItem from "../blog/all_blogs_item";
import Link from "next/link";
import { useTranslations } from "next-intl";

const PopularBlogs = () => {

    const {getMostPopularBlogs} = useBlogProvider();
    const wT = useTranslations('WeReSorry')
    const t = useTranslations('Blog')
    
    return(
        <div className="my-8 grid gap-4 grid-cols-2 lg:grid-cols-4 mx-4 max-w-(--breakpoint-xl) h-fit
        z-100 xl:w-full xl:mx-auto font-['Montserrat']">
            <h2 className="font-['Michroma'] font-bold leading-10 uppercase text-[2rem] lg:text-[2.5rem] lg:leading-[2.75rem] h-auto lg:h-[3.5rem]
                col-span-full notranslate"
            >
                {t('explorePopularBlogs')}
            </h2>

            {
                getMostPopularBlogs().length !== 0 ?
                <>
                { 
                    (getMostPopularBlogs()).map((blog, index) => (
                        <AllBlogItem
                        key={"blogItem_"+index}
                        headerImg={blog.headerImg} 
                        title={blog.title}
                        body={blog.body}
                        slug={blog.slug}
                        tags={blog.tags}
                        author={blog.author}
                        authorImg={blog.authorImg}
                        date={blog.date} 
                        seo={blog.seo} 
                        />
                    ))
                }
                <Link href="/blog" className="group w-full h-full flex flex-col items-center justify-center border text-[#4d4d4d] lg:hover:text-primary-color border-[#d4d4d4] rounded-[10px] cursor-pointer relative notranslate">
                    <i className="material-symbols-outlined notranslate motion-safe:transition-all 
                        motion-reduce:transition-none will-change-auto motion-safe:duration-300 rotate-0">feed</i>
                    <span className="uppercase font-medium motion-safe:transition-all
                        motion-reduce:transition-none will-change-auto motion-safe:duration-300">{t('viewAll')}</span>

                    <span className="material-symbols-outlined notranslate absolute top-2 right-2 motion-safe:transition-all
                        motion-reduce:transition-none will-change-auto motion-safe:duration-300">
                        north_east
                    </span>
                </Link>
                </>
                :   
                <div className="mt-4 flex items-center justify-center gap-2 flex-col w-full
                h-fit col-span-full notranslate">
                    <h2 className="font-['Michroma'] text-[2rem] m-0 ">{wT('title')}</h2>
                    <p className="m-0">{wT('description')}</p>
                </div>
            }
        </div>
    );
}

export default PopularBlogs;