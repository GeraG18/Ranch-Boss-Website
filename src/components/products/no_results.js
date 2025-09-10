import { useTranslations } from "next-intl";

const NoResults = () => {

    const wT = useTranslations('WeReSorry')

    return (
        <div className="col-span-full mt-4 flex items-center justify-center gap-2 flex-col w-full h-fit">                           
            <h3 className="font-['lora'] text-[2rem] m-0 uppercase">{wT('title')}</h3>
            <p className="m-0">{wT('description')}</p>
        </div>
    )
}

export default NoResults;