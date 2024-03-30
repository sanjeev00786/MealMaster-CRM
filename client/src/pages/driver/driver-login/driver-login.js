import React from "react";
import "../../CSS/variable.css"
import "../driver-login/driver-login.css";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/CustomButton/CustomButton";
import "../../../components/CustomButton/CustomButton.css";
import axios from "axios";
import { API_BASE_URL, ENDPOINTS } from "../../../apiConfig.js";
import Loader from "../../../components/Loader/Loader";
import CustomizedSnackbar from "../../../components/Notification/Notification";
import { useState } from "react";
import logo from "../../../component-assets/driver-login-logo.svg";
import { driver_id } from "../../../util/localStorage.js";

const DriverLogin = () => {
  const navigate = useNavigate();

  const [token, setToken] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationMessage1, setNotificationMessage1] = useState("");
  const [notificationTriggered, setNotificationTriggered] = useState(false);
  const [isValidToken, setIsValidToken] = React.useState(true); 
  const [isEnterToken, setIsEnterToken] = React.useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    if(token === ""){
        setIsEnterToken(false);
        setTimeout(() => {
          setIsEnterToken(true);
        }, 2000);
        return;
    }
    setLoading(true);
    try {
       
      const response = await axios.get(
        `${API_BASE_URL}${ENDPOINTS.GET_DRIVER}?login_token=${token}`
      );
      console.log(response);
      
      if (response.data.length === 0) {
        // Wrong token
        setIsValidToken(false);
        setLoading(false);
      } else {
        setIsValidToken(true);
        const driverId = response.data.data[0].driver_id;
        console.log(driverId);
        sessionStorage.setItem("driverId", driverId);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("isLoaderShow", "true");
        localStorage.setItem("driver_id", driverId);
        console.log(driver_id)
        navigate("/driver_dashboard");
      }
    } catch (error) {
      setLoading(false);
      setIsValidToken(false);
    } finally {
      console.log("finally");
      setLoading(false);
    }
    setTimeout(() => {
      setIsValidToken(true);
    }, 2000);
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
    <div className="driver-login-container">
      {/* <Header /> */}
      
      <div className="welcome-container">
        <img src={logo} alt="meal Master CRM Logo" />

        <h2 className="driverlogin-page">Driver Login</h2>
        <p>Enter your driver token to login</p>

        <form className="login-form">
          <label >
            Enter Your Login Token<span class="required">*</span>
          </label>
          <input
            type="password"
            variant="standard"
            fullWidth
            className={`login-input ${!isValidToken ? "invalid" : ""}`}
            value={token}
            onChange={handleTokenChange}
            placeholder="Example : A76F46"
          />
           {!isValidToken && (
            <p className="invalid-token-message">
              Invalid Login Token. Please Try Again.
            </p>
          )}
          {!isEnterToken && (<p className="Enter_token">
              Please enter token.
            </p> )}
          <CustomButton
            className="btnDriverLogin driverlogingetStartedBtn"
            onClick={handleLogin}
          >
            Login
          </CustomButton>
        </form>
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

export default DriverLogin;
