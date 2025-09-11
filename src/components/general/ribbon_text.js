const RibbonText = ({text = 'example', className=""}) => {
    return (
        <div className={`relative inline-flex items-center w-fit ${className}`}>
            {/* Left ribbon end */}
            <div className="absolute z-10 -left-2.5 bottom-1.5 w-0 h-0 border-solid border-4 border-[#3A4050_#3A4050_#3A4050_transparent] scale-390"></div>
            
            {/* Main ribbon */}
            <div className={`font-['oswald'] z-20 uppercase flex items-center justify-center font-medium text-md leading-6 relative select-none bg-[#525866] w-full px-4 py-1 text-white`}
            >
                {text}
            </div>
            
            {/* Right ribbon end */}
            <div className="absolute z-10 -right-2.5 bottom-1.5 w-0 h-0 border-solid border-4 border-[#3A4050_transparent_#3A4050_#3A4050] scale-390"></div>
        </div>
    )
}

export default RibbonText;