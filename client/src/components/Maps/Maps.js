import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, Marker } from '@react-google-maps/api';
import driverMarker from '../../component-assets/driverMarker.svg';
import locationMarker from '../../component-assets/locationMarker.svg';
import supabase from '../../supabase';
import CustomizedSnackbar from '../Notification/Notification';

const Maps = ({ customerData, setTotalRouteDistance, driver_id, isNavigationStarted }) => {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [nearestMarkerIndex, setNearestMarkerIndex] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationMessage1, setNotificationMessage1] = useState("");
  const [notificationTriggered, setNotificationTriggered] = useState(false);
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

  const setNotification = (message, message1) => {
    if (!notificationTriggered) {
      setNotificationMessage(message);
      setNotificationMessage1(message1);
      setNotificationTriggered(true);
      setTimeout(() => {
        setNotificationTriggered(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (userLocation != null) {
      // console.log('userLocation updated:', userLocation.position.lat);
      updateDriverLocation(driver_id, userLocation.position);
    }
  }, [userLocation]);

  useEffect(() => {
    if (!map) return;

    const directionsService = new window.google.maps.DirectionsService();

    // Fetch user's initial location
    const fetchUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
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
            console.log('updated User Location', updatedUserLocation)
            return updatedUserLocation;
          });

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
                travelMode: window.google.maps.TravelMode.DRIVING,
              },
              (response, status) => {
                if (status === 'OK') {
                  onDirectionsLoad(response);
                  const route = response.routes[0];
                  const totalDistance = route.legs.reduce((acc, leg) => acc + leg.distance.value, 0);
                  setTotalRouteDistance(totalDistance / 1000);
                  // simulateDriverMovement(response.routes[0].overview_path);
                } else {
                  console.error(`Directions request failed: ${status}`);
                }
              }
            );
          }

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
          checkIfNearMarker(newPosition);
          setTimeout(moveDriver, 1000);
        }
      };
      moveDriver();
    };
    if (isNavigationStarted) {
      simulateDriverMovement(directions.routes[0].overview_path);
    } else {
      fetchUserLocation();
    }

  }, [customerData, map, isNavigationStarted]);

  const checkIfNearMarker = (newPosition) => {
    const distanceThreshold = 50;
    const nearestMarker = customerData.find((customer, index) => {
      const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
        new window.google.maps.LatLng(customer.position.lat, customer.position.lng),
        new window.google.maps.LatLng(newPosition.position.lat, newPosition.position.lng)
      );
      return distance <= distanceThreshold;
    });

    if (nearestMarker) {
      setNearestMarkerIndex(customerData.indexOf(nearestMarker));
      setNotification('Destination Reached', `You have arrived at the customer's location.`)
    } else {
      setNearestMarkerIndex(null);
    }
  };

  return (
    <>
      <GoogleMap
        mapContainerStyle={{ height: '400px', width: '100%' }}
        center={userLocation ? userLocation.position : { lat: 49.215605, lng: -123.130685 }}
        onLoad={onLoad}
        options={options}
      >
        {isLoading && (
          <div className="loader">
            <div className="spinner"></div>
          </div>
        )}
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
                      strokeColor: '#6F59DA',
                      strokeWeight: 5,
                      strokeOpacity: 1,
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
                icon={{
                  url: driverMarker,
                  scaledSize: new window.google.maps.Size(60, 60),
                }}
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
        {notificationTriggered && (
          <CustomizedSnackbar
            decisionMessage={notificationMessage}
            updateMessage={notificationMessage1}
          />
        )}
      </GoogleMap>
    </>
  );
};
export default Maps;
