'use client' // Renders on client side
import React, { useEffect, useState}  from "react";
import "quill/dist/quill.snow.css";
import FbIcon from "../icons/fb_icon";
import XIcon from "../icons/x_icon";
import LnIcon from "../icons/ln_icon";
import WhatsIcon from "../icons/whats_icon";
import MailIcon from "../icons/mail_icon";
import { useAlertsProvider } from "../../context/alert_context";
import jsonp from 'jsonp';
import { useBlogUserContext } from "@/context/blog_user_context";
import parse from 'html-react-parser';
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from "react-share";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MailCheckIcon from "../icons/mail_check_icon";
import { useLocale, useTranslations } from "next-intl";

function BlogContent ({title, body, mediaQuery = "max-w-screen-lg "}){
    //Logic
    const [formatedDate, setFormatedDate] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [sended, setSended] = useState(false);
    const { user } = useBlogUserContext();
    const t = useTranslations('Blog')
    const fT = useTranslations('BasicForm')
    const locale = useLocale();

    const { addAlert } = useAlertsProvider();

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    

    const isEmailValid = (value) => ( String(value).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) );


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
        if(headerImg !== '' && process.env.NEXT_PUBLIC_ENVIRONMENT !== 'development') {
            deleteFromStorage(headerImg);
        }
        deleteBlogFromContext(slug)
        deleteBlog(slug)
        
    }

    const onSubmit = (e) => {
        // e.preventDefault();
        if(!isEmailValid(email)) {
            addAlert('The email is not valid', "warning")
            return;
        }
        if(name.trim().length === 0) {
            addAlert('The first name is not valid', "warning")
            return; 
        }
        
        const url = process.env.NEXT_PUBLIC_MAILCHIMP_ACTION_URL;
        
        if(url === undefined) {
            addAlert('Service not availble, try later', "error")
            return; 
        }
        
        jsonp(`${url}&EMAIL=${email}&FNAME=${name}`, { param: 'c' }, (_, data) => {
            
            const { msg } = data;
            setSended(true)
            // addAlert('Thank you for subscribing!', "success")
            setTimeout(() => {
                setSended(false)
            }, 4500)
        });
        setName("")
        setEmail("")
    };
    
    //Display
    return(
        <div className={`my-8 mx-4 z-100 xl:mx-auto font-['lora'] ${mediaQuery}`}>
            <div className="flex flex-col lg:flex-row lg:gap-16">
                <div className="w-full">
                    {/* MAIN CONTENT */}
                    <div id="blogInnerHTML" className="w-full h-auto [&_img]:w-full [&_img]:
                    [&_img]:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] [&_img]:min-h-8 ql-editor" 
                   >{parse(body)}</div>
                    {/* <div className={css(styles.flexRow)}>
                        <button className={css(styles.actionButton)}>
                            <span className="material-symbols-outlined notranslate ">chevron_left</span>
                            Previous blog
                        </button>
                        <button className={css(styles.actionButton)}>
                            Next blog
                            <span className="material-symbols-outlined notranslate ">chevron_right</span>
                        </button>
                    </div> */}
                </div>
                <div className="w-full flex-none flex flex-col gap-2 px-2 lg:w-[20rem]">
                    {
                        locale !== 'en' &&
                        <>
                            <span className="font-['lora'] font-bold text-[1rem] w-fit uppercase notranslate" >{t('translateArticle')}</span>
                            <span>
                                {t('translateDescription')}
                            </span>
                        </>
                    }
                    <span className="font-['lora'] text-[1rem] font-bold w-fit uppercase notranslate" >{t('shareArticle')}</span>
                    <div className="flex flex-row gap-2 notranslate">
                        <EmailShareButton
                            url={`https://horizontrailers.com${pathname}`}
                            subject={t('shareArticleAlt')}
                            hashtag={"#HorizonTrailers "}
                            body={t('shareDescription')} 
                            className="rounded-full cursor-pointer z-200 w-8 aspect-square backdrop-saturate-50 backdrop-blur-sm bg-black/50! font-bold text-[1rem] 
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-600 select-none text-white p-1 flex 
                            items-center justify-center lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium!"
                        >
                            <MailIcon color="#fff" width="24" height="24"/>
                        </EmailShareButton>
                        <FacebookShareButton
                            url={`https://horizontrailers.com${pathname}`}
                            quote={t('shareArticleAlt')}
                            hashtag={"#HorizonTrailers "}
                            description={t('shareDescription')} 
                            className="rounded-full cursor-pointer z-200 w-8 aspect-square backdrop-saturate-50 backdrop-blur-sm bg-black/50! font-bold text-[1rem] 
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-600 select-none text-white p-1 flex 
                            items-center justify-center lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium!"
                        >
                            <FbIcon color="#fff" width="24" height="24"/>
                        </FacebookShareButton>
                        <LinkedinShareButton 
                            title={t('shareArticleAlt')}
                            summary={t('shareDescription')}
                            url={`https://horizontrailers.com${pathname}`}
                            source="https://horizontrailers.com"
                            className="rounded-full cursor-pointer z-200 w-8 aspect-square backdrop-saturate-50 backdrop-blur-sm bg-black/50! font-bold text-[1rem] 
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-600 select-none text-white p-1 flex 
                            items-center justify-center lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium!"
                        >
                            <LnIcon color="#fff" width="24" height="24"/>
                        </LinkedinShareButton>
                        <WhatsappShareButton 
                            title={t('shareArticleAlt')}
                            summary={t('shareDescription')}
                            url={`https://horizontrailers.com${pathname}`}
                            className="rounded-full cursor-pointer z-200 w-8 aspect-square backdrop-saturate-50 backdrop-blur-sm bg-black/50! font-bold text-[1rem] 
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-600 select-none text-white p-1 flex 
                            items-center justify-center lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium!"
                        >
                            <WhatsIcon color="#fff" width="24" height="24"/>
                        </WhatsappShareButton>
                        <TwitterShareButton
                            title={t('shareDescription')}
                            url={`https://horizontrailers.com${pathname}`}
                            hashtags={["HorizonTrailers"]} 
                            className="rounded-full cursor-pointer z-200 w-8 aspect-square backdrop-saturate-50 backdrop-blur-sm bg-black/50! font-bold text-[1rem] 
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-600 select-none text-white p-1 flex 
                            items-center justify-center lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium!"
                        >
                            <XIcon color="#fff" width="20" height="20"/>
                        </TwitterShareButton>
                    </div>
                    <div className="w-full h-px my-4 bg-[#f3f3f3]"></div>
                    <div className="relative flex flex-col notranslate">
                        <div className={`absolute h-full font-['lora'] w-full flex flex-col items-center justify-center motion-safe:transition-all 
                            motion-reduce:transition-none will-change-auto motion-safe:duration-300
                            bg-[#1C1C1E] text-[#d9dcdc] ${sended ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                            <div className="max-w-(--breakpoint-md) xl:mx-auto flex flex-row items-center justify-center overflow-hidden p-2">
                                <MailCheckIcon width="48" height="48" className="text-primary-color w-20 aspect-square"/>
                                <h1 className="font-['lora'] font-medium text-[1.5rem] leading-8
                                flex items-center justify-start uppercase ">{t('thanks4Subs')}</h1>
                            </div>
                        </div>
                        <span className="font-['lora'] font-bold text-[1rem] w-fit uppercase">{t('joinToHTCommunity')}</span>
                        <span>
                            {t('getExclusiveOffers')}
                        </span>
                        <input className="mt-4 border border-[#d5d5d5] bg-transparent h-8 text-[1rem] outline-hidden p-0 pl-[0.2rem]" 
                        type="text" name="NAME" placeholder={fT('namePlaceholder')} aria-label={fT('namePlaceholder')} required 
                        onChange={(e) => setName(e.target.value)} value={name}/>
                        <input className="mt-4 border border-[#d5d5d5] bg-transparent h-8 text-[1rem] outline-hidden p-0 pl-[0.2rem]" 
                        type="email" name="EMAIL" placeholder={fT('emailPlaceholder')} aria-label={fT('emailPlaceholder')} required 
                        onChange={(e) => setEmail(e.target.value)} value={email}/>
                        <button onClick={onSubmit} className="text-[1rem] cursor-pointer relative 
                        h-9
                        mt-4 text-white border-none bg-primary-color select-none motion-safe:transition-all 
                        motion-reduce:transition-none will-change-auto motion-safe:duration-400 uppercase">{fT('subscribe')}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogContent