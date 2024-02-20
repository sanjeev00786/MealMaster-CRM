const driverModel = require('../../models/Driver/driver_model')

exports.addDriver = async (req, res) => {
  try {
    const {
      provider_id,
      name,
      email_id,
      contact,
      photo_url,
      address,
      latitude,
      longitude,
      dob,
      login_token,
      driver_status,
      socket_token,
    } = req.body;

    console.log('Received data for creating driver:', req.body);

    const result = await driverModel.createDriver({
      provider_id,
      name,
      email_id,
      contact,
      photo_url,
      address,
      latitude,
      longitude,
      dob,
      login_token,
      driver_status,
      socket_token,
    });

    if (result && result.success) {
      res.status(201).json({ status: 201, success: true, message: 'Driver created successfully' });
    } else {
      res.status(400).json({ status: 400, success: false, error: 'Failed to create driver' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, success: false, error: 'Internal Server Error' });
  }
};

exports.updateDriver = async (req, res) => {
  try {
    const {
      provider_id,
      name,
      email_id,
      contact,
      photo_url,
      address,
      latitude,
      longitude,
      dob,
      login_token,
      driver_status,
      socket_token,
      driver_id
    } = req.body;

    console.log('Received data for update driver:', req.body);

    const result = await driverModel.updateDriver({
      provider_id,
      name,
      email_id,
      contact,
      photo_url,
      address,
      latitude,
      longitude,
      dob,
      login_token,
      driver_status,
      socket_token,
      driver_id
    });

    if (result && result.success) {
      res.status(201).json({ status: 201, success: true, message: 'Driver update successfully' });
    } else {
      res.status(400).json({ status: 400, success: false, error: 'Failed to update driver' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, success: false, error: 'Internal Server Error' });
  }
};

exports.deleteDriver = async (req, res) => {
  try {
    const driver_id = req.params.driver_id;

    if (!driver_id) {
      console.log(req.params);
      return res.status(400).json({ status: 400, success: false, error: 'Missing driver_id parameter' });
    }

    const result = await driverModel.deleteDriver(driver_id);

    if (result && result.success) {
      res.status(201).json({ status: 201, success: true, message: 'Driver deleted successfully' });
    } else {
      res.status(400).json({ status: 400, success: false, error: 'Failed to delete driver' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, success: false, error: 'Internal Server Error' });
  }
};

exports.getDriver = async (req, res) => { 
  try {
    const { login_token } = req.query;

    if (!login_token) {
      console.log(req.params);
      return res.status(400).json({ status: 400, success: false, error: 'Missing login_token parameter' });
    }

    const result = await driverModel.getDriver(login_token);

    if (result && result.success) {
      res.status(200).json({ status: 200, success: true, message: 'Driver data fetched successfully', data: result.data });
    } else {
      res.status(404).json({ status: 404, success: false, error: 'Driver not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, success: false, error: 'Internal Server Error' });
  }
};

exports.getAllDrivers = async (req, res) => { 
  try {
    const { provider_id } = req.query;

    if (!provider_id) {
      console.log(req.params);
      return res.status(400).json({ status: 400, success: false, error: 'Missing provider_id parameter' });
    }

    const result = await driverModel.getAllDrivers(provider_id);

    if (result && result.success) {
      res.status(200).json({ status: 200, success: true, message: 'Driver data fetched successfully', data: result.data });
    } else {
      res.status(404).json({ status: 404, success: false, error: 'Driver not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, success: false, error: 'Internal Server Error' });
  }
};
