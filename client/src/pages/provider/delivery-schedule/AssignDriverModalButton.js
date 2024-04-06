import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import "../../CSS/variable.css"

import apiHelper from "../../../util/ApiHelper/ApiHelper.js";
import supabase from "../../../supabase";
import { API_BASE_URL, ENDPOINTS } from "../../../apiConfig.js";
import axios from "axios";

const AssignDriverModalButton = ({
  providerId,
  onAssignDriver,
  updateParent,
  onSuccess,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState("");

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const pushToAssignedTiffin = async (providerId, selectedDriver, data) => {
    try {
      if (!data || data.length === 0) {
        console.log("No data to process.");
        return;
      }

      console.log(data);

      const records = data.map((customer) => ({
        driver_id: selectedDriver.driver_id,
        driver_name: selectedDriver.name,
        provider_id: providerId,
        plan_id: customer.plan_id,
        customer_id: customer.customer_id,
      }));

      const { error: insertError } = await supabase
        .from("assigned_tiffin")
        .upsert(records);

      if (insertError) {
        throw new Error(
          `Error inserting/updating records in assigned_tiffin table: ${insertError.message}`
        );
      }

      console.log("Records inserted/updated successfully.");

      const customerIdsToUpdate = data.map((customer) => customer.customer_id);

      if (customerIdsToUpdate.length > 0) {
        const { data: updateResult, error: updateError } = await supabase
          .from("customers")
          .update({ is_assigned_driver: true })
          .in("customer_id", customerIdsToUpdate);

        if (updateError) {
          console.error(
            "Error updating is_assigned_driver in customers table:",
            updateError
          );
          throw new Error(
            `Error updating is_assigned_driver in customers table: ${updateError.message}`
          );
        }
        onSuccess();
        console.log(
          "is_assigned_driver updated for assigned customers:",
          updateResult
        );
      } else {
        console.log("No customers to update.");
      }
    } catch (error) {
      console.error("Error pushing data to assigned_tiffin table:", error);
    }
  };

  const handleOpenModal = async () => {
    setOpenModal(true);
    // Fetch drivers from the API using the provided providerId
    try {
      const response = await axios.get(
        `${API_BASE_URL}${ENDPOINTS.GET_ALL_DRIVER}provider_id=${providerId}`
      );
      console.log(response.data);
      const allDrivers = response.data.data;

      const availableDrivers = allDrivers.filter(driver => driver.driver_status === true);
      
      console.log("++++++++ welcome", availableDrivers)
      setDrivers(availableDrivers);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  console.log(onAssignDriver);

  // const handleAssignDriver = () => {
  //   if (selectedDriver) {
  //     let customerData = onAssignDriver;
  //     pushToAssignedTiffin(providerId, selectedDriver, customerData);
  //     handleCloseModal();
  //   } else {
  //     alert("Please select a driver before assigning.");
  //   }
  // };

  const handleAssignDriver = () => {
    if (selectedDriver) {
      let customerData = onAssignDriver;
      let selectedDriverObj = drivers.find(driver => driver.driver_id === selectedDriver);

      console.log(selectedDriverObj)

      if (selectedDriverObj) {
        pushToAssignedTiffin(providerId, selectedDriverObj, customerData); 
        handleCloseModal();
      } else {
        console.error('Selected driver not found.');
        handleCloseModal();
      }
    } else {
      alert("Please select a driver before assigning.");
    }
  };

  useEffect(() => {
    // You can also fetch the drivers when the component mounts
    // handleOpenModal();
  }, [providerId]);

  return (
    <>
      {onAssignDriver.length > 0 ? (
        <Button onClick={handleOpenModal}>Assign Driver</Button>
      ) : (
        <Button disabled>Assign Driver</Button>
      )}
      {/* {onAssignDriver.length > 0 && <Button onClick={handleOpenModal}>Assign Driver</Button>} */}
      {/* <Button onClick={handleOpenModal}>Assign Driver</Button> */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="assign-driver-modal"
        aria-describedby="assign-driver-modal-description"
      >
        <Box sx={{ ...modalStyle, width: 400 }}>
          <Typography id="assign-driver-modal" variant="h6" component="div">
            Assign Driver
          </Typography>
          <Select
            value={selectedDriver}
            onChange={(e) => setSelectedDriver(e.target.value)}
            label="Select Driver"
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select a driver
            </MenuItem>
            {drivers.map((driver) => (
              <MenuItem key={driver.driver_id} value={driver.driver_id}>
                {driver.name} - {driver.email_id}
              </MenuItem>
            ))}
          </Select>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleAssignDriver}>Assign Driver</Button>
        </Box>
      </Modal>
    </>
  );
};

export default AssignDriverModalButton;
