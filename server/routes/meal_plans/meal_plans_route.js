const express = require('express');
const router = express.Router();
const meal_plan_controller = require('../../controllers/meal_plans/meal_plan_controller');

router.post('/add-meal-plan', meal_plan_controller.addMealPlan);
router.get('/read-meal-plan', meal_plan_controller.readMealPlan);

module.exports = router;