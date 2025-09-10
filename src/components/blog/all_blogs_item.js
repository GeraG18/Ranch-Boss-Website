import React, { Fragment, useState } from "react";
import Link from "next/link"
import IconViewer from "../general/icon_viewer";
import { useBlogUserContext } from "@/context/blog_user_context";
import { useRouter } from "next/navigation";
import { setLocalStorage } from "@/services/local_storage-service";
import { deleteBlog, deleteFromStorage } from "@/services/firebase-service";
import { useBlogProvider } from "@/context/blog_context";
import ConfirmationModal from "@/components/general/confirmation_modal";
import { useTranslations } from "next-intl";

function AllBlogItem ({title, body, headerImg, tags=[], date, author, authorImg, slug, seo}){

    const [imgOneLoading, setImgOneLoading] = useState(true);
    const [imgOneError, setImgOneError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { user } = useBlogUserContext();
    const { deleteBlogFromContext } = useBlogProvider();
    const router = useRouter();
    const t = useTranslations('Blog')
    const fT = useTranslations('BasicForm')
    const mT = useTranslations('MonthsOfTheYear')

    const getFormatedDate = () => {
        let time = new Date(date);
        const monthsDictionary = [ mT("jan"), mT("feb"), mT("mar"), mT("apr"), mT("may"), mT("jun"), mT("jul"), mT("aug"), mT("sep"), mT("oct"), mT("nov"), mT("dec")]
        return `${monthsDictionary[time.getMonth()]} ${((time.getDate()+'').length === 1 ? '0' : '') + time.getDate()}, ${time.getFullYear()}`;
    }

    const editorEditForm = (event) => {
        event.preventDefault();
        setLocalStorage('ht.b_ed', {
            title,
            author,
            authorImg,
            slug,
            headerImg,
            body,
            date,
            tags,
            seo,
        });
        router.push('/blog/editor/edit-blog')
    }

    const editorDelete = (event) => {
        event.preventDefault();
        setShowModal(true);
    }
    
    const executeDeleteAction = () => {
        if(headerImg !== '' && process.env.NEXT_PUBLIC_ENVIRONMENT !== 'development') {
            deleteFromStorage(headerImg);
        }
        deleteBlogFromContext(slug)
        deleteBlog(slug)
    }
    
    const getReadingTime = () => {
        const wpm = 225;
        const words = body.trim().split(/\s+/).length;
        // 
        
        const time = Math.ceil(words / wpm);
        return time;
    }

    //#region view
    return (
        <>
            <ConfirmationModal 
                show={showModal}
                message="Are you sure you want to delete this blog?" 
                onDialogChanges={(val) => {
                    setShowModal(false);
                    if(val) {
                        
                        executeDeleteAction()
                    }
                }}
            />
            <Link href={`/blog/details/${slug}`} className="w-full flex gap-2 flex-col justify-around items-center text-white
            cursor-pointer motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-200 
            overflow-hidden group font-['lora'] select-none">
                <div className="w-full h-full max-w-full flex flex-col">

                    <div className={`block relative aspect-16/10 w-full items-stretch
                    overflow-hidden object-fill motion-safe:transition-all motion-reduce:transition-none 
                    will-change-auto motion-safe:duration-300 ${(imgOneLoading || imgOneError) ? "bg-[#181818]" : "bg-transparent"}`}>
                        {
                            user &&
                            <div className="absolute left-0 bottom-0 h-fit gap-2 z-80 flex flex-col items-center justify-center p-2">
                                <span onClick={editorEditForm} 
                                    className="bg-primary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium w-full font-semibold text-white text-sm
                                    py-1 px-2 flex items-center justify-center gap-0.5 cursor-pointer text-[0.75rem]
                                    lg:text-[0.85rem] z-80 uppercase">
                                    <span className="material-symbols-outlined notranslate lowercase" style={{fontSize:'1rem'}}>
                                        edit
                                    </span>
                                    {fT('edit')}
                                </span>
                                <span onClick={(e) => { editorDelete(e); e.preventDefault();} } 
                                    className="bg-primary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium w-full font-semibold text-white text-sm
                                    py-1 px-2 flex items-center justify-center gap-0.5 cursor-pointer text-[0.75rem]
                                    lg:text-[0.85rem] z-80 uppercase">
                                    <span className="material-symbols-outlined notranslate lowercase" style={{fontSize:'1rem'}}>
                                        delete
                                    </span>
                                    {fT('delete')}
                                </span>
                            </div>
                        }
                        <div className="absolute left-0 top-0 z-30 w-full p-2 flex flex-row gap-2 overflow-hidden">
                            {
                                tags.map((tag, index) => (
                                    <Fragment key={index}>
                                        {
                                            index < 2 &&
                                            <div className="w-fit py-0.5 px-3 uppercase text-[0.85rem] backdrop-saturate-50 backdrop-blur-sm bg-black/50">
                                                {tag}
                                            </div>
                                        }
                                        {
                                            (tags.length > 2 && index === (tags.length - 1)) &&
                                            <div className="w-fit py-0.5 px-3 uppercase text-[0.85rem] backdrop-saturate-50 backdrop-blur-sm bg-black/50">
                                                {(tags.length) - index } +
                                            </div>
                                        }
                                    </Fragment>
                                ))
                            }
                        </div>
                        <img loading="lazy" className={`block relative aspect-16/10 w-full items-stretch
                        overflow-hidden object-fill motion-safe:transition-all motion-reduce:transition-none group-hover:scale-110
                        will-change-auto motion-safe:duration-300 ${(imgOneLoading || imgOneError) ? "opacity-0" : "opacity-100"}`} 
                        src={headerImg || undefined} alt={title} 
                            onLoad={()=> setImgOneLoading(false)}
                            onError={() => {setImgOneError(true); setImgOneLoading(false)}}
                        />
                        <div className="absolute left-0 text-[0.85rem] bottom-0 z-30 flex items-center justify-end w-full p-2
                        before:content-[''] before:absolute before:bottom-0 before:left-0 before:-z-1 before:w-full notranslate 
                        before:h-40 before:pointer-events-none before:bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(23,23,23,0.5)_29%,rgba(36,36,36,0.75)_50%,rgba(36,36,36,0.85)_75%,rgba(36,36,36,0.95)_100%)]">
                            {getFormatedDate()} • {t('xMinsRead',{minutes: getReadingTime()})}
                        </div>
                    </div>

                    <span className="my-2 w-full uppercase font-['lora'] text-[1rem] leading-9 text-black font-bold">
                        {title}
                    </span>
                    <div className="w-full text-black my-2 [&_p]:m-0 line-clamp-2">{body.replace(/(<([^>]+)>)/ig, "").replace("&nbsp;", " ")}</div>
                    <div className="flex gap-1 flex-row items-center justify-start w-[16rem] text-black">
                        <div className="text-white w-8 aspect-square rounded-full backdrop-saturate-50
                        backdrop-blur-sm bg-black/50 flex items-center justify-center overflow-hidden">
                            {
                                authorImg !== '' ?
                                <IconViewer fullHeight={true} src={authorImg}/>
                                : 
                                <span className="material-symbols-outlined notranslate " >
                                    person_outline
                                </span>
                            }
                        </div>
                        <span className="notranslate">{author}</span>
                    </div>
                    
                </div>
            </Link>
        </>
    );
    //#endregion
}

export default AllBlogItem