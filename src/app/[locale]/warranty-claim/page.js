import React from "react";
import Header from "@/components/start-warranty-claim/header";
import WarrantyClaimForm from "@/components/start-warranty-claim/warranty-claim-form";
import HelpCenterBar from "@/components/owners-manual/help_center_bar";
import PrivacyNotice from "@/components/start-warranty-claim/privacy_notice";

function StartWarrantyClaim(){

    //#region view
    return(
        <>
            <Header/>
            <HelpCenterBar/>
            <WarrantyClaimForm/>
            <PrivacyNotice/>
        </>
    );
};

export default StartWarrantyClaim