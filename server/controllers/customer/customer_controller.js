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

    if (result && result.success) {
      res.status(201).json({ status: 201, success: true, message: 'Customer created successfully' });
    } else {
      res.status(400).json({ status: 400, success: false, error: 'Failed to create Customer' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, success: false, error: 'Internal Server Error' });
  }
};

exports.editCustomer = async (req, res) => {
  try {
    const customerId = req.params.customer_id; 

    const {
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

    console.log(`Received data for editing customer with ID ${customerId}:`, req.body);

    const result = await customerModel.editCustomer(customerId, {
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

    if (result && result.success) {
      res.status(200).json({ status: 200, success: true, message: 'Customer updated successfully' });
    } else {
      res.status(404).json({ status: 404, success: false, error: 'Customer not found or failed to update' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, success: false, error: 'Internal Server Error' });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.customer_id;

    const result = await customerModel.deleteCustomer(customerId);

    if (result && result.success) {
      res.status(200).json({ status: 200, success: true, message: result.message });
    } else {
      res.status(404).json({ status: 404, success: false, error: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, success: false, error: 'Internal Server Error' });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const customerId = req.params.customer_id;

    const customer = await customerModel.getCustomer(customerId);

    if (customer && customer.success) {
      res.status(200).json({ data: customer });
    } else {
      res.status(404).json({ status: 404, success: false, error: 'Customer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, success: false, error: 'Internal Server Error' });
  }
};


exports.getCustomersByProvider = async (req, res) => {
  try {
    const providerId = req.params.provider_id;
    const currentPage = parseInt(req.query.page) || 1; 
    const pageSize = 10;

    const customers = await customerModel.getCustomersByProvider(providerId);
    console.log(customers);

    const totalCustomers = customers.data.length;
    const totalPages = Math.ceil(totalCustomers / pageSize);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    const currentCustomers = customers.data.slice(startIndex, endIndex);

    if (currentCustomers.length > 0) {
      res.status(200).json({
        status: 200,
        success: true,
        data: {
          customers: currentCustomers,
          currentPage,
          totalPages,
          pageSize,
          totalCustomers,
        },
      });
    } else {
      res.status(404).json({
        status: 404,
        success: false,
        error: 'Customers not found for the specified provider or page number exceeds available pages',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, success: false, error: 'Internal Server Error' });
  }
};




