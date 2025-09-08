'use client' // Renders on client side
import React, { useEffect, useState } from "react"
import { useBlogUserContext } from "../../context/blog_user_context";

const LoginBar = () => {

    // const location = useLocation();
    const [activeSections, setActiveSections] = useState([]);
    let {user, logOut} = useBlogUserContext();

    const showOrHideCheckBox = (filterselected) => {
        const checkBoxes = document.getElementsByClassName(filterselected)
        
        for( var index = 0; index < checkBoxes.length; index++){
          checkBoxes[index].style.cssText = 
            checkBoxes[index].style.display === "block" ? "display: none !important; padding: 0rem !important;": "display: block !important; padding: 0.5rem !important;"  
        }
    
        if(activeSections.includes(filterselected)) {
          let newArr = activeSections.filter((item) => item !== filterselected);
          setActiveSections(newArr)
        } else {
          let newArr = [...activeSections, filterselected]
          setActiveSections(newArr)
        }
    }

    return(
        <div className="bg-[#f3f3f3]">
            <div className="h-20 hidden gap-8 items-center lg:flex
            mx-4 max-w-(--breakpoint-xl) z-100 xl:mx-auto">
                <span className="w-full font-['Michroma'] text-[2rem] uppercase">
                    Welcome back, {user?.name?.split(" ")[0] || '-'}
                </span>
                <div className="flex-none font-['Michroma'] text-[2rem] leading-[1.8rem] border-none
                w-full h-9 cursor-pointer flex flex-col gap-0 items-start justify-center bg-transparent
                text-[rgb(119,120,123)] lg:w-fit lg:items-center lg:hover:underline lg:hover:decoration-secondary-color
                lg:hover:decoration-[3px] lg:hover:underline-offset-4" 
                onClick={() => logOut()}>LOG OUT</div>
            </div>

            <ul className="w-full inline-flex gap-2 flex-col bg-white list-none relative select-none m-0 p-0 lg:hidden">
                <li className="p-0 border border-[#f3f3f3]" key={"help_center"}>
                    <div onClick={()=>showOrHideCheckBox("help_center")} className="py-3 px-4 cursor-pointer flex h-12 items-center
                    justify-center bg-[#f3f3f3]">
                    <span className="w-full font-['Michroma'] text-[2rem] uppercase flex items-center">
                        Welcome back, name
                    </span>
                    <span className="material-symbols-outlined notranslate ">
                        {!activeSections.includes("help_center") ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
                    </span>
                    </div>
                    <div className="flex flex-col gap-[0.2rem]">
                        <div className="hidden rounded-[1px] help_center">
                            <div className="font-['Michroma'] text-[2rem] leading-[1.8rem] border-none
                            w-full h-9 cursor-pointer flex flex-col gap-0 items-start justify-center bg-transparent
                            text-[rgb(119,120,123)] lg:w-fit lg:items-center lg:hover:underline lg:hover:decoration-secondary-color
                            lg:hover:decoration-[3px] lg:hover:underline-offset-4" 
                            onClick={() => logOut()}>LOG OUT</div>
                        </div>
                    </div>
                </li>
            </ul>

        </div>
    )
}

export default LoginBar;