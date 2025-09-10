import { useTranslations } from "next-intl"

const currentPage = ({currentPage, totalPages, onChange}) => {

    const fT = useTranslations('BasicForm')

    const more = (value) => {
        if ( value >= totalPages ){
            return value
        } else {
            return value+1
        }  
    }

    const minus = (value) => {
        if ( value > 1 ) {
            return value-1
        } else {
            return value
        }
    }

    return (
        <div className="w-full select-none flex flex-row justify-end items-start my-8 gap-2 lg:gap-4 lg:w-auto">
            {
                currentPage !== 1 &&
                <button className="flex flex-row h-8 w-18 justify-center items-center text-[1rem] 
                    border border-[#d5d5d5] text-[#4d4d4d] bg-transparent cursor-pointer
                    lg:hover:border-secondary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:text-white
                    motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                    motion-safe:duration-400" 
                    onClick={()=>onChange(minus(currentPage))}><span className="material-symbols-outlined notranslate ">chevron_left</span> {fT('prev')}</button>
            }
            {
                currentPage > 2 &&
                <div className="min-h-8 flex flex-row justify-center items-center gap-2 lg:gap-4">
                    <div className="flex flex-row h-8 w-8 justify-center items-center text-[1rem]
                        border border-[#d5d5d5] text-[#4d4d4d] bg-transparent
                        cursor-pointer lg:hover:border-secondary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:text-white
                        motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                        motion-safe:duration-400" 
                        onClick={()=>onChange(minus(1))}>{1}</div>
                    <span>...</span>
                </div>
            }
            <div className="flex flex-row justify-center items-center gap-2 lg:gap-4">
                {
                    (currentPage - 1 !== 0) &&
                    <div className="flex flex-row h-8 w-8 justify-center items-center text-[1rem]
                    border border-[#d5d5d5] text-[#4d4d4d] bg-transparent
                    cursor-pointer lg:hover:border-secondary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:text-white
                    motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                    motion-safe:duration-400" 
                    onClick={()=>onChange(minus(currentPage))}>{currentPage-1}</div>
                }
                <div className="flex flex-row h-8 w-8 justify-center items-center text-[1rem]
                border border-primary-color bg-primary-color
                cursor-default text-white">{currentPage}</div>
                {
                currentPage  !== totalPages &&
                <div className="flex flex-row h-8 w-8 justify-center items-center text-[1rem]
                border border-[#d5d5d5] text-[#4d4d4d] bg-transparent
                cursor-pointer lg:hover:border-secondary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:text-white
                motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                motion-safe:duration-400" 
                onClick={()=>onChange(more(currentPage))} >{currentPage+1}</div>
                }
            </div>
            {
                currentPage < totalPages - 1 &&
                <div className="min-h-8 flex flex-row justify-center items-center gap-2 lg:gap-4">
                    <span>...</span>
                    <div className="flex flex-row h-8 w-8 justify-center items-center text-[1rem]
                        border border-[#d5d5d5] text-[#4d4d4d] bg-transparent
                        cursor-pointer lg:hover:border-secondary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:text-white
                        motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                        motion-safe:duration-400" 
                        onClick={()=>onChange(more(totalPages))} >{totalPages}</div>
                </div>
            }
            {
                currentPage !== totalPages &&
                <button className="flex flex-row h-8 w-18 justify-center items-center text-[1rem] 
                border border-[#d5d5d5] text-[#4d4d4d] bg-transparent cursor-pointer
                lg:hover:border-secondary-color lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium lg:hover:text-white
                motion-safe:transition-all motion-reduce:transition-none will-change-auto 
                motion-safe:duration-400" 
                onClick={()=>onChange(value => more(value))}>{fT('next')} <span className="material-symbols-outlined notranslate ">chevron_right</span></button>
            }
        </div>
    )
}

export default currentPage;
