import React, { useRef, useState } from 'react';
import Header from "../../../components/header/header";
import Maps from '../../../components/Maps/Maps';
import '../../driver/driver-dashboard/driver-dashboard.css'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    const [isActionSheetVisible, setActionSheetVisible] = useState(false);

    const toggleActionSheet = () => {
        setActionSheetVisible(!isActionSheetVisible);
    };

    const hideActionSheet = () => {
        setActionSheetVisible(false);
        navigate('/past_deliveries');
    };

    React.useEffect(() => {
        if (!isActionSheetVisible) {
            toggleActionSheet();
        }
    });

    return (
        <div className="dashboard-container">
            <Header />
            <h2>Dashboard</h2>
            <Maps markers={customers} />
            <h2>Current Delivery</h2>
            <div className="customer-list">{generateCustomerItems()}</div>
            <div className="action-button-container">
                {isActionSheetVisible && (
                    <div className="action-sheet">
                        <button className="action-button" onClick={hideActionSheet}>
                            Start Navigation
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const CustomerItem = ({ customer }) => {
    // const [isCameraOpen, setIsCameraOpen] = useState(false);
    // const videoRef = useRef(null);

    // const openCamera = async () => {
    //     try {
    //         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    //         if (videoRef.current) {
    //             videoRef.current.srcObject = stream;
    //         }
    //         setIsCameraOpen(true);
    //     } catch (error) {
    //         console.error('Error accessing camera:', error);
    //     }
    // };
    return (
        <div className="customer-item">
            <img src={`${process.env.PUBLIC_URL}/assets/images/location_icon.svg`} alt="Location Icon" className="location-icon" />
            <div className="customer-info">
                <div className="customer-name">{customer.name}</div>
                <div className="customer-address">{customer.address}</div>
                <div className="delivery-status">{customer.deliveryStatus}</div>
            </div>
            {/* <div className="customer-actions">
                <div className="camera-icon-container">
                    <PhotoCameraIcon className="camera-icon" onClick={openCamera} />
                    <video ref={videoRef} style={{ display: isCameraOpen ? 'block' : 'none' }} autoPlay />
                </div>
            </div> */}
        </div>
    );
};

const generateCustomerItems = () => {
    return customers.map((customer) => (
        <CustomerItem key={customer.id} customer={customer} />
    ));
};

export default DriverDashboard;