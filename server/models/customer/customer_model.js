const supabase = require("../../config/supabaseClient");

exports.createCustomer = async (data) => {
  console.log("Received Data:", data);

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
    } = data;

    console.log("Extracted Data:", {
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

    const { error } = await supabase.from("customers").insert([
      {
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
      },
    ]);

    if (error) {
      console.error("Supabase Insert Error:", error.message);
      throw error;
    }

    console.log("Data inserted successfully.");

    // Assuming successful insertion if no error is thrown
    return { message: "Customer created successfully" };
  } catch (error) {
    console.error("Result from creating Customer:", error.message);
    throw new Error("Failed to create Customer");
  }
};
