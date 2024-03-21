// apiConfig.js
const API_BASE_URL = 'https://meal-master-crm-server.onrender.com';

const ENDPOINTS = {
  // Driver
  GET_DRIVER: '/api/drivers/get-driver',
  UPDATE_DRIVER: '/api/drivers/update-driver',
  UPDATE_DELIVERY_STATUS: '/api/drivers/update-delivery-status-and-photo',
  ADD_DRIVER: 'api/drivers/add-driver',
  GET_ALL_DRIVER: '/api/drivers/get-all-drivers?',
  DELETE_DRIVER:'/api/drivers/delete-driver',
  DELETE_ASSIGN_TIFFIN: '/api/drivers/delete-assign-tiffin/',

  // Schedule
  MOVE_TO_PAST_DELIVERY: '/api/drivers//move-to-past-delivery',
  GET_ASSIGNED_TIFFIN: '/api/drivers/get-assign-tiffin?',
  GET_ASSIGNED_DELIVERIES: '/api/drivers/get-all-drivers?',
  GET_PAST_DELIVRIES: '/api/drivers/get-past-delivery-tiffins?',

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
  GET_ALLIST_CUSTOMER: '/api/customer/provider/get-allList-customers/',
  GET_CUSTOMER_BY_STATUS: '/api/customer/provider/get-active-customers/'

  // Add other endpoints as needed
};

export { API_BASE_URL, ENDPOINTS };