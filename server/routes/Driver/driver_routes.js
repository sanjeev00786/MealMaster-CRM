const express = require('express');
const router = express.Router();
const driverController = require('../../controllers/Driver/driver_controller');

router.post('/add-driver', driverController.addDriver);

module.exports = router;