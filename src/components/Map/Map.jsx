import React from 'react';
import GoogleMapReact from 'google-map-react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Paper, Typography, Rating, useMediaQuery } from "@mui/material";
import {LocationOnOutlined} from '@mui/icons-material';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const defaultProps = {
    center: {
        lat: 10.99835602,
        lng: 77.01502627
    },
    zoom: 14
};
const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
const Map = ({coordinates, setCoordinates, setBounds}) => {

    const isMobile = useMediaQuery('(min-width:600px)');
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: API_KEY
    });
    
    console.log('API KEY:: ', API_KEY);
    console.log('Passed Coordinates:: ', coordinates);
    if (!isLoaded) return <div><h2>LOADING...</h2></div>
    return (
         <div style={{ height: '100vh', width: '100%' }}>
             <GoogleMap 
                zoom={14}
                center = {coordinates}
                mapContainerClassName = 'map-container'
             >
                 <Marker position={coordinates} />
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