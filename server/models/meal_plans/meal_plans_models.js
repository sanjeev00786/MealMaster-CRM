const supabase = require("../../config/supabaseClient");
exports.createMealPlan = async (data) => {
    console.log("Meal Details Received:", data);

    try {
        const { provider_id, plan_name, price,description } = data;

    console.log("Extracted Data:", { provider_id, plan_name, price, description });
    const { error } = await supabase.from("plans").insert([
        {
            // provider_id,
            // plan_name,
            // price,
            // description
            ...data,
        },
      ]);

      if (error) {
        console.error("Supabase Meal Insert Error:", error.message);
        throw error;
      }
  
      console.log("Meal  plan created successfully.");
  
      // Assuming successful meal plan created if no error is thrown
      return { message: "Meal plan created successfully" };
    } catch (error) {
      console.error("Result from creating meal plan:", error.message);
      throw new Error("Failed to make meal plan");
    }
}
      
exports.getMealPlan = async () => {
  try {
    // console.log("Meal Details Received F:");
    const { data, error } = await supabase.from('plans').select('*');
    console.log("RUNNING",data);

    if (error) {
      console.error("Supabase Meal Insert Error:", error.message);
      throw error;
    }

    return { data, message: "Meal plan fetched successfully" };
  } catch (error) {
    console.error("Error fetching meal plan:", error.message);
    throw new Error("Failed to fetch meal plan");
  }
};


