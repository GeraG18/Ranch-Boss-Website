import React, {FunctionComponent} from 'react';

// import {getFormattedCurrency} from '../../../libs/format-currency';
// import {FloorplanIcon} from '../../../icons/floor-plan-icon';
// import {BathroomIcon} from '../../../icons/bathroom-icon';
// import {BedroomIcon} from '../../../icons/bedroom-icon';

// import {ListingDetails} from '../../types/types';

import './listing-details-styles.css';
import PlaceIcon from '@/components/icons/place_icon';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export const RealEstateListingDetails = ({
  name, 
  email, 
  phoneNumber, 
  website,
  directionURL, 
  address, 
  distance,
}) => {

  const fT = useTranslations('BasicForm')

  return (
    <div className="details-container">
      <div className="listing-content">
        <h2 className='uppercase'>{name}</h2>
        {/* <p>adadad</p> */}
        <div className="details">
          <div className="detail_item">
            <PlaceIcon width="28" height="28" color="#6897d8"/>
            {distance || "-"} mi&sup1;
          </div>
        </div>

        <p className="description">
          
          <a href={directionURL} target="_blank" className="text-[1rem] 
          py-[0.2rem] m-0 text-black flex items-center underline">{address}</a>
          <a href={`tel:${phoneNumber}`} target="_blank" className="text-[1rem] 
          py-[0.2rem] m-0 text-black h-full flex items-center underline">{phoneNumber}</a>
        </p>

        <p className="price">awdawdawdwad</p>
        <div className="w-full flex gap-2 justify-center items-center flex-col">
          <Link className="cursor-pointer relative text-white bg-primary-color text-[1rem] select-none
              motion-safe:transition-all motion-reduce:transition-none will-change-auto 
              motion-safe:duration-300  w-full mx-1 py-2 flex justify-center items-center uppercase
              lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium"  href="/contact-to-dealer" onClick={() => setDealerInLS()}>{fT('contactThisDealer')}</Link>
          <a className="cursor-pointer relative text-white bg-primary-color text-[1rem] select-none
              motion-safe:transition-all motion-reduce:transition-none will-change-auto uppercase
              motion-safe:duration-300  w-full mx-1 py-2 flex justify-center items-center
              lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium"  href={directionURL} target="_blank">{fT('getDirections')}</a>
          <a className="cursor-pointer relative text-white bg-primary-color text-[1rem] select-none
              motion-safe:transition-all motion-reduce:transition-none will-change-auto uppercase
              motion-safe:duration-300  w-full mx-1 py-2 flex justify-center items-center
              lg:hover:bg-gradient-to-b lg:hover:from-secondary-color lg:hover:to-primary-color font-medium"  href={website}>{fT('webpage')}</a>
        </div>
      </div>
    </div>
  );
};
