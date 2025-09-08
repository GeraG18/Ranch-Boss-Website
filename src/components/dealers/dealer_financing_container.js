import React from "react";
import DealerFinancingItem from "./dealer_financing_item";

import sixBlogImage from "../../imgs/sixBlogImage.jpg"
import sevenBlogImage from "../../imgs/sevenBlogImage.jpg"



function DealerFinancingContainer() {

    //#region styles
    const styles = StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: 'column',
            gap: "0rem", 
            /*tablet and bigger screens*/
            "@media (min-width: 1024px)": {
                flexDirection: 'row',
                gap: "1.5rem", 
                height: '600px',
            }
        }
    });
    //#endregion

    //#region view
    return (
        <>
            <div className={css(styles.container)}>
                <DealerFinancingItem alt={"Become a Dealer"} image={sixBlogImage} firstText= "BECOME A DEALER" secondText="Why HYZ is the Best Choice for Efficient Transport, Why HYZ is the Best Choice for Efficient TransportWhy HYZ is the Best Choice for Efficient TransportWhy HYZ is the Best Choice for Efficient Transport" link="/blog" title="APPLY NOW"/>
                <DealerFinancingItem alt={"Financing"} image={sevenBlogImage} firstText= "FINANCING" secondText="Discover the Premium Advantages of HZ7 Trailers Discover the Premium Advantages of HZ7 Trailers Discover the Premium Advantages of HZ7 Trailers Discover the Premium Advantages of HZ7 Trailers" link="/blog" title="EXPLORE FINANCING OPTIONS"/>
            </div>
        
        </>
    );
    //#endregion
}
export default DealerFinancingContainer