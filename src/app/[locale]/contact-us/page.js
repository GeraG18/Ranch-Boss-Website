'use client' // Renders on client side
import ContactDealersGrid from "@/components/contact-us/contact_dealers_grid";
import ContactHeader from "@/components/contact-us/contact_header";
import ContactLocations from "@/components/contact-us/contact_locations";
import YourContactDetails from "@/components/contact_to_dealer/your_contact_details";
import YourMessage from "@/components/contact_to_dealer/your_message";
import CallOrChat from "@/components/general/call_or_chat";
import { useAlertsProvider } from "@/context/alert_context";
import { pushContactForm } from "@/services/firebase-service";
import Link from "next/link";
import React, { useState } from "react";
import MailCheckIcon from "@/components/icons/mail_check_icon"
import IgIcon from "@/components/icons/ig_icon";
import YtIcon from "@/components/icons/yt_icon";
import PtIcon from "@/components/icons/pt_icon";
import FbIcon from "@/components/icons/fb_icon";
import TkIcon from "@/components/icons/tk_icon";
import XIcon from "@/components/icons/x_icon";
import LnIcon from "@/components/icons/ln_icon";
import { useTranslations } from "next-intl";


const ContactUs = () => {

    const { addAlert } = useAlertsProvider();
    const fT = useTranslations('BasicForm')
    const [formSended, setFormSended] = useState(false);
    const [form, setForm] = useState({
        message:"",
        subject:"",
        firstName: "",
        lastName:"",
        email:"",
        phoneNumber:""
    })

    const isFirstNameValid = (value) => ( String(value).trim().match(/^([a-zA-Zà-úÀ-Ú]{2,})+$/g));
    const isLastNameValid = (value) => ( String(value).trim().match(/^([a-zA-Zà-úÀ-Ú\s]{2,})+$/g));
    const isEmailValid = (value) => ( String(value).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) );
    const isPhoneValid = (value) => ( String(value).match(/^(?:\+?\d{1,4}[\s-]?)?(?:\(?\d{1,4}\)?[\s-]?)?\d{2,5}(?:[\s-]?\d{2,5}){1,2}$/) );

    const isFormEmpty = () => {
        return form.message === "" && form.firstName === "" && form.lastName === "" && form.email === "" && form.phoneNumber === ""
    }

    const sendForm = () => {
        if(!isFirstNameValid(form.firstName)) {
            addAlert('Add a valid first name', "warning")
            return;
        }
        if(!isLastNameValid(form.lastName)) {
            addAlert('Add a valid last name', "warning")
            return;
        }
        if(!isEmailValid(form.email)) {
            addAlert('Add a valid email', "warning")
            return;
        }
        if(!isPhoneValid(form.phoneNumber)) {
            addAlert('Add a valid phone number', "warning")
            return;
        }
        if((form.subject.trim()).length <= 0) {
            addAlert('Add a subject', "warning")
            return;
        }
        if((form.message.trim()).length <= 0) {
            addAlert('Add a message', "warning")
            return;
        }
        
        pushContactForm(form)
        setForm({
            message:"",
            subject:"",
            firstName: "",
            lastName:"",
            email:"",
            phoneNumber:""
        })
        setFormSended(true)
        // addAlert('Message sended, wait for our response soon', "info")
    }

    return(
        <>
            <ContactHeader/>
            <div className="relative">
            
                <div className={`absolute h-full py-4  font-['Montserrat'] w-full flex flex-col items-center justify-center motion-safe:transition-all 
                    motion-reduce:transition-none will-change-auto motion-safe:duration-300
                    bg-white ${formSended ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                    <div className="mx-4 max-w-(--breakpoint-md) xl:mx-auto border border-[#d5d5d5] rounded-[10px] flex flex-col items-center justify-center overflow-hidden p-4">
                        <MailCheckIcon width="56" height="56" className="text-primary-color w-20 aspect-square"/>
                        <h1 className="font-['Michroma'] font-bold text-[1.75rem] leading-10 flex items-center justify-start text-start w-full col-start-1 col-end-4 row-start-1 lg:text-[2rem] lg:leading-12 uppercase">{fT('submittedTitle')}</h1>
                        <h2 className="mb-2">
                            {fT('submittedSubtitle')}
                        </h2>
                        <p className="text-center p-0 m-0">
                            {
                                fT.rich('submittedDescription', {
                                    products: (chunks) => <Link className="text-black font-semibold" href="/products">{chunks}</Link>,
                                })
                            }
                        </p>
                        <div className="flex flex-wrap items-center gap-4 py-6">
                            <Link href="https://www.instagram.com/horizon.trailers/" target="_blank" rel="noreferrer"
                            className="text-[#686868] lg:hover:text-primary-color
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400 
                            ">
                                <span style={{display:'none'}}>Horizon Trailers Instagram</span>
                                <IgIcon width="24" height="24"/>
                            </Link>
                            <Link href="https://www.youtube.com/@horizontrailersllc/featured" target="_blank" rel="noreferrer"
                            className="text-[#686868] lg:hover:text-primary-color
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400 
                            ">
                                <span style={{display:'none'}}>Horizon Trailers Youtube</span>
                                <YtIcon width="24" height="24"/>
                            </Link>
                            <Link href="https://www.pinterest.com/horizontrailers/" target="_blank" rel="noreferrer"
                            className="text-[#686868] lg:hover:text-primary-color
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400 
                            ">
                                <span style={{display:'none'}}>Horizon Trailers Pinterest</span>
                                <PtIcon width="24" height="24"/>
                            </Link>
                            <Link href="https://www.facebook.com/share/xGgkJp4tvgRY1H2c/?mibextid=qi2Omg" target="_blank" rel="noreferrer"
                            className="text-[#686868] lg:hover:text-primary-color
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400 
                            ">
                                <span style={{display:'none'}}>Horizon Trailers Facebook</span>
                                <FbIcon width="24" height="24"/>
                            </Link>
                            <Link href="https://www.tiktok.com/@horizontrailersllc?_t=8pnkZFFGbLB&_r=1" target="_blank" rel="noreferrer"
                            className="text-[#686868] lg:hover:text-primary-color
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400 
                            ">
                                <span style={{display:'none'}}>Horizon Trailers Tiktok</span>
                                <TkIcon width="24" height="24"/>
                            </Link>
                            <Link href="https://www.x.com/TrailersHorizon" target="_blank" rel="noreferrer"
                            className="text-[#686868] lg:hover:text-primary-color
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400 
                            ">
                                <span style={{display:'none'}}>Horizon Trailers X</span>
                                <XIcon width="24" height="24"/>
                            </Link>
                            <Link href="https://www.linkedin.com/company/horizontrailers" target="_blank" rel="noreferrer"
                            className="text-[#686868] lg:hover:text-primary-color
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-400 
                            ">
                                <span style={{display:'none'}}>Horizon Trailers LinkedIn</span>
                                <LnIcon width="24" height="24"/>
                            </Link>
                        </div>
                        <span>{fT('horizonTTeam')}</span>
                    </div>
                </div>
                <YourContactDetails contactName={fT('ourTeam')} showSubject={true} values={form} returnValue={(e) => {setForm((prev) => ({...prev,
                    subject: e.subject,
                    firstName: e.firstName,
                    lastName:e.lastName,
                    email:e.email,
                    phoneNumber:e.phoneNumber}))
                }} clearedValue={isFormEmpty()}/>
                <YourMessage value={form.message} returnValue={(e) => {setForm((prev) => ({...prev, message: e}))}} clearedValue={isFormEmpty()}/>
                <button onClick={() => sendForm()} className="w-[calc(100%-2rem)] my-8 mx-4 bg-primary-color text-white cursor-pointer flex
                    items-center justify-center gap-2 height-[2.75rem] rounded-[10px] uppercase text-[1rem] lg:w-40 lg:mx-auto
                    lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium font-['Montserrat'] py-[0.45rem] px-4">
                    {fT('send')}
                </button>
            </div>

            <ContactLocations/>
            {/* <ContactDealersGrid/> */}
            <CallOrChat/>
        </>
    )
}

export default ContactUs