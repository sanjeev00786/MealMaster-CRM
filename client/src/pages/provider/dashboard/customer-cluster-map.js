import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import supabase from '../../../supabase'; // Import the Supabase client
import { provider_id } from "../../../util/localStorage"; // Import provider_id from localStorage

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
      try {
        // Make query to fetch customer data for the specified provider_id
        const { data: customers, error } = await supabase
          .from('customers')
          .select('latitude, longitude')
          .eq('provider_id', provider_id);

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
      style={{ height: '400px', width:'100%' }}
      center={[49.2133447, -122.9971976]}
      zoom={10}
      maxZoom={10} // Set the maximum zoom level
      scrollWheelZoom={true}
    >
      <MarkerClusterGroup chunkedLoading>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {addressPoints.map((address, index) => (
          <Marker
            key={index}
            position={[address[0], address[1]]}
            icon={purpleIcon} // Use the custom red icon
          />
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default CustomerMap;


