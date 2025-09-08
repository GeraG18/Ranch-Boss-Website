'use client' // Renders on client side
import React, { useEffect, useState } from "react";
import FabChatItem from "./fab_chat_item";
import { pushContactForm } from "@/services/firebase-service";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const FabForm = ({showingChat, returnData = ()=> {} }) => {
    
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const t = useTranslations('FabChat')
    const fT = useTranslations('BasicForm')
    const params = new URLSearchParams(searchParams);
    const [sendedForm, setIsFormSended] = useState(false);
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        phoneNumber:'',
        message: '',
    });

    const isNameValid = (value) => ( String(value).trim().match(/^([a-zA-Zà-úÀ-Ú]{2,})+\s+([a-zA-Zà-úÀ-Ú\s]{2,})+$/g));
    const isEmailValid = (value) => ( String(value).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) );
    const isPhoneValid = (value) => ( String(value).match(/^(?:\+?\d{1,4}[\s-]?)?(?:\(?\d{1,4}\)?[\s-]?)?\d{2,5}(?:[\s-]?\d{2,5}){1,2}$/) );
    const isMessageValid = (value) => (value.trim().length > 0)

    const GetPath = ()=>{
        
      return null
    }

    const validateAndSendForm = () => {
        setIsFormSended(true);
        if(!isNameValid(formData.name)) {
            setIsFormSended(false);
            return;
        }

        if(!isEmailValid(formData.email)) {
            setIsFormSended(false);
            return;
        }
        
        if(!isPhoneValid(formData.phoneNumber)) {
            setIsFormSended(false);
            return;
        }

        if(!isMessageValid(formData.message)) {
            setIsFormSended(false);
            return;
        }
        
        /* put send to firebase here */
        pushContactForm({
            message:`A client needs help with his trailer. \nMessage: ${formData.message}. \nPage: https://horizontrailers.com${pathname}${searchParams.size > 0 ? '?': ''}${searchParams.size > 0 ? searchParams.toString() : ''}`,
            subject:"A client needs our help - Open Chat Horizon Helper",
            firstName: formData.name,
            lastName:"(included in first name)",
            email: formData.email,
            phoneNumber:formData.phoneNumber,
            url: `https://horizontrailers.com${pathname}${searchParams.size > 0 ? '?': ''}${searchParams.size > 0 ? searchParams.toString() : ''}`
        })
        returnData();
    }

    useEffect(() => {
        setIsFormSended(false)
        GetPath()
    },[showingChat])

    return (
        <div className="flex flex-col items-center justify-center gap-1 w-62 relative">
            {   
                sendedForm &&
                <div className={` bg-[rgba(243,243,243,0.4)] w-full h-full absolute top-0 left-0`}></div>
            }
            <div className="w-full flex flex-col">
                <span className="pb-0.5 font-['Montserrat'] font-bold text-[1rem] w-full">
                    {fT('fullnameLabel')}
                    {!isNameValid(formData.name) && <span className="text-red-600 text-[0.75rem]">{fT('required')}</span>}
                </span>
                <input 
                    type="text" 
                    disabled={sendedForm}
                    value={formData.name} 
                    placeholder={fT('fullnamePlaceholderAlt')}
                    onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))} 
                    className="h-8 text-[1rem] border border-[#babcbe] outline-hidden font-['Montserrat'] p-[2px]
                    bg-white rounded-[10px] w-full"
                />
            </div>
            <div className="w-full flex flex-col">
                <span className="pb-0.5 font-['Montserrat'] font-bold text-[1rem] w-full">
                    {fT('emailLabel')}
                    {!isEmailValid(formData.email) && <span className="text-red-600 text-[0.75rem]">{fT('required')}</span>}
                </span>
                <input 
                    type="email" 
                    disabled={sendedForm}
                    value={formData.email} 
                    placeholder={fT('emailPlaceholderAlt')}
                    onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))} 
                    className="h-8 text-[1rem] border border-[#babcbe] outline-hidden font-['Montserrat'] p-[2px] w-full
                    bg-white rounded-[10px]"
                />
            </div>
            <div className="w-full flex flex-col">
                <span className="pb-0.5 font-['Montserrat'] font-bold text-[1rem] w-full">
                    {fT('phoneLabel')}
                    {!isPhoneValid(formData.phoneNumber) && <span className="text-red-600 text-[0.75rem]">{fT('required')}</span>}
                </span>
                <input 
                    type="text"
                    disabled={sendedForm}
                    value={formData.phoneNumber} 
                    placeholder={fT('phonePlaceholderAlt')}
                    onChange={(e) => setFormData(prev => ({...prev, phoneNumber: e.target.value}))} 
                    className="h-8 text-[1rem] border border-[#babcbe] outline-hidden font-['Montserrat'] p-[2px] w-full
                    bg-white rounded-[10px]"
                />
            </div>
            <div className="w-full flex flex-col">
                <span className="pb-0.5 font-['Montserrat'] font-bold text-[1rem] w-full">
                    {fT('messageLabel')}
                    {!isMessageValid(formData.message) && <span className="text-red-600 text-[0.75rem]">{fT('required')}</span>}
                </span>
                <textarea 
                    type="text"
                    disabled={sendedForm} 
                    value={formData.message} 
                    placeholder={fT('messagePlaceholderAlt')}
                    onChange={(e) => setFormData(prev => ({...prev, message: e.target.value}))} 
                    className="text-[1rem] border border-[#babcbe] outline-hidden font-['Montserrat'] p-[2px] w-full
                    bg-white rounded-[10px] resize-none h-40"
                ></textarea>
            </div>

            <button onClick={() => {validateAndSendForm(); }} 
                className={`
                cursor-pointer text-white border-none font-['Montserrat']
                font-medium select-none h-8 overflow-hidden text-[1rem] w-full rounded-[10px]
                flex items-center justify-center px-8 motion-safe:transition-all
                motion-reduce:transition-none will-change-auto motion-safe:duration-400
                ${sendedForm ? "lg:hover:bg-[#7c736f] bg-[#7c736f] pointer-events-none" : 
                    "lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium bg-primary-color pointer-events-auto"}
                `}>
                    {fT('send')}
                </button>
        </div>
    )
}

const FABChat = () => {

    const [isChatShowing, setChatShowing] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [hideBtn, setHideBtn] = useState(false);
    const [isStickyBottom, setIsStickyBottom] = useState(true);
    const t = useTranslations('FabChat')
    const [chatView, setChatView] = useState([
        // <FabChatItem type="user">Hola mundo!</FabChatItem>,
        // <FabChatItem type="bot"></FabChatItem>
    ])
    const [timeouts, setTimeouts] = useState({
        t1: '',
        t2: '',
        t3: '',
        t4: '',
        t5: '',
        t6: '',
    })

    const trackScrolling = (params) => {
        setIsSticky(params.target.scrollTop >= -(params.target.scrollHeight - params.target.clientHeight))
        setIsStickyBottom(params.target.scrollTop === 0);
    }

    const startConversationFlow = () => {
        setHideBtn(true);
        let t1 = setTimeout(() => {
            setChatView((prev) => ([<FabChatItem type="user" key={"0"}>{t('clientMessage')}</FabChatItem>, ...prev]))
        },500);
        let t2 = setTimeout(() => {
            setChatView((prev) => ([<FabChatItem type="bot" id="loading" key={1}></FabChatItem>, ...prev]))
        },2500);
        let t3 = setTimeout(() => {
            setChatView((prev) => [<FabChatItem type="bot" key={"2"}>
                {t('botMessage')} 
            </FabChatItem>,...prev.filter(item => item.props.id !== 'loading')] )
        },4500);
        let t4 = setTimeout(() => {
            setChatView((prev) => [<FabChatItem type="bot" key={3}>
                <FabForm showingChat={isChatShowing} returnData={sendData}/>
            </FabChatItem>,...prev] )
        },7000);
        setTimeouts((prev) => ({...prev, t1, t2, t3, t4}));
    }
    
    const sendData = () => {
        let t5 = setTimeout(() => {
            setChatView((prev) => ([<FabChatItem type="bot" id="loading" key={4}></FabChatItem>, ...prev]))
        },2500);
        let t6 = setTimeout(() => {
            setChatView((prev) => [<FabChatItem type="bot" id="loading" key={"5"}>
                {t('botMessage2')}
            </FabChatItem>,...prev.filter(item => item.props.id !== 'loading')] )
        },4500);
        setTimeouts((prev) => ({...prev, t5, t6}));
    }

    useEffect(() => {
        document.body.style.overflowY = isChatShowing ? 'hidden' : 'auto';
        /* resetting chat zone */
        setHideBtn(false);
        setChatView([])

        if(!isChatShowing) {
            Object.keys(timeouts).forEach((el) => {
                clearTimeout(timeouts[el])
            });
        }
    }, [isChatShowing]);

    return(
        <>
            <div className="fixed top-0 left-0 motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400 
                w-full h-full bg-black/50 backdrop-saturate-50 backdrop-blur-md z-490 flex items-end justify-end " 
                style={{opacity:isChatShowing ? '1' : '0', pointerEvents:isChatShowing ? 'auto' : 'none',}} 
                onClick={() => setChatShowing(false)}>
                <div className="rounded-lg bg-white w-full overflow-hidden h-[70vh] flex flex-col m-2
                    motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-500
                    relative lg:w-[24rem] lg:h-[60vh]" 
                    style={{transform:isChatShowing ?   'translateX(0%)' : 'translateX(20%)',}} 
                    onClick={(e) => e.stopPropagation()}>
                    <div style={{boxShadow: isSticky ? '0 10px 25px -12px rgb(0 0 0 / 0.15)' : 'none',}} 
                        className="z-20 bg-white motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-500
                        py-8 px-6 left-0 flex-none justify-center items-start flex flex-col h-20 w-[calc(100%)] relative self-center">
                        <button className="bg-primary-color text-white cursor-pointer border-none
                            w-[1.8rem] aspect-square rounded-[4px] flex items-center
                            justify-center absolute right-6 z-80" 
                            onClick={() => setChatShowing(false)}>
                            <span style={{color:'white'}} className="material-symbols-outlined notranslate ">close</span> 
                        </button>
                        <span className="text-[#77787b] z-30 font-[0.9rem] font-['Montserrat']">{t('chat')}</span>
                        <span className="text-black font-semibold z-30 text-[1rem] font-['Montserrat'] h-fit text-center">
                            {t('horizonHelper')}
                        </span>
                    </div>
                    <div className="h-full overflow-x-hidden overflow-y-auto 
                        py-4 px-6 bg-white flex gap-1 flex-col-reverse" 
                        onScroll={trackScrolling}>
                        {
                            hideBtn ? 
                            <>{chatView}</>
                            :
                            <span className="text-center text-[#77787b] z-30 font-[0.9rem] font-['Montserrat']">{t('startConversationToContinue')}</span>
                        }
                    </div>
                    <div className="relative w-full py-2 flex flex-col items-center justify-center 
                        flex-none left-0 motion-safe:transition-all motion-reduce:transition-none 
                        will-change-auto motion-safe:duration-400 bg-white z-20">
                            <button className={`text-white border-none font-['Montserrat']
                                font-medium text-[1rem] select-none overflow-hidden
                                w-[90%] flex items-center justify-center px-8 rounded-lg
                                motion-safe:transition-all motion-reduce:transition-none 
                                will-change-auto motion-safe:duration-400 lg:px-12
                                h-10 uppercase ${!hideBtn ? 'bg-primary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium cursor-pointer ' : 'bg-[#7a7a7a] pointer-events-none cursor-not-allowed'}`} 
                                onClick={() => startConversationFlow()}>{t('startConversation')}</button>
                    </div>
                </div>
            </div>
            <button id="floating-action-button" className="fixed bottom-[20%] right-0 *lg:right-2 border-none bg-primary-color
                text-white flex flex-col items-center justify-center font-['Montserrat'] uppercase rounded-l-lg *lg:rounded-r-lg
                p-4 lg:p-2 cursor-pointer z-450 motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                motion-safe:duration-300 shadow-[0px_-4px_15px_0px_rgba(0,0,0,0.3),0px_12px_12px_0px_rgba(0,0,0,0.22)]
                *lg:bottom-2 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium text-[14px]" 
                onClick={() => setChatShowing(true)}>
                <span className="material-symbols-outlined notranslate w-6 h-6 flex items-center justify-center" >
                    forum
                </span>
                <span className="hidden lg:block text-xs font-semibold min-w-17">
                    {t('buttonTitle')}
                </span>
            </button>
        </>
    );
}

export default FABChat;