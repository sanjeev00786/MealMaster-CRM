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

    const toggleNavigation = (isStop) => {
        console.log(isStop)
        setNavigationStarted(!isNavigationStarted);
    };

    const handleImageCapture = (image) => {
        // Do something with the captured image in this component
        console.log('Captured Image:', image);
        setImagePreview(image);
        // Close the camera after capturing the image
        setCameraOpen(false);
    };

    const completeDeliveryAndStartNext = async () => {
        if (!imagePreview) {
            console.error('No image to upload.');
            return;
        }
        // try {
        //     const imageBlob = await fetch(imagePreview).then((res) => res.blob());
        //     const imageFile = new File([imageBlob], 'image_preview.png', { type: 'image/png' });

        //     // Upload the image file
        //     const downloadURL = await uploadImage(imageFile);

        //     // Do something with the download URL (e.g., save it to your database)
        //     console.log('Image uploaded successfully. URL:', downloadURL);

        //     // Clear the imagePreview state
        //     setImagePreview(null);
        //   } catch (error) {
        //     console.error('Error uploading image:', error.message);
        //   }

        setImagePreview(null);

    };

    const toggleCamera = () => {
        setCameraOpen(!isCameraOpen);
    };

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