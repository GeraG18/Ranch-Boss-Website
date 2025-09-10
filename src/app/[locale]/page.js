import React from 'react';
import NavBar from '@/components/general/nav_bar';
import FABChat from '@/components/general/fab_chat';
import MainCorousel from '@/components/home/main_carousel';
import FindADealer from '@/components/home/find_a_dealer';
import FooterContainer from '@/components/general/footer_container';
import WhyChooseArea from '@/components/home/why_choose_area';
import CategoriesArea from "@/components/home/categories_area";
import CallOrChatArea from "@/components/home/call_or_chat_area";
import SloganArea from "@/components/home/slogan_area"

export default async function Page() {
  return (
    <>
      <NavBar/>
      <FABChat/>
      <MainCorousel/>
      <FindADealer/>
      <WhyChooseArea/>
      <CategoriesArea/>
      <CallOrChatArea/>
      <SloganArea/>
      <FooterContainer/> 
    </>
  );
}