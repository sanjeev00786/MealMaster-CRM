import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import "./MealModal.css";
import logo from "../../component-assets/snackbar_Icon_new.svg";

const DriverModalDelivery = ({
  modalTitle,
  modalDescription,
  onCancel,
  onConfirm,
  isOpen,
  setModalOpen,
}) => {
  const handleClose = () => {
    if (onCancel) {
      onCancel();
    }
    setModalOpen(false); // Close the modal
  };

  const handleOpen = () => {
    setModalOpen(true); // Open the modal
  };

  return (
    <div>
      {/* <Button onClick={() => isOpen && handleOpen()}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <Box className="modal-container">
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              className="close-button"
            >
              <CloseIcon />
            </IconButton>
            <img src={logo} alt="Logo" className="logo" />

            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="modal-title"
            >
              {/* {modalTitle}
               */}
               Completed
            </Typography>
            <Typography
              id="transition-modal-description"
              className="modal-description"
            >
              {/* {modalDescription} */}
              All the deliveries are completed
            </Typography>
            <div className="modal-buttons">
              {/* <button className="cancelBtnModal BtnModal" onClick={onCancel}>
                {" "}
                Cancel{" "}
              </button> */}
              <button className="BtnModal confirmBtnModal" onClick={onConfirm}>
                Back To Home
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default DriverModalDelivery;
