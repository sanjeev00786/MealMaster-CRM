import React from "react";
import "../../driver/past-deliveries/past-deliveries.css";
import Header from "../../../components/header/header";
import apiHelper from "../../../util/ApiHelper/ApiHelper";
import { ENDPOINTS } from "../../../apiConfig.js";
import Loader from "../../../components/Loader/Loader.jsx";
import { useState, useEffect } from "react";
import delete_photo from "../../../component-assets/delete_this_photo.jpg";
import deliveryDone from "../../../component-assets/pastDeliveryDone.svg";

const customers = [
  {
    id: 1,
    name: "John Doe",
    address: "123 Main St, Surrey",
    deliveryStatus: "Delivered",
  },
  {
    id: 2,
    name: "Manpreet",
    address: "80 Ave, Surrey",
    deliveryStatus: "Delivered",
  },
  {
    id: 3,
    name: "John Doe",
    address: "123 Main St, Surrey",
    deliveryStatus: "Delivered",
  },
  {
    id: 4,
    name: "Manpreet",
    address: "80 Ave, Surrey",
    deliveryStatus: "Delivered",
  },
];

const PastDeliveries = () => {
  const [loading, setLoading] = useState(true);
  const [pastDeliveriesData, setpastDeliveriesData] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationMessage1, setNotificationMessage1] = useState("");
  const [notificationTriggered, setNotificationTriggered] = useState(false);

  const getPastDeliveries = async (driver_id) => {
    setLoading(true);
    try {
      const responseData = await apiHelper.get(
        `${ENDPOINTS.GET_PAST_DELIVRIES}driver_id=a539a554-15d8-4eda-9c0e-2d519bcbfd24`
      );
      if (responseData.success === true) {
        setpastDeliveriesData(responseData.data);
        const customers = responseData.data.map((i) => ({
          id: i.customers.customer_id,
          name: i.customers.name,
          address: i.customers.address,
          deliveryStatus: "Pending",
          position: { lat: i.customers.latitude, lng: i.customers.longitude },
          photoUrl: i.delivery_photo_url,
        }));
        console.log(customers);
        setpastDeliveriesData([]);
        setpastDeliveriesData((prevCustomerData) => [
          ...prevCustomerData,
          ...customers,
        ]);
        generateCustomerItems();
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setNotification("Error!", error.message);
      console.error(error.message);
    }
  };

  const CustomerItem = ({ customer }) => {
    console.log(customer);
    return (
      <div className="customer-item">
        <div className="driver_pastdelivery">
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/location_icon.svg`}
              alt="Location Icon"
              className="location-icon"
            />
          </div>
          <div className="customer-info">
            <div className="customer-name">{customer.name}</div>
            <div className="customer-address">{customer.address}</div>
          </div>
        </div>
        <div className="image-container">
          <img src={customer.photoUrl} alt="DeliveryPhoto" className="delivery-image" />

          {/* <img src={`${delete_photo}`} /> */}
        </div>
        <div className="past-delivery-done-div">
            {/* change below src uisng .env  */}
        <img src={`${deliveryDone}`} alt="Delivery Done logo"/>
        <div className="delivery-status deliverydriverstat">
            
          {customer.deliveryStatus}
        </div>
        </div>
      </div>
    );
  };

  const generateCustomerItems = () => {
    return pastDeliveriesData.map((customer) => (
      <CustomerItem key={customer.id} customer={customer} />
    ));
  };

  useEffect(() => {
    getPastDeliveries();
  }, []);

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

  return (
    <div className="past-deliveries-container">
      {/* <Header /> */}
      <h2>Past Deliveries</h2>
      <div className="customer-list">{generateCustomerItems()}</div>
      <Loader loading={loading} />
    </div>
  );
};

export default PastDeliveries;
