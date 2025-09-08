import ItemBarebone from "@/components/blog/item_barebone"

const BlogsBarebone = () => {

    return (
        <div className="my-8 mx-4 max-w-(--breakpoint-xl) z.[100] xl:mx-auto font-['Montserrat'] select-none! animate-barebone-pulse">
            <div className="w-full flex flex-col select-none!">
                <div className="w-31 flex-none bg-[rgba(119,120,123,0.3)] rounded-[10px] h-9 lg:h-[3.8rem] mb-1 lg:text-start ">
                </div>
                <div className="w-1/2 flex-none bg-[rgba(119,120,123,0.3)] rounded-[10px] h-8 lg:text-start ">
                </div>
            </div>
            <div className="flex flex-col gap-4 pt-4 pb-8 lg:flex-row">
                <div className="items-center w-full max-w-full overflow-x-auto overflow-y-hidden gap-4
                pb-1 z-60 flex lg:pb-0">
                    <div className="w-24 flex-none bg-[rgba(119,120,123,0.3)] rounded-[10px] h-9 lg:text-start ">
                    </div>
                    <div className="w-24 flex-none bg-[rgba(119,120,123,0.3)] rounded-[10px] h-9 lg:text-start ">
                    </div>
                    <div className="w-24 flex-none bg-[rgba(119,120,123,0.3)] rounded-[10px] h-9 lg:text-start ">
                    </div>
                </div>
                <div className="w-full block z-60 lg:w-[calc(50%-0.5rem)]">
                    <div className="w-24 flex-none mb-1 bg-[rgba(119,120,123,0.3)] rounded-[10px] h-5 lg:text-start ">
                    </div>
                    <div className="w-full flex-none bg-[rgba(119,120,123,0.3)] rounded-[10px] h-9 lg:text-start ">
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <ItemBarebone/>
                <ItemBarebone/>
                <ItemBarebone/>
            </div>
            
        </div>
    )
}

export default BlogsBarebone;