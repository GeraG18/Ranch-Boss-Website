'use client' // Renders on client side
import React, { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import Header from "@/components/blog-details/header";
import HorizonBlog from "@/components/blog-details/blog_content";
import LoadingLoop from "@/components/icons/loading_loop"
import { deleteBlog, setBlog, uploadToStorage, deleteFromStorage, uploadToStoragePromise, deleteFromStoragePromise } from "../../services/firebase-service";

import "quill/dist/quill.core.css";
import { useAlertsProvider } from "../../context/alert_context";
import { useBlogUserContext } from "../../context/blog_user_context";
import { useRouter } from "next/navigation";
import { deleteLocalStorage } from "@/services/local_storage-service";
import { useBlogProvider } from "@/context/blog_context";

import { resizedataURLProm, resizeBase64Image } from "@/services/utils-service"

function BlogsLoader({blogEditParams = false}){
    
    const theme = "snow";
    const placeholder = "You can add the text like this";
    const router = useRouter();
    const { addAlert } = useAlertsProvider();
    const { user } = useBlogUserContext();
    const {addBlogToList, deleteBlogFromContext, modifyBlogFromContext, getOccupiedSlugs} = useBlogProvider();
    const [rawImage, setRawImage] = useState({extension:'', base64:'', file:''});
    const [rawImageSEO, setRawImageSEO] = useState({extension:'', base64:'', file:''});
    const [progress, setProgress] = useState(0);
    const [tag, setTag] = useState('');
    // const [hostname, setHostname] = useState('');
    const [keyword, setKeyword] = useState('');
    const [blogContent, setBlogContent] = useState({
        title:'',
        author: user.name || '-',
        authorImg:user.profileImage || '',
        slug:'',
        headerImg:'',
        body: '',
        date:new Date().getTime(),
        tags: [],
        seo:{
            description:'',
            image:'',
            keywords: []
        },
    });

    const location = process.env.NEXT_PUBLIC_PAGE_LINK;

    const getFileExtension = (base64) => {
        if(base64.includes('image/apng')) {return ".apng"}
        if(base64.includes('image/avif')) {return ".avif"}
        if(base64.includes('image/gif')) {return ".gif"}
        if(base64.includes('image/wnd.microsoft.icon')) {return ".ico"}
        if(base64.includes('image/jpeg')) {return ".jpg"}
        if(base64.includes('image/png')) {return ".png"}
        if(base64.includes('image/svg+xml')) {return ".svg"}
        if(base64.includes('image/tiff')) {return ".tiff"}
        if(base64.includes('image/webp')) {return ".webp"}
    }

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[arr.length - 1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }
    
    const setEditData = () => {
        setBlogContent(blogEditParams);
        
        if(blogEditParams !== false && blogEditParams.headerImg !== '') {

            fetch(blogEditParams.headerImg)
            .then( response => response.blob() )
            .then( blob =>{
                var reader = new FileReader() ;
                reader.onload = function() {
                    let base64 = this.result;  
                    let extension =getFileExtension(base64);
                    setRawImage({extension, base64, file:dataURLtoFile(base64, `ht-img${extension}`)})
                    blogEditParams['imageObj'] = {extension, base64, file:dataURLtoFile(base64, `ht-img${extension}`)}
                };
                reader.readAsDataURL(blob) ;
            }) ;
            
            // Fetch for seo image
            if(blogEditParams?.seo?.image) {
                fetch(blogEditParams?.seo?.image)
                .then( response => response.blob() )
                .then( blob =>{
                    var reader = new FileReader() ;
                    reader.onload = function() {
                        let base64 = this.result;  
                        let extension =getFileExtension(base64);
                        setRawImageSEO({extension, base64, file:dataURLtoFile(base64, `ht-img-SEO${extension}`)})
                        blogEditParams['imageSEOObj'] = {extension, base64, file:dataURLtoFile(base64, `ht-img-SEO${extension}`)}
                    };
                    reader.readAsDataURL(blob) ;
                }) ;
            }
        }
    }

    useEffect(() => {
       setProgress(0)
    }, [])
    
    useEffect(() => {
        setEditData();
    }, [blogEditParams])
    // if(dealerInfo === null) router.push('/not-found')

    const manageTag = () => {
        if(tag.trim().length !== 0) {
            let splitArr = tag.split(',').map((item) => (item.trim().toLowerCase()));
            setBlogContent((prev) => ({...prev, tags: [...prev.tags, ...splitArr]}));
            setTag('')
        } else {
            addAlert('Add something in tag field to continue', 'warning')
        }
    }
    
    const removeTag = (index) => {
        let arr = blogContent.tags.filter((item, itemIndex) => itemIndex !== index );
        setBlogContent((prev) => ({...prev, tags:arr}))
    }

    const manageKeyword = () => {
        if(keyword.trim().length !== 0) {
            let splitArr = keyword.split(',').map((item) => (item.trim().toLowerCase()));
            setBlogContent((prev) => ({...prev, seo:{...prev.seo, keywords: [...(prev.seo?.keywords || []), ...splitArr]}}));
            setKeyword('')
        } else {
            addAlert('Add something in keyword field to continue', 'warning')
        }
    }
    
    const removeKeyword = (index) => {
        let arr = blogContent.seo.keywords.filter((item, itemIndex) => itemIndex !== index );
        setBlogContent((prev) => ({...prev, seo:{...prev.seo, keywords:arr}}))
    }

    const isEmpty = (field) => {
        return (field+'').trim().length === 0
    }

    const setSlug = (title) => {
        let newSlug = title.trim().replace(/[^\w\s]/gi, '-').replaceAll(' ', '-').toLowerCase()
        setBlogContent((prev) => ({...prev, slug: newSlug}))
    }

    const isSlugInvalid = (params) => {
        const regex = /^(?=\S)(?![-])([a-zA-Z0-9-]+)$/g;
        // 
        return !(params.match(regex))
    }

    const convertToBase = (file, callback = () => {}) => {
        let response = null;
        let error = null;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            callback(reader.result, null);
        };
        reader.onerror = function (err) {
            callback(null, err);
        };  
    }
    
    const clearBlogContent = () => {
        quill.deleteText({index:0, length:blogContent.body.length});
        
        setBlogContent({
            title:'',
            author: user.name || '-',
            authorImg:user.profileImage || '',
            slug:'',
            headerImg:'',
            body: '',
            date:new Date().getTime(),
            tags: [],
            seo:{
                description:'',
                image:'',
                keywords: []
            },
        });
        setRawImage({extension:'', base64:'', file:''})
    }

    const fileChangeHandler = async (event) => {
        let file = event.target.files[0];
        if(!file) return;

        let arr = file.name.split('.');
        let extension = `.${arr[arr.length - 1]}`

        if(file.type.includes('image/')) {
            convertToBase(file, (res, err) => {
                if(err) {
                    addAlert("Error converting the image, try with another", "error")
                    return;
                }
                setRawImage({extension, base64: res, file});
            });
        } else {
            addAlert("Invalid file format, use an image instead", "error")
        }

    }

    const convertHTMLtoPlainText = (str) => {
        return str.replace(/(<([^>]+)>)/ig, "");
    }

    const truncateText = (text, count, insertDots) => {
        return text.slice(0, count) + (((text.length > count) && insertDots) ? "..." : "");
    }

    const fileChangeHandlerSEO = async (event) => {
        let file = event.target.files[0];
        
        
        if(!file)
            return;

        let arr = file.name.split('.');
        let extension = `.${arr[arr.length - 1]}`

        if(file.type.includes('image/')) {
            convertToBase(file, (res, err) => {
                if(err) {
                    addAlert("Error converting the image, try with another", "error")
                    return;
                }
    
                setRawImageSEO({extension, base64: res, file});
                // setBlogContent((prev) => ({...prev, headerImg:res}));
            });
        } else {
            addAlert("Invalid file format, use an image instead", "error")
        }

    }

    const handlePublish = async () => {
        if(user) {
            let item = {...blogContent, date:new Date().getTime()}
            if(isEmpty(blogContent.title)) {
                addAlert('Invalid title', "warning")
                return;
            }
            if(isEmpty(blogContent.author)) {
                addAlert('Invald author', "warning")
                return;
            }
            if(isSlugInvalid(blogContent.slug) || isEmpty(blogContent.slug)) {
                addAlert('Invalid slug', "warning")
                return;
            }
            if(isEmpty(rawImage.base64)) {
                addAlert('Add an image', "warning")
                return;
            }
            if(blogContent.tags.length < 1) {
                addAlert('Add at least one tag', "warning")
                return;
            }
            if(isEmpty(blogContent.body)) {
                addAlert('Add content to the body field', "warning")
                return;
            }

            if(isEmpty(blogContent?.seo?.description)) {
                let description = truncateText(convertHTMLtoPlainText(blogContent.body), 300, true);
                setBlogContent((prev) => ({...prev, seo: {...prev.seo, description}}))
                item = {...item, seo: {...seo, description}}
            }
            
            if(blogEditParams) {
                let progressOne = 0;

                if(blogEditParams?.slug !== item.slug) {
                    await deleteBlog(blogEditParams.slug)
                }
                
                if(blogEditParams?.imageObj?.base64 !== rawImage.base64) {
                    
                    
                    if(item.headerImg) {
                        let del = await deleteFromStoragePromise(item.headerImg);
                        
                    }

                    let headerImg = await uploadToStoragePromise("blogImages", blogContent.slug+rawImage.extension, rawImage.file, (val) => {
                        
                        progressOne = val/2;
                        setProgress(progressOne)
                    });
                    item = {...item, headerImg}
                } else {
                    progressOne = 50;
                    setProgress(progressOne)
                }

                if(blogEditParams?.imageSEOObj?.base64 !== rawImageSEO.base64) {
                    
                    if(item?.seo?.image) {
                        await deleteFromStoragePromise(item?.seo?.image);
                    }

                    // const demoImg = await sharp(rawImageSEO.base64 || rawImage.base64).resize(1200, 620, {
                    //     fit:'cover',
                    //     position:'center',
                    //     background: { r: 0, g: 0, b: 0, alpha: 1 }
                    // }).webp().toFile();

                    let image = await uploadToStoragePromise(
                        "blogImages", 
                        blogContent.slug+"_SEO"+rawImageSEO.extension, 
                        rawImageSEO.base64 ? rawImageSEO.file : rawImage.file, 
                        (val) => {
                            
                            setProgress(progressOne +  (val/2))
                    });
                    item = {...item, seo: {...(item?.seo || {}), image}}
                } else {
                    progressOne = 100;
                    setProgress(progressOne)
                }

                setBlog(item)
                modifyBlogFromContext(blogEditParams.slug, item)
                clearBlogContent();
                deleteLocalStorage("ht.b_ed")
                router.push('/blog')
                addAlert("Blog posted", "info")
                
                
            } else {
                if( !(getOccupiedSlugs().includes(blogContent.slug)) ) {
                    let progressOne = 0;
                    let headerImg = await uploadToStoragePromise("blogImages", blogContent.slug+rawImage.extension, rawImage.file, (val) => {
                        
                        setProgress(val / 2);
                        progressOne = val / 2;
                    });
                    item = {...item, headerImg}

                    // const demoImg = await sharp(rawImageSEO.base64 || rawImage.base64).resize(1200, 620, {
                    //     fit:'cover',
                    //     position:'center',
                    //     background: { r: 0, g: 0, b: 0, alpha: 1 }
                    // }).webp().toFile();
                    
                    if(rawImageSEO.base64) {
                        let image = await uploadToStoragePromise("blogImages", blogContent.slug+"_SEO"+rawImageSEO.extension, rawImageSEO.base64 ? rawImageSEO.file : rawImage.file, (val) => {
                            
                            setProgress(progressOne + (val/2));
                        });
                        item = {...item, seo: {...item.seo, image}}
                    } else {
                        //TODO: apply image treatment to get the specific working resolution with seo 
                        setProgress(100);
                        // item = {...item, seo: {...item.seo, image: headerImg}}
                        
                    }

                    setBlog(item)
                    addBlogToList(item)
                    clearBlogContent();
                    deleteLocalStorage("ht.b_ed")
                    router.push('/blog')
                    addAlert("Blog posted", "info")
                    
                } else {
                    addAlert('This slug is in use, try another.', 'error')
                }
            }
            
        }
    }

    useEffect(() => {
        
        
    }, [blogContent])

    // useEffect(() => {
    //     
    const initFunction = () => {
        setBlogContent({
            title:'',
            author: user.name || '-',
            authorImg:user.profileImage || '',
            slug:'',
            headerImg:'',
            body: '',
            date:new Date().getTime(),
            tags: [],
            seo:{
                description:'',
                image:'',
                keywords: []
            },
        });
    }
    
    useEffect(() => {
        initFunction();
    }, [user])
      
    const modules = {
        toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ align: [] }],

            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],

            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["link", "image", "video"],
            [{ color: ["black", "white", "red", "blue", "grey", "#6897d8", "#282828", "#58595B", "#F0EFEC", "#6D6E7", "#6D6E70"] }, 
            { background: ["black", "white", "red", "blue", "grey", "#6897d8", "#282828", "#58595B", "#F0EFEC", "#6D6E7", "#6D6E70"] }],

            ["clean"],
        ],
        clipboard: {
            matchVisual: false,
        },
    };
    
    const { quill, quillRef } = useQuill({
        theme,
        modules,
        placeholder
    });

    useEffect(() => {
        if (quill) {
          quill.on("text-change", (delta, oldDelta, source) => {
            setBlogContent((prev) => ({...prev, body:quill.root.innerHTML}));
          });

          quill.clipboard.dangerouslyPasteHTML(blogContent.body);
        }
    }, [quill]);
  
    return (
        <>
            {
                progress > 0 &&
                <div className="fixed top-0 left-0 z-400 w-full h-full flex gap-2 items-center justify-center bg-white/55 text-black font-['lora']">
                    <LoadingLoop className="text-gray-700" width="42" height="42" style={{alignSelf:'center'}}/>
                    <span className="">Uploading {progress.toFixed(2)}</span>
                </div>
            }
            <div className="flex flex-col gap-4 lg:gap-8 lg:grid lg:grid-cols-[36%_56%] xl:grid-cols-[40%_60%] my-8 px-4 justify-center max-w-screen-lg ! z-100 xl:mx-auto font-['lora'] relative">
                <form onSubmit={(e) => e.preventDefault()} name="postOrEditBlog" className="flex flex-none flex-col gap-3 items-left">
                    <h2 className="font-['lora'] text-[2.5rem] w-fit">BLOG CONTENT</h2>
                    <div className="flex flex-col items-start gap-1 lg:w-full lg:m-0">
                        <span className="font-['lora'] text-[2rem] w-fit">TITLE: </span>
                        <input placeholder="Example: Blog title" value={blogContent.title} onChange={(e) => {setBlogContent((prev) => ({...prev, title: e.target.value})); setSlug(e.target.value)}} 
                        className="border border-[#d5d5d5] bg-transparent w-[calc(100%-0.2rem)] h-8
                        text-[1rem] outline-hidden p-0 pl-[0.2rem]"></input>
                    </div>
                    <div className="flex flex-col items-start gap-1 lg:w-full lg:m-0">
                        <span className="font-['lora'] text-[2rem] w-fit">AUTHOR: </span>
                        <input placeholder="Example: Author" readOnly disabled value={blogContent.author} onChange={(e) => setBlogContent((prev) => ({...prev, author: e.target.value}))} 
                        className="border border-[#d5d5d5] bg-transparent w-[calc(100%-0.2rem)] h-8
                        text-[1rem] outline-hidden p-0 pl-[0.2rem]"></input>
                    </div>
                    <div className="flex flex-col items-start gap-1 lg:w-full lg:m-0">
                        <span className="font-['lora'] text-[2rem] w-fit">SLUG (URL): </span>
                        <input placeholder="example-slug" value={blogContent.slug} onChange={(e) => setBlogContent((prev) => ({...prev, slug: e.target.value}))} 
                        className="border border-[#d5d5d5] bg-transparent w-[calc(100%-0.2rem)] h-8
                        text-[1rem] outline-hidden p-0 pl-[0.2rem]"></input>
                    </div>
                    <div className="flex flex-col items-start gap-1 lg:w-full lg:m-0">
                        <span className="font-['lora'] text-[2rem] w-fit">
                            HEADER IMAGE:   
                        </span> 
                        <span>
                            NOTE: Before upload the image, optimize it with&nbsp;
                            <a href="https://squoosh.app/editor" target="_blank" rel="noopener noreferrer"
                                className="text-black lg:hover:text-primary-color cursor-pointer"
                            >
                                {/* <span className="material-symbols-outlined notranslate text-lg no-underline!">link</span> */}
                                <span className="underline underline-offset-2">
                                    Squoosh 
                                </span>
                            </a>, use the next config:
                            <ul className="list-disc list-inside pl-4">
                                <li>Compress: WebP</li>
                                <li>Effort: 4</li>
                                <li>Quality: Min 30 (this may vary on image quality result)</li>
                            </ul>
                        </span>
                        <input type="file" onChange={fileChangeHandler} id="fileInput" 
                        className="hidden" accept="image/*"/>
                        <button className="flex flex-row justify-center items-center gap-1 text-[1rem] cursor-pointer
                        w-full relative bg-transparent border border-[#d5d5d5] text-[#4d4d4d]
                        py-2 px-4 pointer-events-auto lg:px-6 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:border-secondary-color
                        lg:hover:text-white motion-safe:transition-all motion-reduce:transition-none 
                        will-change-auto motion-safe:duration-300 uppercase" 
                            onClick={() => document.getElementById('fileInput').click()}>
                            <span className="material-symbols-outlined notranslate ">{rawImage.base64 !== '' ? 'reset_image' : 'add_a_photo'}</span>
                            {rawImage.base64 !== '' ? 'Change Image' : 'Add Image'}
                        </button>
                    </div>
                    <div className="flex flex-col items-start gap-1 lg:w-full lg:m-0">
                        <span className="font-['lora'] text-[2rem] w-fit">TAGS: </span>
                        <div className="flex w-full h-8">
                            <input value={tag} onChange={(e) => setTag(e.target.value)} 
                                className="border border-[#d5d5d5] border-r-0 rounded-l-[10px] bg-white w-full text-[1rem]
                                outline-hidden pl-[0.2rem] h-full" 
                                type="text" placeholder="Example: tag1, tag2,..."/>
                            <button onClick={() => manageTag()} 
                                className="rounded-r-[10px] cursor-pointer motion-safe:transition-all motion-reduce:transition-none 
                                will-change-auto motion-safe:duration-300 text-white bg-primary-color uppercase
                                w-24 h-full border border-primary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:border-secondary-color">
                                Add tag
                            </button>
                        </div>
                        <div className="relative z-30 w-full min-h-16 flex-wrap p-2 flex flex-row gap-1 border
                        border-[#d5d5d5] ">
                            {
                                blogContent.tags.length === 0 &&
                                <span className="text-[#77787b]">There's no tags listed in here</span>
                            }
                            {
                                blogContent.tags.map((tag, index) => (
                                    <div key={index} className="w-fit h-6 text-white py-0.5 px-2 uppercase
                                    text-[0.85rem] flex flex-row gap-1 items-center justify-center backdrop-saturate-50 backdrop-blur-sm
                                    bg-black/50">
                                        {tag} 
                                        <span onClick={() => removeTag(index)}
                                            className="material-symbols-outlined notranslate  font-bold text-[1rem] cursor-pointer lg:hover:text-red-700">
                                                close
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-1 lg:w-full lg:m-0">
                        <span className="font-['lora'] text-[2rem] w-fit">BODY: </span>
                        <div className="h-120 mb-20 lg:mb-16 lg:max-w-full lg:h-80 
                            [&_p]:text-[1rem] [&_p]:font-['lora']! 
                            [&_span]:font-['lora']! 
                            [&_div]:font-['lora']!
                        ">
                            <div ref={quillRef} />
                        </div>
                    </div>
                    {/* AQUI */}
                    <h2 className="font-['lora'] text-[2.5rem] w-fit mt-8 lg:mt-0">SEO CONFIG</h2>
                    <div className="flex flex-col items-start gap-1 lg:w-full lg:m-0">
                        <span className="font-['lora'] text-[2rem] w-fit">DESCRIPTION: </span>
                        <textarea value={blogContent.seo?.description} onChange={(e) => setBlogContent((prev) => ({...prev, seo: {...prev.seo, description: e.target.value} }))} 
                        placeholder="If you leave it empty, is going to pick the first blog paragraph" 
                        aria-label="add your explanation why you would like to become a Horizon Dealer here" role="form" 
                        className={`border border-[#d5d5d5] bg-transparent w-full h-8 text-[1rem] min-h-32
                            outline-hidden p-0 pl-[0.2rem]`}/>
                    </div>

                    <div className="flex flex-col items-start gap-1 lg:w-full lg:m-0">
                        <span className="font-['lora'] text-[2rem] w-fit">
                            SEO IMAGE:   
                        </span> 
                        <span>
                            NOTE: It should be at least 1200×630 or larger is preferred (up to 5MB). Stay close to a 1.91:1 aspect ratio.
                            And before upload the image, optimize it with&nbsp;
                            <a href="https://squoosh.app/editor" target="_blank" rel="noopener noreferrer"
                                className="text-black lg:hover:text-primary-color cursor-pointer"
                            >
                                {/* <span className="material-symbols-outlined notranslate text-lg no-underline!">link</span> */}
                                <span className="underline underline-offset-2">
                                    Squoosh 
                                </span>
                            </a>, use the next config:
                            <ul className="list-disc list-inside pl-4">
                                <li>Compress: WebP</li>
                                <li>Effort: 4</li>
                                <li>Quality: Min 30 (this may vary on image quality result)</li>
                            </ul>
                        </span>
                        <input type="file" onChange={fileChangeHandlerSEO} id="fileInputSEO" 
                        className="hidden" accept="image/*"/>
                        <button className="flex flex-row justify-center items-center gap-1 text-[1rem] cursor-pointer
                        w-full relative bg-transparent border border-[#d5d5d5] text-[#4d4d4d]
                        py-2 px-4 pointer-events-auto lg:px-6 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:border-secondary-color
                        lg:hover:text-white motion-safe:transition-all motion-reduce:transition-none 
                        will-change-auto motion-safe:duration-300 uppercase" 
                            onClick={() => document.getElementById('fileInputSEO').click()}>
                            <span className="material-symbols-outlined notranslate ">{rawImageSEO.base64 !== '' ? 'reset_image' : 'add_a_photo'}</span>
                            {rawImageSEO.base64 !== '' ? 'Change Image' : 'Add Image'}
                        </button>
                    </div>

                    <div className="flex flex-col items-start gap-1 lg:w-full lg:m-0">
                        <span className="font-['lora'] text-[2rem] w-fit">KEYWORDS: </span>
                        <div className="flex w-full h-8">
                            <input value={keyword} onChange={(e) => setKeyword(e.target.value)} 
                                className="border border-[#d5d5d5] border-r-0 rounded-l-[10px] bg-white w-full text-[1rem]
                                outline-hidden pl-[0.2rem] h-full" 
                                type="text" placeholder="Example: keyword1, trailers,..."/>
                            <button onClick={() => manageKeyword()} 
                                className="rounded-r-[10px] cursor-pointer motion-safe:transition-all motion-reduce:transition-none 
                                will-change-auto motion-safe:duration-300 text-white bg-primary-color uppercase
                                w-48 h-full border border-primary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:border-secondary-color">
                                Add keyword
                            </button>
                        </div>
                        <div className="relative z-30 w-full min-h-16 flex-wrap p-2 flex flex-row gap-1 border
                        border-[#d5d5d5] select-none">
                            {
                                blogContent.seo?.keywords?.length === 0 &&
                                <span className="text-[#77787b]">There's no keywords listed in here</span>
                            }
                            {
                                blogContent.seo?.keywords?.map((tag, index) => (
                                    <div key={index} className="w-fit h-6 text-white py-0.5 px-2 uppercase
                                    text-[0.85rem] flex flex-row gap-1 items-center justify-center backdrop-saturate-50 backdrop-blur-sm
                                    bg-black/50">
                                        {tag} 
                                        <span onClick={() => removeKeyword(index)}
                                            className="material-symbols-outlined notranslate  font-bold text-[1rem] cursor-pointer lg:hover:text-red-700">
                                                close
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="flex flex-row justify-evenly">
                        <button className="text-[1rem] w-full cursor-pointer relative mt-4 text-white border-none bg-primary-color
                        select-none motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-300 
                        py-2 px-6 pointer-events-auto lg:w-auto lg:px-10 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium"
                        onClick={() => handlePublish()}>PUBLISH</button>
                    </div>
                </form>
                <div className="relative flex flex-col pointet-events-none w-full select-none justify-self-center shrink max-w-full overflow-hidden">
                    <h2 className="font-['lora'] text-[2.5rem] w-fit">PREVIEW</h2>
                    <span className="font-['lora'] text-[2rem] w-fit">
                            PAGE:   
                    </span>
                    <div className="border border-[#d5d5d5] overflow-hidden pointer-events-none max-w-full">
                        <Header 
                            author={blogContent.author}
                            authorImg={blogContent.authorImg}
                            title={blogContent.title}
                            tags={blogContent.tags}
                            image={rawImage.base64}
                            date={blogContent.date} 
                            body={blogContent.body}
                        />
                        <HorizonBlog body={blogContent.body}/>
                    
                    </div> 
                    <span className="font-['lora'] text-[2rem] w-fit">
                            SEO:   
                    </span>

                    <div className="flex flex-col mt-4 w-full relative max-w-full!">
                        <span className="text-gray-500">Google</span>
                        <div className="flex flex-col w-full max-w-full! relative">
                            <span className="w-full max-w-full text-[1.1rem] truncate text-[#1a0dab] font-semibold overflow-hidden">
                                {blogContent.title || "Generic title"}&nbsp;• Horizon Trailers Blog
                            </span>
                            <span className="relative -top-[2px] text-sm leading-4 text-[#006621] flex items-center">
                                {location.origin}/blog/{blogContent.slug || "generic-slug-tag"} 
                                <span className="align-middle -mt-1 ml-1" style={{borderColor:"#006621 transparent", borderStyle:"solid", borderWidth:"5px 4px 0px"}}></span>
                            </span>
                            <span className="text-[#545454] text-sm leading-4 max-w-full truncate" style={{wordWrap:"break-word"}}>
                                {blogContent.seo?.description || convertHTMLtoPlainText(blogContent.body) || "Generic description"}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col mt-4 w-full">
                        <span className="text-gray-500">Twitter (X)</span>
                        <div className="rounded-[14px] border border-[#e1e8ed] text-[0.875rem] relative overflow-hidden lg:max-w-[500px]">
                            <div className="w-full h-[252px] bg-[#e1e8ed] bg-cover! bg-no-repeat! bg-center! border-b border-b-[#e1e8ed]" 
                            style={{background:(rawImageSEO.base64 || rawImage.base64) ? `url(${rawImageSEO.base64 || rawImage.base64})` : "#e1e8ed"}}></div>
                            <div className="px-4 py-3 flex flex-col">
                                <span className="mb-[0.15rem] overflow-hidden font-semibold whitespace-nowrap text-ellipsis text-[1rem] leading-5 max-h-5">
                                    {blogContent.title || "Generic title"}&nbsp;• Horizon Trailers Blog
                                </span>
                                <span className="h-10 max-h-10 mt-1 truncate overflow-hidden text-ellipsis text-sm leading-5" style={{wordWrap:"break-word",WebkitLineClamp:2, WebkitBoxOrient:"vertical"}}>
                                    {blogContent.seo?.description || convertHTMLtoPlainText(blogContent.body) || "Generic description"}
                                </span>
                                <span className="text-sm text-[#8899a6] lowercase leading-5 whitespace-nowrap overflow-hidden text-ellipsis">
                                    {location.hostname}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col mt-4">
                        <span className="text-gray-500">Facebook</span>
                        <div className="border border-[#dadde1] text-[0.875rem] relative overflow-hidden lg:max-w-[500px]">
                            <div className="w-full h-[252px] bg-cover! bg-no-repeat! bg-center!"
                            style={{background:`url(${rawImageSEO.base64 || rawImage.base64})`}}></div>
                            <div className="px-4 py-3 flex flex-col bg-[#f2f3f5]">
                                <span className="text-sm text-[#606770] lowercase leading-5 whitespace-nowrap overflow-hidden text-ellipsis">
                                    {location.hostname}
                                </span>
                                <span className="mt-[0.15rem] overflow-hidden font-semibold whitespace-nowrap text-ellipsis text-[1rem] leading-5 max-h-5">
                                    {blogContent.title || "Generic title"}&nbsp;• Horizon Trailers Blog
                                </span>
                                <span className="h-4.5 truncate max-h-20 mt-[0.15rem] overflow-hidden text-ellipsis text-sm leading-5" style={{wordWrap:"break-word",WebkitLineClamp:1, WebkitBoxOrient:"vertical"}}>
                                    {blogContent.seo?.description || convertHTMLtoPlainText(blogContent.body) || "Generic description"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );  

}


export default BlogsLoader;