import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import axios from "axios";

const ViewCustomerDetailsModal = ({ customerId, onClose }) => {
  const [customerDetails, setCustomerDetails] = useState(null);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const displayProperties = [
    "name",
    "contact",
    "address",
    "status",
    "payment",
    "diet_notes",
    "dob",
    "tiffin_quantity",
    // "plan_name", // Assuming plan_name is one of the properties you want to display
  ];

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/customer/get-customer/${customerId}`
        );
        console.log(response.data.data.data);
        setCustomerDetails(response.data.data.data);
      } catch (error) {
        console.error("Error fetching customer details:", error);
      }
    };

    if (customerId) {
      fetchCustomerDetails();
    }
  }, [customerId]);

  return (
    <Modal
      open={!!customerId}
      onClose={() => {
        setCustomerDetails(null);
        onClose();
      }}
      aria-labelledby="view-customer-modal"
      aria-describedby="view-customer-modal-description"
    >
      <Box sx={{ ...modalStyle, width: 400 }}>
        <Typography id="view-customer-modal" variant="h6" component="div">
          Customer Details
        </Typography>
        {customerDetails ? (
          <>
            {displayProperties.map((key) => (
              <div key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                {customerDetails[key]}
              </div>
            ))}
          </>
        ) : (
          <Typography>Loading customer details...</Typography>
        )}
        <Button onClick={() => onClose()}>Close</Button>
      </Box>
    </Modal>
  );
};

export default ViewCustomerDetailsModal;
