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

  const [category, setCategory] = useState('restaurants');
  const [rating, setRating] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      console.log('Set initial Coords on Load!!', latitude, longitude);
      console.log('Latitude:: ', parseFloat(latitude), ' Longitude:: ', longitude);
      setCoordinates({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getPlaces({ category, ...coordinates }).then(({ data }) => {
      console.log('Data from web service', data);
      setFilteredPlaces([]);
      const coordUpdates = data?.map((p) => {
        p.latitude = parseFloat(p.latitude);
        p.longitude = parseFloat(p.longitude);
        return p;
      });
      console.log('SETTING UPDATED PLACES::', coordUpdates);
      setPlaces(coordUpdates);
      setIsLoading(false);
    });
  }, [coordinates, category]);

  useEffect(() => {
    const fpl = places.filter((place) => place.rating >= rating);
    setFilteredPlaces(fpl);
  }, [rating]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={2} style={{ width: '100%' }}>
        <Grid item xs={12} md={4} sx={{ height: '85vh', overflow: 'auto' }}>
          <PlaceList
            places={filteredPlaces.length ? filteredPlaces : places}
            selectedPlace={infoWindowClicked}
            isLoading={isLoading}
            rating={rating}
            setRating={setRating}
            category={category}
            setCategory={setCategory}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          {coordinates && (
            <Map
              setBounds={setBounds}
              setCoordinates={setCoordinates}
              setInfoWindowClicked={setInfoWindowClicked}
              coordinates={coordinates}
              places={filteredPlaces.length ? filteredPlaces : places}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default App;
