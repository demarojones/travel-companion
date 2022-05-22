import { Card } from "@mui/material";
import React from "react";

const PlaceDetail = ({place}) => {
    return (
        <Card>
            <h4>{place.name}</h4>
        </Card>
    );
}

export default PlaceDetail;