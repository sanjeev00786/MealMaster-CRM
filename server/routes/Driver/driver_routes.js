const express = require('express');
const router = express.Router();
const driverController = require('../../controllers/Driver/driver_controller');

router.post('/add-driver', driverController.addDriver);
router.put('/update-driver', driverController.updateDriver);
router.get('/get-driver', driverController.getDriver);
router.get('/get-all-drivers', driverController.getAllDrivers);
router.delete('/delete-driver/:driver_id', driverController.deleteDriver);

module.exports = router;