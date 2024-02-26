import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';

const Maps = ({ markers }) => {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);

  const onLoad = (map) => {
    setMap(map);
  };

  const onDirectionsLoad = (directions) => {
    setDirections(directions);
  };

  useEffect(() => {
    if (markers.length < 2 || !map) return;

    const directionsService = new window.google.maps.DirectionsService();

    const origin = markers[0].position;
    const destination = markers[markers.length - 1].position;
    const waypoints = markers.slice(1, -1).map((marker) => ({ location: marker.position }));

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
  }, [markers, map]);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ height: '400px', width: '100%' }}
        center={{ lat: 49.215605, lng: -123.130685 }}
        zoom={9}
        onLoad={onLoad}
      >
        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.position} />
        ))}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default Maps;