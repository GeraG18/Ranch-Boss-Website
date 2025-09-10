'use client' // Renders on client side
import React from "react";

function WarrantyClaimForm(){
    return(
        <div className="h-[80vh] flex my-8 mx-4 max-w-screen-lg  z-100 lg:mx-auto">
            <iframe src="https://forms.monday.com/forms/embed/03baf0e8db9177ae59954716ee5a6127?r=use1" 
            style={{border: 0, boxShadow: "5px 5px 56px 0px rgba(0,0,0,0.25)", width:"100%", height:"90%",}}></iframe> 
        </div>
    );
};

export default WarrantyClaimForm