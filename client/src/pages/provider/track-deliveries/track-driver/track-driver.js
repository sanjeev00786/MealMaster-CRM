import React, { useEffect, useState } from "react";
import SideBarMenu from "../../../../components/NewSideMenu/NewSideMenu.js";
import { provider_id } from "../../../../util/localStorage.js";
import apiHelper from "../../../../util/ApiHelper/ApiHelper.js";
import Loader from "../../../../components/Loader/Loader.jsx";
import { ENDPOINTS } from "../../../../apiConfig.js.js";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import TrackProviderMap from "../../../../components/Maps/TrackProviderMap/TrackProviderMap.jsx";
import './track-driver.css'
import locationMarker2 from "../../../../component-assets/LocationMarker2.svg"
import phone from "../../../../component-assets/phone.svg"
import marker from "../../../../component-assets/marker.svg"
import locationMarker from "../../../../component-assets/locationMarker.svg"
import WithoutRouteTrackProviderMap from "../../../../components/Maps/TrackProviderMap/WithoutRouteTrackProviderMap.jsx";

export default function TrackDriver() {

    const [loading, setLoading] = React.useState(false);
    const [customerData, setCustomerData] = React.useState([]);
    const [assignTiffinData, setassignTiffinData] = React.useState([]);
    const location = useLocation();

    // Parse the query string to get the driverID and rowData parameters
    const { rowData } = queryString.parse(location.search);

    // Decode the rowData parameter and parse it back to an object
    const row = rowData ? JSON.parse(decodeURIComponent(rowData)) : null;

    useEffect(() => {
        const assignTiffin = async (id) => {
            setLoading(true);
            try {
                const res = await apiHelper.get(
                    `${ENDPOINTS.GET_ASSIGNED_TIFFIN}driver_id=${row.driver_id}`
                );
                console.log(res);
                const customers = res.data.map(i => ({
                    id: i.customers.customer_id,
                    name: i.customers.name,
                    address: i.customers.address,
                    deliveryStatus: 'Pending',
                    position: { lat: parseFloat(i.customers.latitude), lng: parseFloat(i.customers.longitude) }
                }));
                setCustomerData([]);
                setCustomerData(prevCustomerData => [...prevCustomerData, ...customers]);
                setassignTiffinData(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        assignTiffin(`${provider_id}`);
    }, []);

    const handlePhoneClick = () => {
        const phoneNumber = row.contact;
        window.open(`tel:${phoneNumber}`, '_blank');
      };


    return (
        <div className="track-driver-container">
            <Loader loading={loading} />
            <div className="sideBarMenu">
                <SideBarMenu currentPage="/trackDriver" />
            </div>
            <div className="track-map-container">
                 <h2>Tracking {row.name}</h2>
                {customerData.length !== 0  ? (
                    <TrackProviderMap customerData={customerData} driver_id={row.driver_id} />
                ): (
                    <WithoutRouteTrackProviderMap driver_id={row.driver_id} />
                )}
            </div>
            <div className="delivery-status">
                {assignTiffinData.length > 0 ? (
                    <>
                        <div className="ongoing-delivery">
                            <h2>Ongoing Delivery</h2>
                            <div className="delivering-to">
                                <img src={marker} alt="" className="marker" />
                                <p>Delivering to: {assignTiffinData[0].customers.name}</p>
                            </div>
                            <div className="address">
                                <img src={locationMarker2} alt="" className="locationMarker2" />
                                <p>Address: {assignTiffinData[0].customers.address}</p>
                            </div>

                            <div className="driver-detail">
                                <div className="driver-detail1">
                                    <p>Driver: {row.name}</p>
                                    <p>{row.address}</p>
                                </div>
                                <div className="driver-detail2">
                                    <img src={phone} alt="" className="phone" onClick={handlePhoneClick} />
                                </div>
                            </div>

                        </div>
                        <div className="next-delivery-queue">
                            <h2>Next Deliveries In Queue</h2>
                            <ul>
                                {assignTiffinData.slice(1).map((customer, index) => (
                                    <li key={index} className="delivery-item">
                                    <img src={locationMarker} alt="" className="locationMarker" />
                                    <span className="customer-name">{customer.customers.name}
                                    </span>
                                </li>
                                ))}
                            </ul>
                        </div>
                    </>
                ) : (
                    <p>No delivery data available.</p>
                )}
            </div>
        </div>

    );

}
