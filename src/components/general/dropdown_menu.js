import React, { useEffect, useState} from "react"
import CustomLink from "./custom_link";
import { useLockBodyScroll } from "@/hooks/lock_body_scroll/lock_body_scroll";

function DropdownMenu({menu, isShowing, isSticky, xPos, isOpenCallback = () => {}}) {    
    //#region code
    useLockBodyScroll(isShowing); // hook to lock body scrolling when menu is open
    // useEffect(() => {
    //     document.body.style.overflowY = isShowing ? 'hidden' : 'auto';
    // }, [isShowing]);

    //#region view
    return (
        <div style={{height:isShowing ? `calc(100vh - ${isSticky ? '6.5rem' : '9rem'})` : "0px", opacity:isShowing ? "1" : "0", pointerEvents:isShowing ? 'auto' : "none",}} 
            className="motion-safe:transition-opacity motion-safe:duration-300 motion-reduce:transition-none will-change-auto select-none w-full max-h-full
            overflow-hidden relative left-0 top-0 bg-black/50 backdrop-blur-md backdrop-saturate-50 z-100 flex items-start justify-center"
            onClick={() => isOpenCallback('')}>
            <div style={{opacity: isShowing ? '1' : '0', pointerEvents: isShowing ? 'auto' : 'none', left:xPos,}} 
                className="w-fit absolute flex flex-row items-start justify-center z-40" onClick={(e) => e.stopPropagation()}>
                <div className="bg-white backdrop-blur-[6px] motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto flex
                    flex-col gap-0 text-gray-500 items-start justify-center p-4 z-90 shadow-2xl">
                    {menu.map(({name, url, imgUrl, childs}) => (
                        <CustomLink href={url} className="w-88 flex-none flex flex-col items-baseline justify-center text-[#4d4d4d] rounded-[1.5rem] relative 
                            py-3 px-4 font-['Michroma'] uppercase text-[1rem] font-bold lg:hover:bg-[rgb(220,220,220)]" 
                            key={name} onClick={() => isOpenCallback(false) }>
                            <span style={{letterSpacing:'1px', color:'black', opacity:0.6, display:'flex', gap:'0.5rem', alignItems:'center'}}>
                                {name}
                                {
                                    childs &&
                                    <span className="material-symbols-outlined notranslate " style={{color:'black', opacity:0.6}}>
                                        chevron_right
                                    </span>
                                }
                            </span>
                        </CustomLink>
                    ))}
                </div>
            </div>
        </div>
        
    )
}

export default DropdownMenu;