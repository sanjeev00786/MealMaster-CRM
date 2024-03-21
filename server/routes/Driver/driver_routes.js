const express = require('express');
const router = express.Router();
const driverController = require('../../controllers/Driver/driver_controller');

router.post('/add-driver', driverController.addDriver);
router.put('/update-driver', driverController.updateDriver);
router.get('/get-driver', driverController.getDriver);
router.get('/get-all-drivers', driverController.getAllDrivers);
router.delete('/delete-driver/:driver_id', driverController.deleteDriver);

router.get('/get-past-delivery-tiffins', driverController.getPastDeliveryTiffins);

router.post('/move-to-past-delivery', driverController.moveToPastDelivery);
router.put('/update-delivery-status-and-photo', driverController.updateDeliveryStatusAndPhoto);
router.delete('/delete-assign-tiffin/:id', driverController.deleteAssignTiffin);
router.get('/get-assign-tiffin', driverController.getAssignTiffin);

module.exports = router;