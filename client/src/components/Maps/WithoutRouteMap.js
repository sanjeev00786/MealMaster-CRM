import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import driverMarker from '../../component-assets/driverMarker.svg';
import "../../pages/CSS/variable.css"

import './Maps.css'

const WithoutRouteMaps = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsLoading(false);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="without-route-map">
     <GoogleMap
        mapContainerClassName="withoutroute-map-container"
        center={{ lat: userLocation ? userLocation.lat : 0, lng: userLocation ? userLocation.lng : 0 }}
        zoom={15}
      >
        {isLoading && (
          <div className="loader">
            <div className="spinner"></div>
          </div>
        )}

        {userLocation && (
          <Marker position={userLocation} 
            icon={{
              url: driverMarker, // Path to the marker image
              scaledSize: new window.google.maps.Size(60, 60), // Adjust size here
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default WithoutRouteMaps;
