import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";
import "../../pages/CSS/variable.css"
import "./MobileSideMenu.css";
import LogoutIcon from '@mui/icons-material/Logout';
import TransitionsModal from "../ConfirmationModal/ConfirmationModal";

export default function AnchorTemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoutClick = () => {
    setModalOpen(true);
  }

  const handleClose = () => {
    setModalOpen(false); 
  };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/login-page");
  };

  React.useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case "/dashboard":
        setSelectedItem("Dashboard");
        break;
      case "/customerList/1":
        setSelectedItem("Customers");
        break;
      case "/drivers":
        setSelectedItem("Driver");
        break;
      case "/trackdeliveries":
        setSelectedItem("Track Delivery");
        break;
      case "/delivery-schedule/1":
        setSelectedItem("Schedule Deliveries");
        break;
      // case "/social-media":
      //   setSelectedItem("Social Media");
      //   break;
      case "/meal-plan-list":
        setSelectedItem("Meal Settings");
        break;

      default:
        setSelectedItem(null);
    }
  }, [location.pathname]);

  const toggleDrawer = (openState) => () => {
    setOpen(openState);
  };

  const handleMenuItemClick = (text) => {
    setSelectedItem(text);
    switch (text) {
      case "Dashboard":
        navigate("/dashboard");
        break;
      case "Customers":
        navigate("/customerList/1");
        break;
      case "Driver":
        navigate("/drivers");
        break;
      case "Track Delivery":
        navigate("/trackdeliveries");
        break;
      case "Schedule Deliveries":
        navigate("/delivery-schedule/1");
        break;
      // case "Social Media":
      //   navigate("/social-media");
      //   break;
      case "Meal Settings":
        navigate("/meal-plan-list");
        break;
      case "Logout":
        handleLogoutClick();
        setSelectedItem(null);
        break;
      default:
        break;
    }
  };

  const list = (
    <Box
      className="listContainer"
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {[
          "Dashboard",
          "Customers",
          "Driver",
          "Track Delivery",
          "Schedule Deliveries",
          // "Social Media",
          "Meal Settings",
          "Logout",
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              className={selectedItem === text ? "selected" : "unselected"}
              onClick={() => handleMenuItemClick(text)}
            >
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        {list}
      </Drawer>
      <IconButton
        onClick={toggleDrawer(true)}
        style={{ position: "fixed", top: 8, right: 8 }}
      >
        <MenuIcon />
      </IconButton>
      <TransitionsModal
            modalTitle="Logout"
            modalDescription="Are you sure you want to Logout?"
            onCancel={handleClose}
            onConfirm={handleLogout}
            isOpen={isModalOpen}
            setModalOpen={setModalOpen}
          />
    </div>
  );
}