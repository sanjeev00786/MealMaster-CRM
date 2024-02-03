const express = require('express');
const router = express.Router();
const customerController = require('../../controllers/customer/customer_controller');

router.post('/add-customer', customerController.addCustomer);

module.exports = router;