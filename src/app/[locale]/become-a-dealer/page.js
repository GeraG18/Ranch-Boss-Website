'use client' // Renders on client side
import Content from "@/components/dealer-application/content";
import Header from "@/components/dealer-application/header";
import React from "react";
 
function DealerApplication(){

    return(
        <>
            <Header/>
            <Content/>
            {/* title="Horizon Trailers - Welcome to Horizon Website", description, ogImage = "/og-banner.png", twImage="/tw-banner.png", type="website", */}
            {/* <Seo
                title="Dealer Application | Horizon Trailers"
                description="Become a Horizon Trailers dealer and grow your business with high-quality, durable trailers. Our dealer application process is simple and designed to help you succeed. Join our trusted network and provide customers with reliable dump, equipment, roll-off, and gooseneck trailers."
            /> */}
        </>
    );
};

export default DealerApplication