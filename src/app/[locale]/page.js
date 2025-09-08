import React from 'react';
import NavBar from '@/components/general/nav_bar';
import PageSpacer from '@/components/general/page_spacer';
import FABChat from '@/components/general/fab_chat';
import MainCorousel from '@/components/home/main_carousel'
import FindADealer from '@/components/home/find_a_dealer'
import UltimateEfficiencyContainer from '@/components/home/ultimate_efficiency_container';
import FeaturedProducts from '@/components/featured_categories/featured_products_container';
import WhyHorizonButtons from '@/components/home/why_horizon_buttons';
import FeaturedCategoriesContainer from '@/components/featured_categories/featured_categories_container';
// import TestimonialsContainer from '@/components/home/testimonials_container';
// import RelantlessPursuit from '@/components/home/relantless_pursuit';
// import ExclusiveWallpapers from '@/components/home/exclusive_wallpapers';
import CallOrChat from '@/components/general/call_or_chat';
import FooterContainer from '@/components/general/footer_container';

export default async function Page(){
    return (
        <>
          <NavBar/>
          <PageSpacer showingTopbar={true}/>
          <FABChat/>
          <MainCorousel/>
          <FindADealer/>
          <UltimateEfficiencyContainer/>
          {/* <FeaturedProducts/> */}
          <WhyHorizonButtons/>
          <FeaturedCategoriesContainer/>
          {/* <TestimonialsContainer/> */}
          <CallOrChat/>
          <FooterContainer/> 
        </>
    );
}