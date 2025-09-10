import React from "react";
import IconViewer from "../general/icon_viewer";
import { useTranslations } from "next-intl";

function BlogHeader ({author="", authorImg = "", title="", tags=[], image="", date="", body=""}){
    //Logic
    // 
    const t = useTranslations('Blog')
    const mT = useTranslations('MonthsOfTheYear')
    
    const getFormatedDate = () => {
        if(!date) return '--- --, ----'

        let time = new Date(date);
        const monthsDictionary = [ mT("jan"), mT("feb"), mT("mar"), mT("apr"), mT("may"), mT("jun"), mT("jul"), mT("aug"), mT("sep"), mT("oct"), mT("nov"), mT("dec")]
        return `${monthsDictionary[time.getMonth()]} ${((time.getDate()+'').length === 1 ? '0' : '') + time.getDate()}, ${time.getFullYear()}`;
    }
    
    const getReadingTime = () => {
        const wpm = 225;
        const words = body.trim().split(/\s+/).length;
        // 
        
        const time = Math.ceil(words / wpm);
        return time;
    }

    //Display
    return (
        <div style={{backgroundImage:`url(${image})`}} className="flex gap-2 flex-col justify-end items-start relative bg-[#181818]
        bg-no-repeat bg-center bg-cover overflow-hidden font-['lora'] h-[80vh] lg:h-[70vh]">
            <div className="flex flex-col min-h-32 pb-4 w-[calc(100%-2rem)] lg:flex-row before:content-[''] before:absolute
            before:bottom-0 before:left-0 before:w-full before:h-40 before:pointer-events-none 
            before:bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(23,23,23,0.5)_29%,rgba(36,36,36,0.75)_50%,rgba(36,36,36,0.85)_75%,rgba(36,36,36,0.95)_100%)]
            mx-4 max-w-screen-lg  z-100 xl:mx-auto">
                <div className="w-full h-full z-20 flex text-white gap-2 justify-center items-start 
                text-shadow flex-col">
                    <span className="max-w-[95%] h-auto font-['lora'] text-[3rem] leading-[2.8rem] 
                    uppercase text-left text-white z-20">{title || '-'}</span>
                    <div className="relative z-30 w-full py-2 flex flex-row flex-wrap gap-1">
                        {
                            tags.map((tag, index) => (
                                <div key={index} className="w-fit py-0.5 px-3 uppercase
                                text-[0.85rem] backdrop-saturate-50 backdrop-blur-sm bg-black/50">
                                    {tag}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="w-full h-full z-20 flex text-white gap-2 justify-center items-end text-shadow flex-col notranslate">
                    <div className="flex gap-1 flex-row items-center justify-end w-[16rem]">
                        <div className="w-9 aspect-square rounded-full backdrop-saturate-50 backdrop-blur-sm 
                        bg-black/50 flex items-center justify-center overflow-hidden">
                            {
                                authorImg !== '' ?
                                <IconViewer fullHeight={true} src={authorImg}/>
                                : 
                                <span className="material-symbols-outlined" >
                                    person_outline
                                </span>
                            }
                        </div>
                        <span className="max-w-[95%] text-left text-white z-20 flex-none">{author || '-'}</span>
                    </div>
                    <span className="max-w-[95%] text-left text-white z-20 flex-none">{getFormatedDate()} • {t('xMinsRead', {minutes: getReadingTime()})}</span>
                </div>

            </div>
        </div>
    )
}

export default BlogHeader