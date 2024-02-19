import React from 'react';
import '../../driver/past-deliveries/past-deliveries.css'
import Header from "../../../components/header/header";

const customers = [
    {
        id: 1,
        name: 'John Doe',
        address: '123 Main St, Surrey',
        deliveryStatus: 'Delivered',
    },
    {
        id: 2,
        name: 'Manpreet',
        address: '80 Ave, Surrey',
        deliveryStatus: 'Delivered',
    }, {
        id: 3,
        name: 'John Doe',
        address: '123 Main St, Surrey',
        deliveryStatus: 'Delivered',
    },
    {
        id: 4,
        name: 'Manpreet',
        address: '80 Ave, Surrey',
        deliveryStatus: 'Delivered',
    }
];

const PastDeliveries = () => {

    return (
        <div className="past-deliveries-container">
            <Header />
            <h2>Past Deliveries</h2>
            <div className="customer-list">{generateCustomerItems()}</div>
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
            <div className="image-container">
                <img src={`${process.env.PUBLIC_URL}/assets/images/delivery_photo.png`} alt="DeliveryPhoto" className="delivery-image" />
            </div>
        </div>
    );
};

const generateCustomerItems = () => {
    return customers.map((customer) => (
        <CustomerItem key={customer.id} customer={customer} />
    ));
};



export default PastDeliveries;
