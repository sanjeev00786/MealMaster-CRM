import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../../component-assets/snackbar_icon.svg'; 
import './Notification.css'; 

export default function CustomizedSnackbar({ customMessage }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
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
    <div>
      <Button onClick={handleClick}>Open Snackbar</Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={
          <div className="snackbar">
            <img src={logo} alt="Logo" className="logo" />
            <div className="message">{customMessage}</div>
          </div>
        }
        action={action}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        ContentProps={{
          className: 'custom-snackbar', 
        }}
      />
    </div>
  );
}
