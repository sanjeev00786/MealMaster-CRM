const supabase = require("../../config/supabaseClient");

exports.createDriver = async (data) => {
  console.log("Received Data:", data);

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
    } = data;

    const { error } = await supabase.from("drivers").insert([
      {
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
      },
    ]);

    if (error) {
      console.error("Supabase Insert Error:", error.message);
      return { success: false, message: "Failed to create driver" };
    }

    return { success: true, message: "Driver created successfully" };
  } catch (error) {
    console.error("Result from creating driver:", error.message);
    throw new Error("Failed to create driver");
  }
};

exports.updateDriver = async (data) => {
  console.log("Received Data:", data);

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
      driver_id,
    } = data;

    const { error } = await supabase
      .from("drivers")
      .update([
        {
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
        },
      ])
      .eq("driver_id", driver_id);

    if (error) {
      console.error("Supabase Insert Error:", error.message);
      return { success: true, message: "Failed to update driver" };
    }

    console.log("Data updated successfully.");

    return { success: true, message: "Driver updated successfully" };
  } catch (error) {
    console.error("Result from update driver:", error.message);
    throw new Error("Failed to update driver");
  }
};

exports.deleteDriver = async (driver_id) => {
  console.log("Received Data:", { driver_id });

  try {
    const { error } = await supabase
      .from("drivers")
      .delete()
      .eq("driver_id", driver_id);

    if (error) {
      console.error("Supabase Delete Error:", error.message);
      return { success: false, message: "Failed to delete driver" };
    }

    console.log("Data deleted successfully.");

    return { success: true, message: "Driver deleted successfully" };
  } catch (error) {
    console.error("Result from delete driver:", error.message);
    throw new Error("Failed to delete driver");
  }
};

exports.getDriver = async (login_token) => {
  console.log("Received Data:", { login_token });

  try {
    const { data, error } = await supabase
      .from("drivers")
      .select("*")
      .eq("login_token", login_token);

    if (error) {
      console.error("Supabase Delete Error:", error.message);
      return { success: false, message: "Failed to fetch driver" };
    }

    console.log();

    return { success: true, message: "Driver fetched successfully", data: data };
  } catch (error) {
    console.error("Failed to fetch driver:", error.message);
    throw new Error("Failed to fetch driver");
  }
};

exports.getAllDrivers = async (provider_id) => {
  console.log("Received Data:", { provider_id });

  try {
    const { data, error } = await supabase
      .from("drivers")
      .select("*")
      .eq("provider_id", provider_id);

    if (error) {
      console.error("Supabase Delete Error:", error.message);
      return { success: false, message: "Failed to fetch drivers" };
    }

    console.log();

    return { success: true, message: "Driver fetched successfully", data };
  } catch (error) {
    console.error("Failed to fetch drivers:", error.message);
    throw new Error("Failed to fetch drivers");
  }
};

exports.getPastDeliveryTiffins = async (driver_id) => {
  console.log("Received Data:", { driver_id });

  try {
    const { data, error } = await supabase
      .from("past_delivery_tiffins")
      .select("*")
      .eq("driver_id", driver_id);

    if (error) {
      console.error("Supabase Delete Error:", error.message);
      return {
        success: false,
        message: "Failed to fetch past delivery tiffins",
      };
    }

    console.log();

    return {
      success: true,
      message: "Past delivery tiffins data fetched successfully",
      data,
    };
  } catch (error) {
    console.error("Failed to fetch past delivery tiffins:", error.message);
    throw new Error("Failed to fetch past delivery tiffins");
  }
};

exports.createPastDelivery = async (data) => {
  console.log("Received Data:", data);

  try {
    const {
      id,
      provider_id,
      plan_id,
      driver_id,
      delivery_status,
      delivery_photo_url,
      customer_id
    } = data;

    const { error } = await supabase.from("past_delivery_tiffins").insert([
      {
        id,
        provider_id,
        plan_id,
        driver_id,
        delivery_status,
        delivery_photo_url,
        customer_id
      },
    ]);

    if (error) {
      console.error("Supabase Insert Error:", error.message);
      return { success: false, message: "Failed to create driver" };
    }

    return { success: true, message: "Driver created successfully" };
  } catch (error) {
    console.error("Result from creating driver:", error.message);
    throw new Error("Failed to create driver");
  }
};

exports.updateDeliveryStatusAndPhotoByCustomerId = async (data) => {
  console.log("Received Data:", data);

  try {
    const {
      customer_id,
      delivery_status,
      delivery_photo_url,
    } = data;

    const { data: updatedData, error } = await supabase
      .from("assigned_tiffin")
      .update({
        delivery_status,
        delivery_photo_url,
      })
      .eq('customer_id', customer_id);

    if (error) {
      console.error("Supabase Update Error:", error.message);
      return { success: false, message: "Failed to update delivery status and photo" };
    }

    console.log("Updated Data:", updatedData);

    return { success: true, message: "Delivery status and photo updated successfully" };
  } catch (error) {
    console.error("Result from updating delivery status and photo:", error.message);
    throw new Error("Failed to update delivery status and photo");
  }
};

exports.deleteAssignTiffin = async (id) => {
  console.log("Received Data:", { id });

  try {
    const { error } = await supabase
      .from("assigned_tiffin")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase Delete Error:", error.message);
      return { success: false, message: "Failed to delete" };
    }

    console.log("Data deleted successfully.");

    return { success: true, message: "deleted successfully" };
  } catch (error) {
    console.error("Result from delete assign tiffin:", error.message);
    throw new Error("Failed to delete assign tiffin");
  }
};

exports.getAssignTiffin = async (driver_id) => {
  console.log("Received Data:", { driver_id });

  try {
    const { data, error } = await supabase
      .from("assigned_tiffin")
      .select("*")
      .eq("driver_id", driver_id);

    if (error) {
      console.error("Supabase Delete Error:", error.message);
      return { success: false, message: "Failed to Assign Tiffin" };
    }

    console.log("********",data);

    return { success: true, message: "Assign Tiffin fetched successfully", data };
  } catch (error) {
    console.error("Failed to fetch driver:", error.message);
    throw new Error("Failed to fetch driver");
  }
};