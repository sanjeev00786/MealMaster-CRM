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

    if (result) {
      res.status(201).json({ status: 201, success: true, message: 'Driver created successfully' });
    } else {
      res.status(400).json({ status: 400, success: false, error: 'Failed to create driver' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, success: false, error: 'Internal Server Error' });
  }
};

