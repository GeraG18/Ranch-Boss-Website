const ItemBarebone = () => {
    return (
        <div className="w-full flex gap-2 flex-col justify-around items-center text-white
        motion-safe:transition-all motion-reduce:transition-none will-change-auto motion-safe:duration-200 
        overflow-hidden group font-['Montserrat'] select-none">
            <div className="w-full h-full max-w-full flex flex-col">

                <div className={`block relative aspect-16/10 w-full rounded-[10px] items-stretch
                overflow-hidden object-fill motion-safe:transition-all motion-reduce:transition-none 
                will-change-auto motion-safe:duration-300 bg-[rgba(119,120,123,0.3)]`}>
                    <div className="absolute left-0 top-0 z-30 w-full p-2 flex flex-row gap-2 overflow-hidden">
                        <div className="w-fit rounded-[10px] uppercase text-[0.85rem] backdrop-saturate-50 *backdrop-blur *bg-black/50">
                            <div className="w-16 flex-none bg-[rgba(255,255,255,1)] rounded-[10px] h-6">
                            </div>
                        </div>
                        <div className="w-fit rounded-[10px] uppercase text-[0.85rem] backdrop-saturate-50 *backdrop-blur *bg-black/50">
                            <div className="w-16 flex-none bg-[rgba(255,255,255,1)] rounded-[10px] h-6">
                            </div>
                        </div>
                    </div>
                    <div className="absolute left-0 text-[0.85rem] bottom-0 z-30 flex items-center justify-end w-full p-2
                    before:content-[''] before:absolute before:bottom-0 before:left-0 before:-z-1 before:w-full notranslate 
                    before:h-40 before:pointer-events-">
                        <div className="w-1/2 flex-none bg-[rgba(255,255,255,1)] rounded-[10px] h-5">
                        </div>
                    </div>
                </div>

                <span className="my-2 w-full uppercase font-['Michroma'] text-[2rem] leading-9 text-black">
                    <div className="w-3/4 flex-none bg-[rgba(119,120,123,0.3)] rounded-[10px] h-9 lg:text-start ">
                    </div>
                </span>
                <div className="w-full text-black my-2 [&_p]:m-0 line-clamp-2">
                    <div className="w-full flex-none bg-[rgba(119,120,123,0.3)] rounded-[10px] h-10 lg:text-start ">
                    </div>
                </div>
                <div className="flex gap-1 flex-row items-center justify-start w-[16rem] text-black">
                    <div className="text-white w-8 aspect-square rounded-full backdrop-saturate-50
                    backdrop-blur-sm bg-[rgba(119,120,123,0.3)] flex items-center justify-center overflow-hidden">
                    </div>
                    <div className="w-3/4 flex-none bg-[rgba(119,120,123,0.3)] rounded-[10px] h-5 lg:text-start ">
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default ItemBarebone;