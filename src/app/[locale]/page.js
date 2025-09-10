import React from 'react';
import NavBar from '@/components/general/nav_bar';
import FABChat from '@/components/general/fab_chat';
import MainCorousel from '@/components/home/main_carousel';
import FindADealer from '@/components/home/find_a_dealer';
import FeaturedCategoriesContainer from '@/components/featured_categories/featured_categories_container';
import CallOrChat from '@/components/general/call_or_chat';
import FooterContainer from '@/components/general/footer_container';
import WhyChooseArea from '@/components/home/why_choose_area';

export default async function Page(){
    return (
        <>
          <NavBar/>
          <FABChat/>
          <MainCorousel/>
          <FindADealer/>
          <WhyChooseArea/>
          <FeaturedCategoriesContainer/>
          <CallOrChat/>
          <FooterContainer/> 
        </>
    );
}