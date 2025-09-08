import HelpCenterBar from "@/components/owners-manual/help_center_bar";
import PrivacyNotice from "@/components/start-warranty-claim/privacy_notice";
import WarrantyDocsHeader from "@/components/warranty-docs/warranty_docs_header";
import WarrantyDocuments from "@/components/warranty-docs/warranty_documents";
import React from "react";
function WarrantyDocs (){
    return(
        <>
            <WarrantyDocsHeader/>
            <HelpCenterBar/>
            <WarrantyDocuments/>
            <PrivacyNotice/>
        </>
    );
};

export default WarrantyDocs