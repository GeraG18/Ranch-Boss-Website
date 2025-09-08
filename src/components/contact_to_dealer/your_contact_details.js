'use client' // Renders on client side
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

function YourContactDetails ({contactName="", showSubject = false, values = {firstName:"", lastName: "", email:"", phoneNumber:"", subject: ""}, clearedValue = false ,returnValue = (formData) => {}}){
    
    //#region code
    const [form, setForm] = useState(values);
    const fT = useTranslations('BasicForm')

    useEffect(() => {
        setForm(values)
    }, [clearedValue]);

    useEffect(() => {
        returnValue(form)
    }, [form])

    //#region view
    return(
        <div className="mx-4 max-w-(--breakpoint-xl) xl:mx-auto font-['Montserrat']">
            {
                contactName.length !== 0 &&
                <div className="py-8 flex flex-col">
                    <h1 className="font-['Michroma'] font-bold text-[1.75rem] leading-10 flex items-center justify-start text-start w-full col-start-1 col-end-4 row-start-1 lg:text-[2rem] lg:leading-12 uppercase">{fT('contactTo', {name: contactName})}</h1>
                    {
                        contactName === fT('ourTeam') &&
                        <h2 className="">
                            {fT('forWarrantyAndMore')}
                        </h2>
                    }
                </div>
            }
            <div className="text-[1rem] flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:mx-auto lg:max-w-(--breakpoint-md)">
                <div className="flex flex-initial flex-col gap-2 w-full lg:w-[calc(50%-0.5rem)]">
                    <span className=" text-black w-full font-['Michroma'] uppercase 
                    text-[1rem] font-bold leading-[1.2rem] flex-none">{fT('nameLabel')}</span>
                    <input placeholder={fT('namePlaceholderAlt')} aria-label={fT('namePlaceholder')} role="form" 
                        className="border border-[#d5d5d5] text-[1rem] bg-transparent w-full h-8 rounded-[10px]
                        outline-hidden p-0 pl-[0.2rem] inputForm" 
                        value={form.firstName} onChange={(e) => setForm((prev) => ({...prev, firstName:e.target.value}))}/>
                </div>
                <div className="flex flex-initial flex-col gap-2 w-full lg:w-[calc(50%-0.5rem)]">
                    <span className=" text-black w-full font-['Michroma'] uppercase 
                    text-[1rem] font-bold leading-[1.2rem] flex-none">{fT('lastnameLabel')}</span>
                    <input placeholder={fT('lastnamePlaceholderAlt')} aria-label={fT('lastnamePlaceholder')} role="form" 
                    className="border border-[#d5d5d5] text-[1rem] bg-transparent w-full h-8 rounded-[10px]
                        outline-hidden p-0 pl-[0.2rem] inputForm"
                    value={form.lastName} onChange={(e) => setForm((prev) => ({...prev, lastName:e.target.value}))}/>
                </div>
                <div className="flex flex-initial flex-col gap-2 w-full lg:w-[calc(50%-0.5rem)]">
                    <span className=" text-black w-full font-['Michroma'] uppercase 
                    text-[1rem] font-bold leading-[1.2rem] flex-none">{fT('emailLabel')}</span>
                    <input placeholder={fT('emailPlaceholderAlt')} aria-label={fT('emailPlaceholder')} role="form"  
                    className="border border-[#d5d5d5] text-[1rem] bg-transparent w-full h-8 rounded-[10px]
                        outline-hidden p-0 pl-[0.2rem] inputForm"
                    value={form.email} onChange={(e) => setForm((prev) => ({...prev, email:e.target.value}))}/>
                </div>
                <div className="flex flex-initial flex-col gap-2 w-full lg:w-[calc(50%-0.5rem)]">
                    <span className=" text-black w-full font-['Michroma'] uppercase 
                    text-[1rem] font-bold leading-[1.2rem] flex-none">{fT('phoneLabel')}</span>
                    <input placeholder={fT('phonePlaceholderAlt')} aria-label={fT('phonePlaceholder')} role="form"  
                    className="border border-[#d5d5d5] text-[1rem] bg-transparent w-full h-8 rounded-[10px]
                        outline-hidden p-0 pl-[0.2rem] inputForm"
                    value={form.phoneNumber} onChange={(e) => setForm((prev) => ({...prev, phoneNumber:e.target.value}))}/>
                </div>
                {
                    showSubject &&
                    <div className="flex flex-initial flex-col gap-2 w-full lg:w-[calc(50%-0.5rem)]">
                        <span className=" text-black w-full font-['Michroma'] uppercase 
                        text-[1rem] font-bold leading-[1.2rem] flex-none">{fT('subjectLabel')}</span>
                        <input  placeholder={fT('subjectPlaceholderAlt')} aria-label={fT('subjectPlaceholder')} role="form"  
                        className="border border-[#d5d5d5] text-[1rem] bg-transparent w-full h-8 rounded-[10px]
                            outline-hidden p-0 pl-[0.2rem] inputForm"
                        value={form.subject} onChange={(e) => setForm((prev) => ({...prev, subject:e.target.value}))}/>
                    </div>
                }
            </div>
        </div>
    );
    //#endregion
}

export default YourContactDetails