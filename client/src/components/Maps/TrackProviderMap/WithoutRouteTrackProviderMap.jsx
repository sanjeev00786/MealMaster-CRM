import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import driverMarker from '../../../component-assets/driverMarker.svg';
import supabase from '../../../supabase';
import "../../../pages/CSS/variable.css"
import './TrackProviderMap.css'

const WithoutRouteTrackProviderMap = ({ driver_id }) => {
  const [driverLocation, setDriverLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDriverLocation = async () => {
      try {
        const { data, error } = await supabase
          .from('driver_location')
          .select('lat, lng')
          .eq('driver_id', driver_id)
          .single();

        if (error) {
          throw error;
        }
        console.log('******', data.lat)
        if (data) {
          setDriverLocation({ lat: data.lat, lng: data.lng });
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching driver location:', error.message);
      }
    };

    fetchDriverLocation();
  }, [driver_id]);

  return (
    <div className="without-route-map">
      {driverLocation && (
        <GoogleMap
          mapContainerClassName="withoutroute-map-container"
          center={{ lat: driverLocation.lat, lng: driverLocation.lng }}
          zoom={15}
        >
          {isLoading && (
          <div className="loader">
            <div className="spinner"></div>
          </div>
        )}

          <Marker position={driverLocation} 
          icon={{
            url: driverMarker, // Path to the marker image
            scaledSize: new window.google.maps.Size(60, 60), // Adjust size here
          }}
          />
        </GoogleMap>
      )}
    </div>
  );
};

export default WithoutRouteTrackProviderMap;
