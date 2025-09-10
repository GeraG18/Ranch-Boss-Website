import React from "react";
import ImageViewer from "./image_viewer";

const NavbarMobileItem = ({imgUrl, name, badge="", category, icon="chevron_right", status, altButton=false, altFont=false, onItemClick = () => {}}) => {

    {/*css(styles.itemButton, altButton && styles.itemButtonAlt, altFont && styles.itemButtonAltFont) */}
    return (
        <div className={`w-full font-bold flex-none flex flex-col items-baseline justify-start relative rounded-lg p-4 font-['lora'] uppercase text-[1rem] border border-[#bdc3c7]
            ${altButton ? 'text-[1rem] font-bold uppercase min-h-12 py-2 flex items-start border-none justify-center' : ''} 
            ${altFont ? 'text-[1rem] font-bold uppercase ' : ''}`}
            onClick={() => onItemClick()}>
            <div className="w-full flex items-center justify-center text-[#77787b]">
                <span className="w-full tracking-[1px] text-[#77787b]">
                    {name}
                </span>
                <span className="material-symbols-outlined notranslate ">
                    {icon}
                </span>
            </div>
            {
                status &&
                <div className="absolute font-['lora'] text-[white] top-1/3 left-4
                    backdrop-saturate-50 backdrop-blur-sm bg-primary-color/70 rounded-[20px] 
                    min-h-6 min-w-6 p-0.5 max-w-[calc(100%-2rem)] w-full flex items-center justify-center text-center
                    motion-safe:transition-all motion-reduce:transition-none mb-1 text-[0.875rem] font-bold
                    will-change-auto motion-safe:duration-300 group z-20 uppercase"
                >
                    <span>
                        {status}
                    </span>
                </div>
            }
            {
                badge && 
                <ImageViewer 
                    sizes="50vh"
                    className={`group-hover:scale-[1.125] motion-safe:transition-all motion-safe:duration-200 motion-reduce:transition-none will-change-auto 
                    ${status ? 'blur-xs lg:blur-[0.5rem]' : ''}`} 
                    src={imgUrl} 
                    category={category.toLowerCase().replace(' ', '')}
                    alt={`${name}`}
                />
            }
            {
                badge.trim() !== '' &&
                <div className="bg-[#f0efec] rounded-[20px] py-1 px-3 self-center text-center group-hover:bg-white text-[0.875rem] max-w-full text-[#77787b]">
                    {badge}
                </div>
            }
        </div>
    );
}

export default NavbarMobileItem;