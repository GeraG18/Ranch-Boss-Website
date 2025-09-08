'use client' // Renders on client side
import React, { useEffect, useState } from "react";
import MapHeader from "@/components/dealers/header";
import DealerMap from "@/components/dealers/dealer_map_v2/dealer_map";
import DealerList from "@/components/dealers/dealer_list";
import DealerListHeader from "@/components/dealers/dealer_list_header";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DealerTabSwitcher from "@/components/dealers/dealer_tab_switcher"
import { useDealersContext } from "@/context/dealers_map_context";

function DealersContent() {

    const {
        /* read-only variables */
        tab,
    } = useDealersContext();

    return (
        <div className="select-none">
            <DealerTabSwitcher/>
            {
                tab === "map" &&
                <>
                    <MapHeader/>
                    <DealerMap/>
                </>
            }
            {
                tab === "list" &&
                <>
                    <DealerListHeader/>
                    <DealerList/>
                </>
            }
        </div>
    );
};

export default DealersContent;