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
            setLoading(false);
            console.log("*******", cloudinaryFilePath.filePath);
            setImagePreview(null);
        }, 1);
    };

    // Call Update Driver Api
    const updateDriver = async () => {
        setLoading(true);
        try {
            const data = {
              "driver_id": '725b34cc-bdc1-444c-9f56-d84d9cc70976',
              "driver_status": !isNavigationStarted,
            };

            const responseData = await apiHelper.put(`${ENDPOINTS.UPDATE_DRIVER}`, data);
            
            // Handle the response data
            if (isNavigationStarted === true) {
                setNotificationMessage('Navigation Stopped.')
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