import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import "./driver-details-modal.css";
import { ENDPOINTS } from '../../../apiConfig.js';
import { provider_id } from "../../../util/localStorage.js";
import apiHelper from "../../../util/ApiHelper/ApiHelper.js";
import CloseIcon from '@mui/icons-material/Close';


const ViewDriverDetailsModal = ({ login_token, onClose }) => {
  const [driverDetails, setDriverDetails] = useState(null);
  const navigate = useNavigate();

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  //   console.log(driverDetails);

  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        const response = await apiHelper.get(
          `${ENDPOINTS.GET_DRIVER}?login_token=${login_token}`
        );
        setDriverDetails(response.data);
        // console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching driver details:", error);
      }
    };

    if (login_token) {
      fetchDriverDetails();
    }
  }, [login_token]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/drivers/delete-driver/${driverDetails[0].driver_id}`);
      onClose();
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  return (
    <Modal
      open={!!login_token}
      onClose={() => {
        setDriverDetails(null);
        onClose();
      }}
      aria-labelledby="view-driver-modal"
      aria-describedby="view-driver-modal-description"
    >
      <Box sx={{ ...modalStyle, width: 400 }}>
        <div className="modal-header-container">
        <Typography id="view-driver-modal" variant="h3" component="div">
          Driver Details
        </Typography>
        <CloseIcon onClick={onClose} style={{ cursor: "pointer", paddingTop: "5px" }}/>
        </div>

        {driverDetails ? (
          <>
            <div className="driver-details">
          <div className="detail-row">
            <Typography className="detail-label">Driver's Name:</Typography>
            <Typography className="detail-data">{driverDetails[0].name}</Typography>
          </div>
          <div className="detail-row">
            <Typography className="detail-label">Driver's DOB:</Typography>
            <Typography className="detail-data">{driverDetails[0].dob}</Typography>
          </div>
          <div className="detail-row">
            <Typography className="detail-label">Driver's Address:</Typography>
            <Typography className="detail-data">{driverDetails[0].address}</Typography>
          </div>
          <div className="detail-row">
            <Typography className="detail-label">Driver's Contact:</Typography>
            <Typography className="detail-data">{driverDetails[0].contact}</Typography>
          </div>
          <div className="detail-row">
            <Typography className="detail-label">Driver's Email:</Typography>
            <Typography className="detail-data">{driverDetails[0].email_id}</Typography>
          </div>
          
          <div className="detail-row">
            <Typography className="detail-label">Driver's Login Token:</Typography>
            <Typography className="detail-data">{driverDetails[0].login_token}</Typography>
          </div>
        </div>
          </>
        ) : (
          <Typography>Loading driver details...</Typography>
        )}
        <div className="button-container">

        <Link className="delete-link" onClick={handleDelete}>
            Delete Driver
        </Link>

        <Link
            className="edit-link"
            component={Link}
            to={`/edit-driver?login_token=${login_token}`}
          >
             Edit Driver
          </Link>
        </div>
      </Box>
    </Modal>
  );
};

export default ViewDriverDetailsModal;
