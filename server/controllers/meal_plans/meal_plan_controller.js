const mealPlanModel = require("../../models/meal_plans/meal_plans_models");

exports.addMealPlan = async (req, res) => {
  try {
    const { provider_id, plan_name, price, description } = req.body;

    // console.log("Received data for meal plan:", req.body);

    const result = await mealPlanModel.createMealPlan({
      provider_id,
      plan_name,
      price,
      description,
    });

    if (result && result.success) {
      res.status(201).json({
        status: 201,
        success: true,
        data: result.data,
        message: result.message,
      });
    } else {
      res.status(400).json({
        status: 400,
        success: false,
        error: result.message,
      });
    }
  } catch (error) {
    // console.error(error);
    res
      .status(500)
      .json({
        status: 500,
        success: false,
        error: "Internal Server Error while creating meal plan",
      });
  }
};

exports.getMealPlan = async (req, res) => {
  try {
    const { provider_id, plan_name, price, description } = req.query;

    const result = await mealPlanModel.readMealPlan({
      provider_id,
      plan_name,
      price,
      description,
    });

    if (result && result.success) {
      res
        .status(201)
        .json({
          status: 201,
          success: true,
          data: result.data,
          message: result.message,
        });
    } else {
      res
        .status(400)
        .json({
          status: 400,
          success: false,
          error:
            "No meal plans found for the given provider_id,Failed to fetch meal plans",
        });
    }
  } catch (error) {
    // console.error(error);
    res
      .status(500)
      .json({
        status: 500,
        success: false,
        error: "Internal Server Error while fetching meal plan",
      });
  }
};

exports.updateMealPlan = async (req, res) => {
  try {
    const { plan_id, plan_name, price, description } = req.body;

    // console.log("here is id $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4", plan_id);

    const result = await mealPlanModel.editMealPlan({
      plan_name,
      price,
      description,
      plan_id,
    });

    if (result && result.success) {
      res
        .status(201)
        .json({
          status: 201,
          success: true,
          data: result.data,
          message: result.message,
        });
    } else {
      res
        .status(400)
        .json({ status: 400, success: false, error: result.message });
    }

    
  } catch (error) {
    // console.error(error);
    res
      .status(500)
      .json({
        status: 500,
        success: false,
        error: "Internal Server Error while updating meal plan",
      });
  }
};

exports.deleteMealPlan = async (req, res) => {
  try {
    const { plan_id } = req.body;
    // console.log("plan id ----->>>>>>",plan_id);
    const result = await mealPlanModel.removeMealPlan({ plan_id });

    if (result && result.success) {
      res
        .status(201)
        .json({
          status: 201,
          success: true,
          data: result.data,
          message: result.message,
        });
    } else {
      res
        .status(400)
        .json({ status: 400, success: false, error: result.message });
    }
  } catch (error) {
    // console.error(error);
    res
      .status(500)
      .json({
        status: 500,
        success: false,
        error: "Internal Server Error while deleting meal plan",
      });
  }
};
