import React, {useState} from "react";
import { CircularProgress, Select, FormControl, Typography, InputLabel, MenuItem, Grid,Box } from '@mui/material';
import PlaceDetail from "../PlaceDetail/PlaceDetail";

const PlaceList = () => {

    const [places, setPlaces] = useState([{name: 'Coll Place'}, {name:'Barret Parkway'}, {name: 'Mocho'}]);
    const [placeCategory, setPlaceCategory] = useState('');
    const [rating, setRating] = useState('');

    const handleCategoryChange = (e) => {
        setPlaceCategory(e.target.value);
    }

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    }

    return (
        <Box sx={{padding: '25px'}}>
            <Typography variant="h4">Restaurants, Hotels & Attractions</Typography>
            <FormControl sx={{ minWidth: 120, marginBottom: '30px', marginRight:'2px' }}>
                <InputLabel id="simple-select-label">Category</InputLabel>
                <Select
                    labelId="simple-select-label"
                    id="simple-select"
                    value={placeCategory}
                    label="Category"
                    onChange={handleCategoryChange}
                >
                    <MenuItem value={'restaurants'}>Restaurant</MenuItem>
                    <MenuItem value='hotels'>Hotels</MenuItem>
                    <MenuItem value='attractions'>Attractions</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120, marginBottom: '30px', marginLeft:'3px' }}>
                <InputLabel id="simple-select-label">Rating</InputLabel>
                <Select
                    labelId="rating-label"
                    id="rating-select"
                    value={rating}
                    label="Rating"
                    onChange={handleRatingChange}
                >
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={3}>Above 3.0</MenuItem>
                    <MenuItem value={4}>Above 4.0</MenuItem>
                    <MenuItem value={4.5}>Above 4.5</MenuItem>
                </Select>
            </FormControl>

            <Grid container sx={{}} spacing={3}>
                {
                    places?.map((place, i) => (
                        <Grid item xs={12}>
                            <PlaceDetail place={place} />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
}

export default PlaceList;