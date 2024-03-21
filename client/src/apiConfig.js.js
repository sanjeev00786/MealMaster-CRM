// apiConfig.js
const API_BASE_URL = 'http://localhost:3001';

const ENDPOINTS = {
  // Driver
  GET_DRIVER: '/api/drivers/get-driver',
  UPDATE_DRIVER: '/api/drivers/update-driver',
  UPDATE_DELIVERY_STATUS: '/api/drivers/update-delivery-status-and-photo',
  ADD_DRIVER: 'api/drivers/add-driver',
  GET_ALL_DRIVER: '/api/drivers/get-all-drivers?',

  // Schedule
  MOVE_TO_PAST_DELIVERY: '/move-to-past-delivery',
  GET_ASSIGNED_TIFFIN: '/get-assign-tiffin',
  GET_ASSIGNED_DELIVERIES: '/api/drivers/get-all-drivers?',

  // Meal Plan
  GET_MEAL_PLAN: '/api/provider/meal_plans/get-meal-plan?',
  DELETE_PLAN: '/api/provider/meal_plans/delete-meal-plan',
  UPDATE_MEAL_PLAN: '/api/provider/meal_plans/update-meal-plan',
  ADD_PLAN: '/api/provider/meal_plans/add-meal-plan',

  // CUSTOMER
  EDIT_CUSTOMER: '/api/customer/edit-customer/',
  ADD_CUSTOMER: '/api/customer/add-customer',
  GET_CUSTOMER: '/api/customer/get-customer/',
  GET_ALL_CUSTOMER: '/api/customer/provider/get-all-customers/',

  
 
  // Add other endpoints as needed
};

export { API_BASE_URL, ENDPOINTS };