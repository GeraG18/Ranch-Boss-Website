'use client' // Error boundaries must be Client Components
import { useEffect } from 'react'
import ErrorCatchHeader from '@/components/error-catch/error_catch_header'
import NavBar from "@/components/general/nav_bar";
import PageSpacer from "@/components/general/page_spacer";
import FooterContainer from "@/components/general/footer_container";
import { useOSDetector } from "@/hooks/os_detector/os_detector";
import { pushErrorTicket } from '@/services/firebase-service';
 
export default function Error( { error, reset = () => {} } ) {

    const { os, userAgent, platform } = useOSDetector();

    const onClickManage = () => {
        reset();
    }

    useEffect(() => {
        if(!error) return;

        let outputColor = "color:#f43c3c; border:1px solid #f43c3c; border-radius:5px; background-color:black; padding: 0.5rem;"
        console.log(`%cERROR: ${error}`, outputColor);

        pushErrorTicket({ code: error, os, userAgent, platform });
    }, [error]);
    
    return (
        <>
            <NavBar/>
            <PageSpacer/>
            <ErrorCatchHeader onButtonClick={() => { onClickManage(); }}/>
            <FooterContainer/>
        </>    
    );
}