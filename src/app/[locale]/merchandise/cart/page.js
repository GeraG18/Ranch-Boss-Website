import { Suspense } from "react";
import MerchandiseCart from "@/components/merchandise/merch_cart";

function Page (){
    return(
        <Suspense>
            <MerchandiseCart/>
        </Suspense>
    );
    //#endregion
    //TODO: This is not working
};

export default Page