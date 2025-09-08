import React from "react";
import BlogCarousel from "@/components/blog/carousel";
import AllBlogContainer from "@/components/blog/all_blogs_container";
import BlogNavbar from "@/components/blog/blog_navbar";

function Blog (){

    //#region code

    return(
        <>
            <BlogNavbar/>
            <BlogCarousel/>
            <AllBlogContainer/>  
        </>
    );
};

export default Blog