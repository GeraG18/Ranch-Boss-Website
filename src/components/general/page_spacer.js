// 'use client' // Renders on client side
import React from "react";

const PageSpacer = ({showingTopbar}) => {

    //#region view
    return (
        <div style={{height:`calc(${showingTopbar === true ? '2.30rem' : '0px'} + 6.5rem)`,}} className="w-full"></div>
    );
    //#endregion
}

export default PageSpacer;