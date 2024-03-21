import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import driverMarker from '../../component-assets/driverMarker.svg';
import './Maps.css'

const WithoutRouteMaps = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div className="without-route-map">
      {userLocation && (
        <GoogleMap
          mapContainerClassName="withoutroute-map-container"
          center={{ lat: userLocation.lat, lng: userLocation.lng }}
          zoom={15}
        >
          <Marker position={userLocation} icon={driverMarker}
          />
        </GoogleMap>
      )}
    </div>
  );
};

export default WithoutRouteMaps;
