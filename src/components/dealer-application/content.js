import React, {useState} from "react";
import { pushDealersApplication } from "../../services/firebase-service";
import { useTranslations } from "use-intl";
import { getCookie, setCookie } from "@/services/cookie-service";
import { useAlertsProvider } from "@/context/alert_context";

function Content(){
    //#region Logic
    const [submited, setSubmited] = useState(false)
    const { addAlert } = useAlertsProvider();
    const t = useTranslations('PagesTitles');
    const fT = useTranslations('BasicForm')

    const [content, setContent] = useState({
        name:'',
        email:'',
        phoneNumber:'+1',
        companyName:'',
        anualSales: '',
        yearsInBussines:'',
        dealerLicense:'',
        explanation:'',
    });

    //#region validators
    const isNameWrong = (field) => {
        return field.length === 0
    }

    const isEmailWrong = (field) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return field === '' || !emailRegex.test(field)
    }

    const isPhoneWrong = (field) => {
        const phoneRegex = /^(?:\+?\d{1,4}[\s-]?)?(?:\(?\d{1,4}\)?[\s-]?)?\d{2,5}(?:[\s-]?\d{2,5}){1,2}$/;
        return field === '' || !phoneRegex.test(field)
    }

    const isCompanyWrong = (field) => {
        return field.length === 0
    }

    const isSalesWrong = (field) => {
        return field.length === 0
    }

    const isYearsWrong = (field) => {
        return field.length === 0
    }

    const isLicenseWrong = (field) => {
        return field.length === 0
    }

    const isDescriptionWrong = (field) => {
        return field.length === 0
    }

    const validateForm = () => {
        setSubmited(true)
        if(isNameWrong(content.name)) {
            addAlert('Check name field and try again', "warning",);
           return;
        }

        if(isEmailWrong(content.email)) {
            addAlert('Check email field and try again', "warning",);
            return; 
        }
        
        if(isCompanyWrong(content.companyName)) {
            addAlert('Check company name field and try again', "warning",)
            return; 
            
        }
        
        if(isPhoneWrong(content.phoneNumber)) {
            addAlert('Check phpne number field and try again', "warning",)
            return; 
        }
        
        if(isSalesWrong(content.anualSales)) {
            addAlert('Check annual sales field and try again', "warning",)
            return; 
        }
        
        if(isYearsWrong(content.yearsInBussines)) {
            addAlert('Check years in bussines field and try again', "warning",)
            return; 
        }
        
        if(isLicenseWrong(content.dealerLicense)) {
            addAlert('Check dealers license field and try again', "warning",)
            return; 
        }
        if(isDescriptionWrong(content.dealerLicense)) {
            addAlert('Check description field and try again', "warning",)
            return; 
        }
        
        setSubmited(false);

        if(!checkIfCookieNotExists()) {
            addAlert('You cannot submit more than one form in 15 minutes', "warning", 8)
            return;
        }

        pushDealersApplication(content);
        setContent({
            name:'',
            email:'',
            phoneNumber:'+1',
            companyName:'',
            anualSales: '',
            yearsInBussines:'',
            dealerLicense:'',
            explanation:'',
        })
        addAlert('Form submited successfully', "success", 8)
    }

    const checkIfCookieNotExists = () => {
        const res = getCookie('ht.DAExTi');
        console.log(res)
        //0.00645 = 15min
        if(res) {
            // console.log('cookie found')
            return false;
        }
        
        setCookie('ht.DAExTi', 'true', 15/1440 );
        // console.log('cookie not found')
        return true;
    }
    //#endregion

    //#region Display
    return(
        <div className="relative bg-white font-['Montserrat']">
            <div className="absolute w-full h-full bg-[url(/Images/form-background.webp)]
                bg-center bg-cover bg-no-repeat z-5 brightness-[0.35]
                contrast-[1.05]"></div>  
            <div className="relative z-20 flex flex-col text-left py-8 gap-4 w-[calc(100%-2rem)]
                mx-4 lg:max-w-(--breakpoint-md) lg:mx-auto">
                <div className="py-8 flex flex-col">
                    <h2 className="font-['Michroma'] font-bold font-bold text-[1.75rem] leading-10 flex items-center justify-start text-start w-full col-start-1 col-end-4 row-start-1 lg:text-[2rem] lg:leading-12 uppercase">{t('dealerApplication')}</h2>
                    <span className="">
                        {t('dealerApplicationSlogan')}
                    </span>
                </div>
                <div className="w-full flex flex-col items-center gap-2 mx-4 lg:m-0">
                    <span className="text-black w-full font-['Michroma'] font-bold uppercase text-[1rem] leading-[1.2rem] flex-none" >{fT('fullnameLabel')}</span>
                    <input value={content.name} role="form"  type="text" aria-label={fT('fullnamePlaceholder')} placeholder={fT('fullnamePlaceholderAlt')}
                    onChange={(e) => {setSubmited(false); setContent((prev) => ({...prev, name: e.target.value})) }} 
                    className={`border border-[#d5d5d5] rounded-[10px] bg-transparent w-full h-8 text-[1rem]
                        outline-hidden p-0 pl-[0.2rem] ${(isNameWrong(content.name) && submited) ? "border-red-600" : ""}`}
                    />
                </div>
                <div className="w-full flex flex-col items-center gap-2 mx-4 lg:m-0">
                    <span className="text-black w-full font-['Michroma'] font-bold uppercase text-[1rem] leading-[1.2rem] flex-none" >{fT('emailLabel')}</span>
                    <input value={content.email} type="email" role="form" aria-label={fT('emailPlaceholder')} placeholder={fT('emailPlaceholderAlt')}
                    onChange={(e) => {setSubmited(false); setContent((prev) => ({...prev, email: e.target.value})) }}
                    className={`border border-[#d5d5d5] rounded-[10px] bg-transparent w-full h-8 text-[1rem]
                        outline-hidden p-0 pl-[0.2rem] ${(isEmailWrong(content.email) && submited) ? "border-red-600" : ""}`} 
                    />
                </div>
                <div className="w-full flex flex-col items-center gap-2 mx-4 lg:m-0">
                    <span className="text-black w-full font-['Michroma'] font-bold uppercase text-[1rem] leading-[1.2rem] flex-none" >{fT('phoneLabel')}</span>
                    <input value={content.phoneNumber} role="form" aria-label={fT('phonePlaceholder')} placeholder={fT('phonePlaceholderAlt')}
                    onChange={(e) => {setSubmited(false); setContent((prev) => ({...prev, phoneNumber: e.target.value}))}} 
                    className={`border border-[#d5d5d5] rounded-[10px] bg-transparent w-full h-8 text-[1rem]
                        outline-hidden p-0 pl-[0.2rem] ${(isPhoneWrong(content.phoneNumber) && submited) ? "border-red-600" : ""}`}/>
                </div>
                <div className="w-full flex flex-col items-center gap-2 mx-4 lg:m-0">
                    <span className="text-black w-full font-['Michroma'] font-bold uppercase text-[1rem] leading-[1.2rem] flex-none" >{fT('companyNameLabel')}</span>
                    <input value={content.companyName} type="text" role="form"  aria-label={fT('companyNamePlaceholder')} placeholder={fT('companyNamePlaceholderAlt')}
                    onChange={(e) => {setSubmited(false); setContent((prev) => ({...prev, companyName: e.target.value}))}} 
                    className={`border border-[#d5d5d5] rounded-[10px] bg-transparent w-full h-8 text-[1rem]
                        outline-hidden p-0 pl-[0.2rem] ${(isCompanyWrong(content.companyName) && submited) ? "border-red-600" : ""}`}/>
                </div>
                <div className="w-full flex flex-col items-center gap-2 mx-4 lg:m-0">
                    <span className="text-black w-full font-['Michroma'] font-bold uppercase text-[1rem] leading-[1.2rem] flex-none" >{fT('annualSalesLabel')}</span>
                    <input value={content.anualSales} type="number" aria-label={fT('annualSalesPlaceholder')} placeholder={fT('annualSalesPlaceholderAlt')} role="form"  
                    onChange={(e) => {setSubmited(false); setContent((prev) => ({...prev, anualSales: e.target.value}))}}
                    className={`border border-[#d5d5d5] rounded-[10px] bg-transparent w-full h-8 text-[1rem]
                        outline-hidden p-0 pl-[0.2rem] ${(isSalesWrong(content.anualSales) && submited) ? "border-red-600" : ""}`}/>
                </div>
                <div className="w-full flex flex-col items-center gap-2 mx-4 lg:m-0">
                    <span className="text-black w-full font-['Michroma'] font-bold uppercase text-[1rem] leading-[1.2rem] flex-none" >{fT('yibLabel')}</span>
                    <input value={content.yearsInBussines} type="number" aria-label={fT('yibPlaceholder')} placeholder={fT('yibPlaceholderAlt')} role="form"  
                    onChange={(e) => {setSubmited(false); setContent((prev) => ({...prev, yearsInBussines: e.target.value}))}}
                    className={`border border-[#d5d5d5] rounded-[10px] bg-transparent w-full h-8 text-[1rem]
                        outline-hidden p-0 pl-[0.2rem] ${(isYearsWrong(content.yearsInBussines) && submited) ? "border-red-600" : ""}`}/>
                </div>
                <div className="w-full flex flex-col items-center gap-2 mx-4 lg:m-0">
                    <span className="text-black w-full font-['Michroma'] font-bold uppercase text-[1rem] leading-[1.2rem] flex-none" >{fT('dealerlicenseLabel')}</span>
                    <input value={content.dealerLicense} type="text" aria-label={fT('dealerlicensePlaceholder')} placeholder={fT('dealerlicensePlaceholderAlt')} role="form"  
                    onChange={(e) => {setSubmited(false); setContent((prev) => ({...prev, dealerLicense: e.target.value}))}} 
                    className={`border border-[#d5d5d5] rounded-[10px] bg-transparent w-full h-8 text-[1rem]
                        outline-hidden p-0 pl-[0.2rem] ${(isLicenseWrong(content.dealerLicense) && submited) ? "border-red-600" : ""}`}/>
                </div>
                <div className="w-full flex flex-col items-center gap-2 mx-4 lg:m-0">
                    <span className="text-black w-full font-['Michroma'] font-bold uppercase text-[1rem] leading-[1.2rem] flex-none" >{fT('explanationwywlbhdLabel')}</span>
                    <textarea value={content.explanation} aria-label={fT('explanationwywlbhdPlaceholder')} placeholder={fT('explanationwywlbhdPlaceholderAlt')} role="form" 
                    onChange={(e) =>{setSubmited(false); setContent((prev) => ({...prev, explanation: e.target.value}))}}
                    className={`border border-[#d5d5d5] rounded-[10px] bg-transparent w-full h-8 text-[1rem] min-h-32
                        outline-hidden p-0 pl-[0.2rem] ${(isDescriptionWrong(content.explanation) && submited) ? "border-red-600" : ""}`}/>
                </div>
                <div className="w-full flex flex-col items-center gap-2 mx-4 lg:m-0">
                    <span className="text-black w-full font-['Michroma'] font-bold uppercase text-[1rem] leading-[1.2rem] flex-none"> </span>
                    <button onClick={() => validateForm()} className="text-[1rem] cursor-pointer uppercase
                    relative mt-5 text-white border-none bg-primary-color select-none rounded-[10px]
                    py-2 px-4 pointer-events-auto lg:px-10 lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium">{fT('send')}</button>
                </div>

            </div>
        </div>
    )
}
//#endregion
export default Content