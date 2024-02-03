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
