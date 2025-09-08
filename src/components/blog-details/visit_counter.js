'use client' // Renders on client side
import React, { useEffect } from "react";

const { addVisitorToBlog } = require("@/services/firebase-service");

const VisitCounter = ({slug}) => {

    useEffect(() => {
        addVisitorToBlog(slug);
    }, [])
    return(<></>)    
}

export default VisitCounter;