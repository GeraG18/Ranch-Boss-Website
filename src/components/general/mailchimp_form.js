'use client' // Renders on client side
import { useState } from 'react';
import jsonp from 'jsonp';
import { useAlertsProvider } from '../../context/alert_context';
import MailCheckIcon from "@/components/icons/mail_check_icon"
import { useTranslations } from 'next-intl';

const MailchimpForm = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [sended, setSended] = useState(false);
    const mcT = useTranslations('FooterMailchimpForm')

    const { addAlert } = useAlertsProvider();

    const isEmailValid = (value) => ( String(value).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) );

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

    return (
        <div className="flex flex-col gap-4 w-full relative">
            
            <div className={`absolute h-full font-['lora'] w-full flex flex-col items-center justify-center motion-safe:transition-all 
                motion-reduce:transition-none will-change-auto motion-safe:duration-300
                bg-[#1C1C1E] text-[#d9dcdc] ${sended ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <div className="max-w-(--breakpoint-md) xl:mx-auto flex flex-row items-center justify-center overflow-hidden p-2">
                    <MailCheckIcon width="48" height="48" className="text-primary-color w-20 aspect-square"/>
                    <h1 className="font-['lora'] font-medium text-[1.5rem] leading-8
                    flex items-center justify-start uppercase ">{mcT('thanks')}</h1>
                </div>
            </div>

            <div className="flex h-8 w-full font-['lora'] text-[1rem]">
                <input aria-label='first name for subscription to Horizon offers, news and more' 
                    className="border border-r-none border-secondary-color-20/50 rounded-r-none bg-white/20 outline-hidden pl-[0.4rem] 
                    font-['lora'] text-[0.9rem] w-full text-white placeholder:text-white/50! placeholder:text-sm!"
                    type="text" name="TEXT" placeholder={mcT('nameInputPlaceholder')} required 
                    onChange={(e) => setName(e.target.value)} value={name}/>
            </div>
            <div className="flex h-8 w-full font-['lora'] text-[1rem]">
                <input aria-label='email for subscription to Horizon offers, news and more' 
                    className="border border-r-none border-secondary-color-20/50 rounded-r-none bg-white/20 outline-hidden pl-[0.4rem] 
                    font-['lora'] text-[0.9rem] w-full text-white placeholder:text-white/50! placeholder:text-sm!"
                    type="email" name="EMAIL" placeholder={mcT('emailInputPlaceholder')} required 
                    onChange={(e) => setEmail(e.target.value)} value={email}/>
                <button className="material-symbols-outlined notranslate cursor-pointer col-span-full self-center justify-self-center inline-block font-['oswald'] font-medium no-underline text-white bg-secondary-color px-2 h-full bg-[length:200%_100%] bg-gradient-to-r from-secondary-color from-50% to-tertiary-color to-50% motion-safe:transition-all duration-500 motion-safe:ease-[cubic-bezier(0.19,1,0.22,1)] delay-50 lg:hover:text-white lg:hover:bg-tertiary-color lg:hover:bg-[-100%_100%]" 
                    onClick={onSubmit}>
                    chevron_right
                </button>
            </div>

        </div>
    );
}

export default MailchimpForm;
