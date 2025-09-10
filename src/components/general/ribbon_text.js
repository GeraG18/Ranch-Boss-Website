const RibbonText = ({text = 'example', className=""}) => {
    return (
        <div className={`font-['oswald'] uppercase font-medium text-md leading-6 relative select-none bg-[#525866] w-fit px-4 py-1 text-white
            flex items-center
            before:content-[''] before:absolute before:h-0 before:w-0 before:scale-390
            before:border-solid before:border-4 before:-z-10 before:-right-2.5 before:bottom-1.5
            before:border-[#3A4050_transparent_#3A4050_#3A4050]
            after:content-[''] after:absolute after:h-0 after:w-0 after:scale-390
            after:border-[#3A4050_#3A4050_#3A4050_transparent]
            after:border-solid after:border-4 after:-z-10 after:-left-2.5 after:bottom-1.5 
            ${className}`}
        >
            {text}
        </div>
    )
}

export default RibbonText;