import React from 'react';
import '../driver-login/driver-login.css';
import Header from "../../../components/header/header";
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../../components/CustomButton/CustomButton';
import "../../../components/CustomButton/CustomButton.css";
import axios from 'axios'
import { API_BASE_URL, ENDPOINTS } from '../../../apiConfig.js'
import Loader from '../../../components/Loader/Loader';
import CustomizedSnackbar from "../../../components/Notification/Notification";
import { useState } from 'react';

const DriverLogin = () => {
    const navigate = useNavigate();

    const [token, setToken] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [notificationMessage1, setNotificationMessage1] = useState("");
    const [notificationTriggered, setNotificationTriggered] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
            try {
                const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.GET_DRIVER}?login_token=${token}`);
               console.log(response);
                if (response.data.length === 0) {
                    // Wrong token
                    console.log("token is not valid")
                    setLoading(false);
                    setNotification('Alert', "Token is not valid")
                } else {
                    // right token
                    const driverId = response.data.data[0].driver_id;
                    console.log(driverId);
                    sessionStorage.setItem('driverId', driverId);
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('isLoaderShow', 'true');
                    localStorage.setItem('driver_id', driverId);
                    navigate('/driver_dashboard');
                }
                
            } catch (error) {
                setLoading(false);
                setNotification('Alert', "Token is not valid")
            } finally {
                console.log('finally')
                setLoading(false);
            }
    };

    const handleTokenChange = (event) => {
        setToken(event.target.value);
    };

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
        <div className="login-container">
            <Loader loading={loading} />
            <Header />
            {notificationTriggered && (
                <CustomizedSnackbar decisionMessage={notificationMessage}
                    updateMessage={notificationMessage1} />
            )}
            <div className="welcome-container">

                <h2>Welcome</h2>
                <p>Please login to continue</p>

                <form className="login-form">
                    <TextField
                        type="text"
                        label="Enter your token"
                        variant="standard"
                        fullWidth
                        InputProps={{
                            className: 'login-input',
                            style: {
                                borderBottom: '1px solid #C1C7CD',
                                textAlign: 'center'
                            },
                        }}
                        value={token}
                        onChange={handleTokenChange}
                    />
                    <CustomButton
                        onClick={handleLogin}
                    >
                        Get Started
                    </CustomButton>
                </form>
            </div>
        </div>
    );
};

export default DriverLogin;