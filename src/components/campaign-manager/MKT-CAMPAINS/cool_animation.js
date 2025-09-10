const MayCampain = () => {
    return(
        <div className="fixed left-0 bottom-0 z-500 cursor-pointer flex flex-col items-start justify-center
        max-w-[90%] w-full max-h-[90%] h-full">
            
            <div className="z-3 w-[7680px] h-8 bg-[url(/Images/campains/may_campain/nubes.svg)] bg-center
                bg-contain bg-repeat-x animate-slide-clouds drop-shadow-[5px_5px_5px_rgba(0,0,0,0.4)]"></div>
            <div className="z-2 absolute w-14 h-14 bg-[url(/Images/campains/may_campain/carro.svg)] bg-center
                bg-cover bg-no-repeat left-1/4 bottom-1 animate-bounce-car before:content-['Get_your_next_quality_trailer']
                before:w-56 before:absolute before:-left-56 before:bottom-[1.35rem] before:font-['lora']
                before:bg-red-400 before:rounded-t-md before:flex before:items-center before:justify-center before:font-semibold
                after:absolute after:content-[''] after:w-4 after:h-4 after:rounded-full after:bg-gray-800 after:-left-54
                after:bottom-3"></div>
            <div className="z-0 w-[7680px] h-8 bg-[url(/Images/campains/may_campain/fondo.svg)] bg-center
                bg-contain bg-repeat-x animate-slide-landscape"></div>
            <div className="z-1 w-[7680px] h-8 bg-[url(/Images/campains/may_campain/calle.svg)] bg-center
                bg-fit bg-repeat-x animate-slide-road"></div>
        </div>
    )
}

export default MayCampain;