const supabase = require("../../config/supabaseClient");

exports.createProvider = async (data) => {
  console.log("Received Data:", data);

  try {
    const { id, business_name, contact, email_id, address } = data;

    console.log("Extracted Data:", {
      id,
      business_name,
      contact,
      email_id,
      address,
    });

    const { error } = await supabase.from("providers").insert([
      {
        id,
        business_name,
        contact,
        email_id,
        address,
      },
    ]);

    if (error) {
      console.error("Supabase Insert Error:", error.message);
      throw error;
    }

    console.log("Data inserted successfully.");

    // Assuming successful insertion if no error is thrown
    return { message: "Provider created successfully" };
  } catch (error) {
    console.error("Result from creating provider:", error.message);
    throw new Error("Failed to create provider");
  }
};


exports.getProvider = async (provider_id) => {
  console.log('Received Data:', { provider_id });

  try {
      const { data, error } = await supabase
          .from('providers')
          .select('*')
          .eq('id', provider_id);

      if (error) {
          console.error('Supabase Delete Error:', error.message);
          return { success: false, message: 'Failed to fetch providers' }
      }

      console.log();

      return { success: true, message: 'Provider fetched successfully', data };
  } catch (error) {
      console.error('Failed to fetch providers:', error.message);
      throw new Error('Failed to fetch providers');
  }
};