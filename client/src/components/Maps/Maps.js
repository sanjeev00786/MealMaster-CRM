import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, Marker } from '@react-google-maps/api';
import driverMarker from '../../component-assets/driverMarker.svg';
import locationMarker from '../../component-assets/locationMarker.svg';
import supabase from '../../supabase';

const Maps = ({ customerData }) => {
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

  const updateDriverLocation = async (driverId, newLocation) => {
    const { data, error } = await supabase
      .from('driver_location')
      .upsert({ driver_id: driverId, lat: newLocation.lat, lng: newLocation.lng, driver_name: "Test 2" })
      .eq('driver_id', driverId);
      // console.log(data)
    if (error) {
      console.error('Error updating driver location:', error.message);
    }
  };


  useEffect(() => {
    if (userLocation != null) {
      // console.log('userLocation updated:', userLocation.position.lat);
      updateDriverLocation("725b34cc-bdc1-444c-9f56-d84d9cc70976", userLocation.position);
    }
  }, [userLocation]);

  useEffect(() => {
    if (customerData.length < 2 || !map) return;

    const directionsService = new window.google.maps.DirectionsService();

    // Fetch user's initial location
    const fetchUserLocation = () => {
      const watchId = navigator.geolocation.watchPosition(
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

          const waypoints = [initialUserLocation, ...customerData.slice(0, -1)].map((data) => ({
            location: data.position,
          }));

          const origin = waypoints[0].location;
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
              simulateDriverMovement(response.routes[0].overview_path);
            }
          );
          
        },
        (error) => {
          console.error(`Error getting user's location: ${error.message}`);
        }
      );
    };

    const simulateDriverMovement = (path) => {
      let index = 0;
      const moveDriver = () => {
        if (index < path.length) {
          const newPosition = {
            position: {
              lat: path[index].lat(),
              lng: path[index].lng(),
            },
          };
          setUserLocation(newPosition);
          index++;
          setTimeout(moveDriver, 5000);
        }
      };
      moveDriver();
    };

    fetchUserLocation();
  }, [customerData, map]);


  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ height: '400px', width: '100%' }}
        center={{ lat: 49.215605, lng: -123.130685 }}
        onLoad={onLoad}
        options={options}
      >

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
      </GoogleMap>
    </LoadScript>
  );
};

export default Maps;
