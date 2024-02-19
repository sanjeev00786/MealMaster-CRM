import React from 'react';
import '../driver-login/driver-login.css';
import Header from "../../../components/header/header";
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../../components/CustomButton/CustomButton';
import "../../../components/CustomButton/CustomButton.css";

const DriverLogin = () => {
    const navigate = useNavigate();

    const [isButtonLoading, setIsButtonLoading] = React.useState(
        false
    );

    const handleLogin = (e) => {
        e.preventDefault();
        setIsButtonLoading(true);

        setTimeout(() => {
            setIsButtonLoading(false);
            navigate('/driver_dashboard');
        }, 3000);
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
                                textAlign: 'center'
                            },
                        }}
                    />
                    <CustomButton
                        isLoading={isButtonLoading}
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