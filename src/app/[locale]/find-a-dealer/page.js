import { Suspense } from "react";
import DealersContent from "./dealers_content"
import DealersProvider from "@/context/dealers_map_context"

const FindADealer = () => {
    return(
        <Suspense>
            <DealersProvider>
                <DealersContent/>
            </DealersProvider>
        </Suspense>
    )
}

export default FindADealer;