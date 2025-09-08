import React,{useState,useEffect, Fragment} from "react";

function TestimonialsItem({numStars, comment, profImage, name, job, alt}){

    //#region view
    return (
        <div className="grid grid-rows-[auto_1fr_auto] gap-4 bg-[#2a2a2a] mx-4 h-80 rounded-xl py-6 px-6">
            <div className="material-icons notranslate  text-[#f9a203] text-left flex text-[1.2rem] flex-row w-full">
                { [...Array(numStars)].map((item, index) => <Fragment key={index}>star </Fragment>) }
            </div>
            <div className="overflow-y-auto font-['Montserrat'] text-[1rem] font-semibold text-left text-[#d6d6d6] w-full h-full">{comment}</div>
            <div className="w-full h-auto grid grid-cols-[3rem_1fr] gap-4 flex-row flex-none max-w-full overflow-hidden">
                <img className="flex flex-col h-12 aspect-square" src={profImage} alt="horizon trailers img"/>
                <div className="w-full flex flex-col max-w-full">
                    <span className="max-w-full font-['Montserrat'] font-semibold m-0 flex text-white break-words order-2 overflow-hidden p uppercase">{name}</span>
                    <span className="max-w-full font-['Montserrat'] text-[#d6d6d6] order-3 self-start overflow-hidden text-ellipsis whitespace-nowrap uppercase">{job}</span>
                </div>
            </div>
        </div>
    );
    //#endregion
}

export default TestimonialsItem