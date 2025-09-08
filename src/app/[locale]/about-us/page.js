import React from "react";
import AboutHorizon from "@/components/about-us/about_horizon";
import OurValues from "@/components/about-us/our_values";
import MissionAndVision from "@/components/about-us/mission_and_vision";
import Header from "@/components/dealer-application/header";

function WhyHorizon() {
    
    return (
        <>
            <Header/>
            <AboutHorizon/>
            <MissionAndVision/>
            <OurValues/>
        </>
    );
}

export default WhyHorizon;