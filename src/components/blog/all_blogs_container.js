'use client' // Renders on client side
import React, {useEffect, useState, useCallback} from "react";
import AllBlogItem from "./all_blogs_item";
import dynamic from 'next/dynamic';
import { useTranslations } from "next-intl";
import { useBlogProvider } from "@/context/blog_context";
import Pagination from "@/components/products/pagination"
import BlogsBarebone from "@/components/blog/blogs_barebone"
const Select = dynamic(() => import('react-select'), { ssr: false });

function AllBlogContainer (){
    //Logic
    // const [blogsLoaded, setBlogsLoaded] = useState(false);
    const t = useTranslations('PagesTitles')
    const bT = useTranslations('Blog')
    const fT = useTranslations('BasicForm')
    const [filteredBlogs, setFilteredBlogs] = useState ([]);
    const [tagsList, setTagsList] = useState ([
        {label: fT('all').toUpperCase(), value: ''},
    ]);
    const [numOfPages, setNumOfPages] = useState ();
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState(1);
    const [selectedSegment, setSelectedSegment] = useState('newest');
    const [selectedTag, setSelectedTag] = useState('');
    const [optionsForSegment, setOptionsForSegment] = useState([
        {label: fT('newest').toUpperCase(), value: 'newest'},
        {label: fT('name').toUpperCase(), value: 'name'},
    ]);
    const showingItems = 6;

    const {blogs, getAllTags, blogsLoaded} = useBlogProvider();

    const selectStyles = {
        control: (styles) => ({ 
            ...styles, 
            backgroundColor: 'white', 
            border:'1px solid #D5D5D5',
            fontSize:'0.85rem',
            fontWeight:'600',
            // width:'100%',
            fontFamily:'Chakra Petch',
            height:'2.25rem',
            cursor:"pointer",
            borderRadius:'5px',
            boxShadow:"none",
            ":hover": {
                border:'1px solid #6897d8',
            } 
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => (
            {
                ...styles,
                fontFamily:'Chakra Petch',
                fontSize:'0.85rem',
                backgroundColor: isDisabled ? undefined : (isSelected ? "#6897d8" : (isFocused ? 'rgb(240 90 34 / 0.2)' : undefined)),
                ":focus": {
                    backgroundColor:"rgb(240 90 34 / 0.2)",
                    color:"black",
                },
                ":hover": {
                    backgroundColor:"rgb(240 90 34 / 0.2)",
                    color:"black",
                },
            }
        ),
        indicatorSeparator: () => (
            {
                display:"none"
            }
        )
    };
    
    useEffect(() => {
        if(blogs.length > 0) {
            let tags = getAllTags();
            setTagsList( [{label: 'ALL', value: ''},...tags.map((item) => ({label: item, value:item}))] );
            // setBlogsLoaded(true)
            filterBlogs()
        }
    }, [blogs]);
    
    useEffect(()=> {
        setLoading(true)
        filterBlogs();
    },[pagination, blogsLoaded, selectedTag, selectedSegment]);
    
    const filterBlogs = () => {
        let filteredArr = []
        blogs.forEach((blog) => {
            if(
                (selectedTag === '' || (blog.tags || []).includes(selectedTag))
            ) {
                filteredArr.push(blog);
            }
        });
        let nOfPages = Math.ceil(filteredArr.length/showingItems);
        setNumOfPages(nOfPages)
        let paginationArr = [...filteredArr.sort(
            (a,b) => {
                return selectedSegment === 'newest' ? 
                ((new Date(b.date)).getTime() - (new Date(a.date)).getTime()) :
                (a.title < b.title ? -1 : (a.title > b.title ? 1 : 0) );
            } 
        )].filter((item, index) => index >= (showingItems * (pagination - 1)) && index < (showingItems * pagination))
        
        if(pagination > nOfPages) {//when you delete some and you leave the page empty, sends you to the first page :P
            setPagination(1)
        }

        setFilteredBlogs(paginationArr);
        setTimeout(() => {
            setLoading(false)
        }, 750)
    }

    const handlePageChange = useCallback((newPage) => {
        setPagination(Math.max(1, Math.min(numOfPages, newPage)));
        window.scrollTo(0,0)
    }, [numOfPages]);

    // const more = (value) => (value >= numOfPages) ? value : value + 1
    // const minus = (value) => (value > 1) ? value - 1 : value

    if(loading) return (<BlogsBarebone/> )

    //Display
    return(
        <div className="my-8 mx-4 max-w-(--breakpoint-xl) z.[100] xl:mx-auto font-['Montserrat'] select-none!">
            <div className="w-full flex flex-col select-none!">
                <h1 className="font-['Michroma'] font-bold leading-10 uppercase text-[2rem] lg:text-[2.5rem] lg:leading-[2.75rem] h-auto lg:h-[3.5rem]">{t('blog')}</h1>
                <h2 className="">
                    {bT('slogan')}
                </h2>
            </div>
            <div className="flex flex-col gap-4 pt-4 pb-8 lg:flex-row">
                <div className="items-center w-full max-w-full overflow-x-auto overflow-y-hidden gap-4
                pb-1 z-60 flex lg:pb-0">
                    {
                        tagsList.map(({label, value}, index) => (
                            <button key={'item'+label+index} onClick={() => setSelectedTag(value)} 
                                className={`font-bold text-[1rem] uppercase flex-none leading-[1.8rem]
                                    border-none w-fit h-9 cursor-pointer flex flex-col gap-0 items-center
                                    justify-center bg-transparent text-[rgba(119,120,123)] ${selectedTag === value ? 
                                    "underline underline-offset-4 decoration-[3px] decoration-primary-color" 
                                    : "no-underline"}`}>
                                {label}
                            </button>
                        ))
                    }
                </div>
                <div className="w-full block z-60 lg:w-[calc(50%-0.5rem)]">
                    <span>{fT('sortBy')}:</span>
                    <Select defaultValue={optionsForSegment[0]}
                        options={optionsForSegment}
                        styles={selectStyles}
                        onChange={(e) => {setSelectedSegment(e.value)}}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                { 
                    filteredBlogs.map((blog, index) => (
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
            </div>
            {filteredBlogs.length > 0 && (
                <Pagination
                currentPage={pagination}
                totalPages={numOfPages}
                onChange={handlePageChange}
                prevText={fT('prev')}
                nextText={fT('next')}
                />
            )}
            {/* <div className="w-full select-none flex flex-row justify-end items-start my-8 gap-2 lg:gap-4 lg:w-auto">
                {
                    pagination !== 1 &&
                    <button className="flex flex-row h-8 w-18 justify-center items-center text-[1rem] 
                        rounded-[10px] border border-[#d5d5d5] text-[#4d4d4d] bg-transparent cursor-pointer
                        lg:hover:border-secondary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:text-white
                        motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                        motion-safe:duration-400" 
                        onClick={()=>setPagination(value=> minus(value))}><span className="material-symbols-outlined notranslate ">chevron_left</span> {fT('prev')}</button>
                }
                <div className="min-h-8 flex flex-row justify-center items-center gap-2 lg:gap-4">
                {
                    pagination > 2 &&
                    <>
                        <div className="flex flex-row h-8 w-8 justify-center items-center text-[1rem]
                            rounded-[10px] border border-[#d5d5d5] text-[#4d4d4d] bg-transparent
                            cursor-pointer lg:hover:border-secondary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:text-white
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                            motion-safe:duration-400" 
                            onClick={()=>setPagination(value => minus(1))}>{1}</div>
                        <span>...</span>
                    </>
                }
                </div>
                <div className="flex flex-row justify-center items-center gap-2 lg:gap-4">
                    {
                        (pagination - 1 !== 0) &&
                        <div className="flex flex-row h-8 w-8 justify-center items-center text-[1rem]
                        rounded-[10px] border border-[#d5d5d5] text-[#4d4d4d] bg-transparent
                        cursor-pointer lg:hover:border-secondary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:text-white
                        motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                        motion-safe:duration-400" 
                        onClick={()=>setPagination(value=> minus(value))}>{pagination-1}</div>
                    }
                    <div className="flex flex-row h-8 w-8 justify-center items-center text-[1rem]
                    rounded-[10px] border border-primary-color bg-primary-color
                    cursor-default text-white">{pagination}</div>
                    {
                    pagination  !== numOfPages &&
                    <div className="flex flex-row h-8 w-8 justify-center items-center text-[1rem]
                    rounded-[10px] border border-[#d5d5d5] text-[#4d4d4d] bg-transparent
                    cursor-pointer lg:hover:border-secondary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:text-white
                    motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                    motion-safe:duration-400" 
                    onClick={()=>setPagination(value => more(value))} >{pagination+1}</div>
                    }
                </div>
                <div className="min-h-8 flex flex-row justify-center items-center gap-2 lg:gap-4">
                {
                    pagination < numOfPages - 1 &&
                    <>
                        <span>...</span>
                        <div className="flex flex-row h-8 w-8 justify-center items-center text-[1rem]
                            rounded-[10px] border border-[#d5d5d5] text-[#4d4d4d] bg-transparent
                            cursor-pointer lg:hover:border-secondary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:text-white
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                            motion-safe:duration-400" 
                            onClick={()=>setPagination(value => more(numOfPages))} >{numOfPages}</div>
                    </>
                }
                </div>
                {
                    pagination !== numOfPages &&
                    <button className="flex flex-row h-8 w-18 justify-center items-center text-[1rem] 
                    rounded-[10px] border border-[#d5d5d5] text-[#4d4d4d] bg-transparent cursor-pointer
                    lg:hover:border-secondary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:text-white
                    motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                    motion-safe:duration-400" 
                    onClick={()=>setPagination(value => more(value))}>{fT('next')} <span className="material-symbols-outlined notranslate ">chevron_right</span></button>
                }
            </div> */}
        </div>
    )
}

export default AllBlogContainer