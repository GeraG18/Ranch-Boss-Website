import { useTranslations } from "use-intl";
import RbIsotypeWeathered from "@/components/icons/logotypes/isotype-weathered";
import { useLockBodyScroll } from "@/hooks/lock_body_scroll/lock_body_scroll";
import useHybridMenuData from "@/hooks/hybrid_menu_data/hybrid_menu_data";
import { useEffect, useState } from "react";
import HybridMenuItems from "./hybrid_menu_items";

const HybridMenu = ({isOpen = false, isOpenCallback}) => {

    const t = useTranslations("PagesTitles");
    
    useLockBodyScroll(isOpen); // hook to lock body scrolling when menu is open
    const menuData = useHybridMenuData(); // original menu data 
    const [stack, setStack] = useState([{ title: "Menú", items: menuData }]);
    const currentScreen = stack[stack.length - 1];
    const handleNavigate = (items, title) => setStack([...stack, { title, items }]);
    const handleBack = () => setStack(stack.slice(0, -1));

    useEffect(() => {
        if(!isOpen) setStack([{ title: "Menú", items: menuData }]);
    }, [isOpen])

    return (
        <div className={`w-dvw h-dvh opacity-0 pointer-events-none [&.open]:opacity-100 [&.open]:pointer-events-auto 
            motion-safe:transition-opacity motion-safe:duration-300 motion-reduce:transition-none will-change-auto 
            select-none overflow-hidden fixed left-0 top-0 bg-tertiary-dark-color/80 backdrop-blur-md 
            z-900 flex items-center justify-start ${isOpen ? 'open' : ''}`}>
            <div className={`w-full h-full -translate-y-1/4 motion-safe:transition-all motion-safe:duration-300 
                motion-reduce:transition-none will-change-auto [&.open]:translate-y-0 flex flex-row ${isOpen ? 'open' : ''}`}>
                <div className="bg-primary-color border-r-2 border-r-secondary-color h-full w-16 p-4 flex flex-col gap-4">
                    <RbIsotypeWeathered className="w-full text-secondary-color-20"/>
                    <div className="w-full aspect-square uppercase font-['oswald'] font-medium no-underline text-secondary-color-20 bg-transparent bg-[length:200%_100%]
                        border-2 border-secondary-color-20 cursor-pointer bg-gradient-to-r from-transparent from-50% to-secondary-color-20 to-50% motion-safe:transition-all duration-500 
                        motion-safe:ease-[cubic-bezier(0.19,1,0.22,1)] delay-50 lg:hover:text-tertiary-color lg:hover:text-shadow-none! lg:hover:bg-secondary-color-20 lg:hover:bg-[-100%_100%] 
                        flex flex-col items-center justify-center gap-2 text-shadow py-2" onClick={() => isOpenCallback(false)}>
                        <span className="[writing-mode:vertical-lr]">{t('close')}</span>
                        <span className="material-symbols-outlined notranslate h-6 w-6 flex items-center justify-center" >
                            close
                        </span>
                    </div>
                </div>
                <div className="bg-white max-h-full h-full w-full max-w-156 border p-6">
                    <HybridMenuItems
                        title={currentScreen.title}
                        items={currentScreen.items}
                        onNavigate={handleNavigate}
                        onBack={handleBack}
                        isRoot={stack.length === 1}
                        onExitClick={isOpenCallback}
                    />
                </div>
                <div className="hidden lg:flex w-full h-full">
                    {/* Previsualization content */}
                </div>
            </div>

        </div>
    )
}

export default HybridMenu;