import React, { useEffect, useState } from "react";
import YourContactDetails from "../contact_to_dealer/your_contact_details";
import YourMessage from "../contact_to_dealer/your_message";
import { useAlertsProvider } from "../../context/alert_context";
import Attachment from "./attachment";
import { fetchRequestModel } from '../../services/firebase-service'
import { useTranslations } from "next-intl";

const RequestModelDialog = ({ showModal = false, product, pdf, dispose = () => {} }) => {
    
    //#region code
    const { addAlert } = useAlertsProvider();
    const fT = useTranslations('BasicForm')
    const [form, setForm] = useState({
        firstName: "",
        lastName:"",
        email:"",
        phoneNumber:"",
        message:"",
        attachment:"",
        model:""
    })

//     "email": "geraga.ht@gmail.com",
//   "firstName": "Gerardo",
//   "lastName": "Gallegos",
//   "message": "Hello World! This is a test.",
//   "phoneNumber": "+523698741225",
//   "model":"HZ5",
//   "attachment":

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
        if((form.message.trim()).length <= 0) {
            addAlert('Add a message', "warning")
            return;
        }
        if((form.attachment.trim()).length <= 0) {
            addAlert('The attachment is not loaded yet', "warning")
            return;
        }
        
        fetchRequestModel(form, (res, err) => {
            if(res) {
                setForm({
                    firstName: "",
                    lastName:"",
                    email:"",
                    phoneNumber:"",
                    message:"",
                    attachment:"",
                    model:""
                });
                addAlert('Request sended, wait for our response soon', "info");
                dispose();
            }
            
            if(err) {
                addAlert("Can't send the request. Please try later.", "error");
            }
        }) 
    }

    useEffect(() => {
        setForm((prev) => ({...prev, model:product.name || ''}))
    }, [product])

    useEffect(() => {
        setForm((prev) => ({...prev, attachment:pdf}))
    }, [pdf])

    useEffect(() => {
        document.body.style.overflowY = showModal ? 'hidden' : 'auto';
    }, [showModal])
    //#endregion

    //#region view
    return (
        <div className={`w-full h-full fixed left-0 top-0 bg-black/50 backdrop-saturate-50 backdrop-blur-md z-9999
            flex items-center justify-center font-['Montserrat'] select-none motion-safe:transition-all motion-reduce:transition-none 
            will-change-auto motion-safe:duration-400 ${showModal ? "opacity-100! pointer-events-auto" : "opacity-0 pointer-events-none"}`} 
            style={{opacity:0}} 
            onClick={() => {dispose()}}
        >
            <div className={`overflow-hidden motion-safe:transition-all motion-reduce:transition-none max-h-[90vh]
            will-change-auto motion-safe:duration-500 relative w-[95%] h-fit grid grid-rows-[15%_85%] 
            bg-white text-black rounded-[10px] p-0 md:w-[90%] lg:w-[40vw]
            ${showModal ? "translate-y-0" : "translate-y-[10%]"}`} 
                onClick={(e) => e.stopPropagation()}>
                <span className="min-h-full uppercase text-[1.4rem] flex flex-col items-start px-4 pr-12 justify-center shadow-[0_10px_25px_-12px_rgba(0,0,0,0.15)]
                z-5 overflow-y-auto">
                    {fT('requestModel',{count: product?.name ? product?.name.length : 0, model: product?.name})}
                    <span className="absolute right-6 z-15 cursor-pointer  material-icons notranslate  motion-safe:transition-all motion-reduce:transition-none 
                    will-change-auto motion-safe:duration-500 lg:hover:text-primary-color" onClick={() => {dispose()}}>
                        close
                    </span>
                </span>
                <div className="p-4 block flex-col gap-4 justify-start items-center overflow-x-hidden overflow-y-auto">
                    <div style={{height:'1rem', width:'100%'}}></div>
                    <YourContactDetails contactName="" showSubject={false} values={form} returnValue={(e) => {setForm((prev) => ({...prev, 
                        subject: e.subject,
                        firstName: e.firstName,
                        lastName:e.lastName,
                        email:e.email,
                        phoneNumber:e.phoneNumber}))
                    }} clearedValue={isFormEmpty()}/>
                    <div className="font-['Montserrat'] mt-6 lg:mx-4 max-w-(--breakpoint-xl) xl:mx-auto">
                        <YourMessage value={form.message} returnValue={(e) => {setForm((prev) => ({...prev, message: e}))}} clearedValue={isFormEmpty()}/>
                    </div>

                    <Attachment attachmentFile={pdf}/>

                    <button onClick={() => sendForm()} className="w-[calc(100%-2rem)] m-4 bg-primary-color text-white cursor-pointer flex items-center
                    justify-center border-none gap-2 h-11 rounded-[10px] uppercase motion-safe:transition-all motion-reduce:transition-none 
                    will-change-auto motion-safe:duration-500 text-[1rem] lg:w-40 lg:mx-auto lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium">
                        {fT('send')}
                    </button>
                </div>
            </div>
        </div>
    );
    //#endregion 
}

export default RequestModelDialog;
