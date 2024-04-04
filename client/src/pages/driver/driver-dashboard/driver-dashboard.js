import React, { useEffect, useState } from "react";
import Header from "../../../components/header/header";
import Maps from "../../../components/Maps/Maps";
import "../../CSS/variable.css"
import "../../driver/driver-dashboard/driver-dashboard.css";
import { useNavigate } from "react-router-dom";
import cameraIcon from "../../../component-assets/completedDeliveryPhoto.svg";
import CustomCamera from "../../../components/CustomCamera/CustomCamera";
import Loader from "../../../components/Loader/Loader";
import CustomizedSnackbar from "../../../components/Notification/Notification";
import useCloudinaryUpload from "../../../util/FileUpload/FileUpload";
import apiHelper from "../../../util/ApiHelper/ApiHelper";
import { ENDPOINTS } from "../../../apiConfig.js";
// import { driver_id } from "../../../util/localStorage.js";
import NoDeliveries from "../../../component-assets/NoDeliveries.svg";
import WithoutRouteMaps from "../../../components/Maps/WithoutRouteMap.js";
import { Link } from "react-router-dom";
import deliveryLocationIcon from "../../../component-assets/makerlocation.svg";
import DriverModalDelivery from "../../../components/DriverModal/driverModal.js";
import DriverMenu from "../../../components/DriverMenu/DriverMenu.jsx";
import DriverMenuIcon from '../../../component-assets/menu-icon.svg'
import { getDriverIdFromLocalStorage } from "../../../util/localStorage.js";

const DriverDashboard = () => {
  const navigate = useNavigate();

  const [isNavigationStarted, setNavigationStarted] = useState(false);
  const [isCameraOpen, setCameraOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationMessage1, setNotificationMessage1] = useState("");
  const [notificationTriggered, setNotificationTriggered] = useState(false);
  const [assignTiffinData, setAssignTiffinData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [totalRouteDistance, setTotalRouteDistance] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDriverModal, setIsDriverModal] = useState(false);
  const [driver_id, setDriverId] = useState(null);

  /***************************************************** */

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  /***************************************************** */

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  let isGetAssignTiffinApiCall = false;

  const cloudinaryConfig = {
    cloudName: "djencgbub",
    uploadPreset: "s8ygrkym",
  };

  const toggleNavigation = (isStop) => {
    console.log(isStop);
    updateDriver();
  };

  const cloudinaryFilePath = useCloudinaryUpload(cloudinaryConfig);

  const handleImageCapture = (image) => {
    console.log("Captured Image:", image);
    setImagePreview(image);
    setCameraOpen(false);
  };

  const completeDeliveryAndStartNext = async () => {
    setLoading(true);
    if (!imagePreview) {
      console.error("No image to upload.");
      return;
    }
    cloudinaryFilePath.uploadToCloudinary(imagePreview, (filePath) => {
      if (filePath) {
        console.log("Complete method", filePath);
        updateDeliveryImage(filePath);
      } else {
        setLoading(false);
        setNotification("Alert!", "Something went wrong, please try again.");
      }
    });
  };

  // Call Update Driver Api
  const updateDriver = async () => {
    try {
      const data = {
        driver_id: driver_id,
        driver_status: !isNavigationStarted,
      };

      const responseData = await apiHelper.put(
        `${ENDPOINTS.UPDATE_DRIVER}`,
        data
      );

      // Handle the response data
      if (isNavigationStarted === true) {
        setNotification("Navigation", ` Navigation stopped! `);
      } else {
        setNotification("Navigation", ` Navigation started! `);
      }
      console.log("Response Data:", responseData);
      setNavigationStarted(!isNavigationStarted);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setNotification("Error!", error.message);
      console.error(error.message);
    }
  };

  // Get Assigned Tiffin
  const getAssignedTiffin = async (driver_id) => {
    if (isGetAssignTiffinApiCall === true) {
      return;
    }
    setLoading(true);
    try {
      const responseData = await apiHelper.get(
        `${ENDPOINTS.GET_ASSIGNED_TIFFIN}driver_id=${driver_id}`
      );
      if (responseData.success === true) {
        setAssignTiffinData(responseData.data);
        const customers = responseData.data.map((i) => ({
          id: i.customers.customer_id,
          name: i.customers.name,
          address: i.customers.address,
          deliveryStatus: "Pending",
          position: { lat: i.customers.latitude, lng: i.customers.longitude },
        }));
        console.log(customers);
        setCustomerData([]);
        setCustomerData((prevCustomerData) => [
          ...prevCustomerData,
          ...customers,
        ]);
        if (customers.length === 0) {
          setNavigationStarted(false);
        }
        isGetAssignTiffinApiCall = true;
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
      <div className="customer-item navigation-page-customer-list">
        <div>
          <img
            src={`${deliveryLocationIcon}`}
            // src={`${process.env.PUBLIC_URL}/assets/images/location_icon.svg`}
            alt="Location Icon"
            className="location-icon"
          />
        </div>
        <div className="customer-info">
          <div className="customer-name">{customer.customers.name}</div>
          <div className="customer-address">{customer.customers.address}</div>
          <div className="delivery-status">{customer.deliveryStatus}</div>
        </div>
      </div>
    );
  };

  const generateCustomerItems = () => {
    return assignTiffinData.map((customer) => (
      <CustomerItem key={customer.id} customer={customer} />
    ));
  };

  // Update assign Tiffin
  const updateDeliveryImage = async (imgPath) => {
    setLoading(true);
    console.log("**********", assignTiffinData[0].customers.customer_id);
    try {
      const data = {
        customer_id: assignTiffinData[0].customers.customer_id,
        delivery_status: true,
        delivery_photo_url: imgPath,
      };

      const responseData = await apiHelper.put(
        `${ENDPOINTS.UPDATE_DELIVERY_STATUS}`,
        data
      );
      console.log("Response Data:", responseData);
      moveToPastDelivery(assignTiffinData[0], imgPath);
    } catch (error) {
      setLoading(false);
      setNotification("Error!", error.message);
      console.error(error.message);
    }
  };

  // Delete Assign Tiffin Api
  const deleteAssignTiffin = async (id) => {
    setLoading(true);
    try {
      const responseData = await apiHelper.delete(
        `${ENDPOINTS.DELETE_ASSIGN_TIFFIN}${id}`
      );
      console.log("Response Data:", responseData);
      setTimeout(() => {
        setLoading(false);
        setImagePreview(null);
      }, 1000);
      // Show Modal for completion of delivery
      isGetAssignTiffinApiCall = false;
      getAssignedTiffin(driver_id);
    } catch (error) {
      setLoading(false);
      setNotification("Error!", error.message);
      console.error(error.message);
    }
  };

  // Move to past delivery Api
  const moveToPastDelivery = async (tiffinData, imgPathUrl) => {
    setLoading(true);
    try {
      const data = {
        id: tiffinData.id,
        provider_id: tiffinData.provider_id,
        plan_id: tiffinData.plan_id,
        driver_id: tiffinData.driver_id,
        delivery_status: true,
        delivery_photo_url: imgPathUrl,
        customer_id: tiffinData.customer_id,
      };

      const responseData = await apiHelper.post(
        `${ENDPOINTS.MOVE_TO_PAST_DELIVERY}`,
        data
      );
      console.log("Response Data:", responseData);
      deleteAssignTiffin(assignTiffinData[0].id);
    } catch (error) {
      setLoading(false);
      setNotification("Error!", error.message);
      console.error(error.message);
    }
  };

  // Toggle Camera
  const toggleCamera = () => {
    setCameraOpen(!isCameraOpen);
  };
  const handleCancel = () => {
    console.log("Cancelled");
    setModalOpen(false);
  };

  const handleConfirm = async () => {
    console.log("Confirmed to go back");
    navigate(`/driver_dashboard`);
    setModalOpen(true); // Open the modal  
  }

  useEffect(() => {
    const id = getDriverIdFromLocalStorage();
    const myBooleanValue = localStorage.getItem("isLoaderShow") === "true";
    if (myBooleanValue === true) {
      setNotification("Success!", "Logged In Successfully!");
      localStorage.setItem("isLoaderShow", "false");  
    }
    setDriverId(id);
    getAssignedTiffin(id);
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
    <div className="dashboard-container">

      <DriverMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <div className="driver-dashboard-header">
        <h2>Delivery today</h2>

        <button className="menu-btn" onClick={toggleMenu}>
          <img src={DriverMenuIcon} alt="Menu" style={{ width: '20px' }} />
        </button>
      </div>

      {/* talk with designer about below line */}

      <div className="driver-maps">
        {customerData.length !== 0 ? (
          <Maps
            customerData={customerData}
            setTotalRouteDistance={setTotalRouteDistance}
            driver_id={driver_id}
            isNavigationStarted={isNavigationStarted}
            toggleNavigation={toggleNavigation}
          />
        ) : (
          <WithoutRouteMaps />
        )}
      </div>
      {isCameraOpen && (
        <div className="camera-modal-overlay">
          <CustomCamera
            onImageCapture={handleImageCapture}
            onClose={toggleCamera}
          />
        </div>
      )}

      {assignTiffinData.length === 0 ? (
        <div className="no-delivery">
          <h2>Delivery List</h2>
          <img
            src={NoDeliveries}
            alt="Placeholder"
            className="placeholder-image"
          />
          {/* <DriverModalDelivery
            onConfirm={handleConfirm}
            isOpen={isModalOpen}
            setModalOpen={setModalOpen}
          /> */}
          <DriverModalDelivery
            isOpen={isModalOpen}
            setModalOpen={setModalOpen}
          />

        </div>
      ) : isNavigationStarted ? (
        <div>
          <h2>Current Navigating To</h2>
          <div className="currently-navigating">
            <>
              <p className="name-text">{assignTiffinData[0].customers.name}</p>
              <h3>{assignTiffinData[0].customers.address}</h3>
              <p>{assignTiffinData[0].plans.plan_name}</p>
              {imagePreview ? (
                <div className="image-preview-container">
                  <div className="dashboard-image-container">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="image-preview"
                    />
                    <button className="retakeButtom" onClick={() => setCameraOpen(true)}>
                      Retake Photo
                    </button>
                  </div>
                  <div className="button-container">
                    <button
                      className="complete-button"
                      onClick={completeDeliveryAndStartNext}
                    >
                      Complete and Start Next
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="camera-button"
                  onClick={() => setCameraOpen(true)}
                >
                  <span className="icon-text-container">
                    <img
                      src={cameraIcon}
                      alt="camera icon"
                      className="icon-image"
                    />
                    Click Photo to Complete Delivery
                  </span>
                </button>
              )}
            </>

            <div
              className="stop-navigation-button-container"
              onClick={() => toggleNavigation(true)}
            >
              <button className="stop-navigation-button">
                Stop Navigation
              </button>
            </div>
          </div>
          <h2>Next in Queue</h2>
          <div className="customer-list">{generateCustomerItems()}</div>
        </div>
      ) : (
        <div className="start-navigation-container">
          <h2>Delivery List</h2>
          <div className="start-navigation">
            <button
              className="start-navigation-button"
              onClick={() => toggleNavigation(false)}
            >
              Start Navigation
            </button>
            {/* <p className='name-text'>Today</p> */}
            <h3>
              {customerData.length} Locations ({totalRouteDistance} km)
            </h3>
          </div>
        </div>
      )}
      <div className="past-delivery-link-container">
        <Link to="/past_deliveries" className="past-delivery-link">
          View Past Deliveries
        </Link>
      </div>
      <Loader loading={loading} />
      {notificationTriggered && (
        <CustomizedSnackbar
          decisionMessage={notificationMessage}
          updateMessage={notificationMessage1}
        />
      )}
    </div>
  );
};

export default DriverDashboard;
