'use client' // Renders on client side
import { css, StyleSheet } from "aphrodite";
import React from "react";
import ResourcesItem from "./resources_item";
import { useTranslations } from "next-intl";

const ResourcesBody = () => {

    const t = useTranslations('Resources')

    return(
        <div className="mx-4 max-w-screen-lg  h-fit z-100 xl:w-full xl:mx-auto
        min-h-[40vh] py-8 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ResourcesItem 
                title={t('Logos.title')}
                description={t('Logos.description')}
                url="/resources/logos"
                imageAlt="Horizon Trailers logos pack"
                imageSrc="/logos/Brand Logo.png"
            />
            {/* <ResourcesItem 
                title={t('Wallpapers.title')}
                description={t('Wallpapers.description')}
                url="/resources/wallpapers"
                imageAlt="Horizon Trailers wallpapers pack"
                imageSrc="/Images/wallpapers-banner.webp"
            /> */}
        </div>
    )
}

export default ResourcesBody;