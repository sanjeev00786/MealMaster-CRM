const express = require('express');
const router = express.Router();
const customerController = require('../../controllers/customer/customer_controller');

router.post('/add-customer', customerController.addCustomer);
router.put('/edit-customer/:customer_id', customerController.editCustomer);
router.delete('/delete-customer/:customer_id', customerController.deleteCustomer);
router.get('/get-customer/:customer_id', customerController.getCustomer);
router.get('/provider/get-all-customers/:provider_id', customerController.getCustomersByProvider);
router.get('/provider/get-allList-customers/:provider_id', customerController.getAllCustomersByProvider);
router.get('/provider/get-active-customers/:provider_id', customerController.getCustomersByStatus);

module.exports = router;