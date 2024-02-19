import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import './Maps.css'

const center = {
  lat: 37.7749,  // Replace with the desired latitude
  lng: -122.4194,  // Replace with the desired longitude
};

const Maps = () => {
  return (
    <LoadScript
      googleMapsApiKey = {process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap
        center={center}
        zoom={12}  
        mapContainerClassName='google-maps-container'
      >
        {/* Add markers, polygons, or other map elements as needed */}
      </GoogleMap>
    </LoadScript>
  );
};

export default Maps;