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
import "./MobileSideMenu.css";

export default function AnchorTemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (openState) => () => {
    setOpen(openState);
  };

  const [selectedItem, setSelectedItem] = React.useState(null);

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
              onClick={() => setSelectedItem(text)}
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
