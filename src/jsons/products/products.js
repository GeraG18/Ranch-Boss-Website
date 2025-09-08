/* General - Old List */
import productsEn from "@/jsons/products.json"
import productsEs from "@/jsons/products-es.json"

/* [ New List in Modular Mode ] */
/* Assets */
import staticAssets from "@/jsons/products/assets/static_assets.json"
import assetsEn from "@/jsons/products/assets/assets_en.json"
import assetsEs from "@/jsons/products/assets/assets_es.json"

/* Models */
import imageDictionary from "@/jsons/products/models/image_dictionary.json"

/* Descriptions */
import descriptionsEn from "@/jsons/products/descriptions/descriptions_en.json"
import descriptionsEs from "@/jsons/products/descriptions/descriptions_es.json"

/* List */
import listEn from "@/jsons/products/list/list_en.json"
import listEs from "@/jsons/products/list/list_es.json"

/* Seo */
import seoEn from "@/jsons/products/seo/seo_en.json"
import seoEs from "@/jsons/products/seo/seo_es.json"

/*------------------------------------------------------------------------------*/
/*
    This file is done this way because it is for the next-intl.
    The JSONs are defined in a modular structure for better resources optimization.
*/
/*------------------------------------------------------------------------------*/

/* [ General - Old List ] */
export const Products = {
    "en": (productsEn),
    "es": (productsEs)
}

/* [ New List in Modular Mode ] */
/* Dynamic Assets */
export const ProductsDynamicAssets = {
    "en": assetsEn,
    "es": assetsEs,
}

/* Static Assets */
export const ProductsStaticAssets = {
    ...staticAssets,
}

/* Models Dictionary */
export const ModelsImageDictionary = {
    ...imageDictionary,
}

/* Descriptions */
export const ProductsDescriptions = {
    "en": (descriptionsEn),
    "es": (descriptionsEs)
}

/* List */
export const ProductsList = {
    "en": (listEn.filter((item) => !item.hasOwnProperty('_comment'))),
    "es": (listEs.filter((item) => !item.hasOwnProperty('_comment')))
}   

/* Seo */
export const ProductsSeo = {
    "en": (seoEn),
    "es": (seoEs),
}