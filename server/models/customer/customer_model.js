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
      return { success: false, message: 'Failed to create customers' }
    }

    console.log("Data inserted successfully.");
    return { success: true, message: 'Customer created successfully' }
  } catch (error) {
    console.error("Result from creating Customer:", error.message);
    throw new Error("Failed to create Customer");
  }
};


exports.editCustomer = async (customerId, updatedData) => {
  console.log(`Editing Customer with ID: ${customerId}`);
  
  try {
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
    } = updatedData;

    console.log("Updated Data:", {
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

    const { error } = await supabase
      .from("customers")
      .update([
        {
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
      ])
      .eq("customer_id", customerId);

    if (error) {
      console.error("Supabase Update Error:", error.message);
      return { success: false, message: 'Failed to edit customers' }
    }

    console.log("Data updated successfully.");
    return { success: true, message: 'Customer edited succesfully' }
  } catch (error) {
    console.error("Result from updating Customer:", error.message);
    throw new Error("Failed to update Customer");
  }
};

exports.deleteCustomer = async (customerId) => {
  console.log(`Deleting Customer with ID: ${customerId}`);

  try {
    const { error } = await supabase
      .from("customers")
      .delete()
      .eq("customer_id", customerId); 

    if (error) {
      console.error("Supabase Delete Error:", error.message);
      return { success: false, message: "Failed to delete customer"};
    }

    console.log("Customer deleted successfully.");    
    return { success: true, message: "Customer deleted successfully."};
  } catch (error) {
    console.error("Result from deleting Customer:", error.message);
    throw new Error("Failed to delete Customer");
  }
};

exports.getCustomer = async (customerId) => {

  console.log(`Getting Customer with ID: ${customerId}`);

  try {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("customer_id", customerId); 

    if (error) {
      console.error("Supabase Select Error:", error.message);
      return { success: false, message: 'Failed to fetch customers' }
    }

    if (data && data.length > 0) {
      console.log(data);
      console.log("Customer retrieved successfully.");
      return { success: true, message: 'Customers fetched successfully', data: data[0] } 
    } else {
      return { success: true, message: 'Customers fetched successfully', data: [] }
    }
  } catch (error) {
    console.error("Result from getting Customer:", error.message);
     return { success: false, message: 'Failed to fetch customers' }
  }
};

exports.getCustomersByProvider = async (providerId) => {
  console.log(`Getting All Customers for Provider ID: ${providerId}`);

  try {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("provider_id", providerId); 

    if (error) {
      console.error("Supabase Select Error:", error.message);
      return { success: false, message: 'Failed to fetch customers' }
    }

    if (data && data.length > 0) {
      console.log("Customers retrieved successfully.");
      return { success: true, message: 'Customer feteched by provider ID', data: data }
    } else {
      return { success: true, message: 'Customer feteched by provider ID', data: [] }
    }
  } catch (error) {
    console.error("Result from getting Customers:", error.message);
    throw new Error("Failed to get Customers");
  }
};
