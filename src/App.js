import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import PlaceList from './components/Places/PlaceList';
import PlaceDetail from './components/PlaceDetail/PlaceDetail';
import Map from './components/Map/Map';
import { CssBaseline, Grid } from '@mui/material';
import { AutoComplete } from '@react-google-maps/api';

const App = () => {
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState('');
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      console.log('Latitude:: ', latitude, ' Longitude:: ', longitude);
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={2} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <PlaceList />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map setBounds={setBounds} setCoordinates={setCoordinates} coordinates={coordinates} />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
