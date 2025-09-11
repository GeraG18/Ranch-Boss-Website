'use client' // Renders on client side
import CallOrChatArea from '@/components/home/call_or_chat_area';
import Developex from '@/components/products/develop_ex'
import ModelsContainer from '@/components/products/models_container'
import React, { Suspense, useEffect, useState } from 'react'; 

export default function ProductsContainer({ckey}) {
    return(
        <Suspense>
            <Developex/>
            <ModelsContainer/>
            <CallOrChatArea />
        </Suspense>
    );
    //#endregion
}