import ImageViewerAlt from "@/components/general/image_viewer_alt";
import { useTranslations } from "next-intl";
import Link from "next/link";

const CategoriesItem = ({category = 'test'}) => {

    const t = useTranslations('PagesTitles');

    return ( 
        <Link href={`/products?category=${category}`} className="group relative flex-grow flex-none p-4 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[url(/Images/moomoo.webp)] before:bg-no-repeat before:bg-cover 
            before:bg-center before:contrast-150 select-none">
            <div className="z-30 flex w-full h-full outline-2 group-hover:outline-secondary-color-20 outline-transparent relative flex-col items-center justify-center">
                {
                    t.rich('catTrailer', {
                        category,
                        white: (chunks) => <h1 className="font-['oswald'] text-shadow font-medium uppercase text-[1.75rem] leading-8 text-shadow lg:text-[2.5rem] lg:leading-[2.75rem] h-auto lg:h-[3.5rem] text-secondary-color-20/60 group-hover:text-secondary-color-20">{chunks}</h1>,
                        orange: (chunks) => <h1 className="font-['oswald'] text-shadow font-medium uppercase text-[1.75rem] leading-8 text-shadow lg:text-[2.5rem] lg:leading-[2.75rem] h-auto lg:h-[3.5rem] text-secondary-color-20/60 group-hover:text-secondary-color">{chunks}</h1>,
                    })
                }
                <div className="hidden group-hover:flex col-span-full max-w-7/8 absolute bottom-4 w-full self-center justify-self-center uppercase font-['oswald'] font-medium no-underline text-secondary-color-20 bg-transparent px-10 py-2 bg-[length:200%_100%]
                    border-2 border-secondary-color-20  
                    bg-gradient-to-r from-transparent from-50% to-secondary-color-20 to-50% motion-safe:transition-all duration-500 motion-safe:ease-[cubic-bezier(0.19,1,0.22,1)] delay-50 
                    lg:hover:text-tertiary-color lg:hover:text-shadow-none! lg:hover:bg-secondary-color-20 lg:hover:bg-[-100%_100%] flex-row items-center justify-center gap-2 text-shadow">
                    {t('goCatTrailer', {category})}
                    <span className="material-symbols-outlined notranslate h-6 w-6 flex items-center justify-center" >
                    east
                    </span>
                </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-tertiary-dark-color/80 z-20" />
        </Link>
    )
}

const CategoriesArea = () => {

    const t = useTranslations('PagesTitles');
    
    return (
        <div className="w-full h-492 lg:h-128 bg-tertiary-dark-color flex flex-col lg:flex-row">
            <CategoriesItem category={t('dump')}/>
            <CategoriesItem category={t('rolloff')}/>
            <CategoriesItem category={t('utility')}/>
            <CategoriesItem category={t('equipment')}/>
        </div>
    )
}

export default CategoriesArea;