import React, {useState, FunctionComponent, MouseEvent, useEffect} from 'react';

import './gallery-styles.css';
import IconViewer from '@/components/general/icon_viewer';
import HorizonIcon from '@/components/icons/horizon_icon';

export const RealEstateGallery = ({
  image,
  isExtended = false
}) => {
  
  useEffect(() => {
    // console.log('log', isExtended);
    
  }, [isExtended])

  return (
    <div className={`photo-gallery ${isExtended ? 'extended' : ''}`}>
      <div className={`self-start h-full w-full relative p-2
      overflow-hidden flex ${ isExtended ? 'bg-[#b8b8b8]' :'bg-white'} *bg-[#d4d4d4] 
      items-center justify-center`}>
        {
          isExtended ?
          <IconViewer fullHeight src={image} alt={`dealer logo`} adjust/>
          :
          <HorizonIcon className="text-primary-color"/>
        }
      </div>
    </div>
  );
};
