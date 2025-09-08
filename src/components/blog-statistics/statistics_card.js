import { useBlogProvider } from "@/context/blog_context";
import { cloneObject } from "@/services/utils-service";
import Link from "next/link";
import { act, useEffect, useState } from "react";

const StatisticsCard = () => {

    const {blogs, getAllTags, blogsLoaded} = useBlogProvider();
    const [data, setData] = useState({ 
        averageViews: 0, 
        mostViews: "", 
        lessViews: "", 
        totalPosted: 0,
    })

    useEffect(() => {
        // console.log('blogs', blogs);
        
        const totalViews = blogs.reduce((acumulador, item) => acumulador + (item.views || 0), 0);
        const averageViews = totalViews !== 0 ? (totalViews / blogs.length) : 0;
        const ordered = cloneObject(blogs).sort((a, b) => (b.views || 0) - (a.views || 0));
        const mostViews = ordered.at(0)
        const lessViews = ordered.at(-1)
        // const lessViews = blogs.sort((a, b) => (a.views || 0) - (b.views || 0));
        // console.log('totalViews', totalViews);
        // console.log('averageViews', averageViews);
        // console.log('ordered', ordered);
        // console.log('mostViews', mostViews);
        // console.log('lessViews', lessViews);
        
        setData({
            averageViews,
            mostViews,
            lessViews, 
            totalPosted: blogs.length
        })
    }, [blogs])

    return (
        <div className="my-8 grid gap-4 grid-cols-2 lg:grid-cols-4 mx-4 max-w-(--breakpoint-xl) h-fit
        z-100 xl:w-full xl:mx-auto font-['Montserrat'] select-none">
            {/* <h2 className="font-['Michroma'] font-medium text-[2.25rem] leading-8 flex items-center justify-center text-center
                col-span-full lg:text-[3rem] lg:leading-[2.8rem] uppercase notranslate"
            >
                {t('explorePopularBlogs')}
            </h2> */}

                <div className="flex overflow-hidden flex-col items-center justify-center bg-[linear-gradient(90deg,rgba(255,207,103,0.75)_0%,rgba(240,90,34,0.75)_100%)]
                rounded-[10px] min-h-24 font-semibold px-2 py-4 gap-2">
                    <div className="flex flex-row items-center justify-center gap-2">
                        <h2 className="w-full text-[4rem] leading-[3.8rem] font-['Michroma']">{data.averageViews}</h2>
                        <span className="material-symbols-outlined notranslate text-[3rem]" >
                            visibility
                        </span>
                    </div>
                    <span>Average views</span>
                </div>
                <div className="flex overflow-hidden flex-col items-center justify-center bg-[linear-gradient(90deg,rgba(255,207,103,0.75)_0%,rgba(240,90,34,0.75)_100%)]
                rounded-[10px] min-h-24 font-semibold px-2 py-4 gap-2">
                    <div className="flex flex-row items-center justify-center gap-2">
                        {
                            data.mostViews?.title ?
                            <Link
                                className="w-full text-[2rem] leading-8 font-['Michroma']" 
                                href={``}
                            >
                                {data.mostViews.title}
                            </Link>
                            :
                            <h2 className="w-full text-[2rem] leading-8 font-['Michroma']">-</h2>
                        }
                        <span className="material-symbols-outlined notranslate text-[3rem]" >
                            thumb_up_off_alt
                        </span>
                    </div>
                    <span>Most viewed blog</span>
                </div>
                <div className="flex overflow-hidden flex-col items-center justify-center bg-[linear-gradient(90deg,rgba(255,207,103,0.75)_0%,rgba(240,90,34,0.75)_100%)]
                rounded-[10px] min-h-24 font-semibold px-2 py-4 gap-2">
                    <div className="flex flex-row items-center justify-center gap-2">
                        {
                            data.lessViews?.title ?
                            <Link
                                className="w-full text-[2rem] leading-8 font-['Michroma']" 
                                href={``}
                            >
                                {data.lessViews.title}
                            </Link>
                            :
                            <h2 className="w-full text-[2rem] leading-8 font-['Michroma']">-</h2>
                        }
                        <span className="material-symbols-outlined notranslate text-[3rem]" >
                            thumb_down_off_alt
                        </span>
                    </div>
                    <span>Less viewed blog</span>
                </div>
                <div className="flex overflow-hidden flex-col items-center justify-center bg-[linear-gradient(90deg,rgba(255,207,103,0.75)_0%,rgba(240,90,34,0.75)_100%)]
                rounded-[10px] min-h-24 font-semibold px-2 py-4 gap-2">
                    <div className="flex flex-row items-center justify-center gap-2">
                        <h2 className="w-full text-[4rem] leading-[3.8rem] font-['Michroma']">{data.totalPosted}</h2>
                        <span className="material-symbols-outlined notranslate text-[3rem]" >
                            note
                        </span>
                    </div>
                    <span>Total posted blogs</span>
                </div>
        </div>
    )
}

export default StatisticsCard;