import React from "react";
import IconViewer from "../general/icon_viewer";
import parse from 'html-react-parser';

function CarouselItem ({author, authorImg, body, image, date, title}){
    //Logic
    const getFormatedDate = () => {
        let time = new Date(date);
        let monthsDictionary = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return `${monthsDictionary[time.getMonth()]} ${((time.getDate()+'').length === 1 ? '0' : '') + time.getDate()}, ${time.getFullYear()}`;
    }
    
    const getReadingTime = () => {
        const wpm = 225;
        const words = body.trim().split(/\s+/).length;
        const time = Math.ceil(words / wpm);
        return time;
    }
    
    //Display
    return (
        <div style={{backgroundImage:`url(${image})`}} className="flex gap-2 flex-col justify-end items-start h-[80vh] lg:h-[70vh] relative bg-[#181818] 
        bg-no-repeat bg-center bg-cover overflow-hidden font-['Montserrat']">
            <div className="flex flex-col min-h-32 pb-4 w-[calc(100%-2rem)] lg:grid lg:grid-cols-2 
            before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-full  
            before:pointer-events-none before:bg-[linear-gradient(180deg,rgba(0,0,0,0.35)_0%,rgba(23,23,23,0.55)_29%,rgba(36,36,36,0.75)_50%,rgba(36,36,36,0.95)_75%,rgba(36,36,36,1)_100%)] 
            before:w-full mx-4 max-w-(--breakpoint-xl) z-100 xl:mx-auto">
                <div className="w-full h-full z-20 flex text-white gap-2 justify-center items-start text-shadow flex-col">
                    <span className="max-w-[95%] h-auto font-['Michroma'] font-bold leading-10 uppercase text-[2rem] text-shadow lg:text-[2.5rem] lg:leading-[2.75rem] z-20">{title}</span>
                    <div className="flex m-0 line-clamp-2! all-unset [&_p]:w-fit! [&_span]:bg-transparent!
                    [&_span]:text-white! [&_span]:w-full! [&_strong]:bg-transparent! [&_strong]:text-white!
                    [&_strong]:w-full!" 
                    >
                        {parse(body)}
                    </div>
                </div>
                <div className="w-full h-full z-20 flex text-white gap-2 justify-center text-shadow flex-col items-end">
                    <div className="flex gap-1 flex-row items-center justify-end w-[16rem]">
                        <div className="w-9 aspect-square backdrop-saturate-50 backdrop-blur-sm bg-black/50
                        flex items-center justify-center overflow-hidden overflow-none rounded-full">
                            {
                                authorImg !== '' ?
                                <IconViewer fullHeight={true} src={authorImg}/>
                                : 
                                <span className="material-symbols-outlined notranslate " >
                                    person_outline
                                </span>
                            }
                        </div>
                        <span className="max-w-[95%] text-left text-white z-20 flex-none">{author}</span>
                    </div>
                    <span className="max-w-[95%] text-left text-white z-20 flex-none">{getFormatedDate()} • {`${getReadingTime()} ${getReadingTime() === 1 ? 'min' : 'mins'} read`}</span>
                </div>

            </div>
        </div>
    )
}

export default CarouselItem