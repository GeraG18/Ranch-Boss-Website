
import React, { useCallback } from "react";
import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { useTranslations } from "next-intl";

function DealerMarker({
  id,
  latitude,
  longitud,
  isActive,
  onClick
}) {
  const fT = useTranslations('BasicForm');
  
  const handleClick = useCallback(() => {
    onClick(id);
  }, [id, onClick]);
  
  return (
    <AdvancedMarker
    position={{lat:latitude, lng:longitud}}
    onClick={handleClick}
    >
      {/* background={isActive ? '#0f9d58' : '#6897d8'} 
        borderColor={isActive ? '#074d2a' : '#8c3414'} */}
      <Pin 
        background={isActive ? '#6897d8' : '#bd461a'} 
        borderColor={isActive ? '#8c3414' : '#70290f'}
        glyphColor={'#ffffff'}
      />
    </AdvancedMarker>
  );
}

export default React.memo(DealerMarker);
// import React, {FunctionComponent, useState, useEffect} from 'react';
// import {AdvancedMarker, CollisionBehavior} from '@vis.gl/react-google-maps';
// import classNames from 'classnames';

// import './custom-advanced-marker.css';
// import { RealEstateGallery } from './gallery/gallery';
// import { RealEstateListingDetails } from './listing-details/listing-details';

// const DealerMarker = ({
//   id, name, latitude, longitud, logo, email, phoneNumber, 
//   website, currentLocation, directionURL, address, 
//   distance, refReturn, callback = (opened) => {}, isOpened,
//   defaultZIndex = 0, focusZIndex = 500, activeZIndex = 1000
//   // position, logo, callback = () => {}
// }) => {
//   const [clicked, setClicked] = useState(isOpened || false);
//   const [hovered, setHovered] = useState(false);

//   useEffect(() => {
//     callback(clicked ? id : null)
//   }, [clicked])

//   useEffect(() => {
//     setClicked(isOpened)
//   }, [isOpened])

//   const renderCustomPin = () => {
//     return (
//       <>
//         <div className="custom-pin">
//           <button className="close-button">
//             <span className="material-symbols-outlined"> close </span>
//           </button>

//           <div className="image-container" >
//             <RealEstateGallery
//               image={logo}
//               isExtended={clicked}
//             />
//             <span className="icon">
//               {/* <RealEstateIcon /> */}
//             </span>
//           </div>

//           <div className="details-container">
//             <div className="listing-content">
//               <RealEstateListingDetails
//                   name={name} 
//                   email={email} 
//                   phoneNumber={phoneNumber} 
//                   website={website}
//                   directionURL={directionURL} 
//                   address={address} 
//                   distance={distance}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="tip" />
//       </>
//     );
//   };

//   return (
//     <>
//       <AdvancedMarker
//         position={{lat: latitude || 0 , lng: longitud || 0}}
//         title={name}
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//         zIndex={hovered ? focusZIndex : (clicked ? (activeZIndex + id) : defaultZIndex)}
//         className={classNames('custom-marker', {clicked, hovered})}
//         onClick={() =>{ setClicked(!clicked); renderCustomPin()}}>
//         {/* {renderCustomPin()} */}
//       </AdvancedMarker>
//     </>
//   );
// };


// export default DealerMarker

// import React,{useState, useEffect, useCallback, useRef} from "react";
// import { AdvancedMarker, InfoWindow, Pin, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
// import IconViewer from "@/components/general/icon_viewer";
// import { setLocalStorage } from "@/services/local_storage-service";
// import Link from "next/link";
// import { useTranslations } from "next-intl";