import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom icon with red color
const redIcon = new L.Icon({
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
  // Hardcoded sample address data
  const addressPoints = [
    [49.1510326, -122.8835703, 'Address 1'],
    [49.1460368, -122.9148049, 'Address 2'],
    [49.2158787, -123.1375797, 'Address 3'],
    // Add more addresses as needed
  ];

  return (
    <MapContainer
      style={{ height: '400px', width:'100%' }}
      // center={[38.9637, 35.2433]}
      center={[49.2133447, -122.9971976]}
      zoom={10}
      maxZoom={18} // Set the maximum zoom level
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
            icon={redIcon} // Use the custom red icon
          />
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default CustomerMap;

