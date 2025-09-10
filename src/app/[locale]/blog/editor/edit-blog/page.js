'use client' // Renders on client side
import React, { Suspense, useEffect, useState } from "react";
import BlogsLoader from "@/components/blogs_loader/blogs_loader";
import LoginBar from "@/components/blog/login_bar";
import BlogNavbar from "@/components/blog/blog_navbar";
import { getLocalStorage } from "@/services/local_storage-service";
import { useBlogUserContext } from "@/context/blog_user_context";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/blog/protected_route"

function BlogsLoad(){

    const [blogToEdit, setBlogToEdit] = useState(false);

    const getLSData = () => {
        let blog = getLocalStorage('ht.b_ed', false);
        setBlogToEdit(blog)
        
        
        if(blog === false) { router.push('/blog') }
    }

    useEffect(() => {
        getLSData()
    }, [])


    return(
        <ProtectedRoute>
            <Suspense>
                <BlogNavbar/>
                <div className="relative">
                    <div className="absolute w-full h-full bg-[url(/Images/reantless-background.webp)] bg-center
                    bg-cover bg-no-repeat motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                    motion-safe:duration-300 z-5 brightness-[0.35] contrast-[1.05]"></div>  
                    
                    <div className="relative z-20 filter-none flex flex-row gap-2 items-end justify-center overflow-hidden
                    py-4 mx-4 max-w-screen-lg  lg:gap-4 h-64 xl:mx-auto">
                        <h1 className="font-['lora'] uppercase font-medium leading-9
                        text-[3rem] text-white mb-2 lg:mb-0">EDIT BLOG</h1>
                    </div>
                </div>
                <BlogsLoader blogEditParams={blogToEdit}/>
                {/* <Seo
                    type={''}    
                    name={''}
                    description={''}
                    image={''}
                /> */}
            </Suspense>
        </ProtectedRoute>
    );
};

export default BlogsLoad