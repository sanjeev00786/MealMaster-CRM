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
        diet_notes
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
        diet_notes
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
      diet_notes
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
      diet_notes
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

exports.getAllCustomersByProvider = async (req, res) => {
  try {
    const providerId = req.params.provider_id;
    const customers = await customerModel.getCustomersByProvider(providerId);
    
    if (customers.data.length > 0) {
      res.status(200).json({
        status: 200,
        success: true,
        data: {
          customers: customers.data,
        }
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

// exports.getCustomersByProvider = async (req, res) => {
//   try {
//     const providerId = req.params.provider_id;
//     const currentPage = parseInt(req.query.page) || 1; 
//     const pageSize = 10;

//     const customers = await customerModel.getCustomersByProvider(providerId);
//     console.log(customers);

//     const totalCustomers = customers.data.length;
//     const totalPages = Math.ceil(totalCustomers / pageSize);

//     const startIndex = (currentPage - 1) * pageSize;
//     const endIndex = currentPage * pageSize;
//     let currentCustomers = customers.data.slice(startIndex, endIndex);

//     const filterCustomersByStatus = (status) => currentCustomers.filter(customer => customer.status === status);

//     const getAdditionalCustomers = (status, count) => {
//       const additionalCustomers = customers.data.filter(customer => customer.status === status && !currentCustomers.includes(customer));
//       return additionalCustomers.slice(0, count);
//     }

//     const activeCustomersCount = filterCustomersByStatus(true).length;
//     const inactiveCustomersCount = filterCustomersByStatus(false).length;

//     const remainingActiveCustomersCount = pageSize - activeCustomersCount;
//     const remainingInactiveCustomersCount = pageSize - inactiveCustomersCount;

//     if (activeCustomersCount < pageSize && totalCustomers > endIndex) {
//       const additionalActiveCustomers = getAdditionalCustomers(true, remainingActiveCustomersCount);
//       currentCustomers = currentCustomers.concat(additionalActiveCustomers);
//     }

//     if (inactiveCustomersCount < pageSize && totalCustomers > endIndex) {
//       const additionalInactiveCustomers = getAdditionalCustomers(false, remainingInactiveCustomersCount);
//       currentCustomers = currentCustomers.concat(additionalInactiveCustomers);
//     }

//     const remainingAllCustomersCount = pageSize - currentCustomers.length;

//     if (remainingAllCustomersCount > 0 && totalCustomers > endIndex) {
//       const additionalAllCustomers = customers.data.slice(endIndex, endIndex + remainingAllCustomersCount);
//       currentCustomers = currentCustomers.concat(additionalAllCustomers);
//     }

//     if (currentCustomers.length > 0) {
//       res.status(200).json({
//         status: 200,
//         success: true,
//         data: {
//           customers: currentCustomers,
//           currentPage,
//           totalPages,
//           pageSize,
//           totalCustomers,
//         },
//       });
//     } else {
//       res.status(404).json({
//         status: 404,
//         success: false,
//         error: 'Customers not found for the specified provider or page number exceeds available pages',
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ status: 500, success: false, error: 'Internal Server Error' });
//   }
// };

exports.getCustomersByStatus = async (req, res) => {
  try {
    const providerId = req.params.provider_id;
    const status = req.query.status; 
    const currentPage = parseInt(req.query.page) || 1; 
    const pageSize = 10;

    let customers;

    if (status === 'active') {
      customers = await customerModel.getActiveCustomersByProvider(providerId);
    } else if (status === 'inactive') {
      customers = await customerModel.getInactiveCustomersByProvider(providerId);
    } else if (status === 'all') {
      customers = await customerModel.getCustomersByProvider(providerId);
    } else {
      return res.status(400).json({
        status: 400,
        success: false,
        error: 'Invalid or missing status parameter. Please provide either "active", "inactive", or "all".'
      });
    }

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
        error: 'Customers not found for the specified status or page number exceeds available pages',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, success: false, error: 'Internal Server Error' });
  }
};



