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
            
            <div className={`absolute h-full font-['Montserrat'] w-full flex flex-col items-center justify-center motion-safe:transition-all 
                motion-reduce:transition-none will-change-auto motion-safe:duration-300
                bg-[#1C1C1E] text-[#d9dcdc] ${sended ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <div className="max-w-(--breakpoint-md) xl:mx-auto flex flex-row items-center justify-center overflow-hidden p-2">
                    <MailCheckIcon width="48" height="48" className="text-primary-color w-20 aspect-square"/>
                    <h1 className="font-['Michroma'] font-medium text-[1.5rem] leading-8
                    flex items-center justify-start uppercase ">{mcT('thanks')}</h1>
                </div>
            </div>

            <div className="flex h-8 w-full font-['Montserrat'] text-[1rem]">
                <input aria-label='first name for subscription to Horizon offers, news and more' 
                    className="border-none rounded-[10px] bg-white w-full outline-hidden pl-[0.4rem] 
                    font-['Montserrat'] text-[0.9rem]"
                    type="text" name="TEXT" placeholder={mcT('nameInputPlaceholder')} required 
                    onChange={(e) => setName(e.target.value)} value={name}/>
            </div>
            <div className="flex h-8 w-full font-['Montserrat'] text-[1rem]">
                <input aria-label='email for subscription to Horizon offers, news and more' 
                    className="border-none rounded-l-[10px] rounded-r-none bg-white outline-hidden pl-[0.4rem] 
                    font-['Montserrat'] text-[0.9rem] w-full"
                    type="email" name="EMAIL" placeholder={mcT('emailInputPlaceholder')} required 
                    onChange={(e) => setEmail(e.target.value)} value={email}/>
                <button className="rounded-r-[10px] cursor-pointer color-white bg-primary-color
                    w-10 border-none material-symbols-outlined notranslate  text-white" 
                    onClick={onSubmit}>
                    chevron_right
                </button>
            </div>

        </div>
    );
}

export default MailchimpForm;
