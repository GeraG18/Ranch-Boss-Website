'use client' // Renders on client side
import { createContext, useContext, useEffect, useState } from "react";
import { getBlogs, setBlog } from "../services/firebase-service";

const BlogContext = createContext();

const BlogProvider = ({ children }) => {

    const [blogs, setBlogs] = useState([]);
    const [blogsLoaded, setBlogsLoaded] = useState(false);

    const getBlogDetails = (slug) => {
        return blogs.find((item) => item.slug === slug) || {}
    }
    
    const getAllTags = () => {
        let categoriesList = [];
        blogs.forEach((item) => {
            
            if(item.tags) {
                categoriesList.push(...item.tags)
            }
        });

        
        return [...new Set([...categoriesList])];
    }
    
    const addBlogToList = (blog) => {
        
        
        let item = [...blogs, blog]
        setBlogs(item)
        setBlogsLoaded(false);
    }

    const modifyBlogFromContext = (oldSlug, blog) => {
        
        
        let item = [...blogs.filter((blog) => blog.slug !== oldSlug), blog]
        setBlogs(item)
        setBlogsLoaded(false);
    }

    const deleteBlogFromContext = (blogId) => {
        let items =  blogs.filter((blog) => blog.slug !== blogId);
        
        
        setBlogs(items)
        setBlogsLoaded(false);
    }

    const getOccupiedSlugs = () => {
        return (blogs || []).map((item) => item.slug);
    }

    const getMoreRecentBlogs = () => {
        let timestamp = 0;
        blogs.forEach((item) => {
            if(item.date > timestamp)
                timestamp = item.date;
        });

        if(timestamp !== 0) {
            let end = new Date(timestamp);
            let start = new Date(timestamp);
            start.setDate(start.getDate() - 5);
            let items = blogs.filter((item, index) => (item.date > start.getTime()));
            return items
        }
        
    }

    const getMostPopularBlogs = () => {
        let items = blogs.sort((a, b) => (b.views || 0) - (a.views || 0));
        
        
        return items.filter((item, index) => index < 3);
    }

    const forceRefresh = () => {
        getBlogs().then((res) => {
            setBlogs( res );
            // // console.log('blogs', res);
            setBlogsLoaded(true);
        });
    }
    
    useEffect(() => {
        // // console.log('se invoca');
        
        forceRefresh();
    }, [])

    return (
        <BlogContext.Provider value={{ blogs, getMostPopularBlogs, getOccupiedSlugs, modifyBlogFromContext, blogsLoaded, forceRefresh, deleteBlogFromContext, getBlogDetails, addBlogToList, getMoreRecentBlogs, getAllTags }}>
            {children}
        </BlogContext.Provider>
    );
};

export default BlogProvider;

export const useBlogProvider = () => useContext(BlogContext);