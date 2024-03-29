import * as React from "react";
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

export default function AnchorTemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation(); 

  React.useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case "/dashboard":
        setSelectedItem("Dashboard");
        break;
      case "/customerList":
        setSelectedItem("Customers");
        break;
      case "/drivers":
        setSelectedItem("Driver");
        break;
      case "/track-delivery":
        setSelectedItem("Track Delivery");
        break;
      case "/delivery-schedule":
        setSelectedItem("Schedule Deliveries");
        break;
      case "/social-media":
        setSelectedItem("Social Media");
        break;
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
        navigate("/customerList");
        break;
      case "Driver":
        navigate("/drivers");
        break;
      case "Track Delivery":
        navigate("/track-delivery");
        break;
      case "Schedule Deliveries":
        navigate("/delivery-schedule");
        break;
      case "Social Media":
        navigate("/social-media");
        break;
      case "Meal Settings":
        navigate("/meal-plan-list");
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
          "Social Media",
          "Meal Settings",
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
    </div>
  );
}
