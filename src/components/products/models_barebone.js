import React, {Fragment, useEffect, useState} from 'react';
import ImageViewer from '../general/image_viewer';

function ModelsBarebone() {

    //#region view
    return (
        <div className="w-full flex gap-2 flex-col justify-around items-center relative
            overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]
            bg-[radial-gradient(circle,rgba(55,62,62,0)_50%,rgba(55,62,62,0.03)_74%,rgba(55,62,62,0.06)_100%)]"
        >
            <div className="h-full w-full flex flex-col p-1 animate-barebone-pulse">

                <div className="aspect-16/10 w-full object-fill flex items-center justify-center">
                    <ImageViewer
                        className="h-4/5 " 
                        src={undefined} 
                        shadowColor="rgba(119,120,123,0.3)"
                        // category={category.toLowerCase().replace(' ', '')}
                        alt={`trailer shadow-sm`}
                    />
                </div>

                <div className="flex items-center justify-end mx-4">
                    <div 
                        className={`uppercase font-semibold text-[#77787b] flex gap-1 items-center mb-1
                        justify-center w-26 bg-[rgba(119,120,123,0.3)] rounded-[10px] h-6 `}
                    >
                    </div>
                </div>
                <div className="mx-2 w-[calc(100%-1rem)] font-bold text-[1.5rem]
                max-w-full line-clamp-2 bg-[rgba(119,120,123,0.3)] text-transparent h-22 rounded-[10px] ">
                </div>
                <div className="w-[calc(100%-2rem)] mt-1 h-6 text-black font-bold mx-4 mb-2 bg-[rgba(119,120,123,0.3)]  rounded-[10px]">
                </div>
                <div className="my-2 mx-1 w-[calc(100%-1rem)] h-[3px] bg-[#77787b] flex-none self-center"></div>
                <div className="mx-3 w-[calc(100%-2rem)] flex gap-2 flex-col justify-center items-center text-[rgba(119,120,123,0.3)] ">
                    {
                        (new Array(5).fill('-')).map((item, index) => (
                            <div key={`bareboneVariable_${index}`} className="flex flex-col w-full min-h-[2.2rem] gap-1">
                                <div className="w-full flex justify-start items-center uppercase font-semibold bg-[rgba(119,120,123,0.3)] rounded-[10px] h-6 ">
                                </div>
                                <div className="w-full flex justify-start items-center text-black uppercase font-bold m-0 bg-[rgba(119,120,123,0.3)] rounded-[10px] h-6 ">
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <button className="font-['Michroma'] text-[1.5rem] text-white bg-primary-color w-full h-11
            flex items-center justify-center border-none uppercase animate-barebone-pulse">
               
            </button>
        </div>
    );
    //#endregion
}
export default ModelsBarebone