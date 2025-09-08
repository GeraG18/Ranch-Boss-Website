import React from "react";
import OwnersManuals from "@/components/owners-manual/owners_manuals";
import OwnersHeader from "@/components/owners-manual/owners_header";
// import Seo from '@/components/seo/seo';
import HelpCenterBar from "@/components/owners-manual/help_center_bar";
import PrivacyNotice from "@/components/start-warranty-claim/privacy_notice";

function OwnersManual(){
    return(
        <>
            <OwnersHeader/>
            <HelpCenterBar/>
            <OwnersManuals/>
            <PrivacyNotice/>
        </>
    );
};

export default OwnersManual