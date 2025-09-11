import { useLocale, useTranslations } from "next-intl";
/* DATA OF MENUS */
import CompanyMenu from "@/jsons/dropdowns/company_dropdown.json"
import FinancingMenu from "@/jsons/dropdowns/financing_dropdown.json";
import SupportMenu from "@/jsons/dropdowns/support_dropdown.json"
import { ProductsList, ModelsImageDictionary } from "@/jsons/products/products";
import { useMemo } from "react";

const menuData = [
  {
    name: "Animales",
    image: "https://placehold.co/40",
    children: [
      {
        groupName: "Mamíferos",
        items: [
          { name: "Perro", url: "/perro" },
          { name: "Gato", url: "/gato" },
        ],
        
      },
      {
        groupName: "Aves",
        items: [
          { name: "Águila", url: "/aguila" },
          { name: "Colibrí", url: "/colibri" },
        ],
      },
    ],
  },
  {
    name: "Vehículos",
    children: [
      {
        groupName: "Coches",
        items: [
          { name: "Sedán", url: "/sedan" },
          { name: "SUV", url: "/suv" },
        ],
      },
      {
        groupName: "Otros",
        items: [
          { name: "Motocicletas", url: "/motos" },
          { name: "Camiones", url: "/camiones" },
        ],
      },
    ],
  },
];

const useHybridMenuData = () => {
    
    const locale = useLocale();
    const t = useTranslations ("PagesTitles");

    const mData = useMemo(() => {
        /*( #region products )*/
        let prodsMenu = [{name: t('allproducts'), url:"/products"}];
        let removedComments = ProductsList[locale].filter((item) => !item.hasOwnProperty('_comment'));
        let categories = [...new Set([...removedComments.map((item) => item.category)])];
        categories.forEach((category) => {
            let subgroups = [];
            let allItems = removedComments.filter((item) => item.category === category);
            let models = [...new Set([...allItems.map((item) => (item.name.split(' ')[0]) )])];
            models.forEach((model) => {
                let tempItemsArr =  removedComments.filter((item) => item.name.includes(model) && item.category === category);
                let image = ModelsImageDictionary[model] || '/no-image';
                let stat = tempItemsArr[0].status;
                let cat = tempItemsArr[0].category;
                let subcategory = tempItemsArr[0].subcategory || '';
                let item = { name:model, image, category, status: stat, url:`/products?model=${model}`,
                    description:`${t('dynCatTrailer', {category: ( (typeof subcategory === 'string' && subcategory !== '') ? subcategory : cat )}).toUpperCase()}`
                };
                let subgroupsIndex = subgroups.findIndex((it) => it.groupName === subcategory);
                if( subgroupsIndex === -1 ) {
                    subgroups.push({groupName: subcategory, items: [item]});
                } else {
                    subgroups[subgroupsIndex].items.push(item);
                }
            });
            let toPush = { name: category, children: subgroups };
            prodsMenu.push(toPush);
        });
        /*( #endregion products )*/

        const data = [
            {
                name: t('products'),
                children: [...prodsMenu]
            },
            {
                name: t('company'),
                children: [...CompanyMenu[locale]]
            },
            {
                name: t('support'),
                children: [...SupportMenu[locale]]
            },
            {
                name: t('financing'),
                children: [...FinancingMenu[locale]]
            },
        ];
        
        return data;
    }, [locale])

    return mData;
}

export default useHybridMenuData;