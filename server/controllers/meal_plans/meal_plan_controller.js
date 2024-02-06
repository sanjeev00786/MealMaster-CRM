const {mealPlanModel, getMealPlan} = require('../../models/meal_plans/meal_plans_models');


exports.addMealPlan = async (req, res) => {
    try {
      const { provider_id, plan_name, price, description } = req.body;
  
      console.log('Received data for meal plan:', req.body);
      
  
      const result = await mealPlanModel.createMealPlan({ provider_id, plan_name,  price, description });
  
      if (result) {
        res.status(201).json({ status: 201, success: true, message: 'Meal plan created successfully' });
      } else {
        res.status(400).json({ status: 400, success: false, error: 'Failed to create meal plan' });
      }

    } catch (error) {

      console.error(error);
      res.status(500).json({ status: 500, success: false, error: 'Internal Server Error while creating meal plan' });
    }

  };
  
  

exports.readMealPlan = async (req, res) => {
    try {
    //   const { provider_id, plan_name, price, description } = req.body;
  
    //   console.log('Existing meal plans:', req.body);
    //   exports.readData = async (req, res) => {
        // try {
            const { provider_id, plan_name, price, description } = req.body;

          const result= await getMealPlan(); // Use your function to fetch data
          
  
    //   const result = await mealPlanModel.createMealPlan({ provider_id, plan_name,  price, description });
  
      if (result) {
        res.status(201).json({ status: 201, success: true, message: 'Meal plan fetched successfully' });
      } else {
        res.status(400).json({ status: 400, success: false, error: 'Failed to fetch meal plans' });
      }

    } catch (error) {

      console.error(error);
      res.status(500).json({ status: 500, success: false, error: 'Internal Server Error while fetching meal plan' });
    }

  };
  
  

