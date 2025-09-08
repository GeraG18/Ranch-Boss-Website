import React, {useState, useEffect, useRef, Fragment, useMemo, useCallback} from 'react';
import {APIProvider, InfoWindow, Map} from '@vis.gl/react-google-maps';

import DealerCustomMarker from '@/components/dealers/custom_marker/dealer-marker';
import DealerCard from '@/components/dealers/dealer_card';
import UserMarker from '@/components/dealers/user_marker';
import LoadingLoop from '@/components/icons/loading_loop';
import { useTranslations } from 'next-intl';
import Pagination from '@/components/products/pagination';
import './map_styles.css'
import { useDealersContext } from '@/context/dealers_map_context';
import DealerInfoWindow from '@/components/dealers/dealer_map_v2/dealer_info_window'
import DealerMapIndicator from '@/components/dealers/dealer_map_v2/dealer_map_indicators'

const DealersMap = () => {
    //#region code
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_APIKEY;
    
    const nT = useTranslations('Notes')
    const wT = useTranslations('WeReSorry')
    
    const {
        /* read-only variables */
        paginatedModels, activeDealer, actualPage, totalPages,
        allLocations, mapProps, closestDealer,
        isLoading, userPoint, DEFAULT_CAM_VALUES,
        /* switching area */
        switchPage, switchActiveMarkerId, switchMapProps,
    } = useDealersContext();

    const [cameraProps, setCameraProps] = useState({
        center: DEFAULT_CAM_VALUES.center,
        zoom: 5
    });

    const handleCameraChange = (ev) => {
        setCameraProps({
          center: ev.detail.center,
          zoom: ev.detail.zoom
        });
    };

    const handleMarkerClick = useCallback((id) => {
        switchActiveMarkerId(prevId => prevId === id ? null : id);
    }, []);

    useEffect(() => {
        setCameraProps(mapProps)
        // // console.log('setMapProps', mapProps);
    }, [mapProps])
    //#endregion
    
    //#region view
    return (
        <>
            <div className="flex gap-4 flex-col-reverse my-8 lg:gap-0 h-fit *lg:h-[93vh] lg:flex-row
                mx-4 max-w-(--breakpoint-xl) z-100 xl:mx-auto font-['Montserrat']">
                <div className="w-full *h-full grid grid-cols-1 grid-rows-[1fr_auto] lg:px-4">
                    <div className="h-full w-full overflow-y-hidden flex flex-col gap-1 lg:gap-0">
                        {
                            isLoading ? 
                            <LoadingLoop className="text-gray-700" width="42" height="42" style={{alignSelf:'center'}}/>
                            :
                            <>
                                {
                                    paginatedModels.length > 0 ?
                                    <>
                                        {
                                            paginatedModels.map((marker, index) => (
                                                <Fragment  key={marker.id}>
                                                    <div className="w-full h-[2px] bg-transparent lg:bg-[#f3f3f3]"></div>
                                                    <DealerCard
                                                        id={marker.id}
                                                        name={marker.name}
                                                        logo={marker.logo}    
                                                        distance={marker.distance}
                                                        address={marker.address}
                                                        phoneNumber={marker.numberPhone}
                                                        directionURL={marker.directionUrl}
                                                        callback={
                                                            (id) => {
                                                                switchActiveMarkerId(id)
                                                            }
                                                        }
                                                    />
                                                    {
                                                        index + 1 === paginatedModels.length &&
                                                        <div className="w-full h-[2px] bg-transparent flex-none lg:bg-[#f3f3f3]"></div>
                                                    }
                                                </Fragment>
                                            ))
                                        }
                                    </>
                                    :
                                    <div className="col-span-full mt-4 flex items-center justify-center gap-2 flex-col w-full h-fit">
                                        <h1 className="font-['Michroma'] text-[2rem] m-0">{wT('title')}</h1>
                                        <p className="m-0">{wT('description')}</p>
                                    </div>
                                }
                            </>
                        }
                        
                    </div>
                    {
                        paginatedModels.length > 0 &&
                        <Pagination
                            currentPage={actualPage} 
                            totalPages={totalPages} 
                            onChange={(val) => {switchPage(val)}}
                        />
                    }
                </div>
                <div className="w-full h-140 lg:h-[90vh] rounded-[10px] overflow-hidden relative *lg:h-full advanced-marker-example
                bg-[#b5b5b5]">
                    {
                        apiKey ?
                        <>
                            <APIProvider apiKey={apiKey}>
                                <Map onClick={() => switchActiveMarkerId(null)}
                                    {...cameraProps}
                                    onCameraChanged={handleCameraChange}
                                    gestureHandling={'cooperative'}
                                    label='dark'
                                    mapId='dd4223a6c1d7af2c'
                                    mapTypeId='roadmap'
                                    disableDefaultUI
                                >
                                    <UserMarker position={userPoint}/>
                                    {
                                        allLocations.map((dealer) => (
                                        <DealerCustomMarker 
                                            key={+dealer.id}
                                            id={+dealer.id}
                                            address={dealer.address}
                                            zip={dealer.zip}
                                            name={dealer.name}
                                            logo={dealer.logo}
                                            latitude={+dealer.latitude}
                                            longitud={+dealer.longitud}
                                            phoneNumber={dealer.numberPhone}
                                            state={dealer.state}
                                            city={dealer.city}
                                            email={dealer.email}
                                            website={dealer.website}
                                            directionURL={dealer.directionURL}
                                            distance={dealer.distance}
                                            isActive={closestDealer.id === dealer.id}
                                            onClick={handleMarkerClick}
                                        />  
                                        ))
                                    }

                                    {activeDealer && (
                                        <InfoWindow
                                        position={{lat:+activeDealer.latitude, lng:+activeDealer.longitud}}
                                        onCloseClick={() => switchActiveMarkerId(null)}
                                        >
                                            <DealerInfoWindow/>
                                        </InfoWindow>
                                    )}
                                </Map>
                            </APIProvider>
                            <DealerMapIndicator/>
                            <div className="flex flex-col items-center justify-center absolute bottom-5 right-0 gap-1">
                                <div className="cursor-pointer relative text-white flex-none border-none uppercase
                                bg-primary-color text-[1rem] select-none motion-safe:transition-all 
                                motion-reduce:transition-none will-change-auto motion-safe:duration-300 
                                mx-1 p-[0.45rem] flex justify-center items-center rounded-[10px] self-end 
                                lg:hover:bg-primary-color" 
                                onClick={() => { setCameraProps((prev) => ({...prev, zoom: (cameraProps.zoom + 1 <= 20 ? cameraProps.zoom+1 : cameraProps.zoom) })) }}>
                                    <span className="material-icons notranslate " >
                                        add
                                    </span>
                                </div>
                                <div className="cursor-pointer relative text-white flex-none border-none uppercase
                                bg-primary-color text-[1rem] select-none motion-safe:transition-all 
                                motion-reduce:transition-none will-change-auto motion-safe:duration-300 
                                mx-1 p-[0.45rem] flex justify-center items-center rounded-[10px] self-end 
                                lg:hover:bg-primary-color" onClick={() => { setCameraProps((prev) => ({...prev, zoom: (cameraProps.zoom - 1 !== 0 ? cameraProps.zoom-1 : cameraProps.zoom) }))  }}>
                                    <span className="material-icons notranslate " >
                                        remove
                                    </span>
                                </div>
                            </div>
                        </>
                        : 
                        <div style={{borderRadius:"5px", backgroundColor:"#f3f3f3", width:"100%", height:"100%" }}></div>
                    }
                </div>
            </div>
            <div className="mx-4 mb-8 max-w-(--breakpoint-xl) z-100 xl:mx-auto font-['Montserrat'] text-[#73767a]">
                <span className="px-2 font-['Michroma'] uppercase text-[2rem] 
                lg:pb-[10px] lg:pl-[20px] lg:pr-[100px]">{nT('title')}</span>
                <p className="px-2">
                    &sup1;) {nT('linearMiles')}
                </p>

            </div>
        </>
    );
    //#endregion
}

export default DealersMap;