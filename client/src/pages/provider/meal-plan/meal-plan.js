
import React from 'react';
import Header from "../../../components/header/header";

import CustomizedSnackbar from '../../../components/Notification/Notification';
import '../../../components/Notification/Notification.css'





const MealSettingPage = () => {
  return (
    <div className="login-container">
                  <Header />
                  <div className="welcome-container">


      <h1>Meal Setting</h1>
      <CustomizedSnackbar customMessage="Meal Saved Successfully" />

      </div>
    </div>
  );
};

export default MealSettingPage;
