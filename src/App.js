import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import PlaceList from './components/Places/PlaceList';
import PlaceDetail from './components/PlaceDetail/PlaceDetail';
import Map from './components/Map/Map';
import { CssBaseline, Grid } from '@mui/material';
import { AutoComplete } from '@react-google-maps/api';
import { getPlaces } from './api';

const App = () => {
  //35.1915136  Longitude::  -84.9155245
  //const [coordinates, setCoordinates] = useState({ lat: 35.1915136, lng: -84.9155245 });
  const [coordinates, setCoordinates] = useState(null);
  const [bounds, setBounds] = useState('');
  const [places, setPlaces] = useState([]);
  const [infoWindowClicked, setInfoWindowClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      console.log('Set initial Coords on Load!!', latitude, longitude);
      console.log('Latitude:: ', parseFloat(latitude), ' Longitude:: ', longitude);
      setCoordinates({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getPlaces(coordinates).then(({ data }) => {
      console.log('Data from web service', data);
      const coordUpdates = data?.map((p) => {
        p.latitude = parseFloat(p.latitude);
        p.longitude = parseFloat(p.longitude);
        return p;
      });
      console.log('SETTING UPDATED PLACES::', coordUpdates);
      setPlaces(coordUpdates);
      setIsLoading(false);
    });
  }, [coordinates]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={2} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <PlaceList places={places} selectedPlace={infoWindowClicked} isLoading={isLoading} />
        </Grid>
        <Grid item xs={12} md={8}>
          {coordinates && (
            <Map
              setBounds={setBounds}
              setCoordinates={setCoordinates}
              setInfoWindowClicked={setInfoWindowClicked}
              coordinates={coordinates}
              places={places}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default App;
