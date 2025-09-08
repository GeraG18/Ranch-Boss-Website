'use client' // Renders on client side
import FABChat from '@/components/general/fab_chat';
import RelantlessPursuit from '@/components/home/relantless_pursuit';
import UltimateEfficiencyContainer from '@/components/home/ultimate_efficiency_container';
import Developex from '@/components/products/develop_ex'
import ModelsContainer from '@/components/products/models_container'
import React, { Suspense, useEffect, useState } from 'react'; 

export default function ProductsContainer({ckey}) {
    return(
        <Suspense>
            <Developex/>
            <ModelsContainer/>
            <UltimateEfficiencyContainer/>
            <RelantlessPursuit/>
            <FABChat/>
        </Suspense>
    );
    //#endregion
}