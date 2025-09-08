import Link from "next/link";

const MayCampaign = ({onItemClick = () => {}}) => {

    return (
        <div className="relative flex items-center justify-center h-full">
            <img width={512} height={512} className="h-full" src="/Campaigns/05152025.jpg" alt="Photogenic campaign" />
            <div onClick={() => onItemClick()} className="absolute bottom-2 font-['Montserrat'] cursor-pointer text-white border-none bg-primary-color text-[1rem] select-none 
                motion-safe:transition-all motion-reduce:transition-none will-change-auto py-2 px-6 w-fit rounded-[10px] lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium 
                lg:hover:text-white self-center justify-self-center shadow-xs font-semibold">
                GET STARTED 
            </div>
        </div>
    )
}

export default MayCampaign;