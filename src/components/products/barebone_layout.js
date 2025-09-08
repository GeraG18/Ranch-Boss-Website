import ModelsBarebone from "./models_barebone";

const BareboneLayout = () => {
    return (
        <div className="flex items-start justify-center relative h-auto overflow-x-hidden mx-4 max-w-(--breakpoint-xl) z-100 xl:mx-auto font-['Montserrat']">
            {/* Filtros para desktop */}
            <div className="top-0 left-0 hidden justify-end items-start w-fit z-100 relative lg:flex flex-col animate-barebone-pulse">
                <div className={`w-full overflow-hidden lg:w-[20rem] py-2 px-4`}>
                    <div className="hidden h-9 my-4 justify-center items-center lg:flex gap-1">
                        <div className="w-8 flex justify-start items-center uppercase font-semibold bg-[rgba(119,120,123,0.3)] rounded-[10px] h-8 ">
                        </div>
                        <div className="w-20 flex justify-start items-center uppercase font-semibold bg-[rgba(119,120,123,0.3)] rounded-[10px] h-8 ">
                        </div>
                    </div>
                    
                    <ul className="w-full inline-flex gap-2 flex-col font-bold bg-white
                    list-none relative select-none m-0 p-0 pb-4">
                        <li className="w-full flex justify-start items-center uppercase font-semibold bg-[rgba(119,120,123,0.3)] rounded-[10px] h-12 "></li>
                        <li className="w-full flex justify-start items-center uppercase font-semibold bg-[rgba(119,120,123,0.3)] rounded-[10px] h-12 "></li>
                        <li className="w-full flex justify-start items-center uppercase font-semibold bg-[rgba(119,120,123,0.3)] rounded-[10px] h-12 "></li>
                        <li className="w-full flex justify-start items-center uppercase font-semibold bg-[rgba(119,120,123,0.3)] rounded-[10px] h-12 "></li>
                        <li className="w-full flex justify-start items-center uppercase font-semibold bg-[rgba(119,120,123,0.3)] rounded-[10px] h-12 "></li>
                        <li className="w-full flex justify-start items-center uppercase font-semibold bg-[rgba(119,120,123,0.3)] rounded-[10px] h-12 "></li>
                        
                    </ul>
                    <div className="w-full flex items-center justify-center">
                        <div 
                            className="relative text-white border-none bg-primary-color h-10
                            w-40 text-[1rem] select-none py-2 px-4 rounded-[10px] lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium
                            motion-safe:transition-all motion-reduce:transition-none will-change-auto
                            motion-safe:duration-400 "
                        >
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista de productos */}
            <div className="w-full grid grid-cols-1 p-2 flex-col *gap-y-2 select-none mx-auto max-w-(--breakpoint-xl)">
                <div className="w-full flex flex-row flex-wrap justify-center items-center my-4 gap-2 lg:flex-nowrap lg:h-9">
                    {/* Botón de filtros para móvil */}
                    <div className="w-[calc(50%-0.5rem)] flex-none bg-[rgba(119,120,123,0.3)] rounded-[10px] h-8 lg:hidden">
                    </div>
                    
                    {/* Contador de resultados */}
                    <div className="w-[calc(50%-0.5rem)] flex-none bg-[rgba(119,120,123,0.3)] rounded-[10px] h-8 lg:w-48 lg:text-start ">
                    </div>
                    
                    {/* Selector de segmento para desktop */}
                    <div className="hidden items-center w-full max-w-full overflow-hidden pb-1 z-60 lg:flex lg:pb-0 direction-rtl">
                        <div className="items-center max-w-full overflow-x-auto overflow-y-hidden gap-4 flex direction-ltr">
                            {[1,1,1,1,1,1].map((item, index) => (
                            <div key={item+'_:'+index} className="w-24 flex justify-start items-center uppercase font-semibold bg-[rgba(119,120,123,0.3)] rounded-[10px] h-8 ">
                            </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Selector de segmento para móvil */}
                    <div className="w-full lg:hidden">
                        <div className="w-full flex-none bg-[rgba(119,120,123,0.3)] rounded-[10px] h-10 lg:w-48 lg:text-start ">
                        </div>
                    </div>
                </div>

                {/* Grid de productos */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ModelsBarebone />
                    <ModelsBarebone />
                    <ModelsBarebone />
                </div>

            {/* Paginación */}
            </div>
        </div>
    )
}

export default BareboneLayout;