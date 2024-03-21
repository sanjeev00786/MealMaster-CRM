import React, { useState, useEffect } from 'react';
import { GoogleMap, DirectionsRenderer, Marker } from '@react-google-maps/api';
import driverMarker from '../../../component-assets/driverMarker.svg';
import locationMarker from '../../../component-assets/locationMarker.svg';
import supabase from '../../../supabase';
import './TrackProviderMap.css'

const TrackProviderMap = ({ customerData, driver_id }) => {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);

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

  // Handshake with channel to retrieve the driver location
  useEffect(() => {
    const fetchdriverLocation = supabase
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
            setDriverLocation({ latitude: payload.new.lat, longitude: payload.new.lng })
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
          lat: driverLocation.latitude,
          lng: driverLocation.longitude,
        }
      }
      const waypoints = [loc, ...customerData.slice(0, -1)].map((data) => ({
        location: data.position,
      }));
      console.log("CUSTOMER", customerData)
      if (customerData.length !== 0) {
        const origin = loc.position;
        const destination = customerData[customerData.length - 1].position;

        console.log("Origin:", origin);
        console.log("Destination:", destination);
        console.log("Waypoints:", waypoints);

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
    <div>
      {driverLocation && (
        <GoogleMap
          mapContainerStyle={{
            height: '80vh',
            width: '100%',
          }}
          className="track-map-container"
          center={{ lat: driverLocation.latitude, lng: driverLocation.longitude }}
          onLoad={onLoad}
          options={options}
        >

          {customerData.length === 0 ? (
            driverLocation && (
              <Marker
                position={{ lat: driverLocation.latitude, lng: driverLocation.longitude }}
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
                        strokeWeight: 4,
                        strokeOpacity: 1,
                      },
                      suppressMarkers: true
                    }}
                  />
                </>
              )}

              {driverLocation && (
                <Marker
                  position={{ lat: driverLocation.latitude, lng: driverLocation.longitude }}
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
      )}

    </div>
  );
};

export default TrackProviderMap;
