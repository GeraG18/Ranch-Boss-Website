
import NavBar from "@/components/general/nav_bar";
import ProductsContainer from "./products-container"
import PageSpacer from "@/components/general/page_spacer";
import ProductsContext from '@/context/products_context';

export default async function Products({ params, searchParams }) {
    // let p = await(params);
    // let sP = await(searchParams);

    //#region view
    return(
        <ProductsContext>
            <NavBar/>
            <ProductsContainer />
        </ProductsContext>
    );
    //#endregion
}