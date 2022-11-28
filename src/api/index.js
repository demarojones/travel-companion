import axios from 'axios';

const API_URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng';
const options = {
  params: {
    bl_latitude: '11.847676',
    tr_latitude: '12.838442',
    bl_longitude: '109.095887',
    tr_longitude: '109.149359',
  },
  headers: {
    'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_TRAVEL_ADVISOR_API_KEY,
  },
};

export const getPlaces = async ({ lat, lng }) => {
  try {
    console.log('get places data:: ', lat, lng);
    const options = {
      params: {
        latitude: lat,
        longitude: lng,
        limit: '30',
        currency: 'USD',
        distance: '20',
        open_now: 'false',
        lunit: 'km',
        lang: 'en_US',
      },
      headers: {
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.REACT_APP_TRAVEL_ADVISOR_API_KEY,
      },
    };
    const resp = await axios.get(API_URL, options);
    return resp.data;
  } catch (error) {
    console.error(error);
  }
};
