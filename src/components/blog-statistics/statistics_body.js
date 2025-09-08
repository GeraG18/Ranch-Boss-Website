import Link from "next/link";
import { useEffect } from "react";

const { useBlogProvider } = require("@/context/blog_context");

const StatisticsBody = () => {
    
    const {blogs} = useBlogProvider();

    useEffect(() => {
        // console.log('blogs', blogs);
        
    }, [])

    return (
        <div className="my-8 mx-4 max-w-(--breakpoint-xl) z-100 xl:mx-auto font-['Montserrat'] select-none! min-h-120">
            <div className="flex flex-col gap-2 w-full h-auto">
                {
                    blogs.map((blog) => (
                        <Link 
                            key={blog.slug} 
                            href={`/blog/details/${blog.slug}`}
                            className="flex flex-row items-center w-full h-12 rounded-[10px]
                            border border-[#f3f3f3] p-1 group lg:hover:border-primary-color"
                        >
                            <span className="w-full font-semibold lg:group-hover:text-primary-color">
                                {blog.title} 
                                <span className="opacity-0 lg:group-hover:opacity-100 ml-2 text-[#77787b]! text-sm">
                                    View blog
                                    <span className="material-symbols-outlined notranslate text-xs" >
                                        north_east
                                    </span>
                                </span>

                            </span>
                            <span className="flex-none">
                                {blog.views || 'No views yet'}
                            </span>
                        </Link>

                    ))
                }
            </div>
        </div>
    )
}

export default StatisticsBody;