import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { ENDPOINTS } from "../../../apiConfig.js";
import { provider_id } from "../../../util/localStorage.js";
import apiHelper from "../../../util/ApiHelper/ApiHelper.js";

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
    "diet_notes",
    "dob",
    "tiffin_quantity",
  ];

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await apiHelper.get(
          `${ENDPOINTS.GET_CUSTOMER}${customerId}`
        );
        console.log(response.data.data);
        setCustomerDetails(response.data.data);
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
      
      <Link to={`/edit-customer/${customerId}`}>
          <Button variant="outlined">Edit Customer</Button>
        </Link>

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
