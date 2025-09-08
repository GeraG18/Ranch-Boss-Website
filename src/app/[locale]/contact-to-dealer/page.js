'use client' // Renders on client side
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAlertsProvider } from "@/context/alert_context";
import YourContactDetails from "@/components/contact_to_dealer/your_contact_details";
import YourMessage from "@/components/contact_to_dealer/your_message";
import { deleteLocalStorage, getLocalStorage } from "@/services/local_storage-service";
import {pushContactDealer} from "@/services/firebase-service"
import { useTranslations } from "next-intl";
const ContactToDealer = () => {

    //#region code
    const router = useRouter();
    const { addAlert } = useAlertsProvider();
    const fT = useTranslations('BasicForm')
    const [form, setForm] = useState({
        message:"",
        firstName: "",
        lastName:"",
        email:"",
        phoneNumber:""
    });
    const [dealerInfo, setDealerInfo] = useState({});

    const isFirstNameValid = (value) => ( String(value).trim().match(/^([a-zA-Zà-úÀ-Ú]{2,})+$/g));
    const isLastNameValid = (value) => ( String(value).trim().match(/^([a-zA-Zà-úÀ-Ú\s]{2,})+$/g));
    const isEmailValid = (value) => ( String(value).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) );
    const isPhoneValid = (value) => ( String(value).match(/^(?:\+?\d{1,4}[\s-]?)?(?:\(?\d{1,4}\)?[\s-]?)?\d{2,5}(?:[\s-]?\d{2,5}){1,2}$/) );

    const isFormEmpty = () => {
        return form.message === "" && form.firstName === "" && form.lastName === "" && form.email === "" && form.phoneNumber === ""
    }

    const sendForm = () => {
        if((form.message.trim()).length <= 0) {
            addAlert('Add a message', "warning")
            return;
        }
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
        
        let objToSend = {client: form, dealer: dealerInfo};
        
        pushContactDealer(objToSend);
        setForm({
            message:"",
            firstName: "",
            lastName:"",
            email:"",
            phoneNumber:""
        });
        removeLsDealerInfo();
        router.push("/find-a-dealer")
        addAlert("Message sended, wait for dealer's response soon", "info", 6)
    }

    const removeLsDealerInfo = () => {
        // localStorage.removeItem('ht.dealerContactInfo')
        deleteLocalStorage("ht.dealer_contact_info")
    }

    useEffect(() => {
        let dealerLS = getLocalStorage("ht.dealer_contact_info", null)
        
        setDealerInfo(dealerLS)
    }, [])

    //#region view

    if(dealerInfo === null) router.push('/not-found')

    return(
        <>
            {/* <h2 className={css(styles.title)}>Send message to dealer "{dealerInfo.name}"</h2> */}
            <YourContactDetails contactName={dealerInfo?.name} values={form} returnValue={(e) => {setForm((prev) => ({...prev, 
                firstName: e?.firstName,
                lastName:e?.lastName,
                email:e?.email,
                phoneNumber:e?.phoneNumber}))
                }
            } clearedValue={isFormEmpty()}/>
            <YourMessage value={form.message} returnValue={(e) => {setForm((prev) => ({...prev, message: e}))}} clearedValue={isFormEmpty()}/>
            <button onClick={() => sendForm()} 
                className="w-[calc(100%-2rem)] my-8 mx-4 bg-primary-color text-white cursor-pointer flex
                items-center justify-center gap-2 height-[2.75rem] rounded-[10px] uppercase text-[1rem] lg:w-48 lg:mx-auto
                lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium font-['Montserrat'] py-[0.45rem] px-4">
                {fT('sendMessage')}
            </button>
        </>
    )
}

export default ContactToDealer