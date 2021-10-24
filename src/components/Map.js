import React, { useState, useEffect, useRef, useCallback } from 'react'
import ReactMapGL, { GeolocateControl, NavigationControl} from 'react-map-gl';
import Geocoder from "react-map-gl-geocoder";

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import Box from '@mui/material/Box';

function Map() {
    const mapboxApiKey = "pk.eyJ1IjoibWVlcGFuZGEiLCJhIjoiY2t0c2lhbjNlMWdvdjMwbWgzazcwdTgzNyJ9.8Eg5ZF3U0sZDQHVjpiZAAA"
    const INITIAL_VIEWPORT = {
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 12
      };
    const mapRef = React.useRef();
    const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
    
    const getUserPosition = () => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setViewport({
              ...viewport,
              latitude,
              longitude
            });
          });
        }
      };
    
    // const handleGeocoderViewportChange = useCallback(
    //     (newViewport) => {
    //         const geocoderDefaultOverrides = { transitionDuration: 1000 };

    //         return handleViewportChange({
    //             ...newViewport,
    //             ...geocoderDefaultOverrides
    //         });
    //     },
    //     [handleViewportChange]
    // );
    

    useEffect(() => {
        //getUserPosition();
      }, []);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', m: 1 }}>
            
            <ReactMapGL
                ref={mapRef}
                width="500px"
                height="600px"
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxApiAccessToken={mapboxApiKey}

                onViewportChange={nextViewport => setViewport(nextViewport)}
                {...viewport}
            >
                <Geocoder
                    mapRef={mapRef}
                    //localGeocoderOnly
                    mapboxApiAccessToken={mapboxApiKey}
                    //position="top-left"
                />
                {/* <GeolocateControl /> */}
                {/* <NavigationControl /> */}
            </ReactMapGL>
        </Box>
    )
}

export default Map
