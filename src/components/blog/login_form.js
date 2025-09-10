'use client' // Renders on client side
import React, { useEffect, useState } from "react";
import { useBlogUserContext } from "../../context/blog_user_context";
import { useAlertsProvider } from "../../context/alert_context";
import { useRouter } from "next/navigation";
import PageSpacer from "../general/page_spacer";


const LoginForm = () => {

    //#region code
    // const [screen, setScreen] = useState('register'); /* regster | login */
    const [showPwd, setShowPwd] = useState(false); /* regster | login */
    const router = useRouter();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {user, logIn} = useBlogUserContext();
    const { addAlert } = useAlertsProvider();

    useEffect(() => {
        if(user) {
            router.push("/blog")
            addAlert('You can edit now', 'info')
        }
        
    }, [user])

    const doEditorLogin = async (event) => {
        let res = logIn(username, password);
        
        
        if(!res) {
            //alert
            addAlert('Invalid session, check the data again', "error")
            return; 
        }

        router.push('/blog/editor/create-blog')
        addAlert('Welcome back!', "success")
        setUsername('')
        setPassword('')
        //logged alert and redirection
    }

    //#region view
    return (
        <div 
            className={`w-full left-0 top-0 before:bg-black/50 before:w-full before:h-full before:absolute backdrop-saturate-50 backdrop-blur-sm
                z-900 flex flex-col items-center justify-center font-['lora'] h-[70vh]
                before:bg-cover before:bg-center before:bg-no-repeat before:bg-[url(/Images/secondBackgroundImage.webp)]
                before:brightness-[0.4]`}>
            <PageSpacer/>
            <div className="z-100 overflow-hidden relative py-8 mx-4 w-full flex flex-col bg-white text-black
                shadow-[rgba(0, 0, 0, 0.15)_0px_2px_10px] p-0 md:w-[24rem]">
                <form onSubmit={(e) => {e.preventDefault(); doEditorLogin()}}  
                    name="loginForm" className="p-4 flex gap-4 justify-center items-center flex-wrap overflow-x-hidden
                    overflow-y-auto">
                    <div className="flex flex-col items-start w-full gap-1">
                        <span className="font-['lora'] text-[2rem] w-fit">USERNAME</span>
                        <input type="text" id="usrInput" placeholder="Put your username here" 
                        className="border border-[#d5d5d5] bg-transparent w-[calc(100%-0.2rem)] h-8 text-[1rem] outline-hidden p-0 pl-[0.2rem] "
                            value={username} onChange={(e) => {setUsername(e.target.value)}} aria-label="Username Input"/>
                    </div>
                    <div className="flex flex-col items-start w-full gap-1 lg:m-0">
                        <span className="font-['lora'] text-[2rem] w-fit">PASSWORD</span>
                        
                        <div className="w-full relative flex flex-row items-center">
                            <input type={showPwd ? "text" : "password"} id="pwdInput" placeholder="•••••••••••" 
                            className="border border-[#d5d5d5] bg-transparent w-[calc(100%-0.2rem)] h-8 text-[1rem] outline-hidden p-0 pl-[0.2rem] "
                                value={password} onChange={(e) => {setPassword(e.target.value)}} aria-label="Password Input"/>
                            <span onClick={() => setShowPwd((prev) => !prev)} style={{color:"#77787b"}} 
                            className="material-symbols-outlined notranslate  absolute right-2 cursor-pointer lg:hover:text-secondary-color!
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-300">
                                {showPwd ? 'visibility_off' : 'visibility'}
                            </span>
                            {/* visibility_off */}
                        </div>

                    </div>
                    <button type="submit"
                        className="w-full text-[1rem] cursor-pointer text-white bg-primary-color select-none border-none rounded-[10px]
                        motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-300 
                        py-3 px-4 pointer-events-auto lg:w-auto lg:px-10 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium"
                    >LOG IN</button>
                </form>
            </div>
        </div>
    );
    //#endregion
}

export default LoginForm;
