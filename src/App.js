import React from 'react';
import Header from './components/Header/Header';
import PlaceList from './components/Places/PlaceList';
import PlaceDetail from './components/PlaceDetail/PlaceDetail';
import Map from './components/Map/Map';
import { CssBaseline, Grid } from '@mui/material';
import { AutoComplete } from '@react-google-maps/api';

const App = () => {
  return (
    <div>
      <CssBaseline />

      <Header />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <PlaceList />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map />
        </Grid>
      </Grid>

      <PlaceDetail />
    </div>
  );
};

export default App;
