const express = require('express');
const router = express.Router();
const providerController = require('../../controllers/provider_sign_up/provider_sign_up_controller');

router.post('/add-provider', providerController.addProvider);

module.exports = router;