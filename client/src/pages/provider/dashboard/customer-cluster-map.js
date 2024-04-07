import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import supabase from '../../../supabase'; // Import the Supabase client
import { provider_id } from "../../../util/localStorage"; // Import provider_id from localStorage
import { getProviderIdFromLocalStorage } from '../../../util/localStorage';

// Custom icon with red color
const purpleIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const CustomerMap = () => {
  const [addressPoints, setAddressPoints] = useState([]);

  useEffect(() => {
    const fetchCustomerData = async () => {
      const id = getProviderIdFromLocalStorage();
      try {
        // Make query to fetch customer data for the specified provider_id
        const { data: customers, error } = await supabase
          .from('customers')
          .select('latitude, longitude')
          .eq('provider_id', id);

        if (error) {
          throw error;
        }

        // Transform customer data to addressPoints format
        const newAddressPoints = customers
          .filter(customer => customer.latitude !== null && customer.longitude !== null)
          .map(customer => [
            customer.latitude,
            customer.longitude,
            `Customer`
          ]);

        setAddressPoints(newAddressPoints);
      } catch (error) {
        console.error('Error fetching customer data:', error.message);
      }
    };

    fetchCustomerData();
  }, []);

  return (
    <MapContainer
      className="map-container"
      style={{ height: '400px', width:'80vw' }}
      center={[49.2133447, -122.9971976]}
      zoom={10}
      maxZoom={15}
      scrollWheelZoom={true}
    >
      <MarkerClusterGroup chunkedLoading>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains='abcd'
          maxZoom={19}
        />
        {addressPoints.map((address, index) => (
          <Marker
            key={index}
            position={[address[0], address[1]]}
            icon={purpleIcon}
          />
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default CustomerMap;


