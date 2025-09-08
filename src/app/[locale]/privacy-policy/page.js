import React from "react";
import BodyContainer from "@/components/privacy-policy/body_container";
import PrivacyHeader from "@/components/privacy-policy/privacy_header";
import CallOrChat from "@/components/general/call_or_chat"
// import Seo from "../components/seo/seo";

const PrivacyPolicy = () => {
    return(
        <>
            <PrivacyHeader/>
            <BodyContainer/>
            <CallOrChat/>
        </>
    );
}

export default PrivacyPolicy;