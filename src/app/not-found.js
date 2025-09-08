import React from "react";
import NavBar from "@/components/general/nav_bar";
import PageSpacer from "@/components/general/page_spacer";
import NotFoundHeader from "@/components/not-found/not_found_header";
import FooterContainer from "@/components/general/footer_container";

const NotFound = () => {
    // Explains by itself
    return (
        <>
            <NavBar/>
            <PageSpacer/>
            <NotFoundHeader/>
            <FooterContainer/>
        </>
    );
}

export default NotFound;