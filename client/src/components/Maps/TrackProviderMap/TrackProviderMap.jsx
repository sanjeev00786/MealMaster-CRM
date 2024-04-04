import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, DirectionsRenderer, Marker } from '@react-google-maps/api';
import driverMarker from '../../../component-assets/driverMarker.svg';
import locationMarker from '../../../component-assets/locationMarker.svg';
import supabase from '../../../supabase';
import "../../../pages/CSS/variable.css"

import './TrackProviderMap.css'

const TrackProviderMap = ({ customerData, driver_id }) => {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const markerRef = useRef(null);
  const [initialCenter, setInitialCenter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const onLoad = (map) => {
    setMap(map);
  };

  const onDirectionsLoad = (directions) => {
    setDirections(directions);
    setIsLoading(false);
  };

  const options = {
    fullscreenControl: false,
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    defaultZoom: 15,
  };

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
          setInitialCenter(initialCenter);
          setDriverLocation({ lat: data.lat, lng: data.lng });
        }
      } catch (error) {
        console.error('Error fetching driver location:', error.message);
      }
    };

    fetchDriverLocation();
  }, [driver_id]);

  // Handshake with channel to retrieve the driver location
  useEffect(() => {
      supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'driver_location',
        },
        (payload) => {
          if (payload.new.driver_id === `${driver_id}`) {
            console.log("updating loca")
            setDriverLocation({ lat: payload.new.lat, lng: payload.new.lng })
          }
        }
      )
      .subscribe();

  }, [driver_id]);

  useEffect(() => {
    if (!map || !driverLocation) return;
    const directionsService = new window.google.maps.DirectionsService();

    const setDirectionToMap = () => {
      const loc = {
        position: {
          lat: driverLocation.lat,
          lng: driverLocation.lng,
        }
      }
      const waypoints = [loc, ...customerData.slice(0, -1)].map((data) => ({
        location: data.position,
      }));
      if (customerData.length !== 0) {
        const origin = loc.position;
        const destination = customerData[customerData.length - 1].position;

        directionsService.route(
          {
            origin,
            destination,
            waypoints,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (response, status) => {
            if (status === 'OK') {
              onDirectionsLoad(response);
            } else {
              console.error(`Directions request failed: ${status}`);
            }
          }
        );
      }

    }

    setDirectionToMap();
  }, [customerData, map, driverLocation]);

  return (
    <div className='track-provider-map-container'>
    <GoogleMap
      mapContainerStyle={{
        height: '80vh',
        width: '100%',
      }}
      className="track-map-container"
      center={initialCenter}
      onLoad={onLoad}
      options={options}
    >
      {isLoading && (
          <div className="loader">
            <div className="spinner"></div>
          </div>
        )}
        
      {customerData.length !== 0 && directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: {
              strokeColor: '#6F59DA',
              strokeWeight: 4,
              strokeOpacity: 1,
            },
            suppressMarkers: true,
            preserveViewport: true,
          }}
        />
      )}

      {driverLocation && (
         <Marker
         ref={markerRef}
         position={driverLocation}
         map={map}
         icon={{
           url: driverMarker,
           scaledSize: new window.google.maps.Size(40, 40),
         }}
       /> 
      )}
     
      {customerData.map((customer, index) => (
        <Marker
          key={index}
          position={customer.position}
          map={map}
          icon={locationMarker}
        />
      ))}
    </GoogleMap>
  </div>
);
};

export default TrackProviderMap;
