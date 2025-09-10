import ImageViewerAlt from "../general/image_viewer_alt";
import RbIsotypeWeathered from "@/components/icons/logotypes/isotype-weathered"
import RbNameWeathered from "@/components/icons/logotypes/name-weathered"

const SloganArea = () => {
    return (
        <div className="relative h-[24rem] overflow-hidden flex items-center justify-center flex-col">

            <div className="absolute z-30 flex flex-col items-center justify-center -mb-8">
                <div className="relative flex items-end justify-center">
                    <RbIsotypeWeathered className="h-42 text-secondary-color absolute z-20"/>
                    <RbNameWeathered className="h-32 text-white opacity-20 z-10"/>
                </div>
                <span className="font-['BeerTime'] text-[3.5rem] text-white opacity-75">STReNgTh You CaN Haul ON</span>
            </div>

            <div className="absolute top-0 left-0 w-full h-full bg-primary-color/70 z-20" />
            <ImageViewerAlt className="!h-[full w-full shadow-md
                motion-reduce:transition-none will-change-auto0 grayscale-100 brightness-140" 
                orientation="portrait" src="/Images/background_slogan.webp" 
                alt="Landscape with a cows into it"
            />
        </div>
    )
}

export default SloganArea;