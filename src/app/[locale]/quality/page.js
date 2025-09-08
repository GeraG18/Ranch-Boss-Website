import FAQHeader from "@/components/faqs/faq_header";
import FrecuentQuestions from "@/components/faqs/frecuent_questions";
import HorizonDetailMatters from "@/components/faqs/horizon_detail_matters";
import HowWorks from "@/components/faqs/how_works";
import React from "react";

const FAQs = () => {
    return(
        <>
            <FAQHeader/>
            <HorizonDetailMatters/>
            <HowWorks/>
            <FrecuentQuestions/>
            {/* <Seo
                title="Quality That Exceeds Expectations | Horizon Trailers"
                description="Discover Horizon Trailers’ commitment to quality craftsmanship. From durable materials to precision engineering, every trailer is built to exceed industry standards. Trust Horizon Trailers for reliability, performance, and unmatched durability on every job, big or small."
            /> */}
        </>
    );
}

export default FAQs;