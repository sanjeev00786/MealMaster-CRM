const customerModel = require('../../models/customer/customer_model')

exports.addCustomer = async (req, res) => {
  try {
    const {
        provider_id,
        name,
        email_id,
        contact,
        address,
        latitude,
        longitude,
        plan_id,
        tiffin_quantity,
        dob,
        status,
        billing_cycle,
        payment,
        is_veg,
    } = req.body;

    console.log('Received data for creating customer:', req.body);

    const result = await customerModel.createCustomer({
        provider_id,
        name,
        email_id,
        contact,
        address,
        latitude,
        longitude,
        plan_id,
        tiffin_quantity,
        dob,
        status,
        billing_cycle,
        payment,
        is_veg,
    });

    if (result) {
      res.status(201).json({ status: 201, success: true, message: 'Customer created successfully' });
    } else {
      res.status(400).json({ status: 400, success: false, error: 'Failed to create Customer' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, success: false, error: 'Internal Server Error' });
  }
};

