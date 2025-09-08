import { useTranslations } from "next-intl";
import React from "react";

const NotesBlock = ({notes}) => {
    const t = useTranslations('PagesTitles')
    return(
        <div className={`bg-[#181818] py-4 font-['Montserrat'] text-white ${notes ? "block" : "hidden"}`}>
                <div className="relative z-20 flex flex-col text-left w-[calc(100%-2rem)] mx-4 max-w-(--breakpoint-xl) lg:mx-auto
                rounded-[10px] min-h-12 *bg-[rgba(202,138,4,0.125)]">
                    <div className="m-4 flex gap-4">
                        <span className="material-symbols-outlined notranslate " >
                            warning_amber
                        </span>
                        <div>
                            <div className="flex flex-col">
                                <span className="font-['Michroma'] font-medium text-[2.25rem] 
                                leading-8 flex items-center justify-start uppercase">{t('notes')}:</span>
                            </div>
                            <p className="m-0 p-0">
                                {notes}
                            </p>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default NotesBlock;