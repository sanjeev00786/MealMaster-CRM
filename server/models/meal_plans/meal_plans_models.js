const supabase = require("../../config/supabaseClient");

exports.createMealPlan = async (data) => {
    // console.log("Meal Details Received:", data);

    try {
        const { provider_id, plan_name, price,description } = data;
        console.log(data);
        const existingPlans_name = await supabase
          .from("plans")
          .select('plan_name')
          .eq('provider_id', provider_id)
          .eq('plan_name', plan_name);

    if (existingPlans_name.data && existingPlans_name.data.length > 0) {
     return {success: false, message: `A meal plan with the name '${plan_name}' already exists for the provider ID ${provider_id}.`}
  }

    // console.log("Extracted Data:", { provider_id, plan_name, price, description });
    const { error } = await supabase.from("plans").insert([
        {
            provider_id,
            plan_name,
            price,
            description
            // ...data,
        },
      ]);

      if (error) {
        // console.error("Supabase Meal Insert Error:", error.message);
        return { success: false, message: 'Failed to create meal plans' };

      }
  
      // console.log("Meal  plan created successfully.");
  
      return { success: true, message: "Meal plan created successfully", "data": data };
    } catch (error) {
      // console.error("Result from creating meal plan:", error.message);
      throw new Error("Failed to make meal plan");
    }
}
      
exports.readMealPlan = async ({provider_id}) => {
  try {
    const { data, error } = await supabase
      .from('plans')
      .select('*')
      .eq('provider_id', provider_id);
      // console.log("RUNNING",data);

    if (error) {
      // console.error("Supabase Meal read Error:", error.message);
      return { success: false, message: 'Failed to get meal plans' };

    }

    return { success: true, message: "Meal plan fetched successfully", "data": data };
  } catch (error) {
    // console.error("Error fetching meal plan:", error.message);
    throw new Error("Failed to fetch meal plan");
  }
};


exports.editMealPlan = async({plan_name,price,description,plan_id}) =>{

  try {
    
     const { data, error } = await supabase
    .from('plans')
    .update({plan_name,price,description})
    .eq('plan_id', plan_id)

    if (error) {
      // console.error("Supabase Meal update Error:", error.message);
      return { success: false, message: 'Failed to update meal plans' };
    }

    return { success: true, message: "Meal plan updated successfully" };

  } catch(error) {
    // console.error("Error updating meal plan:",error.message);
    throw new Error("Failed to update data in meal plan");
  }
  
};



exports.removeMealPlan = async({ plan_id})=>{
  try{
    const { error } = await supabase

    .from('plans')
    .delete()
    .eq('plan_id',plan_id)
    if (error) {
      console.error("Supabase Meal delete Error:   ", error.message);
      return { success: false, message: 'Failed to delete meal plans' };

    }

    return { success: true, message: "Meal plan deleted successfully" };

  }catch(error){
    // console.error("Error deleting meal plan:",error.message);
    throw new Error("Failed to delete meal plan");

  }

};