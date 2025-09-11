import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import ImageViewer from "../../general/image_viewer";
import RibbonText from "../../general/ribbon_text";
import { Fragment } from "react";

const HybridMenuItems = ({ title, items, onNavigate, onBack, isRoot, onExitClick }) => {

    const router = useRouter();
    const t = useTranslations("PagesTitles");

    return (
        <div className="w-full grid grid-cols-2 grid-rows-[auto] gap-4 font-['oswald']">
            {!isRoot && (
                <>
                    <div className="col-span-full">
                        <div className="flex flex-row justify-between items-center">
                            <div className="uppercase font-['oswald'] font-medium no-underline text-gray-500 bg-transparent px-4 py-1 bg-[length:200%_100%]
                                bg-gradient-to-r from-transparent from-50% to-secondary-color to-50% motion-safe:transition-all 
                                duration-500 motion-safe:ease-[cubic-bezier(0.19,1,0.22,1)] delay-50 lg:hover:text-white cursor-pointer w-fit text-sm
                                lg:hover:bg-secondary-color lg:hover:bg-[-100%_100%] flex flex-row items-center justify-center gap-1" onClick={onBack} >
                                {t('return')}
                                <span className="material-symbols-outlined notranslate h-6 w-6 flex items-center justify-center scale-90" >
                                    west
                                </span>
                            </div>
                            <span className="text-2xl uppercase font-medium text-secondary-color">
                                {title}
                            </span>

                        </div>
                        <hr className="my-3 border-gray-300 col-span-full" />
                    </div>
                </>
            )}
            {
                items.length === 0 &&
                <span className="col-span-full w-full uppercase text-gray-400 text-center">{t('noResults')}</span>
            }
            <>
                {items.map((group, groupIndex) => (
                    <Fragment key={groupIndex}>
                        {group.items ? (
                            <>
                                {(group.groupName && isNaN(group.groupName) ) && (
                                    <RibbonText className="mb-6 col-span-full !w-full" text={group.groupName} />
                                )}
                                {group.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`flex min-h-16 items-center gap-2 p-2 text-primary-color border border-gray-300 lg:hover:border-secondary-color cursor-pointer
                                            [&.has-image]:flex-col [&.no-image]:col-span-full ${item.image ? 'has-image' : 'no-image'}`}
                                        onClick={() => {
                                            if (item.children) {
                                                onNavigate(item.children, item.name);
                                            } else if (item.url) {
                                                router.push(item.url);
                                                onExitClick();
                                            }
                                        }}
                                    >
                                        {item.image && (
                                            <ImageViewer
                                                sizes="50vh"
                                                className={`group-hover:scale-[1.125] motion-safe:transition-all motion-safe:duration-200 motion-reduce:transition-none will-change-auto 
                                                ${item.status ? 'blur-xs lg:blur-[0.5rem]' : ''}`}
                                                src={item.image}
                                                category={item.category.toLowerCase().replace(' ', '')}
                                                alt={`${item.name}`}
                                            />
                                        )}
                                        <span className="font-medium uppercase">{item.name}</span>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div
                                className={`flex min-h-16 items-center gap-2 p-2 text-primary-color border border-gray-300 lg:hover:border-secondary-color cursor-pointer
                                    [&.has-image]:flex-col [&.no-image]:col-span-full ${group.image ? 'has-image' : 'no-image'}`}
                                onClick={() => {
                                    if (group.children) {
                                        onNavigate(group.children, group.name);
                                    } else if (group.url) {
                                        router.push(group.url);
                                        onExitClick();
                                    }
                                }}
                            >
                                {group.image && (
                                    <ImageViewer
                                        sizes="50vh"
                                        className={`group-hover:scale-[1.125] motion-safe:transition-all motion-safe:duration-200 motion-reduce:transition-none will-change-auto 
                                        ${item.status ? 'blur-xs lg:blur-[0.5rem]' : ''}`}
                                        src={group.image}
                                        category={group.category.toLowerCase().replace(' ', '')}
                                        alt={`${group.name}`}
                                    />
                                )}
                                <span className="font-medium uppercase">{group.name}</span>
                            </div>
                        )}

                        {(groupIndex < items.length - 1 && group.items) && (
                            <hr className="my-3 border-gray-300 col-span-full" />
                        )}
                    </Fragment>
                ))}
            </>
        </div>
    );
};

export default HybridMenuItems;