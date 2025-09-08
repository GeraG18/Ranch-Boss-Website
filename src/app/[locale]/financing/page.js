'use client' // Renders on client side
import React, { Suspense, useEffect, useState } from "react";
import OurFinancers from "@/components/financing/our_financers";
import FinancingHeader from "@/components/financing/header";

function Financing (){
    //#region view
    return(
        <Suspense>
            <FinancingHeader/>
            <OurFinancers/>
        </Suspense>
    );
    //#endregion
};

export default Financing