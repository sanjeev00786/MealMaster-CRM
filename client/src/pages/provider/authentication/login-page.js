import React from "react";
import "./login-page.css";
import Login from "../../../components/Login/Login";
import AuthImage from "../../../component-assets/auth-page-image.png";
import { ReactComponent as Logo } from "../../../component-assets/logo123.svg";
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="login-page-continer">
      <div className="auth-page-image-container">
        <img src={AuthImage} alt="Auth Page Image" />
      </div>

      <div className="login-form-container">
        <div className="logo-svg-container">
            <Logo className="logo"/>
        </div>
        <div className="heading-link-container">
        <Link to="/driver_login">Login as a Driver</Link>
        <h2>Sign In / Sign Up as an Admin</h2>
        </div>

        <Login />

        <p className="copyright">© 2024, MealMaster CRM, All Rights Reserved</p>
      </div>
    </div>
  );
};

export default LoginPage;
