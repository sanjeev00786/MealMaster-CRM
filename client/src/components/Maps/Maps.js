import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, Marker } from '@react-google-maps/api';
import driverMarker from '../../component-assets/driverMarker.svg';
import locationMarker from '../../component-assets/locationMarker.svg';
import "../../pages/CSS/variable.css"

import supabase from '../../supabase';

const Maps = ({ customerData, setTotalRouteDistance, driver_id }) => {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const onLoad = (map) => {
    setMap(map);
  };

  const onDirectionsLoad = (directions) => {
    setDirections(directions);
  };

  const options = {
    fullscreenControl: false,
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    defaultZoom: 15,
  };

  // Mark:- Update Driver Channel
  const updateDriverLocation = async (driverId, newLocation) => {
    const { data, error } = await supabase
      .from('driver_location')
      .upsert({ driver_id: driverId, lat: newLocation.lat, lng: newLocation.lng, driver_name: "" })
      .eq('driver_id', driverId);
    // console.log(data)
    if (error) {
      console.error('Error updating driver location:', error.message);
    }
  };


  useEffect(() => {
    if (userLocation != null) {
      console.log('userLocation updated:', userLocation.position.lat);
      updateDriverLocation(driver_id, userLocation.position);
    }
  }, [userLocation]);

  useEffect(() => {
    if (!map) return;

    const directionsService = new window.google.maps.DirectionsService();

    // Fetch user's initial location
    const fetchUserLocation = (index) => {
      
        const watchId = navigator.geolocation.getCurrentPosition(
          (position) => {
            const initialUserLocation = {
              position: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            };
            setUserLocation((prevUserLocation) => {
              const updatedUserLocation = {
                ...prevUserLocation,
                ...initialUserLocation,
              };

              return updatedUserLocation;
            });

            if (index === 0) {
              const waypoints = [initialUserLocation, ...customerData.slice(0, -1)].map((data) => ({
                location: data.position,
              }));
  
              if (customerData.length !== 0) {
                const origin = waypoints[0].location;
                const destination = customerData[customerData.length - 1].position;
  
                directionsService.route(
                  {
                    origin,
                    destination,
                    waypoints,
                    travelMode: window.google.maps.TravelMode.WALKING,
                  },
                  (response, status) => {
                    if (status === 'OK') {
                      onDirectionsLoad(response);
                      const route = response.routes[0];
                      const totalDistance = route.legs.reduce((acc, leg) => acc + leg.distance.value, 0);
                      setTotalRouteDistance(totalDistance / 1000);
                    } else {
                      console.error(`Directions request failed: ${status}`);
                    }
                  }
                );
              }
            }

          },
          (error) => {
            console.error(`Error getting user's location: ${error.message}`);
          }
        );

    };

    fetchUserLocation(0);
    const intervalId = setInterval(() => {
      fetchUserLocation(1); 
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [customerData, map]);


  return (
      <GoogleMap
        mapContainerStyle={{ height: '400px', width: '100%' }}
        center={userLocation ? userLocation.position : { lat: 49.215605, lng: -123.130685 }}
        onLoad={onLoad}
        options={options}
      >

        {customerData.length === 0 ? (
          userLocation && (
            <Marker
              position={{ lat: userLocation.position.lat, lng: userLocation.position.lng }}
              map={map}
              icon={driverMarker}
            >
            </Marker>
          )
        ) : (
          <>
          {directions && (
            <>
              <DirectionsRenderer
                directions={directions}
                options={{
                  polylineOptions: {
                    strokeColor: '#000000',
                    strokeWeight: 3,
                    strokeOpacity: 0.8,
                  },
                  suppressMarkers: true
                }}
              />
            </>
          )}
          
          {userLocation && (
            <Marker
              position={{ lat: userLocation.position.lat, lng: userLocation.position.lng }}
              map={map}
              icon={driverMarker}
            >
            </Marker>
          )}

          {customerData.map((customer, index) => (
            <Marker
              key={index}
              position={{ lat: customer.position.lat, lng: customer.position.lng }}
              map={map}
              icon={locationMarker}
            />
          ))}
          </>
        )};
      </GoogleMap>
  );
};

export default Maps;