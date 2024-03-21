// import React, { useState, useEffect } from "react";
// import { Modal, Box, Typography, Button } from "@mui/material";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { ENDPOINTS } from "../../../apiConfig.js";
// import { provider_id } from "../../../util/localStorage.js";
// import apiHelper from "../../../util/ApiHelper/ApiHelper.js";

// const ViewCustomerDetailsModal = ({ customerId, onClose }) => {
//   const [customerDetails, setCustomerDetails] = useState(null);

//   const modalStyle = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     bgcolor: "background.paper",
//     boxShadow: 24,
//     p: 4,
//   };

//   const displayProperties = [
//     "name",
//     "contact",
//     "address",
//     "diet_notes",
//     "dob",
//     "tiffin_quantity",
//   ];

//   useEffect(() => {
//     const fetchCustomerDetails = async () => {
//       try {
//         const response = await apiHelper.get(
//           `${ENDPOINTS.GET_CUSTOMER}${customerId}`
//         );
//         console.log(response.data.data);
//         setCustomerDetails(response.data.data);
//       } catch (error) {
//         console.error("Error fetching customer details:", error);
//       }
//     };

//     if (customerId) {
//       fetchCustomerDetails();
//     }
//   }, [customerId]);

//   return (
//     <Modal
//       open={!!customerId}
//       onClose={() => {
//         setCustomerDetails(null);
//         onClose();
//       }}
//       aria-labelledby="view-customer-modal"
//       aria-describedby="view-customer-modal-description"
//     >
//       <Box sx={{ ...modalStyle, width: 400 }}>

//       <Link to={`/edit-customer/${customerId}`}>
//           <Button variant="outlined">Edit Customer</Button>
//         </Link>

//         <Typography id="view-customer-modal" variant="h6" component="div">
//           Customer Details
//         </Typography>
//         {customerDetails ? (
//           <>
//             {displayProperties.map((key) => (
//               <div key={key}>
//                 <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
//                 {customerDetails[key]}
//               </div>
//             ))}
//           </>
//         ) : (
//           <Typography>Loading customer details...</Typography>
//         )}
//         <Button onClick={() => onClose()}>Close</Button>
//       </Box>
//     </Modal>
//   );
// };

// export default ViewCustomerDetailsModal;

import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import { ENDPOINTS } from "../../../apiConfig.js";
import { provider_id } from "../../../util/localStorage.js";
import apiHelper from "../../../util/ApiHelper/ApiHelper.js";
import "./modal.css";
import CloseIcon from "@mui/icons-material/Close";
const ViewCustomerDetailsModal = ({ customerId, onDelete, onClose }) => {
  const [customerDetails, setCustomerDetails] = useState(null);
  const [planName, setPlanName] = useState([]);
  const [disableConfirmationOpen, setDisableConfirmationOpen] = useState(false);
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const mealPlanUrl = `${ENDPOINTS.GET_MEAL_PLAN}provider_id=${provider_id}`;
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await apiHelper.get(
          `${ENDPOINTS.GET_CUSTOMER}${customerId}`
        );
        const mealPlan = await apiHelper.get(mealPlanUrl);
        setCustomerDetails(response.data.data);
        setPlanName(mealPlan.data);
      } catch (error) {
        console.error("Error fetching customer details:", error);
      }
    };
    if (customerId) {
      fetchCustomerDetails();
    }
  }, [customerId]);

  function getPlanName(planId) {
    const matchedPlan = planName.find((plan) => plan.plan_id === planId);
    return matchedPlan ? matchedPlan.plan_name : "N/A";
  }

  const handleDisableConfirmation = () => {
    setDisableConfirmationOpen(true);
  };

  const handleDisableCustomer = () => {
    onDelete(customerId);
    setDisableConfirmationOpen(false);
  };

  console.log(customerDetails);
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
        <div className="modal-header-container">
          <Typography id="view-driver-modal" variant="h3" component="div">
            Customer Details
          </Typography>
          <CloseIcon
            onClick={onClose}
            style={{ cursor: "pointer", paddingTop: "5px" }}
          />
        </div>
        {customerDetails ? (
          <>
            <div className="driver-details">
              <div className="detail-row">
                <Typography className="detail-label">Name:</Typography>
                <Typography className="detail-data">
                  {customerDetails.name}
                </Typography>
              </div>
              <div className="detail-row">
                <Typography className="detail-label">Contact:</Typography>
                <Typography className="detail-data">
                  {customerDetails.contact}
                </Typography>
              </div>
              <div className="detail-row">
                <Typography className="detail-label">Email Address:</Typography>
                <Typography className="detail-data">
                  {customerDetails.email_id}
                </Typography>
              </div>
              <div className="detail-row">
                <Typography className="detail-label">Address:</Typography>
                <Typography className="detail-data">
                  {customerDetails.address}
                </Typography>
              </div>
              <div className="detail-row">
                <Typography className="detail-label">Date of Birth:</Typography>
                <Typography className="detail-data">
                  {customerDetails.dob}
                </Typography>
              </div>
              <div className="detail-row">
                <Typography className="detail-label">Meal Plan:</Typography>
                <Typography className="detail-data">
                  {getPlanName(customerDetails.plan_id)}
                </Typography>
              </div>
              <div className="detail-row">
                <Typography className="detail-label">
                  Diet Preferences:
                </Typography>
                <Typography className="detail-data">
                  {customerDetails.is_veg}
                </Typography>
              </div>
              <div className="detail-row">
                <Typography className="detail-label">
                  Additional Notes:
                </Typography>
                <Typography className="detail-data">
                  {customerDetails.diet_notes}
                </Typography>
              </div>
              <div className="detail-row">
                <Typography className="detail-label">Meal Quantity:</Typography>
                <Typography className="detail-data">
                  {customerDetails.tiffin_quantity}
                </Typography>
              </div>
              <div className="detail-row">
                <Typography className="detail-label">
                  Billing Date (Start Date):
                </Typography>
                <Typography className="detail-data">
                  {customerDetails.billing_cycle}
                </Typography>
              </div>
              <div className="detail-row">
                <Typography className="detail-label">Payment:</Typography>
                <Typography className="detail-data">
                  {customerDetails.payment === true ? "Paid" : "Unpaid"}
                </Typography>
              </div>
              <div className="detail-row">
                <Typography className="detail-label">
                  Customer Subscription:
                </Typography>
                <Typography className="detail-data">
                  {customerDetails.status === true ? "Active" : "Inactive"}
                </Typography>
              </div>
            </div>
          </>
        ) : (
          <Typography>Loading customer details...</Typography>
        )}
        <div className="button-container">
          <Link className="delete-link" onClick={handleDisableConfirmation}>
            Disable Customer
          </Link>
          <ConfirmationModal
            open={disableConfirmationOpen}
            onClose={() => setDisableConfirmationOpen(false)}
            onConfirm={handleDisableCustomer}
            message="Are you sure you want to disable this customer?"
          />
          <Link
            className="edit-link"
            component={Link}
            to={`/edit-customer/${customerId}`}
          >
            Edit Customer
          </Link>
        </div>
      </Box>
    </Modal>
  );
};
export default ViewCustomerDetailsModal;
