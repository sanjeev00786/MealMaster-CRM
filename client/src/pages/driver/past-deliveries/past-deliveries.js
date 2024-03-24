import React from "react";
import "../../driver/past-deliveries/past-deliveries.css";
import Header from "../../../components/header/header";
import apiHelper from "../../../util/ApiHelper/ApiHelper";
import { ENDPOINTS } from "../../../apiConfig.js";
import Loader from "../../../components/Loader/Loader.jsx";
import { useState, useEffect } from "react";
import deliveryDone from "../../../component-assets/pastDeliveryDone.svg";
import DriverMenu from "../../../components/DriverMenu/DriverMenu.jsx";
import DriverMenuIcon from '../../../component-assets/menu-icon.svg'
import { driver_id } from "../../../util/localStorage.js";

const PastDeliveries = () => {
  const [loading, setLoading] = useState(true);
  const [pastDeliveriesData, setpastDeliveriesData] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationMessage1, setNotificationMessage1] = useState("");
  const [notificationTriggered, setNotificationTriggered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getPastDeliveries = async (driver_id) => {
    setLoading(true);
    try {
      const responseData = await apiHelper.get(
        `${ENDPOINTS.GET_PAST_DELIVRIES}driver_id=${driver_id}`
      );
      console.log('******', driver_id);
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
            
          {customer.deliveryStatus ? ('Delivered') :('Pending')}
        </div>
        </div>
      </div>
    );
  };

  const generateCustomerItems = () => {
    return pastDeliveriesData.map((customer, index) => (
      <CustomerItem key={index} customer={customer} />
    ));
  };

  useEffect(() => {
    getPastDeliveries(driver_id);
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="past-deliveries-container">
      {/* <Header /> */}
      <DriverMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <div className="past-deliveries-header">
      <h2>Past Deliveries</h2>
      <button className="menu-btn" onClick={toggleMenu}>
        <img src={DriverMenuIcon} alt="Menu" style={{ width: '20px' }}/>
      </button>  
      </div>
     
      <div className="customer-list">{generateCustomerItems()}</div>
      <Loader loading={loading} />
    </div>
  );
};

export default PastDeliveries;
