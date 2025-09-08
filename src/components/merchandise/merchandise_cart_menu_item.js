import React, { useEffect, useState } from "react";
import { useMerchandiseContext } from "../../context/merchandise_cart_context";
import { useTranslations } from "next-intl";

const MerchandiseCartMenuItem = ({merchId, name, quantity, color, colorType, size, image, price}) => {

    //#region code
    const t = useTranslations('Merchandise')
    const [modQuant, setModQuant] = useState(1);
    const { merchCart, setMerchCart, setLSMerchCart } = useMerchandiseContext();

    const deleteMe = () => {
        // 
        
        let index = merchCart.findIndex((item) => item.key === merchId && item.size === size && 
            item.color === color && (colorType ? item.colorType === colorType : true));
        if(index !== -1) {
            let arr = merchCart.filter((item, i) => i !== index);
            setLSMerchCart(arr);
        }
        // 
    }

    const modifyQuantity = (newQuant) => {
        let lsData = [...merchCart];
        // 
        let index = lsData.findIndex((item) => item.key === merchId && item.size === size && 
            item.color === color && (colorType ? item.colorType === colorType : true));
        
        if(index !== -1) {
            let obj = {...merchCart[index], quantity: newQuant};

            lsData.splice(index, 1, obj);
            setLSMerchCart(lsData);
        }
    }

    useEffect(() => {
        setModQuant(quantity)
    }, [quantity])

    //#region view
    return( 
        <div className="p-2 grid gap-2 grid-cols-[8rem_auto] overflow-hidden rounded-[10px]">
            <div className="rounded-[8px] overflow-hidden border border-[rgb(186,187,189)] 
            flex-none w-full aspect-square relative flex items-center justify-center">
                <img className="absolute w-full h-full bg-center" src={image} alt={name} />
            </div>

            <div className="flex flex-col pl-2">
                <div className="h-full">
                    <div className="flex flex-col">
                        <span className="uppercase overflow-hidden text-ellipsis text-[1rem] m-0 font-semibold">
                            {name}
                        </span>

                        <div className="w-full p-0 rounded-[8px] flex flex-row gap-1 items-center justify-start">
                            <span className="capitalize font-[0.8rem] m-0 p-0">{t('Details.price')}:</span>
                            <span>$ {price}</span>
                        </div>
                        {
                            size &&
                            <span className="capitalize font-[0.8rem] m-0 p-0">
                                {t('Details.size')}: {size}
                            </span>
                        }
                        {
                            color &&
                            <span className="capitalize font-[0.8rem] m-0 p-0">
                                {t('Details.color')}: {colorType ? `"${colorType}"` : ""} {color}
                            </span>
                        }
                    </div>

                </div>
                <div className="flex flex-row items-center gap-2">
                    <div className="cursor-pointer h-8 px-1 bg-[#eeeff0] rounded-[8px] flex flex-row items-center justify-center">
                        <span className="material-symbols-outlined notranslate " onClick={() => {setModQuant(modQuant - 1 !== 0 ? modQuant - 1 : modQuant); modifyQuantity(modQuant - 1 !== 0 ? modQuant - 1 : modQuant)}}>
                            remove
                        </span>
                        <input aria-label="quantity option" role="form" className="bg-transparent border-none h-full text-center w-12 outline-hidden" type="number" value={modQuant} 
                            onChange={(e) => {setModQuant(Number(e.target.value)); modifyQuantity(Number(e.target.value))}}/>
                        <span className="material-symbols-outlined notranslate " onClick={() => {setModQuant(modQuant + 1 < 6 ? modQuant + 1 : modQuant); modifyQuantity(modQuant + 1 < 6 ? modQuant + 1 : modQuant)}}>
                            add
                        </span>
                    </div>

                    |

                    <div className="cursor-pointer lg:hover:text-primary-color" onClick={() => deleteMe()}>
                        {t('Details.delete')}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default MerchandiseCartMenuItem;