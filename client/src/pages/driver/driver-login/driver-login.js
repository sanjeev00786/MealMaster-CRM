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

const DriverLogin = () => {
    const navigate = useNavigate();

    const [token, setToken] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
            try {
                const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.GET_DRIVER}?login_token=${token}`);
                if (response.data.data.length === 0) {
                    // Wrong token
                    console.log("token is not valid")
                    setLoading(false);
                } else {
                    // right token
                    const driverId = response.data.data[0].driver_id;
                    sessionStorage.setItem('driverId', driverId);
                    navigate('/driver_dashboard');
                }
                
            } catch (error) {
                setLoading(false);
            } finally {
                console.log('finally')
                setLoading(false);
            }
    };

    const handleTokenChange = (event) => {
        setToken(event.target.value);
    };

    return (   
        <div className="login-container">          
            <Header />      
    return (
        <div className="login-container">
            <Loader loading={loading} />
            <Header />
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