import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const AssignDriverModalButton = ({ providerId, onAssignDriver }) => {
  const [openModal, setOpenModal] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState('');

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  const handleOpenModal = async () => {
    setOpenModal(true);
    // Fetch drivers from the API using the provided providerId
    try {
      const response = await axios.get(`http://localhost:8000/api/drivers/get-driver?provider_id=${providerId}`);
      console.log(response.data)
      setDrivers(response.data.data); // Extracting the 'data' array from the response
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAssignDriver = () => {
    // Pass the selected driver and providerId to the parent component
    onAssignDriver(selectedDriver, providerId);
    handleCloseModal();
  };

  useEffect(() => {
    // You can also fetch the drivers when the component mounts
    // handleOpenModal();
  }, [providerId]);

  return (
    <>
      <Button onClick={handleOpenModal}>Assign Driver</Button>
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
            <MenuItem value="" disabled>Select a driver</MenuItem>
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
