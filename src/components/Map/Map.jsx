import React, { useCallback, useEffect, useRef, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Paper, Typography, Rating, useMediaQuery } from "@mui/material";
import {LocationOnOutlined} from '@mui/icons-material';

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
const Map = ({coordinates, setCoordinates, setBounds, places, setInfoWindowClicked }) => {
    console.log('Rendering Map now...', coordinates);
    const [map, setMap] = useState(null);
    const onLoad = useCallback(map => setMap(map), []);

    const isMobile = useMediaQuery('(min-width:600px)');
    const {isLoaded} = useJsApiLoader({ googleMapsApiKey: API_KEY });

    useEffect(() => {
        if (map) {
            console.log('Map defined::', map);
            const bounds = new window.google.maps.LatLngBounds();
            console.log('Old Bounds::', bounds);
            // if (places[0]) {
            //     let { latitude, longitude } = places[0];
            //     console.log('FIRST PLACE::', places[0]);
            //     bounds.extend({
            //         lat: latitude,
            //         lng: longitude
            //     });
            // }
            // console.log('New Bounds::', bounds);
            // map.fitBounds(bounds);
        }
    }, [map, places])
    
    console.log('API KEY:: ', API_KEY);
    console.log('Passed Coordinates:: ', coordinates);
    console.log('Passed Places:: ', places);
    if (!isLoaded) return <div><h2>LOADING...</h2></div>
    return (
         <div style={{ height: '100vh', width: '100%' }}>
             <GoogleMap 
                zoom={13}
                center = {coordinates}
                mapContainerClassName = 'map-container'
                yesIwantToUseGoogleMapInternals
                onLoad = {onLoad}
             >
                 {
                     places?.flatMap((place, i) => {
                         console.log('Place Marker:: ', place);
                         if (!place.name) {
                            return [];
                         }
                        return (
                            <InfoWindow key={place.location_id} onLoad={onLoad} position={{ lat: place.latitude, lng: place.longitude }}>
                                <Paper onClick={() => setInfoWindowClicked(i)} key={place.location_id} elevation={3} sx={{ padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100px',cursor: 'pointer'}}>
                                <Typography variant="subtitle2">{place.name}</Typography>
                                <img src={ place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                    alt = { place.name } sx={{cursor: 'pointer'}} />
                                    <Rating name="read-only" value={Number(place.rating)}  sx={{ fontWeight: 'light', fontSize:'small' }} readOnly />
                                </Paper>
                            </InfoWindow>
                        )
                        
                        //  return <Marker key={place.location_id} position={{ lat: place.latitude, lng: place.longitude }} />

                     })
                 }
                 
            </GoogleMap>
            {/* <GoogleMapReact
                bootstrapURLKeys={{ key: API_KEY }} 
                defaultCenter = {defaultProps.center}
                center = {defaultProps.center}
                defaultZoom={defaultProps.zoom}
                // margin = {[50,50,50,50]}
                // options={''}
                // onChange = {(e) => {
                //     console.log('Bounds Changed: ', e);
                //     setCoordinates({lat: e.center.lat, lng: e.center.lng});
                //     console.log('Set Coordinates', e);
                //     setBounds({ne: e.bounds.ne, sw: e.bounds.sw });
                //     console.log('Set Bounds', e);
                // }}
                // onChildClick={()=>''}
                >
            </GoogleMapReact> */}
        </div>
    );
}

export default Map;