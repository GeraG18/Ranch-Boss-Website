import { useTranslations } from "next-intl";

const DealerMapIndicators = () => {
    
    const fT = useTranslations('BasicForm')

    return (
        <div className="flex flex-col *items-center justify-center absolute bottom-5 left-2 gap-1
            rounded-[10px] bg-white p-2">
                <div className="flex flex-row gap-2 items-center">
                    <div className='w-4 h-4 bg-black border border-black'></div>
                    <span className='text-xs'>{fT('urPoint')}</span>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <div className='w-4 h-4 bg-primary-color border border-[#8c3414]'></div>
                    <span className='text-xs'>{fT('closestPoint')}</span>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <div className='w-4 h-4 bg-[#bd461a] border border-[#70290f]'></div>
                    <span className='text-xs'>{fT('farthestPoint')}</span>
                </div>
        </div>
    )
}

export default DealerMapIndicators;