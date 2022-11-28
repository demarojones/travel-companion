import React from "react";
import { Card, Box, Button, Typography, CardMedia, CardContent, CardActions, Chip, Rating } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';

const PlaceDetail = ({place, isSelected, refProp}) => {

    if (isSelected) refProp?.current?.scrollIntoView({behavior: 'smooth', block:'start'});

    return (
        <Card elevation={6}>
            <CardMedia 
                style={{height:350}}
                image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg' }
                title = {place.name}
                component='img'
            />
            <CardContent>
                <Typography gutterBottom variant="h6">{place.name}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Rating name="read-only" value={Number(place.rating)}  sx={{ fontWeight: 'light', fontSize:'small' }} readOnly />
                    <Typography variant="subtitle1" sx={{ fontWeight: 'light', fontSize:'small' }}>{place.num_reviews}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'light', fontSize:'small' }}>Price</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'light', fontSize:'small' }}>{place.price_level}</Typography>
                </Box>
                <Box sx={{ display:'flex', justifyContent:'space-between'}}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'light', fontSize:'small'}}>Ranking</Typography>
                    <Typography gutterBottom variant="subtitle2" sx={{ fontWeight: 'light', fontSize:'small' }}>{place.ranking}</Typography>
                </Box>
                {
                    place?.awards?.map((award) => (
                        <Box my={1} display="flex" justifyContent="space-between">
                            <img src={award.images.small} alt={award.display_name} />
                            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                        </Box>
                    ))
                }
                {
                    place?.cuisine?.map(({name}) => (
                        <Chip my={1} key={name} size="small" label={name} className="" />
                    ))
                }
                {
                    place?.address && (
                        <Typography gutterBottom variant="body2" color="textSecondary" sx={{ fontWeight: 'light', fontSize:'small' }}>
                            <LocationOnIcon /> {place.address}
                        </Typography>
                    )
                }
                {
                    place?.phone && (
                        <Typography gutterBottom variant="body2" color="textSecondary" sx={{ fontWeight: 'light', fontSize:'small' }} >
                            <LocationOnIcon /> {place.phone}
                        </Typography>
                    )
                }
                <CardActions >
                    <Button color="primary" size="small" onClick={() => window.open(place.web_url, '_blank')}>Trip Advisor</Button>
                    <Button color="primary" size="small" onClick={() => window.open(place.website, '_blank')}>Website</Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}

export default PlaceDetail;