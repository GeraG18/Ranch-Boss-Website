import { useTranslations } from "next-intl";
import React from "react";

const NotesBlock = ({notes}) => {
    const t = useTranslations('PagesTitles')
    return(
        <>
            {/* <div className="w-full h-36 flex flex-col items-center justify-center mb-4">
                <div className="bg-white -mt-[4rem] flex gap-6 flex-col p-6 justify-center items-center lg:gap-0 mx-4 max-w-screen-lg h-fit z-80
                    lg:w-full lg:mx-auto shadow-md mb-4">
                    <div className="flex m-4 w-full lg:mx-auto max-w-screen-lg flex-col gap-1 items-center justify-center">
                        <div className="w-full h-0.5 bg-secondary-color"></div>
                        <div className="w-3/4 h-0.5 bg-secondary-color"></div>
                    </div>
                    <div style={{wordWrap: "break-word",}} className="font-['lora'] font-semibold text-[1rem] text-center flex items-center self-center justify-self-center m-0">
                        {notes}
                    </div>
                    <div className="flex m-4 w-full lg:mx-auto max-w-screen-lg flex-col gap-1 items-center justify-center">
                        <div className="w-3/4 h-0.5 bg-secondary-color"></div>
                        <div className="w-full h-0.5 bg-secondary-color"></div>
                    </div>
                </div>
            </div> */}
            <div className={`bg-primary-color py-4 font-['lora'] text-white ${notes ? "block" : "hidden"}`}>
                    <div className="relative z-20 flex flex-col text-left w-[calc(100%-2rem)] mx-4 max-w-screen-lg  lg:mx-auto
                    min-h-12 *bg-[rgba(202,138,4,0.125)]">
                        <div className="m-4 flex gap-4">
                            <span className="material-symbols-outlined notranslate " >
                                warning_amber
                            </span>
                            <div>
                                <div className="flex flex-col">
                                    <span className="font-['lora'] font-medium text-[2.25rem] 
                                    leading-8 flex items-center justify-start uppercase">{t('notes')}:</span>
                                </div>
                                <p className="m-0 p-0">
                                    {notes}
                                </p>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default NotesBlock;