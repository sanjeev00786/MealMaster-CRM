const providerModel = require("../../models/provider_sign_up/provider_sign_up_model");

exports.addProvider = async (req, res) => {
  try {
    const { id, business_name, contact, email_id, address } = req.body;

    console.log("Received data for creating provider:", req.body);

    const result = await providerModel.createProvider({
      id,
      business_name,
      contact,
      email_id,
      address
    });

    if (result) {
      res
        .status(201)
        .json({
          status: 201,
          success: true,
          message: "Provider created successfully",
        });
    } else {
      res
        .status(400)
        .json({
          status: 400,
          success: false,
          error: "Failed to create Provider",
        });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: 500, success: false, error: "Internal Server Error" });
  }
};


exports.getProvider = async (req, res) => {
  try {
    const { provider_id } = req.query;

    if (!provider_id) {
      console.log(req.params);
      return res.status(400).json({ status: 400, success: false, error: 'Missing provider_id parameter' });
    }

    const result = await providerModel.getProvider(provider_id);

    if (result && result.success) {
      res.status(200).json({ status: 200, success: true, message: 'Provider data fetched successfully', data: result.data });
    } else {
      res.status(404).json({ status: 404, success: false, error: 'Provider not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, success: false, error: 'Internal Server Error' });
  }
};