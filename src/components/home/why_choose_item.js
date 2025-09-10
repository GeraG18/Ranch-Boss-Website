const WhyChooseItem = ({title = 'example', description='example'}) => {
    return (
        <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_auto] gap-x-2 w-full">
            <div className="w-4 h-4 col-start-1 row-start-1 col-span-1 rounded-full border-2 border-dotted border-secondary-color flex-none self-center justify-self-center"/> {/* Decorator */}
            <span className="uppercase self-center justify-self-start w-full col-start-2 row-start-1 col-span-1  text-primary-color font-['oswald'] font-medium text-[1.25rem] leading-10 flex flex-wrap gap-1 lg:gap-2 items-center justify-start text-center lg:text-[2rem] lg:leading-12">
                {
                    title.split(" ").map((word, index) => (
                        <span className={`[&.last]:text-secondary-color ${title.split(" ").length === index + 1 ? "last" : ""}`} key={index}>{word}</span>
                    ))
                }
            </span>
            <p className="self-center justify-self-start col-start-2 row-start-2 col-span-1 font-['lora'] font-semibold text-[1rem] m-0">
                {description}
            </p>
        </div>
    )
}

export default WhyChooseItem;