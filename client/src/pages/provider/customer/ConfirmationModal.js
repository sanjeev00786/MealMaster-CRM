import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const ConfirmationModal = ({ open, onClose, onConfirm, message }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-modal"
      aria-describedby="confirmation-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="confirmation-modal-description"
          variant="h6"
          component="div"
          gutterBottom
        >
          Confirmation
        </Typography>
        <Typography
          variant="body2"
          id="confirmation-modal-description"
          sx={{ marginTop: 2, marginBottom: 3 }}
        >
          {message}
        </Typography>
        <Button onClick={onConfirm} variant="contained" sx={{ marginRight: 2 }}>
          Confirm
        </Button>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
