import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../../component-assets/snackbar_Icon_new.svg";
import "../../pages/CSS/variable.css"

import "./Notification.css";

export default function CustomizedSnackbar({ decisionMessage, updateMessage }) {
  const [open, setOpen] = useState(false);
  

  useEffect(() => {
    handleClick();
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      message={
        <div className="snackbar">
          <img src={logo} alt="Logo" className="logo" />
          <div className="message">
            <h3>{decisionMessage}</h3>
            <p>{updateMessage}</p>
          </div>
        </div>
      }
      action={action}
      className="absolute-snackbar"
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      ContentProps={{
        className: "custom-snackbar",
      }}
    />
  );
}
