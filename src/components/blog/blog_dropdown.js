import React, { useEffect } from "react"
import { useBlogUserContext } from "@/context/blog_user_context";
import { useRouter } from "next/navigation";

function DropdownMenu({isShowing, isSticky, xPos, isOpenCallback = () => {}}) {
    
    //#region code
    let router = useRouter();
    let {user, logOut} = useBlogUserContext();

    useEffect(() => {
        document.body.style.overflowY = isShowing ? 'hidden' : 'auto';
    }, [isShowing]);

    //#region view
    return (
        <div style={{height:isShowing ? `calc(100vh - ${isSticky ? '6.5rem' : '9rem'})` : "0px", opacity:isShowing ? "1" : "0", pointerEvents:isShowing ? 'auto' : "none",}} 
            className="motion-safe:transition-opacity motion-safe:duration-300 motion-reduce:transition-none will-change-auto select-none w-full max-h-full
            overflow-hidden relative left-0 top-0 bg-black/50 backdrop-blur-md backdrop-saturate-50 z-100 flex items-start justify-center"
            onClick={() => isOpenCallback('')}>
            <div style={{opacity: isShowing ? '1' : '0', pointerEvents: isShowing ? 'auto' : 'none', left:`calc(${xPos}px - 13rem)`,}} 
                className="w-fit absolute flex flex-row items-start justify-center z-40" onClick={(e) => e.stopPropagation()}>
                <div className="bg-white backdrop-blur-[6px] motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none will-change-auto flex
                    flex-col gap-0 text-gray-500 items-start justify-center p-4 z-90 shadow-2xl">
                        <div className="w-88 cursor-pointer flex-none flex flex-col items-baseline justify-center text-[#4d4d4d] rounded-[10px] relative 
                            py-3 px-4 font-['Michroma'] uppercase text-[1.5rem] lg:hover:bg-[rgb(220,220,220)]" 
                            onClick={() => {isOpenCallback(false); router.push("/blog/editor/create-blog");} }>
                            <span style={{letterSpacing:'1px', color:'black', opacity:0.6, display:'flex', gap:'0.5rem', alignItems:'center'}}>
                                CREATE NEW BLOG
                               
                            </span>
                        </div>
                        <div className="w-88 cursor-pointer flex-none flex flex-col items-baseline justify-center text-[#4d4d4d] rounded-[10px] relative 
                            py-3 px-4 font-['Michroma'] uppercase text-[1.5rem] lg:hover:bg-[rgb(220,220,220)]" 
                            onClick={() => {isOpenCallback(false); router.push("/blog/editor/statistics");} }>
                            <span style={{letterSpacing:'1px', color:'black', opacity:0.6, display:'flex', gap:'0.5rem', alignItems:'center'}}>
                                View Statistics
                               
                            </span>
                        </div>
                        <div className="w-88 cursor-pointer flex-none flex flex-col items-baseline justify-center text-[#4d4d4d] rounded-[10px] relative 
                            py-3 px-4 font-['Michroma'] uppercase text-[1.5rem] lg:hover:bg-[rgb(220,220,220)]" 
                            onClick={() => {isOpenCallback(false); logOut();} }>
                            <span style={{letterSpacing:'1px', color:'black', opacity:0.6, display:'flex', gap:'0.5rem', alignItems:'center'}}>
                                SIGN OUT
                               
                            </span>
                        </div>
                </div>
            </div>
        </div>
        
    )
}

export default DropdownMenu;