const express = require('express');
const router = express.Router();
const meal_plan_controller = require('../../controllers/meal_plans/meal_plan_controller');

router.post('/add-meal-plan', meal_plan_controller.addMealPlan);
router.get('/get-meal-plan', meal_plan_controller.getMealPlan);
router.put('/update-meal-plan', meal_plan_controller.updateMealPlan);
router.delete('/delete-meal-plan', meal_plan_controller.deleteMealPlan);


module.exports = router;