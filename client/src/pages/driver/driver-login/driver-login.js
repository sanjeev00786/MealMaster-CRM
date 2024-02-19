import React, { useState } from 'react';
import '../driver-login/driver-login.css';
import Header from "../../../components/header/header";
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DriverLogin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        console.log('handleLogin is called');
        setLoading(true);
        setTimeout(() => {  
          try {
            console.log('testing');
            navigate('/driver_dashboard');
          } catch (error) {
            console.error('Error:', error);
          }
          setLoading(false);
        }, 2000);
    };


    return (
        <div className="login-container">
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
                            },
                        }}
                    />
                    <LoadingButton
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                        loading={loading}
                        loadingIndicator={<CircularProgress size={24} />}
                        id='login-button'
                    >
                        Get Started
                    </LoadingButton>
                </form>
            </div>
        </div>
    );
};

export default DriverLogin;