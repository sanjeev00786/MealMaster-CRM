import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import { ReactComponent as DashboardIcon } from "../../component-assets/dashboard_icon.svg";
import { ReactComponent as CustomerIcon } from "../../component-assets/customer_icon.svg";
import { ReactComponent as DriverIcon } from "../../component-assets/driver_icon.svg";
import { ReactComponent as TrackIcon } from "../../component-assets/track_delivery_icon.svg";
import { ReactComponent as ScheduleIcon } from "../../component-assets/schedule_delivery_icon.svg";
import { ReactComponent as SocialIcon } from "../../component-assets/social_media_icon.svg";
import { ReactComponent as MealIcon } from "../../component-assets/meal_setting_icon.svg";

import { ReactComponent as DashboardIconF } from "../../component-assets/dashboard-filled.svg";
import { ReactComponent as CustomerIconF } from "../../component-assets/customer-filled.svg";
import { ReactComponent as DriverIconF } from "../../component-assets/driver-filled.svg";
import { ReactComponent as TrackIconF } from "../../component-assets/delivery-filled.svg";
import { ReactComponent as ScheduleIconF } from "../../component-assets/schedule-filled.svg";
import { ReactComponent as SocialIconF } from "../../component-assets/social-filled.svg";
import { ReactComponent as MealIconF } from "../../component-assets/meal-filled.svg";
import { ReactComponent as Logo } from "../../component-assets/logo123.svg";
// import Divider from '@mui/material/Divider'\
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

import "./NewSideMenu.css";
export default function SideBarMenu({ currentPage }) {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    // Determine the selected index based on the current page
    switch (currentPage) {
      case "/dashboard":
        setSelectedIndex(0);
        break;
      case "/customerList/1":
        setSelectedIndex(1);
        break;
      case "/drivers":
        setSelectedIndex(2);
        break;
      case "/trackdeliveries":
        setSelectedIndex(3);
        break;
      case "/trackDriver":
        setSelectedIndex(3);
        break;  
      case "/delivery-schedule/1":
        setSelectedIndex(4);
        break;
      // case "/social-media":
      //   setSelectedIndex(5);
      //   break;
      case "/meal-plan-list":
        setSelectedIndex(5);
        break;
      default:
        setSelectedIndex(0);
    }
  }, [currentPage]);

  const handleMenuItemClick = (index) => {
    setSelectedIndex(index);
    console.log(selectedIndex);

    switch (index) {
      case 0:
        navigate("/dashboard");
        break;
      case 1:
        navigate("/customerList/1");
        break;
      case 2:
        navigate("/drivers");
        break;
      case 3:
        navigate("/trackdeliveries");
        break;
      case 4:
        navigate("/delivery-schedule/1");
        break;
      // case 5:
      //   navigate("/social-media");
      //   break;
      case 5:
        navigate("/meal-plan-list");
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    // Clear session data
    sessionStorage.clear();
    localStorage.clear();
    
    // Redirect to the login page
    navigate("/login-page");
  };


  // Define icons for both regular and filled versions
  const iconList = [
    { regular: <DashboardIcon />, filled: <DashboardIconF /> },
    { regular: <CustomerIcon />, filled: <CustomerIconF /> },
    { regular: <DriverIcon />, filled: <DriverIconF /> },
    { regular: <TrackIcon />, filled: <TrackIconF /> },
    { regular: <ScheduleIcon />, filled: <ScheduleIconF /> },
    // { regular: <SocialIcon />, filled: <SocialIconF /> },
    { regular: <MealIcon />, filled: <MealIconF /> },
  ];

  // Define menu item labels
  const menuLabels = [
    "Dashboard",
    "Customers",
    "Drivers",
    "Track Delivery",
    "Schedule Deliveries",
    // "Social Media",
    "Meal Settings",
  ];

  return (
    <Sidebar>
      <div className="logo-container">
        <Logo className="logo" />
      </div>
      <Menu>
        {iconList.map((icon, index) => (
          <MenuItem
            key={index}
            className={selectedIndex === index ? "selectedMenuItem" : ""}
            icon={selectedIndex === index ? icon.filled : icon.regular}
            onClick={() => handleMenuItemClick(index)}
          >
            {menuLabels[index]}
          </MenuItem>
        ))}
         
      </Menu>
      <Button onClick={handleLogout} className="logoutMenuItem"><span className="logout-btn"><LogoutIcon/>Logout</span></Button>
    </Sidebar>
  );
}
