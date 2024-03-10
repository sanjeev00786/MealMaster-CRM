import React, { useEffect, useState } from 'react';
import Header from "../../../components/header/header";
import Maps from '../../../components/Maps/Maps';
import '../../driver/driver-dashboard/driver-dashboard.css'
import { useNavigate } from 'react-router-dom';
import supabase from '../../../supabase';
import cameraIcon from '../../../component-assets/camera.svg';
import CustomCamera from '../../../components/CustomCamera/CustomCamera';
import Loader from '../../../components/Loader/Loader';
import CustomizedSnackbar from "../../../components/Notification/Notification";
import useCloudinaryUpload from '../../../util/FileUpload/FileUpload';
import apiHelper from '../../../util/ApiHelper/ApiHelper';
import { ENDPOINTS } from '../../../apiConfig.js';

const customers = [
    {
        id: 1,
        name: 'John Doe',
        address: '123 Main St, Surrey',
        deliveryStatus: 'Pending',
        position: { lat: 49.2250, lng: -123.1076 }
    },
    {
        id: 2,
        name: 'Manpreet',
        address: '80 Ave, Surrey',
        deliveryStatus: 'Pending',
        position: { lat: 49.2814, lng: -123.1113 }
    }, {
        id: 3,
        name: 'John Doe',
        address: '123 Main St, Surrey',
        deliveryStatus: 'Pending',
        position: { lat: 49.2842, lng: -123.1144 }
    }
];

const DriverDashboard = () => {
    // const navigate = useNavigate();

    const [isNavigationStarted, setNavigationStarted] = useState(false);
    const [isCameraOpen, setCameraOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [notificationMessage1, setNotificationMessage1] = useState("");

    let assignTiffinData = {};

    const cloudinaryConfig = {
        cloudName: 'djencgbub',
        uploadPreset: 's8ygrkym',
    };

    const toggleNavigation = (isStop) => {
        console.log(isStop)
        updateDriver()
    };

    const cloudinaryFilePath = useCloudinaryUpload(cloudinaryConfig);

    const handleImageCapture = (image) => {
        console.log('Captured Image:', image);
        setImagePreview(image);
        setCameraOpen(false);
    };

    const completeDeliveryAndStartNext = async () => {
        setLoading(true);
        if (!imagePreview) {
            console.error('No image to upload.');
            return;
        }
        await cloudinaryFilePath.uploadToCloudinary(imagePreview);
        setTimeout(() => {
            updateDeliveryImage(cloudinaryFilePath.filePath);
            console.log("*******", cloudinaryFilePath.filePath, cloudinaryFilePath);
            setImagePreview(null);
        }, 1000);
    };

    // Call Update Driver Api
    const updateDriver = async () => {
        try {
            const data = {
              "driver_id": '725b34cc-bdc1-444c-9f56-d84d9cc70976',
              "driver_status": !isNavigationStarted,
            };

            const responseData = await apiHelper.put(`${ENDPOINTS.UPDATE_DRIVER}`, data);
            
            // Handle the response data
            if (isNavigationStarted === true) {
                // setNotificationMessage('Navigation Stopped.')
                setNotificationMessage("Navigation");
                setNotificationMessage1(
                  ` Navigation stopped Sucessfully! `
                );
            } else {
                setNotificationMessage('Navigation Started.')
            }
            console.log('Response Data:', responseData);
            setNavigationStarted(!isNavigationStarted);
            setLoading(false);
          } catch (error) {
            setLoading(false);
            setNotificationMessage(error.message);
            console.error(error.message);
          }
    }

    // Get Assigned Tiffin
    const getAssignedTiffin = async (driver_id) => {
        setLoading(true);
        try {
            const responseData = await apiHelper.get(`${ENDPOINTS.GET_ASSIGNED_TIFFIN}?driver_id=${driver_id}`);
            console.log('Response Data:', responseData);
            if (responseData.success === true) {
                assignTiffinData = responseData.data;
            }
            setLoading(false);
          } catch (error) {
            setLoading(false);
            setNotificationMessage(error.message);
            console.error(error.message);
          }
    }

    // Update assign Tiffin 
    const updateDeliveryImage = async (imgPath) => {
        setLoading(true);
        try {
            const data = {
              "customer_id": '62f87964-4ec5-4466-b156-78c9679e24c8',
              "delivery_status": true,
              "delivery_photo_url": imgPath
            };

            const responseData = await apiHelper.put(`${ENDPOINTS.UPDATE_DELIVERY_STATUS}`, data);
            console.log('Response Data:', responseData);
            setLoading(false);
          } catch (error) {
            setLoading(false);
            setNotificationMessage(error.message);
            console.error(error.message);
          }
    }

    // Delete Assign Tiffin Api
    const deleteAssignTiffin = async (id) => {
        setLoading(true);
        try {
            const responseData = await apiHelper.delete(`${ENDPOINTS.UPDATE_DELIVERY_STATUS}/${id}`);
            console.log('Response Data:', responseData);
            setLoading(false);
          } catch (error) {
            setLoading(false);
            setNotificationMessage(error.message);
            console.error(error.message);
          }
    }

    // Move to past delivery Api
    const moveToPostDelivery = async (tiffinData, imgPathUrl) => {
        setLoading(true);
        try {
            const data = {
                id: tiffinData.id,
                provider_id: tiffinData.provider_id,
                plan_id: tiffinData.plan_id,
                driver_id: tiffinData.driver_id,
                delivery_status: true,
                delivery_photo_url: imgPathUrl,
                customer_id: tiffinData.customer_id
              };

            const responseData = await apiHelper.put(`${ENDPOINTS.MOVE_TO_PAST_DELIVERY}`, data);
            console.log('Response Data:', responseData);
            setLoading(false);
          } catch (error) {
            setLoading(false);
            setNotificationMessage(error.message);
            console.error(error.message);
          }
    }

    // Toggle Camera
    const toggleCamera = () => {
        setCameraOpen(!isCameraOpen);
    };

   // Handshake with channel to retrieve the driver location
    useEffect(() => {

        const driverLocation = supabase
            .channel('custom-all-channel')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'driver_location',
                },
                (payload) => {
                    if (payload.new.driver_id === "725b34cc-bdc1-444c-9f56-d84d9cc70976") {
                        console.log('Updated Location:', { latitude: payload.new.lat, longitude: payload.new.lng });
                    }
                }
            )
            .subscribe();

        return () => {
            driverLocation.unsubscribe();
        };
    }, []);

    useEffect(() => {
        const myBooleanValue = localStorage.getItem('isLoaderShow') === 'true';
        if (myBooleanValue === true) {
            setNotificationMessage('Logged In Successfully!')
            localStorage.setItem('isLoaderShow', 'false');
        }
        getAssignedTiffin('725b34cc-bdc1-444c-9f56-d84d9cc70976')
        setTimeout(() => {
            setLoading(false);
            setNotificationMessage('')
        }, 4000);

    }, []);


    return (
        <div className="dashboard-container">
            <Loader loading={loading} />
            <Header />
            {notificationMessage && (
                <CustomizedSnackbar customMessage={notificationMessage} />
            )}
            <h2>Dashboard</h2>
            <Maps customerData={customers} />
            {isCameraOpen && (
                <div className="camera-modal-overlay">
                    <CustomCamera onImageCapture={handleImageCapture} onClose={toggleCamera} />
                </div>
            )}
            {isNavigationStarted ? (
                <div>
                    <h2>Current Navigating To</h2>
                    <div className='currently-navigating'>
                        <p className='name-text'>Samuel Peterson</p>
                        <h3>1234, 120 Street Surrey, BC, V3M 5J8</h3>
                        <p>1 Deluxe Lunchbox</p>
                        {imagePreview ? (
                            <div className="image-preview-container">
                                <div className='dashboard-image-container'>
                                    <img src={imagePreview} alt="Preview" className="image-preview" />
                                    <button onClick={() => setCameraOpen(true)}>Retake Photo</button>
                                </div>
                                <div className="button-container">
                                    <button className='complete-button' onClick={completeDeliveryAndStartNext}>Complete and Start Next</button>
                                </div>
                            </div>
                        ) : (
                            <button className="camera-button" onClick={() => setCameraOpen(true)}>
                                <span className="icon-text-container">
                                    <img src={cameraIcon} alt="camera icon" className="icon-image" />
                                    Click Photo to Complete Delivery
                                </span>
                            </button>
                        )};

                        <div className='stop-navigation-button-container' onClick={() => toggleNavigation(true)}>
                            <button className="stop-navigation-button">
                                Stop Navigation
                            </button>
                        </div>
                    </div>
                    <h2>Next in Queue</h2>
                    <div className="customer-list">{generateCustomerItems()}</div>
                </div>
            ) : (
                <div className='start-navigation-container'>
                    <h2>Delivery List</h2>
                    <div className='start-navigation'>
                        <p className='name-text'>Today</p>
                        <h3>5 Locations (13km)</h3>
                        <button className="start-navigation-button" onClick={() => toggleNavigation(false)}>
                            Start Navigation
                        </button>
                    </div>
                </div>
            )};
        </div>
    );
};

const CustomerItem = ({ customer }) => {
    return (
        <div className="customer-item">
            <img src={`${process.env.PUBLIC_URL}/assets/images/location_icon.svg`} alt="Location Icon" className="location-icon" />
            <div className="customer-info">
                <div className="customer-name">{customer.name}</div>
                <div className="customer-address">{customer.address}</div>
                <div className="delivery-status">{customer.deliveryStatus}</div>
            </div>
        </div>
    );
};

const generateCustomerItems = () => {
    return customers.map((customer) => (
        <CustomerItem key={customer.id} customer={customer} />
    ));
};

export default DriverDashboard;